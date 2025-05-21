import { Box, IconButton, Link } from "@mui/material";
import Image from "next/image";
import CartIcon from "./cart-icon";
import TemporaryDrawer from "./drawer";
import CartWithDrawer from "./cart-with-drawer";

export default function Header() {
	return (
		<>
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
			</Box>
		</>
	);
}
