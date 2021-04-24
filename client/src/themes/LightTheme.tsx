import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const LightTheme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      allVariants: {
        color: "#007769",
      },
    },
    palette: {
      type: "light",
      primary: {
        light: "#48a697",
        main: "#007769",
        dark: "#004a3f",
        contrastText: "#ffffff",
      },
      secondary: {
        light: "#ff7b47",
        main: "#e54819",
        dark: "#ab0300",
        contrastText: "#ffffff",
      },
      background: {
        default: "#F1F1F1",
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
      MuiTooltip: {
        tooltip: {
          backgroundColor: "#e54819",
        },
      },
    },
  })
);

export { LightTheme };
