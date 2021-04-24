import React, { useContext } from 'react';
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
import Chodakowska from '../components/chodakowska/Chodakowska';
import { AppContext } from '../App';
import Chess from '../components/chess/Chess';
import { MeetingStateProvider } from '../events/MeetingState';

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
  const { iframe } = useContext(AppContext);

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        {!participant ? (
          <MeetingStateProvider>
            <EnterMeeting />
          </MeetingStateProvider>
        ) : participant.role === 'owner' ? (
          <MeetingStateProvider>
            <Grid container spacing={2}>
              <Grid style={{ position: 'relative' }} item xs={7}>
                <JitsiFrame />
                {iframe === 'yt' && <Chodakowska />}
                {iframe === 'quiz' && <Chess />}
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
          </MeetingStateProvider>
        ) : (
          <MeetingStateProvider>
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
          </MeetingStateProvider>
        )}
      </Route>
      <Redirect to={`/404/${path}`} />
    </Switch>
  );
};

export default Meeting;
