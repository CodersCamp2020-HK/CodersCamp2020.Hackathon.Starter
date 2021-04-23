import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomePage = () => {
    const [meetTime, setMeetTime] = useState<string>('0');
  const styles = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetTime(event.target.value);
  };

  return (
    <div className={styles.column}>
      <Typography variant="h5">Ile będzie trwało spotkanie?</Typography>
      <TextField type='number' value={meetTime}  onChange={handleChange} variant="outlined" size="medium" color="primary" />
      <Button variant="outlined" size="medium" color="primary">
        Dodaj prezentacje
      </Button>
      <Button onClick={} variant="contained" size="medium" color="primary">
        Utwórz spotkanie
      </Button>
    </div>
  );
};

export default HomePage;
