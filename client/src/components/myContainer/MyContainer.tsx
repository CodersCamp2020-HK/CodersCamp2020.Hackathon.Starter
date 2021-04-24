import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
  },
}));

const MyContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default MyContainer;
