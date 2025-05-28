"use client";

import { IconButton } from "@mui/material";
import { useState } from "react";
import CartDrawer from "./cart-drawer";
import CartIcon from "./cart-icon";

interface Props {
  iconSize?: "small" | "medium" | "large";
}

export default function CartWithDrawer({ iconSize = "medium" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="primary">
        <CartIcon fontSize={iconSize} />
      </IconButton>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
