"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AdminUserUpdateForm({
  userId,
  initialRole,
  initialDisabled
}: {
  userId: string;
  initialRole: string;
  initialDisabled: boolean;
}) {
  const [role, setRole] = useState(initialRole);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [status, setStatus] = useState<string | null>(null);

  async function onSave() {
    setStatus(null);
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, isDisabled: disabled })
    });

    if (!res.ok) {
      const text = await res.text();
      setStatus(text || "Update failed");
      return;
    }

    setStatus("Saved");
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <select
        className="rounded-lg border border-line bg-bgSoft px-3 py-2 text-sm text-text"
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <label className="flex items-center gap-2 text-xs text-muted">
        <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
        Disabled
      </label>
      <Button variant="outline" onClick={onSave}>
        Save
      </Button>
      {status ? <span className="text-xs text-muted">{status}</span> : null}
    </div>
  );
}
