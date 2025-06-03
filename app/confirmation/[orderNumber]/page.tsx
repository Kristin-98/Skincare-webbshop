import { db } from "@/prisma/db";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function ConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = await db.order.findUnique({
    where: { orderNumber },
    include: {
      customer: true,
      shippingAdress: true,
      orderRows: { include: { product: true } },
    },
  });

  if (!order) {
    return <main>404</main>;
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
          Thank you for your order, {order.customer.name}!
        </Typography>
        <Divider sx={{ my: 3, width: "80%" }} />
        <Typography variant="body1" sx={{ my: 2 }}>
          Your order number is : {order.orderNumber}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Ordered products :
        </Typography>
        <List sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
          {order.orderRows.map((row) => (
            <ListItem
              key={row.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                py: 2,
                px: 0,
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                {row.product.title}
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
                <Avatar
                  src={row.product.image}
                  alt={row.product.title}
                  sx={{ width: 100, height: 100 }}
                />
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
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: "bold",
                    }}
                  >
                    Amount: {row.quantity}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: "bold",
                    }}
                  >
                    Price: {row.price * row.quantity} SEK
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Total :
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {totalPrice.toFixed(2)} SEK
          </Typography>
        </Box>

        <Divider sx={{ my: 3, width: "80%" }} />

        <Typography variant="body1" sx={{ my: 2 }}>
          Your items will be delivered to : <br />
          {order.shippingAdress.name} <br />
          {order.shippingAdress.streetAdress} <br />
          {order.shippingAdress.postalCode} <br />
          {order.shippingAdress.city}
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          A confirmation email has been sent to : {order.shippingAdress.email}
        </Typography>

        <Typography variant="body1" sx={{ my: 2 }}>
          You will receive a text message when the delivery arrives :{" "}
          {order.shippingAdress.phone}
        </Typography>
      </Box>
    </main>
  );
}
