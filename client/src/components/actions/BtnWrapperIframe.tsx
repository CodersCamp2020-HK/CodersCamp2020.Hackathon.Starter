import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMeetingState } from "../../events/MeetingState";
import { useMeetingEvents } from "../../events/Meeting";

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  iconButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  name: {
    color: theme.palette.primary.main,
  },
  time: {
    color: theme.palette.primary.main,
  },
}));

type Iframe = "yt" | "music" | "quiz" | "cafe" | "video";
interface Props {
  children: React.ReactNode;
  name: Iframe;
  time?: string;
}
const BtnWrapperIframe: React.FC<Props> = ({ children, name, time }) => {
  const classes = useStyles();
  const { meetingName, participant } = useMeetingEvents();
  const { emitTimeEvent, currentTimeEvent } = useMeetingState();
  return (
    <div className={classes.btnWrapper}>
      <p className={classes.name}>{name}</p>
      <p className={classes.time}>{`${time} min`}</p>
      <IconButton
        className={classes.iconButton}
        disabled={currentTimeEvent !== undefined}
        onClick={() => {
          emitTimeEvent({
            interval: 30,
            meetingName: meetingName as string,
            participantId: participant?.id as string,
            type:
              name === "yt"
                ? "workout"
                : name === "music"
                ? "play_music"
                : name === "quiz"
                ? "quiz"
                : name === "cafe"
                ? "break"
                : "workout",
          });
        }}
      >
        {children}
      </IconButton>
    </div>
  );
};

export default BtnWrapperIframe;
