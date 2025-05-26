"use client";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box, Button, Typography } from "@mui/material";

interface IncreaseDecreaseBtnProps {
	productId: string;
	quantity: number;
	onUpdate: (id: string, amount: number) => void;
}

export default function IncreaseDecreaseBtn({
	productId,
	quantity,
	onUpdate,
}: IncreaseDecreaseBtnProps) {
	return (
		<Box
			sx={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 0.5,
				mx: "auto",
			}}
		>
			<Button
				variant="contained"
				color="primary"
				sx={{ minWidth: "auto", padding: "4px" }}
				onClick={() => onUpdate(productId, 1)}
			>
				<ArrowDropUpIcon />
			</Button>
			<Typography>{quantity}</Typography>
			<Button
				variant="contained"
				color="primary"
				sx={{ minWidth: "auto", padding: "4px" }}
				onClick={() => onUpdate(productId, -1)}
			>
				<ArrowDropDownIcon />
			</Button>
		</Box>
	);
}
