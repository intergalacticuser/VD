"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const statuses = ["NEW", "IN_REVIEW", "IN_PROGRESS", "COMPLETED"];

export function AdminProjectStatusForm({ projectId, initialStatus }: { projectId: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function onSave() {
    setSaving(true);
    await fetch(`/api/admin/projects/${projectId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    setSaving(false);
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <select
        className="rounded-lg border border-line bg-bgSoft px-3 py-2 text-sm text-text"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button variant="outline" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Update"}
      </Button>
    </div>
  );
}
