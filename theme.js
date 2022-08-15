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
      main: mainBlack,
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
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "30px",
      fontWeight: "500",
      fontStyle: "normal"
    },
    h2: {
      fontFamily: "Poppins",
      fontSize: "18px",
      lineHeight: "23px",
      fontWeight: "800",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "Poppins",
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
    MuiCheckbox: {
      root: {
        color: "#000",
        '&$checked': {
          color: "#000",
        },
      }
    },
    MuiTypography: {
      body1: {
        fontFamily: "Poppins",
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
    MuiMenu: {
      paper: {
        marginTop: "5px",
        background: "#2A2B35",
        border: "1px solid #55576A",
        boxSizing: "border-box",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: '3px',
      },
      list: {
        padding: "0"
      }
    },
    MuiTooltip: {
      tooltipPlacementTop: {
        fontFamily: "Poppins",
        fontSize: "16px !important",
        lineHeight: "21px",
        fontWeight: "600",
        fontStyle: "normal",
        color: "#F1F1F1 !important",
        backgroundColor: "#30B943 !important",
        border: "0 !important",
        margin: "0 !important"
      },
      arrow: {
        color: "#30B943"
      }
    },
    MuiAccordion: {
      root: {
        border: "1px solid #55576A",
        background: "#31323E"
      }
    },
    MuiAccordionSummary: {
      content: {
        margin: "0",
        "&.Mui-expanded": {
          margin: "0",
        }
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          color: "#FFFFFF",
          backgroundColor: "rgba(85, 87, 106, 0.3)"
        }
      },
      root: {
        "&.Mui-selected": {
          background: "#2A2B35",
        },
        "&.Mui-selected:hover": {
          background: "#2A2B35"
        },
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily: "Poppins",
        fontSize: "18px",
        lineHeight: "23px",
        fontWeight: "500",
        color: "#A4A6A4",
        paddingTop: "13px",
        paddingBottom: "13px"
      },
    },
    MuiButton: {
      root: {
        fontFamily: "Poppins"
      }
    }
  }
});

export default theme;
