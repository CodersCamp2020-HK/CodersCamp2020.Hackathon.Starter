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
  WsMeetingException,
} from "./Meeting.dto";
import { MeetingParticipant } from "./MeetingParticipant";
import { JitsiMeetExternalAPI } from "jitsi-meet";

type BroadcastHandler = (resp: BroadcastRespDTO) => void;
type ExceptionHandler = (error: WsMeetingException) => void;

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
  readonly registerToException: (fn: ExceptionHandler) => void;
  readonly unregisterFromException: (fn: ExceptionHandler) => void;
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
  const broadcastHooks = useMemo<BroadcastHandler[]>(() => [], []);
  const errorHooks = useMemo<ExceptionHandler[]>(() => [], []);
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
      errorHooks.forEach((x) => catchOmitErrors(() => x(data)));
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
      setSocket(undefined);
    });

    socket.on("connected", function (resp: JoinMeetingRespDTO) {
      console.log("Recived [connected] ", resp);
      setMeetingName(resp.meetingName);
      setParticipant(resp.participant);
      setJitsiName(resp.jitsiName);
    });

    socket.on("broadcast", function (resp: BroadcastRespDTO) {
      console.log("Recived [broadcast] ", resp);
      broadcastHooks.forEach((x) => catchOmitErrors(() => x(resp)));
    });

    return () => {
      socket.disconnect();
    };
  }, [endpoint, broadcastHooks, errorHooks]);

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
      broadcastHooks.push(fn);
    },
    [broadcastHooks]
  );

  const unregisterFromBroadcast = useCallback(
    (fn: BroadcastHandler) => {
      const idx = broadcastHooks.findIndex((x) => x === fn);
      if (idx) broadcastHooks.splice(idx);
    },
    [broadcastHooks]
  );

  const registerToException = useCallback(
    (fn: ExceptionHandler) => {
      errorHooks.push(fn);
    },
    [errorHooks]
  );
  const unregisterFromException = useCallback(
    (fn: ExceptionHandler) => {
      const idx = errorHooks.findIndex((x) => x === fn);
      if (idx) errorHooks.splice(idx);
    },
    [errorHooks]
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
        registerToException,
        unregisterFromException,
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
