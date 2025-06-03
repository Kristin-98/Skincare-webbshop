"use client";

import { signIn } from "@/app/auth-client";
import { Button } from "@mui/material";

export default function GithubButton() {
  return (
    <Button
      variant="outlined"
      color="primary"
      sx={{ mt: 2 }}
      onClick={() => signIn.social({ provider: "github" })}
    >
      Sign in with Github
    </Button>
  );
}
