"use client";

import { signOut } from "@/app/auth-client";

export default function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
