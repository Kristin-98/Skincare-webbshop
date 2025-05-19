"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Product } from "@prisma/client";
import { useState } from "react";
import { useCart } from "../providers/cart-provider";
import ProductToast from "./product-toast";

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        data-cy="product-buy-button"
        variant="contained"
        sx={{ margin: 0.5, bgcolor: "palette.primary.main" }}
        onClick={handleClick}
      >
        <AddShoppingCart />
      </Button>
      <ProductToast
        data-cy="added-to-cart-toast"
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
