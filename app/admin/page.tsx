import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import AdminCard from "./lib/admin-card";

export default function AdminPage() {
  return (
    <main>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
      >
        Handle products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 3,
          gap: 1,
        }}
      >
        <Link href="/admin/product/new/">
          <Button
            data-cy="admin-add-product"
            type="submit"
            variant="contained"
            color="primary"
          >
            Add a product
          </Button>
        </Link>
        <Link href="/admin/orders/">
          <Button
            data-cy="admin-add-product"
            type="submit"
            variant="contained"
            color="primary"
          >
            Placed orders
          </Button>
        </Link>
      </Box>
      <AdminCard />
    </main>
  );
}
