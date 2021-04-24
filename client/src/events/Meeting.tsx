import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import socketIOClient from "socket.io-client";
import {
  BroadcastDTO,
  BroadcastRespDTO,
  JoinMeetingDTO,
  JoinMeetingRespDTO,
  CreateMeetingDTO,
} from "./Meeting.dto";
import { MeetingParticipant } from "./MeetingParticipant";
import { JitsiMeetExternalAPI } from "jitsi-meet";

type BroadcastHandler = (resp: BroadcastRespDTO) => void;

interface MeetingEventsProviderState {
  readonly emitCreateMeeting: (req: CreateMeetingDTO) => void;
  readonly emitJoinMeeting: (req: JoinMeetingDTO) => void;
  readonly emitJoinMeetingAsOwner: (
    req: JoinMeetingDTO & { ownerID: string }
  ) => void;
  readonly emitBroadcastMessage: (payload: string) => void;
  readonly jitsiName?: string;
  readonly participant?: MeetingParticipant;
  readonly jitsiApi?: JitsiMeetExternalAPI;
  readonly meetingName?: string;
  readonly setMeetingName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  readonly setJitsiApi: (api: JitsiMeetExternalAPI) => void;
  readonly reqisterToBroadcast: (fn: BroadcastHandler) => void;
  readonly unregisterFromBroadcast: (fn: BroadcastHandler) => void;
}

const MeetingEventsContext = React.createContext<
  MeetingEventsProviderState | undefined
>(undefined);

interface MeetingEventsProviderProps {
  endpoint: string;
}

const catchOmitErrors = (fn: () => void) => {
  try {
    fn();
  } catch (e) {
    console.error(e);
  }
};

function MeetingEventsProvider({
  children,
  endpoint,
}: React.PropsWithChildren<MeetingEventsProviderProps>) {
  const hooks = useMemo<BroadcastHandler[]>(() => [], []);
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );

  const [jitsiName, setJitsiName] = useState<string | undefined>(undefined);
  const [meetingName, setMeetingName] = useState<string | undefined>(undefined);
  const [participant, setParticipant] = useState<
    MeetingParticipant | undefined
  >(undefined);
  const [jitsiApi, setJitsiApi] = useState<JitsiMeetExternalAPI | undefined>(
    undefined
  );

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("connect", function () {
      console.log("Connected");
      setSocket(socket);
    });
    socket.on("exception", function (data: any) {
      console.log("exception", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
      setSocket(undefined);
    });

    socket.on("connected", function (resp: JoinMeetingRespDTO) {
      console.log("Recived [connected] ", resp);
      setParticipant(resp.participant);
      setJitsiName(resp.jitsiName);
    });

    socket.on("broadcast", function (resp: BroadcastRespDTO) {
      console.log("Recived [broadcast] ", resp);
      console.log(hooks);
      hooks.forEach((x) => catchOmitErrors(() => x(resp)));
    });

    return () => {
      socket.disconnect();
    };
  }, [endpoint, hooks]);

  const emitJoinMeeting = (req: JoinMeetingDTO) => {
    console.log("Send [joinMeeting]", req);
    socket?.emit("joinMeeting", req);
  };

  const emitJoinMeetingAsOwner = (req: JoinMeetingDTO) => {
    console.log("Send [joinMeeting]", req);
    socket?.emit("joinMeeting", req);
  };

  const emitCreateMeeting = (req: CreateMeetingDTO) => {
    console.log("Send [createMeeting]", req);
    socket?.emit("createMeeting", req);
  };

  const emitBroadcastMessage = (payload: string) => {
    if (!meetingName) {
      return console.log("Not participating in meeting");
    }
    if (!participant) {
      return console.log("Not participating in meeting");
    }
    const req: BroadcastDTO = {
      meetingName,
      participantId: participant?.id,
      payload,
    };
    console.log("Send [broadcast] ", req);
    socket?.emit("broadcast", req);
  };

  const reqisterToBroadcast = useCallback(
    (fn: BroadcastHandler) => {
      console.log("new elem");
      hooks.push(fn);
      console.log(hooks);
    },
    [hooks]
  );

  const unregisterFromBroadcast = useCallback(
    (fn: BroadcastHandler) => {
      const idx = hooks.findIndex((x) => x === fn);
      if (idx) hooks.splice(idx);
    },
    [hooks]
  );

  return (
    <MeetingEventsContext.Provider
      value={{
        emitJoinMeeting,
        emitJoinMeetingAsOwner,
        jitsiName,
        participant,
        jitsiApi,
        setJitsiApi,
        emitBroadcastMessage,
        setMeetingName,
        meetingName,
        reqisterToBroadcast,
        unregisterFromBroadcast,
        emitCreateMeeting,
      }}
    >
      {children}
    </MeetingEventsContext.Provider>
  );
}

function useMeetingEvents() {
  return (
    useContext(MeetingEventsContext) ??
    (() => {
      throw new Error(
        "useMeetingEvents must be used within a MeetingEventsProvider"
      );
    })()
  );
}

export { MeetingEventsProvider, useMeetingEvents };
export type { MeetingEventsProviderProps };
