import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notifications';

const useStyles = makeStyles((theme) => ({
  notificationWrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 15,
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  title: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

const test = [
  {
    name: 'Mateusz',
    iconName: 'Cafe',
  },
  {
    name: 'Ania',
    iconName: 'Fitness',
  },
];

type IconName =
  | 'Cafe'
  | 'Fitness'
  | 'Quiz'
  | 'Music'
  | 'Meme'
  | 'Topic'
  | 'Idk';

const NotificationWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.notificationWrapper}>
      <div className={classes.title}>Powiadomienia</div>
      {test.map((item) => (
        <Notification name={item.name} iconName={item.iconName as IconName} />
      ))}
    </div>
  );
};

export default NotificationWrapper;
