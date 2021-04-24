import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import TextInput from "../inputs/textInput/TextInput";
import { useForm } from "react-hook-form";

type HomePageInputs = {
  name: string;
  numberOfMins: number;
};

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    position: 'relative',
    paddingBottom: 35,
  },
  helperText: {
      position: 'absolute',
      bottom: 10,
  },
});

const HomePage = () => {
  const styles = useStyles();
  const { control, handleSubmit } = useForm<HomePageInputs>();

  const onSubmit = (data: HomePageInputs) => {
    console.log(data);
  };

  return (
    <form
      className={styles.column}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5">Ile minut będzie trwało spotkanie?</Typography>
      <TextInput
        className={styles.textInput}
        control={control}
        id="numberOfMins"
        name="numberOfMins"
        label="Number of minutes"
        variant="outlined"
        size="medium"
        color="primary"
        required
        rules={{
          required: "Enter a number of minutes",
          pattern: { value: /\d/, message: "Enter a number" },
        }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
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
        rules={{ required: "Enter your name" }}
        FormHelperTextProps={{ className: styles.helperText }}
      />
      <Button type="submit" variant="contained" size="medium" color="primary">
        Utwórz spotkanie
      </Button>
    </form>
  );
};

export default HomePage;
