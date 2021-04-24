import React from "react";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";
import Actions from "../components/actions/Actions";
import Timer from "../components/common/timer/Timer";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import { Toolbar } from "@material-ui/core";
import Nav from "../components/nav/Nav";

const Meeting = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        <Nav />
        <Toolbar />
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
