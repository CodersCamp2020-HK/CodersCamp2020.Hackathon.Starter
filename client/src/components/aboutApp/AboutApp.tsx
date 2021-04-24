import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { AppContext } from "../../App";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
  },
  image: {
      width: '100%',
      height: 'auto',
  },
  list: {
    listStyleType: 'circle',
    listStylePosition: 'inside'
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
            <ul className={styles.list}>
                <li>Improves the management of meetings</li>
                <li>Improves communication between meeting participants </li>
                <li>It makes meetings not a boring necessity, and becomes an opportunity for integration, exchange of ideas and quick problem solving</li>
            </ul>
        </Typography>
        <Typography variant="h5">
            Time control
        </Typography>
        <img className={styles.image} alt='placeholder' src='https://via.placeholder.com/468x60' />
        <Typography variant='body1'>
            Each participant has a preview of the time allocated to the meeting, how much time is left to the end, it is visualized in the form of a moving slider.
        </Typography>
        <Typography variant='h5'>
            Record of the meeting 
        </Typography>
        <Typography variant='body1'>
            Participants can post comments during the meeting. This field shows all comments written by them (along with the date of sending and them name).
        </Typography>
        <Typography variant='body1'>
            All comments can be generated as a report to a PDF file for later review.
        </Typography>
        <Typography variant='h5'>
            For participant
        </Typography>
        <img className={styles.image} alt='placeholder' src='https://via.placeholder.com/468x60' />
        <Typography variant='h6'>
            Ask for a break
        </Typography>
        <Typography variant='body1'>
        If the participant feels tired, they can click this button to request a break. The organizer can then accept the request and the meeting window changes to the corresponding image 
        </Typography>
        <Typography variant='h6'>
            I don't understand :(
        </Typography>
        <Typography variant='body1'>
            If the participant does not understand the issue, he can click this button to inform the organizer for a more detailed explanation.
        </Typography>
        <Typography variant='h6'>
            Change the topic?
        </Typography>
        <Typography variant='body1'>
            If the participant thinks that the topic has been properly explained, he can inform other participants that he wants to change the topic.
        </Typography>
        <Typography variant='h6'>
            Make sense / I don't agree
        </Typography>
        <Typography variant='body1'>
            During the brainstorming session, participants can express their position (consent or against ) by clicking on a thumb button.
        </Typography>


        <Typography variant='h5'>
            For meeting organizer
        </Typography>
        <img className={styles.image} alt='placeholder' src='https://via.placeholder.com/468x60' />
      </Container>
    </PerfectScrollbar>
  );
};

export default AboutApp;
