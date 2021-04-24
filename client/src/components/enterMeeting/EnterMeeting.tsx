import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextInput from "../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";
import Aside from "../aside/Aside";
import Typography from "@material-ui/core/Typography";
import { useMeetingEvents } from "../../events/Meeting";
import { WsMeetingException } from "../../events/Meeting.dto";
import { useParams } from "react-router-dom";

type MeetingInputs = {
  name: string;
};

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderRadius: 15,
    position: "relative",
    paddingBottom: 35,
  },
  helperText: {
    position: "absolute",
    bottom: 10,
  },
});

const EnterMeeting = () => {
  const { name: meetingName } = useParams<{name: string}>();
  const styles = useStyles();
  const { control, handleSubmit } = useForm<MeetingInputs>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const {
    emitJoinMeeting,
    registerToException,
    unregisterFromException,
  } = useMeetingEvents();
  useEffect(() => {
    const fn = (error: WsMeetingException) => {
      if (error.code === 1) {
        setErrorMsg(error.message);
      }
    };
    registerToException(fn);
    return () => unregisterFromException(fn);
  }, [registerToException, unregisterFromException]);

  const onSubmit = ({ name }: MeetingInputs) => {
    emitJoinMeeting({ name, meetingName })
  };

  return (
    <form
      className={styles.column}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Aside />
      <Typography variant="h5">What's your name?</Typography>
      <TextInput
        className={styles.textInput}
        control={control}
        id="name"
        name="name"
        label="Your name"
        variant="outlined"
        size="medium"
        color="primary"
        required
        rules={{
          required: "Enter your name",
          maxLength: {
            value: 20,
            message: "Name can't be longer than 20 characters",
          },
        }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        color="primary"
      >
        Enter meeting
      </Button>
      {errorMsg && (
        <Typography color="error" variant="h5">
          {errorMsg}
        </Typography>
      )}
    </form>
  );
};

export default EnterMeeting;
