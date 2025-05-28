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
              flexDirection: "column",
              gap: 1,
              paddingY: 2,
              paddingX: 0,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.light,
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              {item.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 100, height: 100 }}
                />
              </ListItemAvatar>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.9rem" },
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Amount: {item.quantity}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.9rem" },
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Price:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.9rem" },
                      fontWeight: "bold",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.price * item.quantity} SEK
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  whiteSpace: "nowrap",
                }}
              >
                <IncreaseDecreaseBtn
                  productId={item.id}
                  quantity={item.quantity}
                  onUpdate={updateQuantity}
                />
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
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
            Total:
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
