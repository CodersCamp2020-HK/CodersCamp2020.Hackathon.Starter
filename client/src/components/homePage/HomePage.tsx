import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomePage = () => {
  const styles = useStyles();
  return (
    <div className={styles.column}>
      <Typography variant="h5">Ile będzie trwało spotkanie?</Typography>
      <TextField variant="outlined" size="medium" />
      <Button variant="outlined" size="medium">
        Dodaj prezentacje
      </Button>
      <Button variant="contained" size="medium">
        Utwórz spotkanie
      </Button>
    </div>
  );
};

export default HomePage;
