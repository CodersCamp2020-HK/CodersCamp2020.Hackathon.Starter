import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

interface EventsProviderState {
  readonly emitEvents: () => void;
  readonly emitIdentity: () => void;
}

const EventsContext = React.createContext<EventsProviderState | undefined>(
  undefined
);

interface EventsProviderProps {
  endpoint: string;
}

function EventsProvider({
  children,
  endpoint,
}: React.PropsWithChildren<EventsProviderProps>) {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("connect", function () {
      console.log("Connected");
      setSocket(socket);
    });
    socket.on("events2", function (data: any) {
      console.log("events2", data);
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

  const emitEvents = () => {
    socket?.emit(
      "events",
      JSON.stringify({ eventData: "data" }),
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
    <EventsContext.Provider value={{ emitEvents, emitIdentity }}>
      {children}
    </EventsContext.Provider>
  );
}

function useEvents() {
  return (
    useContext(EventsContext) ??
    (() => {
      throw new Error("useEvents must be used within a EventsProvider");
    })()
  );
}

export { EventsProvider, useEvents };
export type { EventsProviderProps };
