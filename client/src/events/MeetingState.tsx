import React, { useContext, useEffect, useState } from "react";
import { InformationNotification } from "./InformEvents";
import { useMeetingEvents } from "./Meeting";

interface Note {
  time: Date;
  description: string;
}

interface MeetingStateProviderState {
  readonly informationNotifications: InformationNotification[];
  readonly emitInformationNotification: (req: InformationNotification) => void;
  readonly notes: Note[];
  readonly addNote: (note: Note) => void;
  readonly editNote: (note: Note, desc: string) => void;
  readonly removeNote: (note: Note) => void;
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

  const [notes, setNotes] = useState<Note[]>([]);

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

  const addNote = (note: Note) => {
    setNotes((prev) => [...prev, note]);
  };

  const editNote = (note: Note, desc: string) => {
    setNotes((prev) => {
      const idx = prev.findIndex((x) => x === note);
      if (idx !== -1) prev[idx] = { time: new Date(), description: desc };
      return prev;
    });
  };

  const removeNote = (note: Note) => {
    setNotes((prev) => prev.filter((x) => x !== note));
  };

  return (
    <MeetingStateContext.Provider
      value={{
        informationNotifications,
        emitInformationNotification,
        notes,
        addNote,
        editNote,
        removeNote,
      }}
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
