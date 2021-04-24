import { Toolbar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { RestfulProvider } from 'restful-react';
import { ThemeProvider } from '@material-ui/core/styles';
import { DarkTheme } from './themes/DarkTheme';
import { LightTheme } from './themes/LightTheme';
import { EventsProvider, useEvents } from './events/Events';

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000';
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

const StorageThemeKey = 'darkTheme';

function DemoEvents() {
  const { emitEvents } = useEvents();
  return (
    <button
      onClick={() => {
        emitEvents();
      }}>
      Click
    </button>
  );
}

function App() {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'PickAnAppropriateMeetingNameHere',
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet'),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const api = new JitsiMeetExternalAPI(domain, options);
  }, []);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem(StorageThemeKey) ? true : false;
  });
  const [hamburger, setHamburger] = useState(false);

  const toggleTheme = () => {
    if (darkTheme) {
      localStorage.removeItem(StorageThemeKey);
    } else {
      localStorage.setItem(StorageThemeKey, '1');
    }
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    matches && setHamburger(false);
  }, [matches]);

  return (
    <EventsProvider endpoint={baseApiUrl}>
      <RestfulProvider base={baseApiUrl}>
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
          <AppContext.Provider
            value={{ darkTheme, toggleTheme, hamburger, setHamburger }}>
            <div className='App'>
              <Navbar />
              <Toolbar />
              <span id='meet'></span>
              Hello
              <DemoEvents />
            </div>
          </AppContext.Provider>
        </ThemeProvider>
      </RestfulProvider>
    </EventsProvider>
  );
}

export default App;
