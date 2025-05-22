"use client";

import {
	Avatar,
	Box,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	Typography,
	Button,
	Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../providers/cart-provider";
import IncreaseDecreaseBtn from "../components/increase-decrease-btn";
import theme from "../theme/theme";
import { useRouter } from "next/navigation";
import { useSession, signIn, signUp } from "../auth-client";

export default function CartDrawer({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const router = useRouter();
	const { cart, updateQuantity, removeFromCart } = useCart();
	const { data } = useSession();
	const user = data?.user;

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<Box sx={{ width: 350, p: 2 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6">Cart</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Divider sx={{ my: 2 }} />

				<List>
					{cart.length === 0 ? (
						<Typography textAlign="center">Cart is empty</Typography>
					) : (
						cart.map((item) => (
							<ListItem
								key={item.id}
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 1,
									borderBottom: "1px solid #ddd",
									py: 1,
								}}
							>
								<ListItemAvatar sx={{ minWidth: "unset", mr: 1 }}>
									<Avatar
										src={item.image}
										alt={item.title}
										sx={{ width: 60, height: 60 }}
										variant="square"
									/>
								</ListItemAvatar>

								<Box sx={{ flexGrow: 1, minWidth: 0 }}>
									<Typography
										variant="subtitle2"
										sx={{
											fontWeight: "bold",
											color: theme.palette.primary.light,
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{item.title}
									</Typography>
									<Typography variant="body2">
										{item.price * item.quantity} kr
									</Typography>
								</Box>

								<Box>
									<IncreaseDecreaseBtn
										productId={item.id}
										quantity={item.quantity}
										onUpdate={updateQuantity}
									/>
								</Box>

								<IconButton
									onClick={() => removeFromCart(item.id)}
									sx={{ color: theme.palette.primary.main }}
								>
									<DeleteIcon />
								</IconButton>
							</ListItem>
						))
					)}
				</List>

				{cart.length > 0 && (
					<>
						<Divider sx={{ my: 2 }} />

						<Box
							sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
						>
							<Typography variant="subtitle1">Total:</Typography>
							<Typography
								variant="subtitle1"
								sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
							>
								{totalPrice.toFixed(2)} kr
							</Typography>
						</Box>

						{user ? (
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => {
									onClose();
									router.push("/checkout");
								}}
							>
								Proceed to checkout
							</Button>
						) : (
							<Box sx={{ textAlign: "center", mt: 2 }}>
								<Typography variant="body1" sx={{ mb: 1 }}>
									You need to be logged in to checkout
								</Typography>
								<Button
									variant="outlined"
									color="primary"
									onClick={() => signIn.social({ provider: "github" })}
								>
									Sign In
								</Button>
							</Box>
						)}
					</>
				)}
			</Box>
		</Drawer>
	);
}
