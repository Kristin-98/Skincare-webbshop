import { getAllProducts } from "@/app/actions";
import ProductCard from "@/app/components/product-card";
import { Edit } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import DeleteBtn from "./delete-btn";

export default async function AdminCard() {
  const products = await getAllProducts();

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 6, md: 4 }} key={product.id}>
              <ProductCard product={product}>
                <Box sx={{display: "block",}}>
                  <Typography variant="body2">
                    Category ID: {product.categoryId}
                  </Typography>
                  <Typography variant="body2">
                    Stock Quantity: {product.stockQuantity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gap: 0.5,
                    mt: 2,
                    minWidth: "auto",
                    padding: "1px",
                    display: "inline-flex",
                    type: "submit",
                    color: "primary.main",
                  }}
                >
                  <Button color="primary" sx={{ minWidth: "auto" }}>
                    <Link href={`/admin/product/${product.articleNumber}`}>
                      <Edit color="primary" data-cy="admin-edit-product" />
                    </Link>
                  </Button>
                  <DeleteBtn productId={product.articleNumber} />
                </Box>                
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
