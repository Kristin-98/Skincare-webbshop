"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import IncreaseDecreaseBtn from "@/app/components/increase-decrease-btn";
import { useCart } from "@/app/providers/cart-provider";
import theme from "@/app/theme/theme";

interface OrderSummaryProps {
  showControls?: boolean;
}

export default function OrderSummary({
  showControls = true,
}: OrderSummaryProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <List sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
      {cart.length === 0 ? (
        <ListItem>
          <ListItemText
            sx={{ display: "flex", justifyContent: "center" }}
            primary="Your cart is empty"
          />
        </ListItem>
      ) : (
        cart.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={item.image}
                alt={item.title}
                sx={{ width: 100, height: 100 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.light,
                  }}
                >
                  {item.title}
                </Typography>
              }
              secondary={`Antal: ${item.quantity}`}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <ListItemText
                primary={`Pris: ${item.price * item.quantity} SEK`}
              />
            </Box>
            {showControls && (
              <>
                <IncreaseDecreaseBtn
                  productId={item.id}
                  quantity={item.quantity}
                  onUpdate={updateQuantity}
                />
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    color: theme.palette.primary.main,
                    marginTop: 1,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        ))
      )}
      {cart.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Totalpris:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}{" "}
            SEK
          </Typography>
        </Box>
      )}
    </List>
  );
}
