import {
  Container,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography
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
    width: '50%',
  },
  projectInfo: {
    justifyContent: "center",
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  title: {
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      border: "1px solid rgba(0, 0, 0, 0.5)",
      margin: "0 5px",
      flexGrow: 1,
    },
    "&::after": {
      content: '""',
      border: "1px solid rgba(0, 0, 0, 0.5)",
      margin: "0 5px",
      flexGrow: 1,
    },
  },
}));

const About = () => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
      <Paper className={styles.projectInfo}>
        <Typography className={styles.title}>{project.name}</Typography>
        <Typography>{project.description}</Typography>
        <Link href={project.gitHubLink} target="_blank">
          <GitHub />
        </Link>
      </Paper>
      {project.contributors.map((person => (
        <Paper>
        <Typography>{person.name}</Typography>
        <Typography>{person.surname}</Typography>
        <Typography>{person.description}</Typography>
        <Link href={person.gitHubLink} target="_blank"> 
          <GitHub />
        </Link>
      </Paper>
      )))}
    </Container>
  );
};

export default About;
