import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import About from '../about/About';
import AboutApp from '../aboutApp/AboutApp';

const drawerWidth = '40vw';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    buttonL: {
        rotate: '-90deg',
        width: '30vh',
        justify: 'center',
        position: 'fixed',
        top: '50vh',
        left: '-13vh',
        borderRadius: '0 0 15px 15px',
      },
    buttonR: {
        rotate: '90deg',
        width: '30vh',
        justify: 'center',
        position: 'fixed',
        top: '50vh',
        right: '-13vh',
        borderRadius: '0 0 15px 15px',
      },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader1: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerHeader2: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
      },
  }),
);

function PersistentDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [openLeft, setOpenLeft] = React.useState(false);
  const [openRight, setOpenRight] = React.useState(false);

  const handleDrawerOpenL = () => {
    setOpenLeft(true);
  };

  const handleDrawerCloseL = () => {
    setOpenLeft(false);
  };

  const handleDrawerOpenR = () => {
    setOpenRight(true);
  };

  const handleDrawerCloseR = () => {
    setOpenRight(false);
  };

  return (
    <div className={classes.root}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenL}
            edge="start"
            className={clsx(classes.menuButton, openLeft && classes.hide)}
          >
            <Button
                variant="contained"
                color="primary"
                className={classes.buttonL}
                endIcon={<ChevronRightIcon />}
            >
                About the app
            </Button>
          </IconButton>
        </Toolbar>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openLeft}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader1}>
          <IconButton onClick={handleDrawerCloseL}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <AboutApp />
        </Drawer>
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenR}
            edge="end"
            className={clsx(classes.menuButton, openRight && classes.hide)}
          >
             <Button
                variant="contained"
                color="primary"
                className={classes.buttonR}
                startIcon={<ChevronLeftIcon />}
            >
              About us
            </Button>
          </IconButton>
        </Toolbar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={openRight}
          classes={{
            paper: classes.drawerPaper,
          }}
      >
        <div className={classes.drawerHeader2}>
          <IconButton onClick={handleDrawerCloseR}>
            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <About />
        </Drawer>
    </div>
  );
}

export default PersistentDrawer;