"use client";

import {
	Box,
	Checkbox,
	Container,
	FormControlLabel,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import ProductCard from "../components/product-card";

interface Category {
	id: string;
	name: string;
	description: string;
}

interface Product {
	id: string;
	title: string;
	image: string;
	price: number;
	articleNumber: string;
	description: string;
	stockQuantity: number;
	categories: Category[];
}

export default function CategoryPageClient({
	categories,
	products,
}: {
	categories: Category[];
	products: Product[];
}) {
	const [selected, setSelected] = useState<string[]>([]);

	const toggle = (id: string) => {
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
		);
	};

	const filtered = selected.length
		? products.filter((p) =>
				p.categories.some((cat) => selected.includes(cat.id))
		  )
		: products;

	const selectedCategoryDescriptions = categories.filter((cat) =>
		selected.includes(cat.id)
	);

	return (
		<Container sx={{ mt: 4 }}>
			<Typography variant="h4" mb={2} fontWeight="400">
				Products
			</Typography>

			<Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
				{categories.map((cat) => (
					<FormControlLabel
						key={cat.id}
						control={
							<Checkbox
								checked={selected.includes(cat.id)}
								onChange={() => toggle(cat.id)}
							/>
						}
						label={cat.name}
					/>
				))}
			</Box>

			{selectedCategoryDescriptions.length > 0 && (
				<Box sx={{ mb: 4 }}>
					{selectedCategoryDescriptions.map((cat) => (
						<Box key={cat.id} sx={{ mb: 2 }}>
							<Typography variant="h6">{cat.name}</Typography>
							<Typography variant="body2">{cat.description}</Typography>
						</Box>
					))}
				</Box>
			)}

			<Grid container spacing={2}>
				{filtered.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
