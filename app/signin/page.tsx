import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GithubButton from "./providers/github-button";

export default function SignInPage() {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign in to ScandiFurniture
        </Typography>
        <GithubButton />
        <Link href="/" passHref>
          <Button sx={{ bgcolor: "palette.primary.main", pt: 4 }}>
            Go back to homepage
          </Button>
        </Link>
      </Box>
    </main>
  );
}
