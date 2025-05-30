import { db } from "@/prisma/db";
import { Box, Typography } from "@mui/material";
import ProductForm from "../product-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  const { id: articleNumber } = await params;
  const product = await db.product.findUnique({ where: { articleNumber } });

  if (!product) {
    return <p>404</p>;
  }

  return (
    <Box
      sx={{
        marginTop: "70px",
        marginBottom: "50px",
      }}
      component="main"
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
        Edit product
      </Typography>
      <ProductForm product={product} />
    </Box>
  );
}
