"use client";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

interface ProductToastProps {
	open: boolean;
	handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export default function ProductToast({ open, handleClose }: ProductToastProps) {
	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={(e) => handleClose(e, undefined)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message="Product has been added to cart"
				action={action}
			/>
		</div>
	);
}
