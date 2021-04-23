import React from 'react';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { makeStyles } from '@material-ui/core/styles';
import BtnWrapper from './BtnWrapper';

const useStyles = makeStyles((theme) => ({
  action: {
    display: 'flex',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

const Actions = () => {
  const classes = useStyles();
  return (
    <div className={classes.action}>
      <BtnWrapper name='Przerwa na kawe' time='10'>
        <LocalCafeIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='Ćwiczenia' time='10'>
        <FitnessCenterIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='Przerwa na kawe' time='10'>
        <AssignmentTurnedInIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name='Przerwa na kawe' time='10'>
        <MusicNoteIcon className={classes.icon} />
      </BtnWrapper>
    </div>
  );
};

export default Actions;
