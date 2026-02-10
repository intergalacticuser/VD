"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DeleteAccountForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/account/delete", {
        method: "POST"
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete account");
      }

      setStatus("Account deleted.");
      window.location.href = "/";
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Deleting your account anonymizes personal data and revokes active sessions. Project history remains for
        record integrity.
      </p>
      <Button onClick={onDelete} variant="outline" disabled={loading}>
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </div>
  );
}
