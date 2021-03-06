import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useMeetingState } from "../../events/MeetingState";

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: "2rem",
    },
  },
  upperWrapper: {
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
  },
  typographyWrapper: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  typographyHeader: {
    padding: 12,
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  singleCommentWrapper: {
    padding: "2rem",
  },
  commentTextBackground: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 20,
    padding: "1rem",
  },
  singleComment: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "0.5rem",
  },
  textField: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 15,
    "& fieldset": {
      borderRadius: 15,
    },
  },
  firstButton: {
    marginTop: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: "0 2rem 2rem 2rem",
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
  secondButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    "& :hover": {
      color: theme.palette.secondary.main,
    },
  },
  freeSpace: {
    flex: 1,
  },
}));

export interface SingleComment {
  name: string;
  time: string;
  textMessage: string;
}

const Chatbox = () => {
  const { notes, addNote } = useMeetingState();
  const classes = useStyles();
  const [state, setState] = useState("");
  return (
    <div className={classes.mainWrapper}>
      <div className={classes.upperWrapper}>
        <div className={classes.typographyWrapper}>
          <Typography className={classes.typographyHeader} variant="body1">
            Zapis spotkania
          </Typography>
        </div>
        {notes.map(({ time, description }) => (
          <div className={classes.singleCommentWrapper}>
            <div className={classes.singleComment}>
              <div>{time.toLocaleString()}</div>
              <div className={classes.freeSpace}></div>
              <div>{"Me"}</div>
            </div>
            <div className={classes.commentTextBackground}>{description}</div>
          </div>
        ))}
        <Button
          className={classes.firstButton}
          variant="outlined"
          size="medium"
          color="primary"
        >
          WYGENERUJ RAPORT PDF
        </Button>
      </div>
      <TextField
        onChange={(e) => setState(e.target.value)}
        value={state}
        className={classes.textField}
        variant="outlined"
        color="primary"
        id="x"
        label="Wpisz sw??j komentarz"
        size="medium"
      />
      <Button
        onClick={() => addNote({ description: state, time: new Date() })}
        className={classes.secondButton}
        variant="outlined"
        size="medium"
        color="secondary"
      >
        WY??LIJ KOMENTARZ
      </Button>
    </div>
  );
};

export default Chatbox;
