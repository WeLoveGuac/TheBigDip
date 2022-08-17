import { createTheme } from "@material-ui/core/styles";

const mainBlack = "#212121";
const mainWhite = "#A4A6A4";
const blue = "#757ce8";
// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "dark",
    common: {
      black: mainBlack,
      white: mainWhite,
      blue: blue,
    },
    primary: {
      main: "#a7cf3a",
    },
    secondary: {
      main: mainWhite,
    },
    info: {
      main: blue,
    },
  },
  typography: {
    h1: {
      fontFamily: "BreviaBold",
      fontSize: "18px",
      lineHeight: "30px",
      fontWeight: "500",
      fontStyle: "normal"
    },
    h2: {
      fontFamily: "BreviaBold",
      fontSize: "18px",
      lineHeight: "23px",
      fontWeight: "800",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "BreviaBold",
      fontSize: "16px",
      lineHeight: "20.8px",
      fontWeight: "400",
      fontStyle: "normal",
      color: "#E16060"
    },
    a: {
      color: mainBlack,
    },
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontFamily: "BreviaBold",
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#fff"
      },
      root: {
        zIndex: 1
      }
    },
    MuiButton: {
      root: {
        fontFamily: "BreviaBold",
        border: '3px solid #000f47',
        minWidth: '150px',
        fontWeight: 'bold'
      }
    }
  }
});

export default theme;
