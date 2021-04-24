import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';

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
  name: {
    color: theme.palette.primary.main,
  },
  time: {
    color: theme.palette.primary.main,
  },
}));

type Iframe = 'yt' | 'music' | 'quiz' | 'cafe' | 'video';
interface Props {
  children: React.ReactNode;
  name: Iframe;
  time?: string;
}
const BtnWrapperIframe: React.FC<Props> = ({ children, name, time }) => {
  const classes = useStyles();
  const { setIframe } = useContext(AppContext);
  return (
    <div className={classes.btnWrapper}>
      <p className={classes.name}>{name}</p>
      <p className={classes.time}>{`${time} min`}</p>
      <IconButton
        className={classes.iconButton}
        onClick={() => setIframe(name)}>
        {children}
      </IconButton>
    </div>
  );
};

export default BtnWrapperIframe;
