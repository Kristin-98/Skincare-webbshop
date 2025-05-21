"use client";

import { signIn } from "@/app/auth-client";

export default function GithubButton() {
  return (
    <button onClick={() => signIn.social({ provider: "github" })}>
      Signin with Github
    </button>
  );
}
