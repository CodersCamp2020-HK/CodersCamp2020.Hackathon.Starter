import React, { useContext, useEffect, useState } from "react";
import { InformationNotification } from "./InformEvents";
import { useMeetingEvents } from "./Meeting";
import { TimeEvent } from "./TimeEvents";

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
  readonly currentTimeEvent?: TimeEvent["type"];
  readonly emitTimeEvent: (req: TimeEvent) => void;
}

const MeetingStateContext = React.createContext<
  MeetingStateProviderState | undefined
>(undefined);

function MeetingStateProvider({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const { socket, initialState } = useMeetingEvents();
  const [informationNotifications, setInformationNotifications] = useState<
    InformationNotification[]
  >(initialState?.informationNotifications ?? []);

  const [notes, setNotes] = useState<Note[]>([]);
  const [currentTimeEvent, setCurrentTimeEvent] = useState<
    TimeEvent["type"] | undefined
  >(initialState?.currentTimeEvent);

  useEffect(() => {
    const onInformationNotification = (resp: InformationNotification) => {
      console.log("[onInformationNotification]", resp);
      setInformationNotifications((prev) => [...prev, resp]);
    };

    const onTimeEventStart = (resp: TimeEvent) => {
      console.log("[onTimeEventStart]", resp);
      setCurrentTimeEvent(resp.type);
    };

    const onTimeEventEnd = () => {
      console.log("[onTimeEventEnd]");
      setCurrentTimeEvent(undefined);
    };

    socket?.on("on_information_event", onInformationNotification);
    socket?.on("on_start_time_event", onTimeEventStart);
    socket?.on("on_end_time_event", onTimeEventEnd);

    return () => {
      socket?.off("on_information_event", onInformationNotification);
      socket?.off("on_start_time_event", onTimeEventStart);
      socket?.off("on_end_time_event", onTimeEventEnd);
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
      if (idx !== -1) prev[idx] = { time: note.time, description: desc };
      return prev;
    });
  };

  const removeNote = (note: Note) => {
    setNotes((prev) => prev.filter((x) => x !== note));
  };

  const emitTimeEvent = (data: TimeEvent) => {
    if (!currentTimeEvent) socket?.emit("time_event", data);
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
        currentTimeEvent,
        emitTimeEvent,
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
