"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      email: String(formData.get("email") ?? "")
    };

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Request failed");
      }

      setStatus("If that email exists, a reset link has been sent.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
