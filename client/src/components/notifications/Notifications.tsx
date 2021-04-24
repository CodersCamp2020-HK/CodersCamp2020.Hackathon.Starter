import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CachedIcon from '@material-ui/icons/Cached';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme: Theme) => ({
  svgIcon: {
    fontSize: 60,
    width: '100%',
  },
  name: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
  },
  time: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
  },
  notification: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
}));

type IconName =
  | 'Cafe'
  | 'Fitness'
  | 'Quiz'
  | 'Music'
  | 'Meme'
  | 'Topic'
  | 'Idk';

interface Props {
  name: string;
  iconName: IconName;
}

const Notifications: React.FC<Props> = ({ name, iconName }) => {
  const classes = useStyles();
  const date = new Date();

  return (
    <div className={classes.notification}>
      {iconName === 'Cafe' && (
        <SvgIcon className={classes.svgIcon}>
          <LocalCafeIcon />
        </SvgIcon>
      )}
      {iconName === 'Fitness' && (
        <SvgIcon className={classes.svgIcon}>
          <FitnessCenterIcon />
        </SvgIcon>
      )}
      {iconName === 'Quiz' && (
        <SvgIcon className={classes.svgIcon}>
          <AssignmentTurnedInIcon />
        </SvgIcon>
      )}
      {iconName === 'Music' && (
        <SvgIcon className={classes.svgIcon}>
          <MusicNoteIcon />
        </SvgIcon>
      )}
      {iconName === 'Meme' && (
        <SvgIcon className={classes.svgIcon}>
          <AddCircleIcon />
        </SvgIcon>
      )}
      {iconName === 'Topic' && (
        <SvgIcon className={classes.svgIcon}>
          <CachedIcon />
        </SvgIcon>
      )}
      {iconName === 'Idk' && (
        <SvgIcon className={classes.svgIcon}>
          <LiveHelpIcon />
        </SvgIcon>
      )}

      <div
        className={
          classes.time
        }>{`${date.getHours()}:${date.getMinutes()}`}</div>
      <div className={classes.name}>{name}</div>
    </div>
  );
};

export default Notifications;
