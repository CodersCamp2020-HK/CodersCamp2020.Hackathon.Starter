import { Toolbar } from "@material-ui/core";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Jitsi from "jitsi-meet";
import React, { useEffect, useState } from "react";
import { RestfulProvider } from "restful-react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { DarkTheme } from "./themes/DarkTheme";
import { LightTheme } from "./themes/LightTheme";

const isProductionEnv = process.env.NODE_ENV === "production";
const devApiUrl = "http://localhost:8000";
const baseApiUrl = isProductionEnv
  ? process.env.REACT_APP_PRODUCTION_API_URL ?? devApiUrl
  : devApiUrl;

interface IAppContext {
  darkTheme: boolean;
  toggleTheme: () => void;
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>(null!);

const StorageThemeKey = "darkTheme";

function App() {
  const [apiState, setApi] = useState<Jitsi.JitsiMeetExternalAPI>(null!);
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "PickAnAppropriateMeetingNameHere",
      width: 700,
      height: 700,
      parentNode: document.querySelector("#meet"),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const api = new JitsiMeetExternalAPI(domain, options);
    setApi(api);
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem(StorageThemeKey) ? true : false;
  });
  const [hamburger, setHamburger] = useState(false);

  const toggleTheme = () => {
    if (darkTheme) {
      localStorage.removeItem(StorageThemeKey);
    } else {
      localStorage.setItem(StorageThemeKey, "1");
    }
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    matches && setHamburger(false);
  }, [matches]);

  return (
    <RestfulProvider base={baseApiUrl}>
      <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
        <AppContext.Provider
          value={{ darkTheme, toggleTheme, hamburger, setHamburger }}
        >
          <div className="App">
            <Navbar />
            <Toolbar />
            <span id="meet"></span>
            Hello
            <button
              onClick={() => console.log(apiState?.getParticipantsInfo())}
            >
              Participants
            </button>
            <button onClick={() => apiState.executeCommand("hangup")}>
              Hangup
            </button>
            <button
              onClick={() => {
                // @ts-ignore
                apiState.addListener("participantLeft", (person: {id: string;}) => {
                  console.log(person.id);
                });
              }}
            >
              Add Listener Participant Left
            </button>
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </RestfulProvider>
  );
}

export default App;
