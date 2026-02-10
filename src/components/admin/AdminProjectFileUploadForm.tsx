"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ALLOWED_UPLOAD_EXTENSIONS, MAX_UPLOAD_BYTES } from "@/lib/constants";

export function AdminProjectFileUploadForm({ projectId }: { projectId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

    if (file.size > MAX_UPLOAD_BYTES) {
      setStatus("File is too large.");
      setLoading(false);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

    const payload = {
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      ext
    };

    try {
      const presignRes = await fetch(`/api/admin/projects/${projectId}/files/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!presignRes.ok) {
        const text = await presignRes.text();
        throw new Error(text || "Presign failed");
      }

      const { uploadUrl, fileId, storageKey } = await presignRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": payload.mimeType },
        body: file
      });

      if (!uploadRes.ok) {
        throw new Error("Storage upload failed");
      }

      const completeRes = await fetch(`/api/admin/projects/${projectId}/files/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, storageKey })
      });

      if (!completeRes.ok) {
        throw new Error("Upload confirmation failed");
      }

      setStatus("File uploaded.");
      event.currentTarget.reset();
      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input name="file" type="file" required accept={ALLOWED_UPLOAD_EXTENSIONS.map((ext) => `.${ext}`).join(",")} />
      <p className="text-xs text-muted">
        Accepted formats: {ALLOWED_UPLOAD_EXTENSIONS.join(", ")} · Max size {Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB
      </p>
      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload File"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
