import React from "react";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";
import Actions from "../components/actions/Actions";
import Timer from "../components/common/timer/Timer";
import NotificationWrapper from "../components/notifications/NotificationWrapper";
import Chatbox from "../components/chatbox/Chatbox";
import { useMeetingEvents } from "../events/Meeting";
import EnterMeeting from "../components/enterMeeting/EnterMeeting";
import { JitsiFrame } from "../components/jitsi/JitsiFrame";
import ActionsParticipantWrapper from "../components/actions/ActionsParticipantWrapper";
import { Grid } from "@material-ui/core";
import Chodakowska from "../components/chodakowska/Chodakowska";
import Chess from "../components/chess/Chess";
import { MeetingStateProvider, useMeetingState } from "../events/MeetingState";

const OwnerView = () => {
  const { currentTimeEvent } = useMeetingState();
  return (
    <Grid container spacing={2}>
      <Grid style={{ position: "relative" }} item xs={7}>
        <JitsiFrame />
        {currentTimeEvent && currentTimeEvent === "workout" && <Chodakowska />}
        {currentTimeEvent && currentTimeEvent === "quiz" && <Chess />}
        <Timer timeInSeconds={120} />
        <Actions />
      </Grid>
      <Grid item xs={2}>
        <NotificationWrapper />
      </Grid>
      <Grid item xs={3}>
        <Chatbox />
      </Grid>
    </Grid>
  );
};
const ParticipantView = () => {
  const { currentTimeEvent } = useMeetingState();
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <JitsiFrame />
        {currentTimeEvent && currentTimeEvent === "workout" && <Chodakowska />}
        {currentTimeEvent && currentTimeEvent === "quiz" && <Chess />}
        <Timer timeInSeconds={120} />
        <ActionsParticipantWrapper />
      </Grid>
      <Grid item xs={2}>
        <NotificationWrapper />
      </Grid>
      <Grid item xs={3}>
        <Chatbox />
      </Grid>
    </Grid>
  );
};

const Meeting = () => {
  const { path } = useRouteMatch();
  const { participant } = useMeetingEvents();
  return (
    <Switch>
      <Route exact path={`${path}/:name`}>
        {!participant ? (
          <>
            <EnterMeeting />
          </>
        ) : participant.role === "owner" ? (
          <MeetingStateProvider>
            <OwnerView />
          </MeetingStateProvider>
        ) : (
          <MeetingStateProvider>
            <ParticipantView />
          </MeetingStateProvider>
        )}
      </Route>
      <Redirect to={`/404/${path}`} />
    </Switch>
  );
};

export default Meeting;
