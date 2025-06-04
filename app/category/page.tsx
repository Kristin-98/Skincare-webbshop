import ProductCard from "@/app/components/product-card";
import { getAllProducts } from "@/app/product/[articleNumber]/[title]/product-actions";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { getAllCategories } from "./category-actions";

export default async function CategoryPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <Container>
      <Box sx={{ p: 2 }}>
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

        <Box
          sx={{
            paddingBottom: { sm: "5rem", xs: "3rem" },
            display: "grid",
            gridTemplateColumns: {
              md: "repeat(auto-fit, minmax(260px, 1fr))",
              sm: "repeat(auto-fit, minmax(245px, 1fr))",
            },
            gap: 5,
            justifyContent: { md: "center" },
          }}
        >
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
