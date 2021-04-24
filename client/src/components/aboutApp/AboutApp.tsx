import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { AppContext } from "../../App";
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
  },
  scrollbarLight: {
    "& ::-webkit-scrollbar": {
      width: 12,
      backgroundColor: " #F5F5F5",
    },

    "& .ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y": {
      backgroundColor: theme.palette.primary.light,
    },

    "& .ps__thumb-y": {
      borderRadius: 10,
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.palette.primary.light,
    },
  },
  scrollbarDark: {
    "& ::-webkit-scrollbar": {
      width: 12,
      backgroundColor: " #F5F5F5",
    },
    //Po najechaniu/klikniecu paska scrollowania
    "& .ps__rail-y:hover > .ps__thumb-y, .ps__rail-y:focus > .ps__thumb-y, .ps__rail-y.ps--clicking .ps__thumb-y": {
      backgroundColor: theme.palette.primary.dark,
    },
    //Zwykły
    "& .ps__thumb-y": {
      borderRadius: 10,
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
const AboutApp = () => {
  const styles = useStyles();
  const { darkTheme } = useContext(AppContext);
  return (
    <PerfectScrollbar
      className={darkTheme ? styles.scrollbarDark : styles.scrollbarLight}
    >
      <Container className={styles.container}>
        <Typography variant="body1">
          Reprehenderit mollit laboris ea eiusmod Lorem commodo aute cupidatat
          duis id voluptate sit. Ipsum eu ad dolore ea officia cupidatat.
          Laboris aute ut ea ullamco labore ex non aute. Cupidatat dolor dolor
          laboris consectetur minim. Culpa labore incididunt adipisicing duis
          occaecat irure reprehenderit incididunt. Laborum ullamco dolor culpa
          minim cupidatat enim aute veniam. Sunt magna cupidatat do Lorem est.
          Enim do aliquip fugiat dolore. Incididunt do id sit esse consectetur
          magna amet ad labore. Est officia ad ad nisi. Nostrud sit ea proident
          velit. Voluptate cillum reprehenderit enim aliquip laborum excepteur
          excepteur tempor commodo magna. Eu proident qui commodo amet veniam
          ullamco elit cillum do. Cillum velit ad veniam labore eiusmod elit
          cillum. Nostrud reprehenderit in elit irure veniam. Proident consequat
          consequat qui reprehenderit ullamco laborum fugiat eu pariatur
          incididunt ullamco occaecat esse. Tempor magna nostrud duis dolore et.
          Commodo qui adipisicing in magna culpa eu commodo aliquip aliqua eu
          exercitation labore amet. Sit mollit Lorem anim incididunt veniam
          ipsum et. Aute laboris cupidatat Lorem laborum excepteur culpa aliquip
          ea. Adipisicing minim aliquip eiusmod veniam excepteur dolore velit ex
          nulla aute officia. Aliqua proident nulla est dolore sint occaecat
          consectetur. Cupidatat tempor ut minim sint ea amet laboris nostrud
          cupidatat commodo consequat sunt enim. Amet minim sint in velit
          proident veniam ad nisi Lorem commodo mollit mollit et. Laboris
          cupidatat fugiat magna duis non enim laboris in. Officia ex id laboris
          duis. Adipisicing nisi eiusmod mollit ipsum non incididunt elit dolor
          incididunt consequat proident ea. Voluptate elit id cupidatat dolor
          deserunt dolore esse nulla in. Ad cillum sit ipsum sint irure mollit.
          Voluptate eu minim in laborum eiusmod deserunt. Consequat irure mollit
          occaecat occaecat excepteur qui culpa minim. Occaecat nisi ea quis
          amet labore reprehenderit proident aute sunt non. Aute amet deserunt
          dolore proident dolore anim. Ullamco quis ipsum ex veniam aliqua
          deserunt. Id voluptate esse proident nisi anim est. Elit mollit ipsum
          eu commodo ipsum tempor irure consectetur. Sint dolore eiusmod est
          sint magna non Lorem sit voluptate ad. Ex adipisicing exercitation
          voluptate laborum Lorem enim ipsum velit sint aliqua velit.
          Adipisicing aliquip esse deserunt quis aliquip eu esse excepteur
          reprehenderit ut. Eu duis adipisicing deserunt esse proident. Duis
          commodo sit deserunt pariatur ut minim et velit velit laborum. Sint
          voluptate sit cillum dolor esse amet ut officia. Exercitation
          excepteur et enim laborum dolor ullamco do incididunt. Enim mollit
          culpa sint consequat pariatur fugiat. Irure commodo aliqua ad ullamco
          proident incididunt Lorem cillum in. Lorem eiusmod laboris aliqua
          consectetur cillum ut mollit sit cillum magna. Nisi ullamco minim
          officia qui occaecat nulla dolore laborum laboris excepteur nostrud
          et. Eu proident veniam consectetur duis proident. Duis et aute ea
          voluptate pariatur duis laborum nisi irure consequat irure et sunt et.
          Cillum dolor id adipisicing duis ex proident anim non. Pariatur
          proident reprehenderit labore nulla laborum aute.
        </Typography>
      </Container>
    </PerfectScrollbar>
  );
};

export default AboutApp;
