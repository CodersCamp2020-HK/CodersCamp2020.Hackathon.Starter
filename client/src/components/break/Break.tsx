import { makeStyles } from '@material-ui/core';
import React from 'react'
import png from './backgroundimg.jpg'

const useStyles = makeStyles({
    root: {
      zIndex: 100,
      position: 'absolute',
      top: 0,
      left: 0,
      width: 727,
      height: 709,
      backgroundImage: `url(${png})`,
      backgroundSize: 'cover'
    },
  });

const Break = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} />
    );
}

export default Break
