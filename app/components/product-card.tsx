import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";

interface Props {
  product: Product;
  children?: React.ReactNode;
}

export default function ProductCard({ product, children }: Props) {
  return (
    <Card data-cy="product" sx={{ maxWidth: 345, marginTop: 4 }}>
      <Link
        href={`/product/${product.articleNumber}/${encodeURIComponent(
          product.title
        )}`}
      >
        <CardMedia
          sx={{ height: 300 }}
          component="img"
          image={product.image}
          key={product.id}
        ></CardMedia>
      </Link>
      <Typography
        variant="h6"
        data-cy="product-title"
        sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
      >
        {product.title}
      </Typography>
      <Typography data-cy="product-id" variant="body2">
        {product.articleNumber}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          data-cy="product-price"
          sx={{ boxSizing: "border-box", paddingLeft: 0.5 }}
        >
          Pris: {product.price} kr
        </Typography>
        {children}
      </Box>
    </Card>
  );
}
