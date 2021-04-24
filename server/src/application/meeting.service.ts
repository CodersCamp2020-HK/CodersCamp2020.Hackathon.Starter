import { Injectable } from '@nestjs/common';
import { JoinMeetingDTO } from '../domain/joinMeeting.dto';
import { Socket } from 'socket.io';
import { Meeting } from '../domain/meeting';
import { v4 as uuid } from 'uuid';
import { MeetingParticipant } from '../domain/meetingParticipant';
import { MeetingRole } from '../domain/meetingRole';
import { CreateMeetingDTO } from '../domain/createMeeting.dto';
import { BroadcastDTO } from '../domain/broadcast.dto';
import { WsException } from '@nestjs/websockets';
import { InformationNotification } from '../domain/information.dto';
import { MeetingState } from '../domain/meetingState';
import { TimeEvent } from '../domain/timeEvent.dto';

@Injectable()
class MeetingService {
  private readonly meetings = new Map<string, Meeting>();
  private readonly sockets = new Map<string, Socket>();
  private readonly informationNotitificationLock = new Set<string>();

  private getMeeting(name: string) {
    const meeting = this.meetings.get(name);
    if (!meeting)
      throw new WsException({
        code: 1,
        message: "Meeting with this id doesn't exists",
      });
    return meeting;
  }

  private timeoutGuard<T>(store: Set<T>, id: T, time_s: number) {
    if (store.has(id)) {
      throw new WsException({
        code: 11,
        message: 'You reached time limit of concurrent notifications',
      });
    }
    store.add(id);
    setTimeout(() => {
      store.delete(id);
    }, time_s * 60 * 1000);
  }

  private connectParticipantToMeeting(
    participant: MeetingParticipant,
    meeting: Meeting,
    socket: Socket,
  ) {
    meeting.addParticipant(participant);
    this.sockets.set(participant.id, socket);
    socket.on('disconnect', () => {
      this.cleanupConnection(meeting, participant.id);
    });
  }

  private broadcastEvent<T>(endpoint: string, meeting: Meeting, event: T) {
    const participantIds = meeting.participants.map((x) => x.id);
    for (const id of participantIds) {
      const socket = this.sockets.get(id);
      if (socket && socket.connected) {
        socket.emit(endpoint, event);
      }
    }
  }

  private getParticipantAndMeeting({
    meetingName,
    participantId,
  }: {
    meetingName: string;
    participantId: string;
  }) {
    const meeting = this.getMeeting(meetingName);
    if (!meeting.containsParticipant(participantId))
      throw new WsException({ code: 5, message: 'Invalid participantId' });
    const participant = meeting.participants.find(
      (x) => x.id === participantId,
    );
    return { meeting, participant };
  }

  createMeeting(dto: CreateMeetingDTO, socket: Socket) {
    const meeting = this.meetings.get(dto.meetingName);
    if (meeting)
      throw new WsException({
        code: 2,
        message: 'Meeting with this name exists',
      });
    const meetingOwner = new MeetingParticipant(
      uuid(),
      MeetingRole.OWNER,
      dto.name,
      dto.email,
    );
    const newMeeting = new Meeting(
      dto.meetingName,
      uuid(),
      meetingOwner,
      [],
      new MeetingState([]),
      dto.password,
    );
    this.meetings.set(dto.meetingName, newMeeting);
    this.connectParticipantToMeeting(meetingOwner, newMeeting, socket);
    return {
      meetingName: dto.meetingName,
      participant: meetingOwner,
      jitsiName: newMeeting.jitsiName,
    };
  }

  joinMeeting(dto: JoinMeetingDTO, socket: Socket) {
    const meeting = this.getMeeting(dto.meetingName);
    if (dto.ownerId) {
      if (dto.ownerId !== meeting.owner.id)
        throw new WsException({ code: 3, message: 'Invalid ownerId' });

      this.connectParticipantToMeeting(meeting.owner, meeting, socket);
      return { participant: meeting.owner, jitsiName: meeting.jitsiName };
    }
    if (meeting.password && meeting.password !== dto.password)
      throw new WsException({ code: 4, message: 'Invalid password' });
    const participant = new MeetingParticipant(
      uuid(),
      MeetingRole.PARTICIPANT,
      dto.name,
      dto.email,
    );
    this.connectParticipantToMeeting(participant, meeting, socket);
    return {
      meetingName: meeting.name,
      participant,
      jitsiName: meeting.jitsiName,
    };
  }

  cleanupConnection(meeting: Meeting, participantId: string) {
    meeting.removeParticipantId(participantId);
    this.sockets.delete(participantId);
    if (meeting.empty()) {
      this.meetings.delete(meeting.name);
    }
  }

  broadcast(dto: BroadcastDTO) {
    const { participant, meeting } = this.getParticipantAndMeeting(dto);
    this.broadcastEvent('broadcast', meeting, {
      from: participant.name,
      payload: dto.payload,
    });
  }

  onInformationEvent(body: InformationNotification) {
    const { participant, meeting } = this.getParticipantAndMeeting(body);
    this.timeoutGuard(this.informationNotitificationLock, participant.id, 30);
    this.broadcastEvent('on_information_event', meeting, body);
  }

  onTimeEvent(body: TimeEvent) {
    const { meeting, participant } = this.getParticipantAndMeeting(body);
    if (participant.id !== meeting.owner.id) {
      throw new WsException({
        code: 6,
        message: 'Only owner can invoked this action',
      });
    }
    if (meeting.meetingState.currentAction) {
      throw new WsException({
        code: 7,
        message: 'Only one action can be active',
      });
    }
    this.broadcastEvent('on_start_time_event', meeting, body);
    setInterval(() => {
      this.broadcastEvent('on_end_time_event', meeting, {});
    }, body.interval * 1000);
  }
}

export { MeetingService };
