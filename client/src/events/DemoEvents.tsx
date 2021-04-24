import React, { useEffect, useState } from "react";
import { useMeetingControllerCreateMeeting } from "../api";
import { JitsiFrame } from "../components/jitsi/JitsiFrame";
import { useMeetingEvents } from "./Meeting";
import { BroadcastRespDTO } from "./Meeting.dto";

function DemoEvents() {
  const [ownerId, setOwnerId] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<BroadcastRespDTO[]>([]);
  const { mutate } = useMeetingControllerCreateMeeting({});
  const {
    participant,
    emitJoinMeetingAsOwner,
    emitJoinMeeting,
    setMeetingName,
    reqisterToBroadcast,
    emitBroadcastMessage,
    unregisterFromBroadcast,
  } = useMeetingEvents();

  useEffect(() => {
    const fn = (resp: BroadcastRespDTO) => {
      console.log(resp);
      setMessages((prev) => [...prev, resp]);
    };
    reqisterToBroadcast(fn);
    return () => unregisterFromBroadcast(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMeetingName("name");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ownerId && !participant) {
      emitJoinMeetingAsOwner({
        email: "user@email.com",
        name: "My name",
        meetingName: "name",
        ownerId: ownerId,
      });
    }
  }, [ownerId, participant, emitJoinMeetingAsOwner]);

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
        mutate({
          meetingName: "name",
          email: "user@email.com",
          name: "My name",
        }).then((resp) => {
          setOwnerId(resp.ownerId);
        });
      }}
    >
      Create Meeting
    </button>
  );
}

export { DemoEvents };
