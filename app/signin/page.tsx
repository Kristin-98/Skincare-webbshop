"use client";
import { useState } from "react";
import GithubButton from "./providers/github-button";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lägg till din inloggningslogik här, t,ex. anropa en API-endpoint
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <main style={{ maxWidth: 400, margin: "0 auto", padding: "2rem" }}>
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>
        <label>
          Password
          <input
            type="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: "0.75rem", marginTop: "0.5rem" }}
        >
          Sign in
        </button>
        <a
          href="/forgot-password"
          style={{ fontSize: "0.9rem", color: "#0070f3", textAlign: "right" }}
        >
          Forgot password
        </a>
      </form>
      <GithubButton />
    </main>
  );
}
