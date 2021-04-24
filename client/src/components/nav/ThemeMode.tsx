import React, { useContext } from 'react';
import { AppContext } from '../../App';
import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const ThemeMode = () => {
  const { darkTheme, toggleTheme } = useContext(AppContext);

  return (
    <IconButton onClick={() => toggleTheme()}>
      {darkTheme ? <WbSunnyIcon /> : <Brightness3Icon />}
    </IconButton>
  );
};

export default ThemeMode;
