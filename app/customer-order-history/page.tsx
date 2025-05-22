import { db } from "@/prisma/db";
import { Box, Typography } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function CustomerOrderHistory() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) redirect("/signin");

  const orders = await db.order.findMany({
    where: { customerId: session.user.id },
    // include: { orderRows: true, shippingAdress: true },
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
        Orderhistorik
      </Typography>

      {orders.map((order) => (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600 },
            backgroundColor: "background.paper",
            color: "primary.main",
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Ordernummer: {order.totalPrice}
            <Box
              component="span"
              sx={{
                display: "inline-block",
                ml: 1,
                px: 1.2,
                py: 0.3,
                backgroundColor: "primary.main",
                color: "#fff",
                borderRadius: 1,
              }}
            >
              Skickad
            </Box>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
