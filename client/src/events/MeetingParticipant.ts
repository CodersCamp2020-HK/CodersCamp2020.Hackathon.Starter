enum MeetingRole {
    PARTICIPANT = 'participant',
    OWNER = 'owner',
}

interface MeetingParticipant {
    readonly id: string;
    role: MeetingRole;
    name: string;
    readonly email: string;
}

export type { MeetingParticipant, MeetingRole };
