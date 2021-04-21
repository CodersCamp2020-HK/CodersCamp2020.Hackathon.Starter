import { AppBar, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    footer: {
        position: 'static',
        bottom: 0,
    }
})
const Footer = () => {
    const styles = useStyles();
  return <AppBar className={styles.footer}>Text</AppBar>;
};

export default Footer;
