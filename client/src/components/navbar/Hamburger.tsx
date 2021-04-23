import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { AppContext } from '../../App';

let transitionTime = '0.3s';

const hamburgerHeight = 24;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: `${hamburgerHeight}px`,
    width: `${hamburgerHeight}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: '4px',
    borderRadius: '6px',
    backgroundColor: theme.palette.primary.contrastText,
  },

  line1: {
    animation: `$line1 ${transitionTime} ease-in-out`,
    animationFillMode: 'forwards',
  },
  line1Active: {
    animation: `$line1Active ${transitionTime} ease-in-out`,
    animationFillMode: 'forwards',
  },
  '@keyframes line1': {
    '0%': {
      transform: `translateY(${
        hamburgerHeight / 2
      }px) translateY(-50%) rotate(-45deg)`,
    },
    '50%': {
      transform: `rotate(0deg) translateY(${
        hamburgerHeight / 2
      }px) translateY(-50%)`,
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },

  '@keyframes line1Active': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: `translateY(${hamburgerHeight / 2}px) translateY(-50%)`,
    },
    '100%': {
      transform: `translateY(${
        hamburgerHeight / 2
      }px) translateY(-50%) rotate(-45deg)`,
    },
  },

  line2: {
    transition: `all ${transitionTime} ease-in-out`,
  },
  line2Active: {
    backgroundColor: 'transparent',
    transition: `all ${transitionTime} ease-in-out`,
  },

  line3: {
    width: '100%',
    animation: `$line3 ${transitionTime} ease-in-out`,
    animationFillMode: 'forwards',
  },
  line3Active: {
    animation: `$line3Active ${transitionTime} ease-in-out`,
    animationFillMode: 'forwards',
  },
  '@keyframes line3': {
    '0%': {
      transform: `translateY(-${
        hamburgerHeight / 2
      }px) translateY(50%) rotate(45deg)`,
    },
    '50%': {
      transform: `rotate(0deg) translateY(-${
        hamburgerHeight / 2
      }px) translateY(50%)`,
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },

  '@keyframes line3Active': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: `translateY(-${hamburgerHeight / 2}px) translateY(50%)`,
    },
    '100%': {
      transform: `translateY(-${
        hamburgerHeight / 2
      }px) translateY(50%) rotate(45deg)`,
    },
  },
}));

const Hamburger = () => {
  const { hamburger, setHamburger } = useContext(AppContext);
  const [firstRender, setFirstRender] = useState(true);

  const classes = useStyles();

  useEffect(() => {}, []);

  const handleHamburger = () => {
    setFirstRender(false);
    setHamburger((prevState) => !prevState);
  };
  return (
    <IconButton onClick={handleHamburger}>
      <div className={classes.wrapper}>
        {firstRender ? (
          <>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
          </>
        ) : (
          <>
            <div
              className={`${classes.line} ${
                hamburger ? classes.line1Active : classes.line1
              }`}></div>
            <div
              className={`${classes.line} ${
                hamburger ? classes.line2Active : classes.line2
              }`}></div>
            <div
              className={`${classes.line} ${
                hamburger ? classes.line3Active : classes.line3
              }`}></div>
          </>
        )}
      </div>
    </IconButton>
  );
};

export default Hamburger;
