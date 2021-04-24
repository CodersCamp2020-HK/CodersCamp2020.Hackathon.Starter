import React, { useState, useEffect } from "react";
import "./App.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { RestfulProvider } from "restful-react";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkTheme } from "./themes/DarkTheme";
import { LightTheme } from "./themes/LightTheme";
import { MeetingEventsProvider } from "./events/Meeting";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Unauth from "./pages/Unauth";
import NotFound from "./pages/404";
import Meeting from "./pages/Meeting";
import { DemoEvents } from "./events/DemoEvents";

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
    <MeetingEventsProvider endpoint={baseApiUrl}>
      <RestfulProvider base={baseApiUrl}>
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
          <AppContext.Provider
            value={{ darkTheme, toggleTheme, hamburger, setHamburger }}
          >
            <Router>
              <Switch>
                <Route path="/unauth">
                  <Unauth />
                </Route>
                <Route path="/meeting">
                  <Meeting />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
              <DemoEvents />
            </Router>
          </AppContext.Provider>
        </ThemeProvider>
      </RestfulProvider>
    </MeetingEventsProvider>
  );
}

export default App;
