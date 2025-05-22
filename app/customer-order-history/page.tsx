import { Typography } from "@mui/material";
import OrderSummary from "../checkout/lib/order-summary";

export default function CustomerOrderHistory() {
  return (
    <>
      <h2>Order historik</h2>
      <Typography variant="body1" sx={{ my: 2 }}>
        {/* Ditt ordernummer är : {order.orderNumber} */}
      </Typography>
      <OrderSummary />
    </>
  );
}
