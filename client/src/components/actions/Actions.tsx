import React from 'react';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BtnWrapper from './BtnWrapperIframe';

const useStyles = makeStyles((theme: Theme) => ({
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 20,
    borderRadius: 15,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const Actions = () => {
  const classes = useStyles();
  return (
    <div className={classes.action}>
      <BtnWrapper name='cafe' time='10'>
        <LocalCafeIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='yt' time='10'>
        <FitnessCenterIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='quiz' time='10'>
        <AssignmentTurnedInIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='music' time='10'>
        <MusicNoteIcon className={classes.icon} />
      </BtnWrapper>
    </div>
  );
};

export default Actions;
