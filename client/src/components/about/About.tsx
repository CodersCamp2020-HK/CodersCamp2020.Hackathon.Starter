import {
  Container,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React from "react";
import project from "./AboutContent";
//tooltip z lewej strony przycisku github imie dwulinijkowee górny napis wyzej niz dolny

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#3f3f3f",
    width: "50%",
  },
  projectInfo: {
    justifyContent: "center",
    textAlign: "center",
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
    position: 'relative',
    width: "50%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  personLink: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const About = () => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
      <Paper className={styles.projectInfo}>
        <Typography variant='h5' className={styles.title}>{project.name}</Typography>
        <Typography variant='body1'>{project.description}</Typography>
        <Link href={project.gitHubLink} target="_blank">
          <GitHub />
        </Link>
      </Paper>
      <div className={styles.people}>
        {project.contributors.map((person, index) => (
          <Paper key={index} className={styles.personCard}>
            <Typography variant='h6'>{person.name}</Typography>
            <Typography variant='h6'>{person.surname}</Typography>
            <Typography variant='body2'>{person.description}</Typography>
            <Link className={styles.personLink} href={person.gitHubLink} target="_blank">
              <GitHub />
            </Link>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default About;
