import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function PermissionDeniedPage() {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Permission Required
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You do not have the permission to view this page.
        </Typography>
        <Link href="/" passHref>
          <Button sx={{ bgcolor: "palette.primary.main" }}>
            Go back to homepage
          </Button>
        </Link>
      </Box>
    </main>
  );
}
