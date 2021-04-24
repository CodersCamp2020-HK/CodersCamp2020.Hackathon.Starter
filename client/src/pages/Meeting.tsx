import React from "react";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";
import Actions from "../components/actions/Actions";
import Timer from "../components/common/timer/Timer";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import Nav from "../components/nav/Nav";
import { DemoEvents } from "../events/DemoEvents";

const Meeting = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        <Nav />
        <DemoEvents />
        <Timer timeInSeconds={120} />
        Hello
        <Actions />
        <NotificationWrapper />
      </Route>
      <Redirect to={`/404${path}`} />
    </Switch>
  );
};

export default Meeting;
