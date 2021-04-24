import { Toolbar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { RestfulProvider } from "restful-react";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkTheme } from "./themes/DarkTheme";
import { LightTheme } from "./themes/LightTheme";
import Particles from "react-tsparticles";

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
            <Particles
      options={{
        backgroundMode: {
          enable: true,
          zIndex: 0
        },
        particles: {
          number: {
            value: 200,
            limit: 300,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            },
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.5,
              sync: false
            }
          },
          size: {
            value: 30,
            random: true,
            anim: {
              enable: true,
              speed: 10,
              size_min: 10,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: false,
                force: 60,
                smooth: 10
              }
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              lineLinked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 100,
              duration: 2,
              opacity: 1,
            },
            repulse: {
              distance: 200
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        backgroundMask: {
          enable: true,
          cover: {
            color: {
              value: {
                r: 0,
                g: 0,
                b: 0,
              },
            },
            opacity: 1,
          }
        },
        retina_detect: true,
        fps_limit: 60,
      }
    }
    />
          </div>
        </AppContext.Provider>
      </ThemeProvider>
    </RestfulProvider>
  );
}

export default App;
