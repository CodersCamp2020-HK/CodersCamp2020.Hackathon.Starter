import { useEffect } from "react";
import { useMeetingEvents } from "../../events/Meeting";

function JitsiFrame() {
  const { participant, jitsiName, setJitsiApi } = useMeetingEvents();
  useEffect(() => {
    if (jitsiName) {
      const domain = "meet.jit.si";
      const options = {
        roomName: jitsiName,
        width: "100%",
        height: 700,
        parentNode: document.querySelector("#meet"),
        configOverwrite: {
          prejoinPageEnabled: false,
          toolbarButtons: [],
        },
        userInfo: {
          displayName: participant?.name,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const api = new JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jitsiName, participant]);

  return <div id="meet"></div>;
}

export { JitsiFrame };
