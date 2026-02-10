"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ProfileForm({
  initialName,
  initialPhone
}: {
  initialName: string | null;
  initialPhone: string | null;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? "")
    };

    try {
      const res = await fetch("/api/account/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update profile");
      }

      setStatus("Profile updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Name</label>
        <Input name="name" defaultValue={initialName ?? ""} required />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Phone</label>
        <Input name="phone" defaultValue={initialPhone ?? ""} placeholder="Optional" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
