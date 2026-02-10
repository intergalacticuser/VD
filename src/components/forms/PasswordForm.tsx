"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function PasswordForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      currentPassword: String(formData.get("currentPassword") ?? ""),
      newPassword: String(formData.get("newPassword") ?? "")
    };

    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update password");
      }

      setStatus("Password updated.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Current Password</label>
        <Input name="currentPassword" type="password" required />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">New Password</label>
        <Input name="newPassword" type="password" required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
