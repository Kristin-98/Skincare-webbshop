import OrderProductList from "@/app/components/order-product-list";
import OrderStatusButton from "@/app/components/order-status-button";
import { db } from "@/prisma/db";
import { Box, Divider, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

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
      shippingAdress: true,
      orderRows: {
        include: { product: true },
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
      
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            my: 2,
            fontSize: {
              xs: "1.5rem",  
              sm: "2rem",
              md: "2.5rem",  
            },
            textAlign: "center",
            wordBreak: "break-word",  
          }}
        >
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
        <OrderProductList
          orderRows={order.orderRows}
          orderStatus={order.status}
        />
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
