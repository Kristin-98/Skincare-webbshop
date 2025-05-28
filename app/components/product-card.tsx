import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";

interface Props {
	product: Product;
	children?: React.ReactNode;
}

export default function ProductCard({ product, children }: Props) {
	return (
		<Card sx={{ maxWidth: 345, marginTop: 4 }}>
			<Link
				href={`/product/${product.articleNumber}/${encodeURIComponent(
					product.title
				)}`}
			>
				<CardMedia
					sx={{ height: 300 }}
					component="img"
					image={product.image}
					key={product.id}
				></CardMedia>
			</Link>
			<Typography variant="h6" sx={{ boxSizing: "border-box", paddingLeft: 2 }}>
				{product.title}
			</Typography>
			<Typography variant="body2" sx={{ paddingLeft: 2 }}>
				{product.articleNumber}
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					variant="body1"
					sx={{ boxSizing: "border-box", paddingLeft: 2 }}
				>
					Price: {product.price} kr
				</Typography>
				{children}
			</Box>
		</Card>
	);
}
