"use client";
import { addNewProduct } from "@/app/product-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	price: z.coerce.number().positive("Price must be a positive number"),
	image: z.string().url("Image must be a valid URL"),
	categoryId: z.string().min(1, "Category is required"),
	stockQuantity: z.coerce.number().int().nonnegative("Stock must be a number"),
});

export default function AdminForm() {
	const form = useForm<Prisma.ProductCreateInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: "",
			description: "",
			price: 0,
			image: "",
			categoryId: "",
			stockQuantity: 0,
		},
	});

	const handleSubmit = async (product: Prisma.ProductCreateInput) => {
		console.log("Submitting product:", product);
		try {
			await addNewProduct(product);
			form.reset();
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	return (
		<main>
			<Box
				component="form"
				onSubmit={form.handleSubmit(handleSubmit)}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					maxWidth: 400,
					mx: "auto",
					marginBottom: "50px",
					marginTop: "70px",
				}}
			>
				<Typography
					variant="h3"
					sx={{
						display: "flex",
						justifyContent: "center",
						fontSize: "2.5rem",
						fontWeight: "bold",
						color: "primary.main",
						marginBottom: 9,
					}}
				>
					Lägg till en produkt
				</Typography>
				<TextField
					label="Title"
					{...form.register("title")}
					error={Boolean(form.formState.errors.title)}
					helperText={form.formState.errors.title?.message}
				/>
				<TextField
					label="Description"
					{...form.register("description")}
					error={Boolean(form.formState.errors.description)}
					helperText={form.formState.errors.description?.message}
				/>
				<TextField
					label="Price"
					{...form.register("price", { valueAsNumber: true })}
					error={Boolean(form.formState.errors.price)}
					helperText={form.formState.errors.price?.message}
				/>
				<TextField
					label="Category ID"
					{...form.register("categoryId")}
					error={Boolean(form.formState.errors.categoryId)}
					helperText={form.formState.errors.categoryId?.message}
				/>
				<TextField
					label="Stock Quantity"
					{...form.register("stockQuantity", { valueAsNumber: true })}
					error={Boolean(form.formState.errors.stockQuantity)}
					helperText={form.formState.errors.stockQuantity?.message}
				/>
				<TextField
					label="Image"
					{...form.register("image")}
					error={Boolean(form.formState.errors.image)}
					helperText={form.formState.errors.image?.message}
				/>
				<Button type="submit" variant="contained" color="primary">
					Add Product
				</Button>
			</Box>
		</main>
	);
}
