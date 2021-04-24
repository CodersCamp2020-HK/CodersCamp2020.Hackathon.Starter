import React from 'react';
import { Button } from '@material-ui/core';
import { ReactComponent as Logo } from '../common/logo.svg';
import ThemeMode from './ThemeMode';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    display: 'flex',
  },
  freeSpace: {
    flex: 1,
  },
});

const Nav = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <Button>
        <Logo />
      </Button>
      <div className={classes.freeSpace}></div>
      <ThemeMode />
    </nav>
  );
};

export default Nav;
