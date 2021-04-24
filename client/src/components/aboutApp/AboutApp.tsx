import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { AppContext } from "../../App";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
  },
  scrollbarLight: {
    "& ::-webkit-scrollbar": {
      width: 12,
      backgroundColor: " #F5F5F5",
    },

    "& .ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y": {
      backgroundColor: theme.palette.primary.light,
    },

    "& .ps__thumb-y": {
      borderRadius: 10,
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.palette.primary.light,
    },
  },
  scrollbarDark: {
    "& ::-webkit-scrollbar": {
      width: 12,
      backgroundColor: " #F5F5F5",
    },
    //Po najechaniu/klikniecu paska scrollowania
    "& .ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y": {
      backgroundColor: theme.palette.primary.dark,
    },
    //Zwykły
    "& .ps__thumb-y": {
      borderRadius: 10,
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
const AboutApp = () => {
  const styles = useStyles();
  const { darkTheme } = useContext(AppContext);
  return (
    <PerfectScrollbar
      className={darkTheme ? styles.scrollbarDark : styles.scrollbarLight}
    >
      <Container className={styles.container}>
      <Typography variant="h3">
            About the application
        </Typography>
        <Typography variant="body1">
        MeetByte application is a breakthrough in the work of remote teams !!!
        </Typography>
        <Typography variant="body1">
            <ul>
                <li>Improves the management of meetings</li>
                <li>Improves communication between meeting participants </li>
                <li>It makes meetings not a boring necessity, and becomes an opportunity for integration, exchange of ideas and quick problem solving</li>
            </ul>
        </Typography>
        <Typography variant="h6">
            Time control
        </Typography>
        <Typography variant='body1'>
            Each user has a preview of the time allocated to the meeting, how much time is left to the end, it is visualized in the form of a moving slider.
        </Typography>
      </Container>
    </PerfectScrollbar>
  );
};

export default AboutApp;
