"use client";

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Prisma, Category, Product } from "@prisma/client";

import { getAllCategories } from "@/app/product/get-all-categories";
import { createProduct } from "@/app/product/create-product";
import { updateProduct } from "@/app/product/[articleNumber]/[title]/product-actions";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  stockQuantity: z.coerce.number().int().nonnegative("Stock must be a non-negative number"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

interface Props {
  product?: Product & { categories?: Category[] };
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      categories: product?.categories?.map((cat) => cat.id) || [],
      price: product?.price || 0,
      image: product?.image || "",
      stockQuantity: product?.stockQuantity || 0,
    },
  });

  // Hämta kategorier
  useEffect(() => {
    getAllCategories().then(setAllCategories).catch(console.error);
  }, []);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const prismaData: Prisma.ProductCreateInput = {
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        stockQuantity: data.stockQuantity,
        categories: {
          connect: data.categories.map((id) => ({ id })),
        },
      };

      if (product?.id) {
        await updateProduct(product.id, prismaData);
      } else {
        await createProduct(prismaData);
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error saving product:", error);
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
      <FormControl error={Boolean(form.formState.errors.categories)}>
        <InputLabel>Categories</InputLabel>
        <Controller
          control={form.control}
          name="categories"
          render={({ field }) => (
            <Select
              multiple
              value={field.value}
              onChange={field.onChange}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) =>
                allCategories
                  .filter((c) => selected.includes(c.id))
                  .map((c) => c.name)
                  .join(", ")
              }
            >
              {allCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Checkbox checked={field.value.includes(category.id)} />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{form.formState.errors.categories?.message}</FormHelperText>
      </FormControl>
      <TextField
        label="Price"
        type="number"
        {...form.register("price")}
        error={Boolean(form.formState.errors.price)}
        helperText={form.formState.errors.price?.message}
      />
      <TextField
        label="Stock Quantity"
        type="number"
        {...form.register("stockQuantity")}
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
        {product ? "Save changes" : "Create new product"}
      </Button>
    </Box>
  );
}
