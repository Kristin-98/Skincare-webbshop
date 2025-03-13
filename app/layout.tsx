import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { CartProvider } from "./providers/cart-provider";
import theme from "./theme/theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "100",
});

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={poppins.className} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
              <Box
                sx={{
                  bgcolor: "background.default",
                }}
              />
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
