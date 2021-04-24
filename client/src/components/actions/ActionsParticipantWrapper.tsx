import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ActionParticipant from './ActionParticipant';

const useStyles = makeStyles((theme) => ({
  actionParticipantWrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 15,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    display: 'flex',
    padding: '10px',
  },
  title: {
    borderRight: `1px solid ${theme.palette.secondary.main}`,
    alignSelf: 'center',
  },
}));

const ActionsParticipantWrapper = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.actionParticipantWrapper}>
        <div className={classes.title}>What would you like to do?</div>
            <ActionParticipant />
      </div>
    );
  };
  
  export default ActionsParticipantWrapper;
  