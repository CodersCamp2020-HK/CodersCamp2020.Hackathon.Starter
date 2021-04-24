import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { RestfulProvider } from 'restful-react';
import { ThemeProvider } from '@material-ui/core/styles';
import { DarkTheme } from './themes/DarkTheme';
import { LightTheme } from './themes/LightTheme';
import { MeetingEventsProvider } from './events/Meeting';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Unauth from './pages/Unauth';
import NotFound from './pages/404';
import Meeting from './pages/Meeting';
import { Container, makeStyles } from '@material-ui/core';
import Nav from './components/nav/Nav';
import MyContainer from './components/myContainer/MyContainer';

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
  iframe: Iframe;
  setIframe: React.Dispatch<React.SetStateAction<Iframe>>;
}

export const AppContext = React.createContext<IAppContext>(null!);

const StorageThemeKey = 'darkTheme';

type Iframe = 'yt' | 'music' | 'quiz' | 'cafe' | 'video';
const useStyles = makeStyles(() => ({
  // basic: {
  //   height: '100vh',
  // },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem(StorageThemeKey) ? true : false;
  });
  const [iframe, setIframe] = useState<Iframe>('video');
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
    <MeetingEventsProvider endpoint={baseApiUrl}>
      <RestfulProvider base={baseApiUrl}>
        <ThemeProvider theme={darkTheme ? DarkTheme : LightTheme}>
          <AppContext.Provider
            value={{
              darkTheme,
              toggleTheme,
              hamburger,
              setHamburger,
              iframe,
              setIframe,
            }}>
            <MyContainer>
              <>
                <Nav />
                <Container maxWidth='lg'>
                  <Router>
                    <Switch>
                      <Route path='/unauth'>
                        <Unauth />
                      </Route>
                      <Route path='/meetings'>
                        <Meeting />
                      </Route>
                      <Route exact path='/'>
                        <Home />
                      </Route>
                      <Route path='*'>
                        <NotFound />
                      </Route>
                    </Switch>
                  </Router>
                </Container>
              </>
            </MyContainer>
          </AppContext.Provider>
        </ThemeProvider>
      </RestfulProvider>
    </MeetingEventsProvider>
  );
}

export default App;
