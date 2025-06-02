import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Divider, IconButton, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "primary.main",
				py: 4,
				px: 2,
				mt: 4,
				color: "#efebe9",
				textAlign: "center",
				boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.15)",
				"@media (min-width: 600px)": {
					px: 6,
				},
			}}
		>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				gap={4}
				sx={{ mb: 4 }}
			>
				<Typography>
					<Link href="/admin" underline="none" color="#efebe9">
						Admin
					</Link>
				</Typography>
				<Typography>Return</Typography>
				<Typography>Contact</Typography>
				<Typography>About</Typography>
				<Typography>FAQ</Typography>
			</Box>

			<Divider sx={{ my: 4 }} />

			{/* Sociala medier + logotyp */}
			<Box
				sx={{
					display: "grid",

					justifyContent: "center",
					gap: 2,
					alignItems: "center",
				}}
			>
				<Box>
					<Typography>Följ oss:</Typography>
					<IconButton
						href="#"
						aria-label="Facebook"
						sx={{
							color: "#efebe9",
							transition: "transform 0.3s",
							"&:hover": { transform: "scale(1.5)", color: "#1877f2" },
						}}
					>
						<Facebook />
					</IconButton>
					<IconButton
						href="#"
						aria-label="GitHub"
						sx={{
							color: "#efebe9",
							transition: "transform 0.3s",
							"&:hover": { transform: "scale(1.5)", color: "#000" },
						}}
					>
						<GitHub />
					</IconButton>
					<IconButton
						href="#"
						aria-label="LinkedIn"
						sx={{
							color: "#efebe9",
							transition: "transform 0.3s",
							"&:hover": { transform: "scale(1.5)", color: "#0077b5" },
						}}
					>
						<LinkedIn />
					</IconButton>
					<IconButton
						href="#"
						aria-label="Instagram"
						sx={{
							color: "#efebe9",
							transition: "transform 0.3s",
							"&:hover": { transform: "scale(1.5)", color: "#e11d74" },
						}}
					>
						<Instagram />
					</IconButton>
				</Box>

				<Image
					src="/sf-logga.png"
					alt="Beauty"
					width={100}
					height={50}
					style={{ margin: "auto" }}
				/>
			</Box>
		</Box>
	);
}
