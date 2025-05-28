import { db } from "@/prisma/db";
import { Box, Typography } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import OrderProductList from "../components/order-product-list";

export default async function CustomerOrderHistory() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const orders = await db.order.findMany({
    where: { customerId: session.user.id },
    include: {
      orderRows: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "80vh",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem" },
        }}
      >
        Your Orders
      </Typography>

      {orders.map((order) => (
        <Box
          sx={{
            margin: "0.3rem",
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600 },
            backgroundColor: "background.paper",
            color: "primary.main",
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: 2,
          }}
          key={order.orderNumber}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="body1">
                Ordernumber: {order.orderNumber}
              </Typography>
              <Typography variant="body2">
                Totalprice: {order.totalPrice} kr
              </Typography>
              <OrderProductList
                orderRows={order.orderRows}
                orderStatus={order.status}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
