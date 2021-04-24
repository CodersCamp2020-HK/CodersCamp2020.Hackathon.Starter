import { InformationNotification } from "./InformEvents";
import { MeetingParticipant } from "./MeetingParticipant";
import { TimeEvent } from "./TimeEvents";

interface InitialSate {
    informationNotifications: InformationNotification[];
    currentTimeEvent?: TimeEvent["type"];
}
interface JoinMeetingDTO {
    meetingName: string;
    name: string;
    email?: string;
    password?: string;
    ownerId?: string;
}

interface JoinMeetingRespDTO {
    meetingName: string;
    participant: MeetingParticipant;
    jitsiName: string;
    initialState?: InitialSate;
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
    name: string;
    password?: string;
    email?: string;
}

interface WsMeetingException {
    code: number,
    message: string;
}

export type { CreateMeetingDTO, JoinMeetingDTO, JoinMeetingRespDTO, BroadcastDTO, BroadcastRespDTO, WsMeetingException, InitialSate };
