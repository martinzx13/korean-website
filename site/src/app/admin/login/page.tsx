"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/dashboard?pwd=${encodeURIComponent(password)}`);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px]">
        <h1 className="text-2xl font-display text-foreground mb-6 text-center">Admin</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-4"
          autoFocus
        />
        {error && <p className="text-destructive text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          Login
        </button>
      </form>
    </main>
  );
}
