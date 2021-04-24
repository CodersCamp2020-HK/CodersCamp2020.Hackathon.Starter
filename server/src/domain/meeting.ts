import { MeetingParticipant } from './meetingParticipant';

class Meeting {
  constructor(
    public readonly name: string,
    public readonly jitsiName: string,
    public readonly owner: MeetingParticipant,
    public participants: MeetingParticipant[],
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
