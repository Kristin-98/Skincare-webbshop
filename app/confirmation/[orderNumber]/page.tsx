import { db } from "@/prisma/db";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";

interface Props {
  params: { orderNumber: string };
}

export default async function ConfirmationPage({ params }: Props) {
  const { orderNumber } = params;
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
          Tack för din order, {order.customer.name}!
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Ditt ordernummer är : {order.orderNumber}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Beställda produkter:
        </Typography>
        <List>
          {order.orderRows.map((row) => (
            <ListItem
              key={row.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={row.product.image}
                  sx={{ width: 100, height: 100 }}                 
                />
              </ListItemAvatar>
              {/* <CardMedia
                sx={{ height: 300, objectFit: "contain" }}
                component="img"
                src={row.product.image}
              ></CardMedia> */}
              <Typography variant="body1">
                {row.product.title} : {row.quantity} st {row.price} kr
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Totalt : {totalPrice.toFixed(2)} kr
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Dina varor levereras till : <br /> {order.shippingAdress.name}
          <br />
          {order.shippingAdress.streetAdress}
          <br /> {order.shippingAdress.postalCode}
          <br /> {order.shippingAdress.city}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Ett bekräftelsemail har skickats till din epost :{" "}
          {order.shippingAdress.email}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          När leveransen är framme kommer vi skicka ett SMS till ditt
          telefonnummer : {order.shippingAdress.phone}
        </Typography>
      </Box>
    </main>
  );
}
