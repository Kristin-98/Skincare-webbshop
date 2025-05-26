"use client";

import { updateProduct } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { Prisma, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  stockQuantity: z.coerce.number().int().nonnegative("Stock must be a non-negative number"),
});

interface Props {
  product: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();

  const form = useForm<Prisma.ProductCreateInput>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  const handleSubmit = async (data: Prisma.ProductCreateInput) => {
    try {
      await updateProduct(product.id, data);
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
      }}
    >
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
        type="number"
        {...form.register("price")}
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
         type="number"
      {...form.register("stockQuantity", { valueAsNumber: true })}
       error={Boolean(form.formState.errors.stockQuantity)}
       helperText={form.formState.errors.stockQuantity?.message}
      />
      <TextField
        label="Image URL"
        {...form.register("image")}
        error={Boolean(form.formState.errors.image)}
        helperText={form.formState.errors.image?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}
