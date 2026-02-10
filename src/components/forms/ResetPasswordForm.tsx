"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ResetPasswordForm({ token }: { token: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      token,
      password: String(formData.get("password") ?? "")
    };

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Reset failed");
      }

      setStatus("Password updated. You can sign in now.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">New Password</label>
        <Input name="password" type="password" required placeholder="Minimum 8 characters" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
