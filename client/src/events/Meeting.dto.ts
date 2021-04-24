import { MeetingParticipant } from "./MeetingParticipant";

interface JoinMeetingDTO {
    meetingName: string;
    name: string;
    email: string;
    ownerId?: string;
}

interface JoinMeetingRespDTO {
    participant: MeetingParticipant;
    jitsiName: string;
}

interface BroadcastDTO {
    meetingName: string;
    participantId: string;
    payload: string;
}

interface BroadcastRespDTO {
    from: string;
    payload: string;
}

interface CreateMeetingDTO {
    meetingName: string;
    password?: string;
    name: string;
    email: string;
}

export type { CreateMeetingDTO, JoinMeetingDTO, JoinMeetingRespDTO, BroadcastDTO, BroadcastRespDTO };
