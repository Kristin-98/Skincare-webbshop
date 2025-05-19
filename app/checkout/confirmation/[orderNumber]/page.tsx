import { db } from "@/prisma/db";
import { Box, CardMedia, List, ListItem, Typography } from "@mui/material";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function ConfirmationPage(props: Props) {
  const { orderNumber } = await props.params;
  const order = await db.order.findUnique({
    where: { orderNumber },
    include: { customer: true, orderRows: { include: { product: true } } },
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
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <CardMedia
                sx={{ height: 200, objectFit: "contain" }}
                component="img"
                src={row.product.image}
              ></CardMedia>
              <Typography variant="body1">
                {row.product.title} : {row.quantity} st - {row.price} kr
              </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" fontWeight="bold" mt={2}>
          Totalt : {totalPrice.toFixed(2)} kr
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Dina varor levereras till : {order.customer.address},{" "}
          {order.customer.zipcode} {order.customer.city}.
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Ett bekräftelsemail har skickats till din epost : {" "}
          {order.customer.email}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          När leveransen är framme kommer vi skicka ett SMS till ditt
          telefonnummer : {order.customer.phone}
        </Typography>
      </Box>
    </main>
  );
}
