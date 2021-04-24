import React from "react";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";
import Actions from "../components/actions/Actions";
import Timer from "../components/common/timer/Timer";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import Chatbox, { SingleComment } from "../components/chatbox/Chatbox";
import { useMeetingEvents } from "../events/Meeting";
import EnterMeeting from "../components/enterMeeting/EnterMeeting";
import { JitsiFrame } from "../components/jitsi/JitsiFrame";

const comments: SingleComment[] = [
  {
    name: "Mateusz",
    textMessage: "Elo",
    time: "12:52",
  },
  {
    name: "Mateusz",
    textMessage: "EloELo",
    time: "12:53",
  },
  {
    name: "Mateusz",
    textMessage: "EloEloElo",
    time: "12:54",
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
        ) : (
          <>
            <JitsiFrame />
            <Timer timeInSeconds={120} />
            Hello
            <Actions />
            <NotificationWrapper />
            <Chatbox comments={comments} />
          </>
        )}
      </Route>
      <Redirect to={`/404/${path}`} />
    </Switch>
  );
};

export default Meeting;
