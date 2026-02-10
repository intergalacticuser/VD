"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

export function CreateProjectForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? "")
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create project");
      }

      setStatus("Project created.");
      toast({ title: "Project created", description: "Your project is ready.", variant: "success" });
      event.currentTarget.reset();
      window.location.reload();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create project";
      setStatus(message);
      toast({ title: "Project failed", description: message, variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Title</label>
        <Input name="title" required placeholder="Project title" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Description</label>
        <Textarea name="description" rows={3} placeholder="Brief description" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
