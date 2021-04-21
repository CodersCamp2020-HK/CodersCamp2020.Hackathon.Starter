import { makeStyles, Theme } from "@material-ui/core";

export const FOOTER_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: FOOTER_HEIGHT,
    backgroundColor: theme.palette.primary.light,
  },
}));
const Footer = () => {
  const styles = useStyles();
  return <footer className={styles.footer}>Text</footer>;
};

export default Footer;
