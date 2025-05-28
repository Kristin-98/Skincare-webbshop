"use client";

import { ShoppingCart } from "@mui/icons-material";
import { Badge, SvgIconProps, useMediaQuery, useTheme } from "@mui/material";
import { useCart } from "../providers/cart-provider";

export default function CartIcon(props: SvgIconProps) {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Badge
      badgeContent={cartCount}
      color="primary"
      sx={{
        "& .MuiBadge-badge": {
          fontSize: isMobile ? "0.6rem" : "0.75rem",
          minWidth: isMobile ? 16 : 20,
          height: isMobile ? 16 : 20,
        },
      }}
    >
      <ShoppingCart {...props} fontSize={isMobile ? "medium" : "large"} />
    </Badge>
  );
}
