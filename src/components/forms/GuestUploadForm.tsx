"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ALLOWED_UPLOAD_EXTENSIONS, MAX_UPLOAD_BYTES } from "@/lib/constants";
import { useToast } from "@/components/ui/Toast";

export function GuestUploadForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File | null;

    if (!file) {
      setStatus("Please choose a file.");
      setLoading(false);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      description: String(formData.get("description") ?? ""),
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      ext
    };

    try {
      const presignRes = await fetch("/api/upload/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!presignRes.ok) {
        const errorText = await presignRes.text();
        throw new Error(errorText || "Upload failed");
      }

      const { uploadUrl, referenceId, storageKey } = await presignRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": payload.mimeType
        },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error("Storage upload failed");
      }

      const completeRes = await fetch("/api/upload/guest", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceId, storageKey })
      });

      if (!completeRes.ok) {
        throw new Error("Upload confirmation failed");
      }

      setStatus(`Upload received. Reference ID: ${referenceId}`);
      toast({ title: "Upload received", description: `Reference ID: ${referenceId}`, variant: "success" });
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setStatus(message);
      toast({ title: "Upload failed", description: message, variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Name</label>
          <Input name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Email</label>
          <Input name="email" type="email" required placeholder="you@email.com" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Manuscript File</label>
        <Input name="file" type="file" required accept={ALLOWED_UPLOAD_EXTENSIONS.map((ext) => `.${ext}`).join(",")} />
        <p className="text-xs text-muted">
          Accepted formats: {ALLOWED_UPLOAD_EXTENSIONS.join(", ")} · Max size {Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB
        </p>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Project Notes</label>
        <Textarea name="description" rows={4} placeholder="Tell us about your manuscript and goals." />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Submit Manuscript"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
