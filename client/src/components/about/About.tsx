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
import React from "react";
import project from "./AboutContent";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3f3f3f",
    width: "50%",
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
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
    "& :nth-of-type(odd)": {
      alignSelf: "flex-end",
    },
  },
  personCard: {
    position: "relative",
    width: "50%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
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
}));

const About = () => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
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
              Zobacz repozytorium
            </Button>
          </Link>
        </Paper>
      </Grow>
      <div className={styles.people}>
        {project.contributors.map((person, index) => (
          <Slide
            key={index}
            timeout={1000}
            direction={index % 2 === 0 ? "right" : "left"}
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Paper className={styles.personCard}>
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
                    <Typography variant="body1">{person.gitHubName}</Typography>
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
    </Container>
  );
};

export default About;
