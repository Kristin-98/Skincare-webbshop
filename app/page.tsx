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
      {/* <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 400, lg: 300 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          overflow: 'hidden',
          '@media (max-width: 1280px)': {
            height: 600,
          },
        }}
      >
        <Image
          src="https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
        />
      </Box> */}
      {/* <HeroText /> */}
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
