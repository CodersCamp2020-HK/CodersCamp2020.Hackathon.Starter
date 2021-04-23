import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { green, lightBlue } from "@material-ui/core/colors";

const LightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: green[500],
      },
      secondary: {
        main: lightBlue[200],
      },
    },
  })
);

export { LightTheme };
