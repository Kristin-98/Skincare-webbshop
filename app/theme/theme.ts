"use client";

import { brown } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#727466",
      light: "#727466",
      dark: "#283323",
    },
    secondary: {
      main: "#f44336" /*accentfärger*/,
    },
    background: {
      default: brown[50],
      paper: "#F5F5F5" /*white smoke*/,
    },
    text: {
      primary: "#283323",
      secondary: "#727466",
    },
  },
  typography: {
    fontFamily: "var(--font-poppins)",
    fontWeightRegular: 600, // Standardtext
    fontWeightMedium: 700, // Mellanrubriker
    fontWeightBold: 800, // Rubriker
  },
});

export default theme;
