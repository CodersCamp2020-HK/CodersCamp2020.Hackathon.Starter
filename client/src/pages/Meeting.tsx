import React, { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import Actions from '../components/actions/Actions';
import Timer from '../components/common/timer/Timer';
import NotificationWrapper from '../components/notifications/NotificationWrapper';
import { Toolbar } from '@material-ui/core';
import Nav from '../components/nav/Nav';
import { useMeetingEvents } from '../events/Meeting';
import { makeStyles } from '@material-ui/core/styles';

function DemoEvents() {
  const { emitMeetingEvents } = useMeetingEvents();
  return (
    <button
      onClick={() => {
        emitMeetingEvents();
      }}>
      Click
    </button>
  );
}

const useStyles = makeStyles({
  meet: {},
});

const Meeting = () => {
  const classes = useStyles();
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'PickAnAppropriateMeetingNameHere',
      width: '100%',
      height: 700,
      parentNode: document.querySelector('#meet'),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const api = new JitsiMeetExternalAPI(domain, options);
  }, []);
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Timer timeInSeconds={120} />

            <div className={classes.meet} id='meet'></div>

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
