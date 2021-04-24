import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CachedIcon from '@material-ui/icons/Cached';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  notification: {},
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
      <div>{`${date.getHours()}:${date.getMinutes()}`}</div>
      <div>{name}</div>
      {iconName === 'Cafe' && (
        <SvgIcon fontSize='large'>
          <LocalCafeIcon />
        </SvgIcon>
      )}
      {iconName === 'Fitness' && (
        <SvgIcon fontSize='large'>
          <FitnessCenterIcon />
        </SvgIcon>
      )}
      {iconName === 'Quiz' && (
        <SvgIcon fontSize='large'>
          <AssignmentTurnedInIcon />
        </SvgIcon>
      )}
      {iconName === 'Music' && (
        <SvgIcon fontSize='large'>
          <MusicNoteIcon />
        </SvgIcon>
      )}
      {iconName === 'Meme' && (
        <SvgIcon fontSize='large'>
          <AddCircleIcon />
        </SvgIcon>
      )}
      {iconName === 'Topic' && (
        <SvgIcon fontSize='large'>
          <CachedIcon />
        </SvgIcon>
      )}
      {iconName === 'Idk' && (
        <SvgIcon fontSize='large'>
          <LiveHelpIcon />
        </SvgIcon>
      )}
    </div>
  );
};

export default Notifications;
