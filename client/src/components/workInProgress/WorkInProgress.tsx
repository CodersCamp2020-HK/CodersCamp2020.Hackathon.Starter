import { Grid, makeStyles, Typography, Theme } from "@material-ui/core";
import React from "react";
import UnderConstruction from "./under-construction.png";

const useStyles = makeStyles((theme: Theme) => ({
  photo: {
    width: "100vw",
  },
  text: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    textTransform: "uppercase",
  },
}));
const WorkInProgress = () => {
  const styles = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <img
        className={styles.photo}
        title="Work in progress!"
        alt="Work in progress. From clipartmax under licence Personal Use: https://www.clipartmax.com/middle/m2i8N4G6m2K9d3d3_construction-png-free-download-work-in-progress-png/"
        src={UnderConstruction}
      />
      <Typography className={styles.text} variant="h4">
        Strona w budowie! Zajrzyj później :)
      </Typography>
    </Grid>
  );
};
export default WorkInProgress;
