import { MeetingRole } from './meetingRole';

class MeetingParticipant {
  constructor(
    public readonly id: string,
    public role: MeetingRole,
    public name: string,
    public email?: string,
  ) {}
}

export { MeetingParticipant };
