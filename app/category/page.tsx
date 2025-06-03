import { getAllCategories } from "./category-actions";
import { getAllProducts } from "@/app/product/[articleNumber]/[title]/product-actions";
import ProductCard from "@/app/components/product-card";
import { Box, Typography, Grid, Button } from "@mui/material";
import Link from "next/link";

export default async function CategoryPage() {
	const [categories, products] = await Promise.all([
		getAllCategories(),
		getAllProducts(),
	]);

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom>
				All Products
			</Typography>

			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3, mb: 4 }}>
				<Link href="/category" passHref>
					<Button variant="contained">All Products</Button>
				</Link>

				{categories.map((cat) => (
					<Link key={cat.id} href={`/category/${cat.id}`} passHref>
						<Button variant="outlined">{cat.name}</Button>
					</Link>
				))}
			</Box>

			<Grid container spacing={2}>
				{products.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
