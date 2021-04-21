import React, { useContext } from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';

interface Props {
  id: number;
  name: string;
}

interface newProps {
  id: number;
  name: string;
  hamburger: boolean;
}

const useStyles = makeStyles((theme) => ({
  listItemActive: {
    [theme.breakpoints.down('xs')]: {
      opacity: 0,
      animationFillMode: 'forwards',
      animation: `$active 0.6s ease-in-out`,
      animationDelay: (newProps: newProps) => `${0.4 + newProps.id * 0.15}s`,
    },
  },
  '@keyframes active': {
    '0%': {
      transform: 'translateX(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0px)',
    },
  },

  listItemInactive: {
    [theme.breakpoints.down('xs')]: {
      opacity: 1,
      animationFillMode: 'forwards',
      animation: `$inactive 0.1s ease-in-out`,
      animationDelay: (newProps: newProps) => `${0.4 - newProps.id * 0.1}s`,
    },
  },
  '@keyframes inactive': {
    '0%': {},
    '100%': {
      opacity: 0,
      transform: 'translateX(50px)',
    },
  },

  link: {
    display: 'block',
    padding: '20px',
    color: 'inherit',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
  },
}));

const NavbarItem: React.FC<Props> = (props) => {
  const { hamburger, setHamburger } = useContext(AppContext);
  const newProps = { ...props, hamburger };
  const classes = useStyles(newProps);
  const myClass = hamburger ? classes.listItemActive : classes.listItemInactive;

  return (
    <li
      className={myClass}
      onClick={() => setHamburger((prevState) => !prevState)}>
      <Link className={classes.link}>{props.name}</Link>
    </li>
  );
};

export default NavbarItem;
