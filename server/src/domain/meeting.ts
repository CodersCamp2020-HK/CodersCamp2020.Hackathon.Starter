import { MeetingParticipant } from './meetingParticipant';
import { MeetingState } from './meetingState';

class Meeting {
  removeParticipantId(participantId: string) {
    const idx = this.participants.findIndex((x) => x.id === participantId);
    this.participants.splice(idx);
  }

  empty(): boolean {
    return this.participants.length === 0;
  }
  constructor(
    public readonly name: string,
    public readonly jitsiName: string,
    public readonly owner: MeetingParticipant,
    public participants: MeetingParticipant[],
    public meetingState: MeetingState,
    public password?: string,
  ) {}

  addParticipant(participant: MeetingParticipant) {
    this.participants.push(participant);
  }

  containsParticipant(id: string): boolean {
    return this.participants.find((x) => x.id === id) !== undefined;
  }

  participantsWithout(id: string) {
    return this.participants.filter((x) => x.id !== id).map((x) => x.id);
  }
}

export { Meeting };
