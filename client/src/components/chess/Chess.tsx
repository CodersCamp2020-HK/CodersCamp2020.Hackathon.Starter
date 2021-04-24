import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

const games = [
    'https://coderscamp2020-hk.github.io/CodersCamp2020.Project.TypeScript.Chess/index.html',
    'https://coderscamp2020-hk.github.io/CodersCamp2020.Project.JavaScript.StarWarsQuiz/index.html',
  ];

const Chess = () => {
  const classes = useStyles();

  const random = () => {
    return Math.round(Math.random());
  };

  return (
    <iframe
      className={classes.root}
      title="chess"
      src={games[random()]}
      width="727"
      height="709"
    />
  );
};

export default Chess;
