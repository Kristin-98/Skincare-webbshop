"use client";

import { signIn, signOut, useSession } from "@/app/auth-client";
import { getAllCategories } from "@/app/category/category-actions";
import { AccountCircle, ExpandMore } from "@mui/icons-material";
import {
	Box,
	Button,
	Link,
	Menu,
	MenuItem,
	Link as MuiLink,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import CartWithDrawer from "./cart-with-drawer";

interface Category {
	id: string;
	name: string;
}

export default function Header() {
	const { data: session } = useSession();
	const user = session?.user;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElCat, setAnchorElCat] = React.useState<null | HTMLElement>(
		null
	);

	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getAllCategories().then(setCategories).catch(console.error);
	}, []);

	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleUserMenuClose = () => {
		setAnchorElUser(null);
	};

	const handleCatMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElCat(event.currentTarget);
	};
	const handleCatMenuClose = () => {
		setAnchorElCat(null);
	};

	return (
		<Box
			component="header"
			sx={{
				px: 2,
				py: 1,
				color: "palette.primary.main",
				position: "sticky",
				top: 0,
				zIndex: 1000,
				backgroundColor: "background.default",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				height: 100,
			}}
		>
			<Box>
				<Button
					color="inherit"
					endIcon={<ExpandMore />}
					onClick={handleCatMenuOpen}
				>
					categories
				</Button>

				<Menu
					anchorEl={anchorElCat}
					open={Boolean(anchorElCat)}
					onClose={handleCatMenuClose}
				>
					{categories.map((category) => (
						<MenuItem
							key={category.id}
							onClick={handleCatMenuClose}
							component={NextLink}
							href={`/categories/${category.id}`}
						>
							{category.name}
						</MenuItem>
					))}
				</Menu>
			</Box>

			{/* Mitten: Logotyp */}
			<Box
				sx={{
					...(isMobile
						? {
								ml: 0,
								position: "static",
								transform: "none",
						  }
						: {
								position: "absolute",
								left: "50%",
								transform: "translateX(-50%)",
						  }),
				}}
			>
				<NextLink href="/" passHref legacyBehavior>
					<MuiLink underline="none">
						<Image src="/logo.png" alt="Beauty" width={100} height={100} />
					</MuiLink>
				</NextLink>
			</Box>

			{/* Höger: Användarikon & varukorg */}
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{user ? (
					<>
						<Box
							onClick={handleUserMenuOpen}
							sx={{
								cursor: "pointer",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								color: theme.palette.primary.main,
							}}
						>
							<AccountCircle sx={{ fontSize: 48 }} />
							<Typography variant="caption" sx={{ mt: 0.5 }}>
								{user.name ?? "Användare"}
							</Typography>
						</Box>

						<Menu
							anchorEl={anchorElUser}
							open={Boolean(anchorElUser)}
							onClose={handleUserMenuClose}
						>
							{user?.isAdmin && (
								<MenuItem
									onClick={handleUserMenuClose}
									component={Link}
									href="/admin"
								>
									Admin
								</MenuItem>
							)}
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                href="/customer-order-history"
              >
                Your Orders
              </MenuItem>
							<MenuItem
								onClick={() => {
									signOut();
									handleUserMenuClose();
								}}
							>
								Log out
							</MenuItem>
						</Menu>
					</>
				) : (
					<Button
						variant="outlined"
						color="primary"
						onClick={() => signIn.social({ provider: "github" })}
					>
						Log in
					</Button>
				)}

				<Box sx={{ ml: 6, mr: 3 }}>
					<CartWithDrawer />
				</Box>
			</Box>
		</Box>
	);
}
