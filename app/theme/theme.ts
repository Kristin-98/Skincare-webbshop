'use client';

import { brown } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8d6e63',
      light: '#a1887f',
      dark: '#5d4037]',
    },
    secondary: {
      main: "#f44336" /*accentfärger*/,
    },
    background: {
      default: '#efebe9',
      paper: "#F5F5F5" /*white smoke*/,
    },
    text: {
      primary: '#3e2723',
      secondary: '#6d4c41',
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
