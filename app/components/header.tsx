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

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      component="header"
      sx={{
        px: { xs: 1, sm: 2 },
        py: 1,
        color: theme.palette.primary.main,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        height: { xs: 70, sm: 100 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          color="inherit"
          size={isMobile ? "small" : "medium"}
          component={NextLink}
          href="/category"
        >
          Categories
        </Button>
      </Box>

      <Box
        sx={{
          position: { xs: "static", sm: "absolute" },
          left: { sm: "50%" },
          transform: { sm: "translateX(-50%)" },
          zIndex: 1100,
        }}
      >
        <NextLink href="/" passHref legacyBehavior>
          <MuiLink underline="none" sx={{ display: "inline-block" }}>
            <Image
              src="/sf-logga.png"
              alt="Scandiloggo"
              width={isMobile ? 90 : 150}
              height={isMobile ? 45 : 75}
              priority
            />
          </MuiLink>
        </NextLink>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: { xs: 1, sm: 3 },
          marginRight: { xs: 1, sm: 3 },
        }}
      >
        {user ? (
          <>
            <Box
              onClick={handleUserMenuOpen}
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: theme.palette.primary.main,
                userSelect: "none",
              }}
            >
              <AccountCircle sx={{ fontSize: isMobile ? 32 : 40 }} />
              {!isMobile && (
                <Typography variant="caption" sx={{ fontSize: 15 }}>
                  {user.name ?? "User"}
                </Typography>
              )}
            </Box>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenuClose}
            >
              {user?.isAdmin && (
                <MenuItem
                  onClick={handleUserMenuClose}
                  component={Link}
                  href="/admin"
                >
                  Admin
                </MenuItem>
              )}
              <MenuItem
                onClick={handleUserMenuClose}
                component={Link}
                href="/customer-order-history"
              >
                Your Orders
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut();
                  handleUserMenuClose();
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

        <CartWithDrawer iconSize={isMobile ? "medium" : "large"} />
      </Box>
    </Box>
  );
}
