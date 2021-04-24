import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

  createMeeting(dto: CreateMeetingDTO) {
    const meeting = this.meetings.get(dto.meetingName);
    if (meeting) throw new BadRequestException('Meeting with this name exists');
    const meetingOwner = new MeetingParticipant(
      uuid(),
      MeetingRole.OWNER,
      dto.name,
      dto.email,
    );
    const newMeeting = new Meeting(dto.meetingName, uuid(), meetingOwner, [
      meetingOwner,
    ]);
    this.meetings.set(dto.meetingName, newMeeting);
    return {
      ownerId: meetingOwner.id,
      meetingName: newMeeting.name,
    };
  }

  joinMeeting(dto: JoinMeetingDTO, socket: Socket) {
    const meeting = this.getMeeting(dto.meetingName);
    if (dto.ownerId) {
      if (dto.ownerId !== meeting.owner.id)
        throw new BadRequestException('Invalid ownerId');
      this.sockets.set(dto.ownerId, socket);
      return { participant: meeting.owner, jitsiName: meeting.jitsiName };
    }
    const participant = new MeetingParticipant(
      uuid(),
      MeetingRole.PARTICIPANT,
      dto.name,
      dto.email,
    );
    meeting.addParticipant(participant);
    this.sockets.set(participant.id, socket);
    return { participant, jitsiName: meeting.jitsiName };
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
      if (socket) {
        if (socket.connected) {
          socket.emit('broadcast', {
            from: participant.name,
            payload: dto.payload,
          });
        }
      }
    }
  }
}

export { MeetingService };
