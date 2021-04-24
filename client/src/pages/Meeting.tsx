import React from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import Actions from '../components/actions/Actions';
import Timer from '../components/common/timer/Timer';
import NotificationWrapper from '../components/notifications/NotificationWrapper';
import { Grid } from '@material-ui/core';
import Chatbox from '../components/chatbox/Chatbox';

import { JitsiFrame } from '../components/jitsi/JitsiFrame';

const Meeting = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Timer timeInSeconds={120} />

            <JitsiFrame />

            <Actions />
          </Grid>
          <Grid item xs={2}>
            <NotificationWrapper />
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Route>
      <Redirect to={`/404${path}`} />
    </Switch>
  );
};

export default Meeting;
