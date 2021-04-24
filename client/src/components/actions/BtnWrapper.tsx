import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  iconButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
}));

interface Props {
  children: React.ReactNode;
  name: string;
  time?: string;
}
const BtnWrapper: React.FC<Props> = ({ children, name, time }) => {
  const classes = useStyles();
  return (
    <div className={classes.btnWrapper}>
      <p>{name}</p>
      <p>{`${time} min`}</p>
      <IconButton
        className={classes.iconButton}
        onClick={() => console.log('kawa')}>
        {children}
      </IconButton>
    </div>
  );
};

export default BtnWrapper;
