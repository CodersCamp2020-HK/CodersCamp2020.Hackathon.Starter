import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import UnderConstruction from './under-construction.png';

const useStyles = makeStyles({
  photo: {
    height: "70vh",
  },
  text: {
    textAlign: "center",
  },
});
const WorkInProgress = () => {
  const styles = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <img className={styles.photo} alt="Work in progress" src={UnderConstruction} />
      <Typography className={styles.text} variant="h4">
        Strona w budowie! Zajrzyj później :)
      </Typography>
    </Grid>
  );
};
export default WorkInProgress;
