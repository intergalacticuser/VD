"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setStatus("Invalid credentials.");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Password</label>
        <Input name="password" type="password" required placeholder="••••••••" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
