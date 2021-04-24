import { useEffect } from "react";
import { useMeetingEvents } from "../../events/Meeting";

function JitsiFrame() {
  const { jitsiName, setJitsiApi } = useMeetingEvents();
  useEffect(() => {
    if (jitsiName) {
      const domain = "meet.jit.si";
      const options = {
        roomName: jitsiName,
        width: 400,
        height: 400,
        parentNode: document.querySelector("#meet"),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setJitsiApi(new JitsiMeetExternalAPI(domain, options));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jitsiName]);

  return <div id="meet"></div>;
}

export { JitsiFrame };
