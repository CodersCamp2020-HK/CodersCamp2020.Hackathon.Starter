import React, { useContext } from "react";
import { AppContext } from "../../App";
import IconButton from "@material-ui/core/IconButton";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconButtion: {
    // color: theme.palette.primary.contrastText,
  },
}));

const ThemeMode = () => {
  const classes = useStyles();
  const { darkTheme, toggleTheme } = useContext(AppContext);

  return (
    <IconButton className={classes.iconButtion} onClick={() => toggleTheme()}>
      {darkTheme ? <WbSunnyIcon /> : <Brightness3Icon />}
    </IconButton>
  );
};

export default ThemeMode;
