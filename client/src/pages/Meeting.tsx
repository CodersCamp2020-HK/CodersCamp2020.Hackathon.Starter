import React from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import Actions from '../components/actions/Actions';
import Timer from '../components/common/timer/Timer';
import NotificationWrapper from '../components/notifications/NotificationWrapper';
import Chatbox, { SingleComment } from '../components/chatbox/Chatbox';
import { useMeetingEvents } from '../events/Meeting';
import EnterMeeting from '../components/enterMeeting/EnterMeeting';
import { JitsiFrame } from '../components/jitsi/JitsiFrame';
import ActionsParticipantWrapper from '../components/actions/ActionsParticipantWrapper';
import { Grid } from '@material-ui/core';

const comments: SingleComment[] = [
  {
    name: 'Mateusz',
    textMessage: 'Elo',
    time: '12:52',
  },
  {
    name: 'Mateusz',
    textMessage: 'EloELo',
    time: '12:53',
  },
  {
    name: 'Mateusz',
    textMessage: 'EloEloElo',
    time: '12:54',
  },
];

const Meeting = () => {
  const { path } = useRouteMatch();
  const { participant } = useMeetingEvents();

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        {!participant ? (
          <EnterMeeting />
        ) : participant.role === 'owner' ? (
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <JitsiFrame />
              <Timer timeInSeconds={120} />
              <Actions />
            </Grid>
            <Grid item xs={2}>
              <NotificationWrapper />
            </Grid>
            <Grid item xs={3}>
              <Chatbox comments={comments} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <JitsiFrame />
              <Timer timeInSeconds={120} />
              <ActionsParticipantWrapper />
            </Grid>
            <Grid item xs={2}>
              <NotificationWrapper />
            </Grid>
            <Grid item xs={3}>
              <Chatbox comments={comments} />
            </Grid>
          </Grid>
        )}
      </Route>
      <Redirect to={`/404/${path}`} />
    </Switch>
  );
};

export default Meeting;
