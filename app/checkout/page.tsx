import { Box, Typography } from "@mui/material";
import CheckoutForm from "./lib/checkout-form";
import OrderSummary from "./lib/order-summary";
import NotLoggedInRedirect from "./lib/login-alert-redirect";
import { getServerSession } from "../server-session";

export default async function CheckoutPage() {
	const session = await getServerSession();

	if (!session) {
		return <NotLoggedInRedirect />;
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
					<Typography variant="h5" mb={2} fontWeight="300">
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
