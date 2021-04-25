import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "./Notifications";
import Typography from "@material-ui/core/Typography";
import { useMeetingState } from "../../events/MeetingState";
import { InformationNotification } from "../../events/InformEvents";

const useStyles = makeStyles((theme) => ({
  notificationWrapper: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 15,
    color: theme.palette.primary.main,
    textAlign: "center",
    maxHeight: 742,
  },
  title: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: 12,
  },
}));

type IconName =
  | "Cafe"
  | "Fitness"
  | "Quiz"
  | "Music"
  | "Meme"
  | "Topic"
  | "Idk";

function typeToIcon(type: InformationNotification["type"]) {
  return type === "agree"
    ? "Idk"
    : type === "ask_for_break"
    ? "Cafe"
    : type === "change_topic"
    ? "Topic"
    : type === "disagree"
    ? "Meme"
    : type === "dont_understand"
    ? "Quiz"
    : "Music";
}

const NotificationWrapper = () => {
  const classes = useStyles();
  const { informationNotifications } = useMeetingState();
  const notifications = useMemo(
    () =>
      informationNotifications.map((x) => ({
        name: x.from,
        iconName: typeToIcon(x.type),
      })),
    [informationNotifications]
  );

  return (
    <div className={classes.notificationWrapper}>
      <Typography variant="body1" color="primary" className={classes.title}>
        Powiadomienia
      </Typography>
      {notifications.map((item) => (
        <Notification name={item.name} iconName={item.iconName as IconName} />
      ))}
    </div>
  );
};

export default NotificationWrapper;
