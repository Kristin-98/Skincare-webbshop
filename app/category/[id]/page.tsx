import { getAllCategories } from "../category-actions";
import { getAllProducts } from "@/app/product/[articleNumber]/[title]/product-actions";
import ProductCard from "@/app/components/product-card";
import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";

interface Props {
	params: { id: string };
}

export default async function CategoryIdPage({ params }: Props) {
	const { id } = params;

	const [categories, products] = await Promise.all([
		getAllCategories(),
		getAllProducts(),
	]);

	const currentCategory = categories.find((c) => c.id === id);

	if (!currentCategory) {
		return (
			<Box sx={{ p: 4 }}>
				<Typography variant="h4">Category not found</Typography>
			</Box>
		);
	}

	const filteredProducts = products.filter((p) =>
		p.categories.some((cat) => cat.id === currentCategory.id)
	);

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom>
				{currentCategory.name}
			</Typography>

			{currentCategory.description && (
				<Typography variant="body1" gutterBottom>
					{currentCategory.description}
				</Typography>
			)}

			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3, mb: 4 }}>
				<Link href="/category" passHref>
					<Button variant="outlined">All Products</Button>
				</Link>

				{categories.map((cat) => (
					<Link key={cat.id} href={`/category/${cat.id}`} passHref>
						<Button variant={cat.id === id ? "contained" : "outlined"}>
							{cat.name}
						</Button>
					</Link>
				))}
			</Box>

			<Grid container spacing={2}>
				{filteredProducts.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
