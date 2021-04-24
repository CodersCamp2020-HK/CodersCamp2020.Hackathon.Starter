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
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const api = new JitsiMeetExternalAPI(domain, options);
      api.executeCommand("displayName", participant?.name);
      setJitsiApi(api);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jitsiName]);

  return <div id="meet"></div>;
}

export { JitsiFrame };
