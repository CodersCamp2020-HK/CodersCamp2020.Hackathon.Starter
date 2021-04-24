import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const movies = [
  'https://www.youtube.com/embed/gyEpeY616ik?list=PLBiG1Oy7IRBVI8Y0eXGBIVNSYohQVEnL5',
  'https://www.youtube.com/embed/3tJrKb7vXuc?list=PLBiG1Oy7IRBVI8Y0eXGBIVNSYohQVEnL5',
  'https://www.youtube.com/embed/XYN0kRJFDCQ?list=PLBiG1Oy7IRBVI8Y0eXGBIVNSYohQVEnL5',
];

const random = () => {
  return Math.floor(Math.random() * 3 + 1);
};

const Chodakowska = () => {
  const classes = useStyles();
  return (
    <iframe
      className={classes.root}
      width='727'
      height='709'
      src={movies[random()]}
      title='YouTube video player'
      frameBorder='0'
      allow='mute; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen></iframe>
  );
};

export default Chodakowska;
