"use client";

import { IconButton } from "@mui/material";
import { useState } from "react";
import CartDrawer from "./cart-drawer";
import CartIcon from "./cart-icon";

export default function CartWithDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <CartIcon />
      </IconButton>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
