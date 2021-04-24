import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IconButton } from '@material-ui/core';

const Nav = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton aria-label='delete'>
          <SvgIcon></SvgIcon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
