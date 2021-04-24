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


export type { JoinMeetingDTO, JoinMeetingRespDTO, BroadcastDTO, BroadcastRespDTO };
