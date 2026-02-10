"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function ContentBlockForm({
  blockId,
  initialTitle,
  initialBody
}: {
  blockId: string;
  initialTitle: string;
  initialBody: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [status, setStatus] = useState<string | null>(null);

  async function onSave() {
    setStatus(null);
    const res = await fetch(`/api/admin/content/${blockId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body })
    });

    if (!res.ok) {
      const text = await res.text();
      setStatus(text || "Update failed");
      return;
    }

    setStatus("Saved");
  }

  return (
    <div className="space-y-3">
      <Input value={title} onChange={(event) => setTitle(event.target.value)} />
      <Textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} />
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onSave}>
          Save
        </Button>
        {status ? <span className="text-xs text-muted">{status}</span> : null}
      </div>
    </div>
  );
}
