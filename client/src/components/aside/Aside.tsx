import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StarIcon from '@material-ui/icons/Star';
import InfoIcon from '@material-ui/icons/Info';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
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
            <StarIcon />
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
        </Drawer>
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpenR}
            edge="end"
            className={clsx(classes.menuButton, openRight && classes.hide)}
          >
            <InfoIcon />
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
        </Drawer>
    </div>
  );
}

export default PersistentDrawer;