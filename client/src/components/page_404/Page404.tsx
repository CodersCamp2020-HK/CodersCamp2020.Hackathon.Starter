import { Grid, makeStyles, Typography, Theme, Card } from "@material-ui/core";
import React from "react";
import Kermit from "./Kermit.jpg";

const useStyles = makeStyles((theme: Theme) => ({
  photo: {
    width: "100vw",
    minHeight: "100vh",

    backgroundImage: `url(${Kermit})`,
    backgroundRepeat: 'norepeat',
    backgroundSize: 'cover',
  },
  text: {
    marginTop: theme.spacing(3),
    textAlign: "center",
    textTransform: "uppercase",
    color: '#FFF',
    minHeight: "100%"
  },
}));
const Page404 = () => {
  const styles = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center">
        <Card className={styles.photo}>
            <Typography className={styles.text} variant="h3" >
                This is not a page ... 404
            </Typography>
        </Card>
    </Grid>
  );
};
export default Page404;

{/* <img
className={styles.photo}
title="Work in progress!"
alt="Work in progress. From clipartmax under licence Personal Use: https://cdn.pixabay.com/photo/2016/10/22/13/28/not-hear-1760750_960_720.jpg"
src={Kermit}
/> */}