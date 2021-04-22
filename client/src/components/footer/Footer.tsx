import { Link, makeStyles, Theme, Typography } from "@material-ui/core";
import { GitHub, YouTube } from "@material-ui/icons";

export const FOOTER_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: "border-box",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: FOOTER_HEIGHT,
    position: "absolute",
    width: "100%",
  },
  link: {
    color: theme.palette.info.light,
    marginRight: theme.spacing(2),
  },
}));
const Footer = () => {
  const styles = useStyles();
  return (
    <footer className={styles.footer}>
      <div>
        <Typography color="textPrimary" variant="body2">
          Copyright &copy; 2021 Hubert Kawałek Team. All right reserved
        </Typography>
      </div>
      <div>
        <Link className={styles.link} href="https://www.youtube.com">
          <YouTube />
        </Link>
        <Link className={styles.link} href="https://www.github.com">
          <GitHub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
