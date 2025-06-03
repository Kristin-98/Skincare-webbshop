import { db } from "@/prisma/db";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";

interface AdminOrderPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export default async function AdminOrderPage({
  searchParams,
}: AdminOrderPageProps) {
  const filterStatus = (await searchParams).status as OrderStatus;
  const orders = await db.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        All Orders
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
        <Link href="/admin/orders" passHref>
          <Button
            variant={!filterStatus ? "contained" : "outlined"}
            color="primary"
          >
            All Orders
          </Button>
        </Link>
        <Link href="/admin/orders?status=pending" passHref>
          <Button
            variant={
              filterStatus === OrderStatus.pending ? "contained" : "outlined"
            }
            color="warning"
          >
            Pending
          </Button>
        </Link>
        <Link href="/admin/orders?status=sent" passHref>
          <Button
            variant={
              filterStatus === OrderStatus.sent ? "contained" : "outlined"
            }
            color="success"
          >
            Shipped
          </Button>
        </Link>
      </Stack>

      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        {orders.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No orders found for this status.
          </Typography>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              sx={{
                width: { xs: "80%", lg: "50%" },
                wordBreak: "break-word",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Order Number: {order.orderNumber}
                </Typography>
                <Typography variant="body1">
                  Customer: {order.customer.name}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Status:
                  </Typography>
                  <Chip
                    label={order.status}
                    color={
                      order.status === OrderStatus.pending
                        ? "warning"
                        : "success"
                    }
                    size="small"
                    sx={{ fontWeight: "500" }}
                  />
                </Box>
                <Link href={`/admin/orders/${order.orderNumber}`}>
                  <Button sx={{ mt: 2 }} variant="contained">
                    Show Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </main>
  );
}
