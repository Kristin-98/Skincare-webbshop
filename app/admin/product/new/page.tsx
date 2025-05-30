"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Category, Prisma } from "@prisma/client";
import { getAllCategories } from "@/app/category/category-actions";
import { addNewProduct } from "@/app/product/[articleNumber]/[title]/product-actions";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Image must be a valid URL"),
  stockQuantity: z.coerce.number().int().nonnegative("Stock must be a number"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
});

type FormValues = z.infer<typeof schema>;

export default function AdminForm() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: "",
      stockQuantity: 0,
      categories: [],
    },
  });

  useEffect(() => {
    getAllCategories()
      .then(setAllCategories)
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleSubmit = async (data: FormValues) => {
    try {
      const product: Prisma.ProductCreateInput = {
        title: data.title,
        description: data.description,
        price: data.price,
        image: data.image,
        stockQuantity: data.stockQuantity,
        categories: {
          connect: data.categories.map((id) => ({ id })),
        },
      };

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
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "primary.main",
            marginBottom: 9,
          }}
        >
          Add new product
        </Typography>

        <TextField
          label="Title"
          {...form.register("title")}
          error={!!form.formState.errors.title}
          helperText={form.formState.errors.title?.message}
        />

        <TextField
          label="Description"
          {...form.register("description")}
          error={!!form.formState.errors.description}
          helperText={form.formState.errors.description?.message}
        />

        <TextField
          label="Price"
          type="number"
          {...form.register("price")}
          error={!!form.formState.errors.price}
          helperText={form.formState.errors.price?.message}
        />

        <TextField
          label="Stock Quantity"
          type="number"
          {...form.register("stockQuantity")}
          error={!!form.formState.errors.stockQuantity}
          helperText={form.formState.errors.stockQuantity?.message}
        />

        <TextField
          label="Image URL"
          {...form.register("image")}
          error={!!form.formState.errors.image}
          helperText={form.formState.errors.image?.message}
        />

        <FormControl error={!!form.formState.errors.categories}>
          <InputLabel>Categories</InputLabel>
          <Controller
            name="categories"
            control={form.control}
            render={({ field }) => (
              <Select
                multiple
                value={field.value}
                onChange={field.onChange}
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => allCategories.find((cat) => cat.id === id)?.name)
                    .filter(Boolean)
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

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </main>
  );
}
