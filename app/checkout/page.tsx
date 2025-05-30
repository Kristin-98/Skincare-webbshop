import { Box, Typography } from "@mui/material";
import CheckoutForm from "./lib/checkout-form";
import OrderSummary from "./lib/order-summary";
import { redirect } from "next/navigation";
import { getServerSession } from "../server-session";

export default async function CheckoutPage() {
	const session = await getServerSession();
	if (!session) {
		throw new Error("must be logged in to checkout");
	}

	return (
		<main>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 4,
					margin: 4,
				}}
			>
				<Box
					sx={{
						width: { xs: "100%", md: "50%" },
						textAlign: "center",
					}}
				>
					<Typography
						variant="h2"
						sx={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							color: "primary.main",
							marginBottom: 3,
						}}
					>
						Order summary
					</Typography>
					<OrderSummary />
				</Box>

				<Box
					sx={{
						width: { xs: "100%", md: "50%" },
					}}
				>
					<CheckoutForm />
				</Box>
			</Box>
		</main>
	);
}
