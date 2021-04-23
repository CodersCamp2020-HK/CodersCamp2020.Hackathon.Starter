import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';
import list from './list';
import NavbarItem from './NavbarItem';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 1s ease-in-out',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      clipPath: (hamburger) =>
        hamburger ? 'circle(100vh at 100% 0)' : 'circle(100px at 100% 0%)',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  link: {
    display: 'block',
    padding: '20px',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const NavbarList = () => {
  const { hamburger } = useContext(AppContext);
  const classes = useStyles(hamburger);

  return (
    <ul className={classes.list}>
      {list.map((item) => (
        <NavbarItem key={item.id} id={item.id} name={item.name} />
      ))}
    </ul>
  );
};

export default NavbarList;
