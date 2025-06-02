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
		fontFamily: "var(--font-albert-sans)",
		fontWeightRegular: 300,
		fontWeightMedium: 400,
		fontWeightBold: 300,
		body1: {
			fontSize: "1.1rem",
			fontWeight: 300,
		},
	},
});

export default theme;
