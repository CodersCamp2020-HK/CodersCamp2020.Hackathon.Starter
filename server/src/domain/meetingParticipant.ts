import { MeetingRole } from './meetingRole';

class MeetingParticipant {
  constructor(
    public readonly id: string,
    public role: MeetingRole,
    public name: string,
    public readonly email: string,
  ) {}
}

export { MeetingParticipant };
