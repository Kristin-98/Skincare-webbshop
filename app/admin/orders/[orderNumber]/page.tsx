import OrderStatusButton from "@/app/components/order-status-button";
import { db } from "@/prisma/db";
import {
  Box,
  CardMedia,
  List,
  ListItem,
  Typography,
  Divider,
} from "@mui/material";

interface Props {
  params: { orderNumber: string };
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { orderNumber } = params;

  // Fetch the order details from the database
  const order = await db.order.findUnique({
    where: { orderNumber },
    include: {
      customer: true,
      shippingAdress: true, // Include shipping address
      orderRows: {
        include: { product: true }, // Include product details for each order row
      },
    },
  });

  if (!order) {
    return (
      <main>
        <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
          404: Order not found
        </Typography>
      </main>
    );
  }

  const totalPrice = order.orderRows.reduce(
    (sum, row) => sum + row.price * row.quantity,
    0
  );

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          marginX: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ my: 2 }}>
          Order Details - Order Number: {order.orderNumber}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Customer: {order.customer.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Customer Email: {order.customer.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order Status: {order.status}
        </Typography>

        <OrderStatusButton
          orderNumber={order.orderNumber}
          initialStatus={order.status}
        />

        <Divider sx={{ my: 3, width: "80%" }} />

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Products in Order:
        </Typography>
        <List sx={{ width: "100%", maxWidth: 600 }}>
          {order.orderRows.map((row) => (
            <ListItem
              key={row.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderBottom: "1px solid #eee",
                py: 1,
              }}
            >
              <CardMedia
                sx={{ width: 80, height: 80, objectFit: "contain" }}
                component="img"
                src={row.product.image}
                alt={row.product.title}
              />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {row.product.title}
                </Typography>
                <Typography variant="body2">
                  Quantity: {row.quantity} pc(s)
                </Typography>
                <Typography variant="body2">
                  Price per item: {row.price} kr
                </Typography>
                <Typography variant="body2">
                  Total for item: {row.price * row.quantity} kr
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3, width: "80%" }} />

        <Typography variant="h5" fontWeight="bold" mt={2}>
          Total Order Price: {totalPrice.toFixed(2)} kr
        </Typography>

        {order.shippingAdress && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              Shipping Address:
            </Typography>
            <Typography variant="body1">
              {order.shippingAdress.streetAdress}
            </Typography>
            <Typography variant="body1">
              {order.shippingAdress.postalCode} {order.shippingAdress.city}
            </Typography>
            <Typography variant="body1">
              {order.shippingAdress.email}
            </Typography>
            <Typography variant="body1">
              {order.shippingAdress.phone}
            </Typography>
          </Box>
        )}
      </Box>
    </main>
  );
}
