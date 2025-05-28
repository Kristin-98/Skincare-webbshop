"use client";

import { signIn, signOut, useSession } from "@/app/auth-client";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuItem,
  Link as MuiLink,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import CartWithDrawer from "./cart-with-drawer";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="header"
      sx={{
        px: { xs: 1, sm: 2 },
        py: 1,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: { xs: 70, sm: 100 },
      }}
    >
      {/* Vänster: Meny */}
      <Box>{/* <TemporaryDrawer /> */}</Box>

      {/* Mitten: Logotyp */}
      <Box
        sx={{
          position: { xs: "static", sm: "absolute" },
          left: { sm: "50%" },
          transform: { sm: "translateX(-50%)" },
        }}
      >
        <NextLink href="/" passHref legacyBehavior>
          <MuiLink underline="none">
            <Image
              src="/logo.png"
              alt="Beauty"
              width={isMobile ? 60 : 100} // <-- Mindre logga på mobil
              height={isMobile ? 60 : 100}
            />
          </MuiLink>
        </NextLink>
      </Box>

      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 3 },
        }}
      >
        {user ? (
          <>
            <Box
              onClick={handleMenuOpen}
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: theme.palette.primary.main,
              }}
            >
              <AccountCircle sx={{ fontSize: isMobile ? 32 : 48 }} />
              {!isMobile && (
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {user.name ?? "User"}
                </Typography>
              )}
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user?.isAdmin && (
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  href="/admin"
                >
                  Admin
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  signOut();
                  handleMenuClose();
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            size={isMobile ? "small" : "medium"}
            onClick={() => signIn.social({ provider: "github" })}
          >
            Log in
          </Button>
        )}

        {/* Avstånd till Cart */}
        <Box sx={{ ml: isMobile ? 1 : 4 }}>
          <CartWithDrawer iconSize={isMobile ? "medium" : "large"} />
        </Box>
      </Box>
    </Box>
  );
}
