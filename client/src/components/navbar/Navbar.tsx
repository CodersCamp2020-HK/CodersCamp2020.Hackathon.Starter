import React from 'react';
import { AppBar, Toolbar, Typography, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hamburger from './Hamburger';
import ThemeMode from './ThemeMode';
import NavbarList from './NavbarList';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  freeSpace: {
    width: '100%',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography>LOGO</Typography>
        <div className={classes.freeSpace}></div>
        <ThemeMode />
        <Hidden smUp>
          <Hamburger />
        </Hidden>
        <NavbarList />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
