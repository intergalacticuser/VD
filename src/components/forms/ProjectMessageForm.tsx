"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export function ProjectMessageForm({ projectId }: { projectId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      body: String(formData.get("body") ?? "")
    };

    try {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to send message");
      }

      setStatus("Message sent.");
      event.currentTarget.reset();
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Textarea name="body" rows={3} required placeholder="Write a message..." />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
