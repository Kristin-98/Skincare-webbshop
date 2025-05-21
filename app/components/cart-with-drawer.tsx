"use client";

import { useState } from "react";
import { IconButton } from "@mui/material";
import CartIcon from "./cart-icon";
import CartDrawer from "./cart-drawer";

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
