import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import TextInput from "../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";
import { useMeetingEvents } from "../../events/Meeting";
import { useHistory } from "react-router-dom";
import { WsMeetingException } from "../../events/Meeting.dto";
import Aside from "../aside/Aside";
import classes from "*.module.css";

type HomePageInputs = {
  meetingName: string;
  name: string;
  numberOfMins: number;
};

const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    justifyContent: "space-around",
  },
  textInput: {
    position: 'relative',
    paddingBottom: 35,
    width: '25rem',
    borderRadius: 19,
    '& fieldset': {
      borderRadius: 19,
    }
  },
  helperText: {
    position: 'absolute',
    bottom: 10,
  },
  titile: {
    marginBottom: 20,
  },
  button: {
    width: '25rem',
  },
});

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    meetingName,
    participant,
    emitCreateMeeting,
    registerToException,
    unregisterFromException,
  } = useMeetingEvents();
  const styles = useStyles();
  const { control, handleSubmit } = useForm<HomePageInputs>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const onSubmit = (data: HomePageInputs) => {
    emitCreateMeeting({
      meetingName: data.meetingName,
      name: data.name,
    });
  };

  useEffect(() => {
    const fn = (error: WsMeetingException) => {
      if (error.code === 2) {
        setErrorMsg(error.message);
      }
    };
    registerToException(fn);
    return () => unregisterFromException(fn);
  }, [registerToException, unregisterFromException]);

  useEffect(() => {
    if (participant) {
      history.push(`meetings/${meetingName}`);
    }
  }, [participant, history, meetingName]);

  return (
    <form
      className={styles.column}
      noValidate
      onSubmit={handleSubmit(onSubmit)}>
      <Aside />
      <TextInput
        className={styles.textInput}
        control={control}
        id='numberOfMins'
        name='numberOfMins'
        label='Number of minutes'
        variant='outlined'
        size='medium'
        color='primary'
        required
        rules={{
          required: 'Enter a number of minutes',
          pattern: { value: /\d/, message: 'Enter a number' },
        }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
      <TextInput
        className={styles.textInput}
        control={control}
        id='name'
        name='name'
        label='Your name'
        variant='outlined'
        size='medium'
        color='primary'
        required
        rules={{
          required: 'Enter your name',
          maxLength: {
            value: 20,
            message: "Name can't be longer than 20 characters",
          },
        }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
      <TextInput
        className={styles.textInput}
        control={control}
        id='meetingName'
        name='meetingName'
        label='Meeting name'
        variant='outlined'
        size='medium'
        color='primary'
        required
        rules={{
          required: 'Enter meeting name',
          maxLength: {
            value: 30,
            message: "Meeting name can't be longer than 30 characters",
          },
        }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
      <Button className={styles.button} type="submit" variant="contained" size="medium" color="primary">
        Utwórz spotkanie
      </Button>
      {errorMsg && (
        <Typography color='error' variant='h5'>
          {errorMsg}
        </Typography>
      )}
    </form>
  );
};

export default HomePage;
