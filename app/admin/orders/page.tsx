import { db } from "@/prisma/db";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default async function AdminOrderPage() {
  const orders = await db.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        All Orders
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        {orders.map((order) => (
          <Card key={order.id} sx={{ width: "80%" }}>
            <CardContent>
              <Typography variant="h6">
                Order Number: {order.orderNumber}
              </Typography>
              <Typography variant="body1">
                Customer: {order.customer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {order.status}
              </Typography>
              <Link href={`/admin/orders/${order.orderNumber}`}>
                <Button sx={{ mt: 2 }} variant="contained">
                  Show Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </main>
  );
}
