"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("company") ?? "")
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to submit inquiry");
      }

      setStatus("Thank you. We will follow up shortly.");
      toast({ title: "Inquiry sent", description: "We will follow up shortly.", variant: "success" });
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed";
      setStatus(message);
      toast({ title: "Submission failed", description: message, variant: "error" });
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Phone</label>
          <Input name="phone" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted">Subject</label>
          <Input name="subject" required placeholder="How can we help?" />
        </div>
      </div>
      <div className="hidden">
        <label>Company</label>
        <Input name="company" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-muted">Message</label>
        <Textarea name="message" rows={5} required placeholder="Share your publishing goals." />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Inquiry"}
      </Button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
