import {
  Box,
  CardMedia,
  Chip,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { OrderStatus } from "@prisma/client";

interface Product {
  id: string;
  title: string;
  image: string;
}

interface OrderRow {
  id: string;
  product: Product;
  price: number;
  quantity: number;
}

interface Props {
  orderRows: OrderRow[];
  orderStatus: OrderStatus;
}

export default function OrderProductList({ orderRows, orderStatus }: Props) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography variant="body2" color="text.secondary">
          Status:
        </Typography>
        <Chip
          label={orderStatus}
          color={orderStatus === OrderStatus.pending ? "warning" : "success"}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      </Box>

      <List sx={{ width: "100%", maxWidth: 600 }}>
        {orderRows.map((row) => (
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
    </>
  );
}
