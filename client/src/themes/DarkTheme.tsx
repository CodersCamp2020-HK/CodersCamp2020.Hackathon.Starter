import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const DarkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: purple[500],
      },
    },
  })
);

export { DarkTheme };
