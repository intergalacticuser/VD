"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      phone: String(formData.get("phone") ?? "")
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Registration failed");
      }

      setStatus("Account created. You can now sign in.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Name</label>
          <Input name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Phone</label>
          <Input name="phone" placeholder="Optional" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Password</label>
        <Input name="password" type="password" required placeholder="Minimum 8 characters" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
