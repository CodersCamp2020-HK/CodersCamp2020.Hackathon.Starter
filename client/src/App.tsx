import { Toolbar, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000';
const baseApiUrl = isProductionEnv
  ? process.env.REACT_APP_PRODUCTION_API_URL ?? devApiUrl
  : devApiUrl;

interface IAppContext {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = React.createContext<IAppContext>(null!);

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [hamburger, setHamburger] = useState(false);

  useEffect(() => {
    matches && setHamburger(false);
  }, [matches]);

  return (
    <AppContext.Provider
      value={{ darkTheme, setDarkTheme, hamburger, setHamburger }}>
      <div className='App'>
        <Navbar />
        <Toolbar />
        Hello
      </div>
    </AppContext.Provider>
  );
}

export default App;
