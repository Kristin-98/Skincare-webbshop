"use client";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import ProductCard from "../components/product-card";

interface Category {
	id: string;
	name: string;
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

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant="h4" mb={2}>
				Filter Products
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

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "1fr 1fr",
						md: "1fr 1fr 1fr",
					},
					gap: 3,
				}}
			>
				{filtered.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Box>
		</Box>
	);
}
