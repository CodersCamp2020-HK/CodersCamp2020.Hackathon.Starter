import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const DarkTheme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      allVariants: {
        color: "#B2FEF7",
      },
    },
    palette: {
      type: "dark",
      primary: {
        light: "#B2FEF7",
        main: "#80CBC4",
        dark: "#4F9A94",
        contrastText: "#000000",
      },
      secondary: {
        light: "#FFDDC1",
        main: "#FFAB91",
        dark: "#C97B63",
        contrastText: "#000000",
      },
      common: {
        white: "#202020",
      },
      background: {
        default: "#363636",
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 18,
        },
        sizeSmall: {
          borderRadius: 15,
        },
        sizeLarge: {
          borderRadius: 21,
        },
      },
      // MuiTextField: {
      //   root: {
      //     "& fieldset": {
      //       // borderRadius: 18,
      //     },
      //   },
      // },
    },
  })
);

export { DarkTheme };