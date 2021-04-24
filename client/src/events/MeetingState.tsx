import React, { useContext, useEffect, useState } from "react";
import { InformationNotification } from "./InformEvents";
import { useMeetingEvents } from "./Meeting";

interface MeetingStateProviderState {
  readonly informationNotifications: InformationNotification[];
  readonly emitInformationNotification: (req: InformationNotification) => void;
}

const MeetingStateContext = React.createContext<
  MeetingStateProviderState | undefined
>(undefined);

function MeetingStateProvider({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const { socket } = useMeetingEvents();
  const [informationNotifications, setInformationNotifications] = useState<
    InformationNotification[]
  >([]);
  useEffect(() => {
    const onInformationNotification = (resp: InformationNotification) => {
      console.log("[onInformationNotification]", resp);
      setInformationNotifications((prev) => [...prev, resp]);
    };
    socket?.on("on_information_event", onInformationNotification);
    return () => {
      socket?.off("on_information_event", onInformationNotification);
    };
  }, [socket]);

  const emitInformationNotification = (req: InformationNotification) => {
    socket?.emit("information_event", req);
  };

  return (
    <MeetingStateContext.Provider
      value={{ informationNotifications, emitInformationNotification }}
    >
      {children}
    </MeetingStateContext.Provider>
  );
}

function useMeetingState() {
  return (
    useContext(MeetingStateContext) ??
    (() => {
      throw new Error(
        "useMeetingState must be used within a MeetingStateProvider"
      );
    })()
  );
}

export { MeetingStateProvider, useMeetingState };
