import {
  Button,
  Container,
  Divider,
  Grow,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Slide,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React, { useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AppContext } from "../../App";
import project from "./AboutContent";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  projectInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "justify",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  title: {
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      border: "1px solid rgba(0, 0, 0, 0.5)",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flexGrow: 1,
    },
    "&::after": {
      content: '""',
      border: "1px solid rgba(0, 0, 0, 0.5)",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flexGrow: 1,
    },
  },
  people: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    "& :nth-of-type(odd)": {
      alignSelf: "flex-end",
    },
  },
  peopleMobile: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  peopleCard: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  personCard: {
    position: "relative",
    width: "50%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  personCardMobile: {
    position: "relative",
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
    alignSelf: "center",
  },
  personLink: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  personSurname: {
    marginLeft: theme.spacing(2),
  },
  personName: {},
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  repoButton: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
  },
  mentorCard: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  mentorTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

const About = () => {
  const styles = useStyles();
  const { darkTheme } = useContext(AppContext);
  return (
    <PerfectScrollbar
      className={darkTheme ? styles.scrollbarDark : styles.scrollbarLight}
    >
      <Container maxWidth="md" className={styles.container}>
        <Grow in={true} timeout={1000} mountOnEnter unmountOnExit>
          <Paper className={styles.projectInfo}>
            <Typography variant="h5" className={styles.title}>
              {project.name}
            </Typography>
            <Typography variant="body1">{project.description}</Typography>
            <Link
              className={styles.repoButton}
              href={project.gitHubLink}
              target="_blank"
            >
              <Button
                variant="contained"
                startIcon={<GitHub fontSize="large" />}
                color="primary"
              >
                Github
              </Button>
            </Link>
          </Paper>
        </Grow>
        <Grow in={true} timeout={1000} mountOnEnter unmountOnExit>
          <Paper className={styles.mentorCard}>
            <Typography variant="h5" className={styles.title}>
              Mentor
            </Typography>
            <div className={styles.mentorTitle}>
              <Typography variant="h6" color="primary">
                {project.mentor.name} {project.mentor.surname}
              </Typography>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography variant="body1">
                      {project.mentor.gitHubName}
                    </Typography>
                  </React.Fragment>
                }
                placement="left"
              >
                <Link href={project.mentor.gitHubLink} target="_blank">
                  <IconButton color="primary">
                    <GitHub fontSize="large" />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
            <Typography variant="body1">
              {project.mentor.description}
            </Typography>
          </Paper>
        </Grow>
        <Paper className={styles.peopleCard}>
          <Typography variant="h5" className={styles.title}>
            Uczestnicy
          </Typography>
          <div className={styles.peopleMobile}>
            {project.contributors.map((person, index) => (
              <Slide
                key={index}
                timeout={1000}
                direction={index % 2 === 0 ? "right" : "left"}
                in={true}
                mountOnEnter
                unmountOnExit
              >
                <Paper className={styles.personCardMobile}>
                  <Typography
                    color="primary"
                    className={styles.personName}
                    variant="h6"
                  >
                    {person.name}
                  </Typography>
                  <Typography
                    color="secondary"
                    className={styles.personSurname}
                    variant="h6"
                  >
                    {person.surname}
                  </Typography>
                  <Divider className={styles.divider} />
                  <Typography variant="body1">{person.description}</Typography>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography variant="body1">
                          {person.gitHubName}
                        </Typography>
                      </React.Fragment>
                    }
                    placement="left"
                  >
                    <Link
                      className={styles.personLink}
                      href={person.gitHubLink}
                      target="_blank"
                    >
                      <IconButton color="primary">
                        <GitHub fontSize="large" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </Paper>
              </Slide>
            ))}
          </div>
        </Paper>
      </Container>
    </PerfectScrollbar>
  );
};

export default About;
