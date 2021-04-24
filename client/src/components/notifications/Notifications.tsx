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
    fontSize: 80,
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
    padding: 10,
  },
  name: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  time: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  notification: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  miniWraper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {},
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
          <LocalCafeIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Fitness' && (
        <SvgIcon className={classes.svgIcon}>
          <FitnessCenterIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Quiz' && (
        <SvgIcon className={classes.svgIcon}>
          <AssignmentTurnedInIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Music' && (
        <SvgIcon className={classes.svgIcon}>
          <MusicNoteIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Meme' && (
        <SvgIcon className={classes.svgIcon}>
          <AddCircleIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Topic' && (
        <SvgIcon className={classes.svgIcon}>
          <CachedIcon color='secondary' />
        </SvgIcon>
      )}
      {iconName === 'Idk' && (
        <SvgIcon className={classes.svgIcon}>
          <LiveHelpIcon color='secondary' />
        </SvgIcon>
      )}
      <div className={classes.miniWraper}>
        <div
          className={
            classes.time
          }>{`${date.getHours()}:${date.getMinutes()}`}</div>
        <div className={classes.name}>{name}</div>
      </div>
    </div>
  );
};

export default Notifications;
