import { createTheme } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { ColorLens } from "@material-ui/icons";

/**
 * Create custom theme and colors
 */
const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: "#d9d9d9",
    },
    primary: {
      light: "#fff",
      main: "#97B6E4",
      dark: "#2e355b",
      contrastText: "#000",
      action: {
        disabledBackground: "rgba(0,0,0,0.25)",
        disabled: "rgba(0,0,0,0.25)",
      },
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000",
    },
    openTitle: "#4285F4",
    protectedTitle: pink["400"],
    type: "light",
  },
});

export default theme;
