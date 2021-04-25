import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  iconButton: {
    border: `2px solid ${theme.palette.secondary.main}`,
  },
  name: {
    color: theme.palette.primary.main,
  },
  time: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  children: React.ReactNode;
  name: string;
  time?: string;
  onClick: () => void;
}

const BtnWrapper: React.FC<Props> = ({ children, name, time, onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.btnWrapper}>
      <p className={classes.name}>{name}</p>
      {time && <p className={classes.time}>{`${time} min`}</p>}

      <IconButton className={classes.iconButton} onClick={onClick}>
        {children}
      </IconButton>
    </div>
  );
};

export default BtnWrapper;
