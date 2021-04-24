import React, { useEffect, useState } from "react";
import { JitsiFrame } from "../components/jitsi/JitsiFrame";
import { useMeetingEvents } from "./Meeting";
import { BroadcastRespDTO } from "./Meeting.dto";

function DemoEvents() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<BroadcastRespDTO[]>([]);
  const {
    participant,
    emitJoinMeeting,
    setMeetingName,
    reqisterToBroadcast,
    emitBroadcastMessage,
    unregisterFromBroadcast,
    emitCreateMeeting,
  } = useMeetingEvents();

  useEffect(() => {
    const fn = (resp: BroadcastRespDTO) => {
      console.log("DEMOEVENT", resp);
      setMessages((prev) => [...prev, resp]);
    };
    reqisterToBroadcast(fn);
    console.log("Registered To broadcast");
    return () => unregisterFromBroadcast(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMeetingName("name");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!participant && window.location.href.match(/meetings\/name/)) {
      emitJoinMeeting({
        email: "user2@email.com",
        name: "Second name",
        meetingName: "name",
      });
    }
  }, [participant, emitJoinMeeting]);

  return participant ? (
    <>
      <JitsiFrame />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button
        onClick={() => {
          emitBroadcastMessage(message);
          setMessage("");
        }}
      >
        {" "}
        Send{" "}
      </button>
      {messages.map((x, idx) => (
        <div key={idx}>
          <p>{x.from}</p>
          <span>{x.payload}</span>
        </div>
      ))}
    </>
  ) : (
    <button
      onClick={() => {
        emitCreateMeeting({
          meetingName: "name",
          email: "user@email.com",
          name: "My name",
        });
      }}
    >
      Create Meeting
    </button>
  );
}

export { DemoEvents };
