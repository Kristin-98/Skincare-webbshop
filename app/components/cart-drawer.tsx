"use client";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "../auth-client";
import IncreaseDecreaseBtn from "../components/increase-decrease-btn";
import { useCart } from "../providers/cart-provider";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: {
            xs: 280,
            sm: 320,
            md: 350,
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Cart</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <List>
            {cart.length === 0 ? (
              <Typography textAlign="center">Cart is empty</Typography>
            ) : (
              cart.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    py: 2,
                    px: 0,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {/* Titel ovanför */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.light,
                      fontSize: { xs: 14, sm: "1.2rem" },
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
                        sx={{ width: 80, height: 80 }}
                        variant="square"
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
                        }}
                      >
                        Amount: {item.quantity}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.9rem" },
                          fontWeight: "bold",
                        }}
                      >
                        Price: {item.price * item.quantity} kr
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IncreaseDecreaseBtn
                        productId={item.id}
                        quantity={item.quantity}
                        onUpdate={updateQuantity}
                      />
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: theme.palette.primary.main }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
              ))
            )}
          </List>

          {cart.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="subtitle1">Total:</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                >
                  {totalPrice.toFixed(2)} kr
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  router.push("/checkout");
                }}
              >
                To Checkout
              </Button>
            </>
          )}
        </Box>

        {/* ---- Foten ---- */}
        {user && (
          <Box sx={{ mt: 2, mb: 2 }}>
            {user.isAdmin && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mb: 1 }}
                onClick={() => {
                  onClose();
                  router.push("/admin");
                }}
              >
                Admin
              </Button>
            )}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
