import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JoinMeetingDTO } from '../domain/joinMeeting.dto';
import { Socket } from 'socket.io';
import { Meeting } from '../domain/meeting';
import { v4 as uuid } from 'uuid';
import { MeetingParticipant } from '../domain/meetingParticipant';
import { MeetingRole } from '../domain/meetingRole';
import { CreateMeetingDTO } from '../domain/createMeeting.dto';
import { BroadcastDTO } from '../domain/broadcast.dto';

@Injectable()
class MeetingService {
  private readonly meetings: Map<string, Meeting> = new Map();
  private readonly sockets: Map<string, Socket> = new Map();

  private getMeeting(name: string) {
    const meeting = this.meetings.get(name);
    if (!meeting)
      throw new BadRequestException("Meeting with this id doesn't exists");
    return meeting;
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

  createMeeting(dto: CreateMeetingDTO, socket: Socket) {
    const meeting = this.meetings.get(dto.meetingName);
    if (meeting) throw new BadRequestException('Meeting with this name exists');
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
      dto.password,
    );
    this.meetings.set(dto.meetingName, newMeeting);
    this.connectParticipantToMeeting(meetingOwner, newMeeting, socket);
    return {
      participant: meetingOwner,
      jitsiName: newMeeting.jitsiName,
    };
  }

  joinMeeting(dto: JoinMeetingDTO, socket: Socket) {
    const meeting = this.getMeeting(dto.meetingName);
    if (dto.ownerId) {
      if (dto.ownerId !== meeting.owner.id)
        throw new BadRequestException('Invalid ownerId');

      this.connectParticipantToMeeting(meeting.owner, meeting, socket);
      return { participant: meeting.owner, jitsiName: meeting.jitsiName };
    }
    if (meeting.password && meeting.password !== dto.password)
      throw new UnauthorizedException('Invalid password');
    const participant = new MeetingParticipant(
      uuid(),
      MeetingRole.PARTICIPANT,
      dto.name,
      dto.email,
    );
    this.connectParticipantToMeeting(participant, meeting, socket);
    return { participant, jitsiName: meeting.jitsiName };
  }

  cleanupConnection(meeting: Meeting, participantId: string) {
    meeting.removeParticipantId(participantId);
    this.sockets.delete(participantId);
    if (meeting.empty()) {
      this.meetings.delete(meeting.name);
    }
  }

  broadcast(dto: BroadcastDTO) {
    const meeting = this.getMeeting(dto.meetingName);
    if (!meeting.containsParticipant(dto.participantId))
      throw new BadRequestException('Invalid participantId');
    const participant = meeting.participants.find(
      (x) => x.id === dto.participantId,
    );
    const participantIds = meeting.participants.map((x) => x.id);
    for (const id of participantIds) {
      const socket = this.sockets.get(id);
      if (socket && socket.connected) {
        socket.emit('broadcast', {
          from: participant.name,
          payload: dto.payload,
        });
      }
    }
  }
}

export { MeetingService };
