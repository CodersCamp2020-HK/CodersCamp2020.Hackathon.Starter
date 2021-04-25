import React from "react";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import { makeStyles } from "@material-ui/core/styles";
import BtnWrapper from "./BtnWrapper";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import CachedIcon from "@material-ui/icons/Cached";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { useMeetingState } from "../../events/MeetingState";
import { InformationNotification } from "../../events/InformEvents";
import { useMeetingEvents } from "../../events/Meeting";

const useStyles = makeStyles((theme) => ({
  action: {
    display: "flex",
    justifyContent: "space-around",
    alignItem: "center",
  },
  icon: {
    color: theme.palette.secondary.main,
    margin: "0.1rem",
  },
}));

const ActionsParticipant = () => {
  const classes = useStyles();
  const { meetingName, participant } = useMeetingEvents();
  const { emitInformationNotification } = useMeetingState();
  const onClickFactory = (type: InformationNotification["type"]) => {
    return () => {
      emitInformationNotification({
        date: new Date(),
        meetingName: meetingName ?? "",
        participantId: participant?.id ?? "",
        type,
        from: participant?.name ?? "",
      });
    };
  };
  return (
    <div className={classes.action}>
      <BtnWrapper name="Abreak" onClick={onClickFactory("ask_for_break")}>
        <LocalCafeIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper
        name="I don't understand :( "
        onClick={onClickFactory("dont_understand")}
      >
        <LiveHelpIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper
        name="Change the topic"
        onClick={onClickFactory("change_topic")}
      >
        <CachedIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name="Make sense" onClick={onClickFactory("agree")}>
        <ThumbUpAltIcon className={classes.icon} />
      </BtnWrapper>
      <BtnWrapper name="I don't agree" onClick={onClickFactory("disagree")}>
        <ThumbDownAltIcon className={classes.icon} />
      </BtnWrapper>
    </div>
  );
};

export default ActionsParticipant;
