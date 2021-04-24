import React from "react";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";
import Actions from "../components/actions/Actions";
import Timer from "../components/common/timer/Timer";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import Nav from "../components/nav/Nav";
import { DemoEvents } from "../events/DemoEvents";
import Chatbox, { SingleComment } from "../components/chatbox/Chatbox";

const comments: SingleComment[] = [
  {
    name: 'Mateusz',
    textMessage: 'Elo',
    time: '12:52'
  },
  {
    name: 'Mateusz',
    textMessage: 'EloELo',
    time: '12:53'
  },
  {
    name: 'Mateusz',
    textMessage: 'EloEloElo',
    time: '12:54'
  },
]

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
        <Chatbox comments={comments} />
      </Route>
      <Redirect to={`/404${path}`} />
    </Switch>
  );
};

export default Meeting;
