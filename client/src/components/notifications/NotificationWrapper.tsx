import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notifications';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  notificationWrapper: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 15,
    color: theme.palette.primary.main,
    textAlign: 'center',
    maxHeight: 742,
  },
  title: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: 12,
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
      <Typography variant='body1' color='primary' className={classes.title}>
        Powiadomienia
      </Typography>
      {test.map((item) => (
        <Notification name={item.name} iconName={item.iconName as IconName} />
      ))}
    </div>
  );
};

export default NotificationWrapper;
