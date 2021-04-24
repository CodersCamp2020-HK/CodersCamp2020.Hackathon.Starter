import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

interface MeetingEventsProviderState {
  readonly emitMeetingEvents: () => void;
  readonly emitIdentity: () => void;
}

const MeetingEventsContext = React.createContext<
  MeetingEventsProviderState | undefined
>(undefined);

interface MeetingEventsProviderProps {
  endpoint: string;
}

function MeetingEventsProvider({
  children,
  endpoint,
}: React.PropsWithChildren<MeetingEventsProviderProps>) {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("connect", function () {
      console.log("Connected");
      setSocket(socket);
    });
    socket.on("Meetingevents2", function (data: any) {
      console.log("Meetingevents2", data);
    });
    socket.on("exception", function (data: any) {
      console.log("event", data);
    });
    socket.on("disconnect", function () {
      console.log("Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [endpoint]);

  const emitMeetingEvents = () => {
    socket?.emit(
      "joinMeeting",
      { name: "name", email: "email" },
      (data: any) => {
        console.log(data);
      }
    );
  };

  const emitIdentity = () => {
    socket?.emit("identity", (data: any) => {
      console.log(data);
    });
  };
  return (
    <MeetingEventsContext.Provider value={{ emitMeetingEvents, emitIdentity }}>
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
