import React from 'react';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import { makeStyles } from '@material-ui/core/styles';
import BtnWrapper from './BtnWrapper';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CachedIcon from '@material-ui/icons/Cached';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

const useStyles = makeStyles((theme) => ({
  action: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItem: 'center',
  },
  icon: {
    color: theme.palette.secondary.main,
    margin: '0.1rem',
  },
}));

const ActionsParticipant = () => {
  const classes = useStyles();
  return (
    <div className={classes.action}>
      <BtnWrapper name='Abreak'>
        <LocalCafeIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name="I don't understand :( ">
        <LiveHelpIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='Change the topic'>
        <CachedIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='Make sense'>
        <ThumbUpAltIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name="I don't agree">
        <ThumbDownAltIcon className={classes.icon} />
      </BtnWrapper>
    </div>
  );
};

export default ActionsParticipant;
