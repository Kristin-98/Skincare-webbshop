import { db } from "@/prisma/db";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import BuyButton from "./components/buy-button";
import Hero from "./components/hero";
import ProductCard from "./components/product-card";

export default async function Home() {
  const products = await db.product.findMany();
  return (
    <main>
      <Hero />
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4 }} key={product.id}>
              <ProductCard product={product}>
                <BuyButton product={product} />
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
