import React, { useEffect } from 'react';
import { Route, useRouteMatch, Redirect, Switch } from 'react-router-dom';
import Actions from '../components/actions/Actions';
import Timer from '../components/common/timer/Timer';
import NotificationWrapper from '../components/notifications/NotificationWrapper';
import { Toolbar } from '@material-ui/core';
import Nav from '../components/nav/Nav';
import { useMeetingEvents } from '../events/Meeting';

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

const Meeting = () => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'PickAnAppropriateMeetingNameHere',
      width: 700,
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
              <Nav />
              <Toolbar />
              <Timer timeInSeconds={120} />
              <span id='meet'></span>
              Hello
              <DemoEvents />
              <Actions />
              <NotificationWrapper />
          </Route>
          <Redirect to={`/404${path}`} />
      </Switch>
  );
};

export default Meeting;