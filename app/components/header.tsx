"use client";

import { signIn, signOut, useSession } from "@/app/auth-client";
import { Box, Button, IconButton, Link } from "@mui/material";
import Image from "next/image";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";
import CartWithDrawer from "./cart-with-drawer";

export default function Header() {

  const { data, isPending } = useSession();
  const user = data?.user;

  return (
    <Box
      component="header"
      sx={{
        padding: 1,
        color: "palette.primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "background.default",
      }}
    >
      <TemporaryDrawer />
      <Link href="/">
        <Image src="/logo.png" alt="Beauty" width={100} height={100} />
      </Link>
      				<CartWithDrawer />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link data-cy="cart-link" href="/checkout">
          <IconButton data-cy="cart-items-count-badge" color="primary">
            <CartIcon />
          </IconButton>
        </Link>

        {user ? (
          <Button onClick={() => signOut()}>
            Sign Out ({user.name ?? "User"})
          </Button>
        ) : (
          <Button onClick={() => signIn.social({ provider: "github" })}>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
}
