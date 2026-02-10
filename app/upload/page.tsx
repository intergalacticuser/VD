import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { GuestUploadForm } from "@/components/forms/GuestUploadForm";
import { ButtonLink } from "@/components/ui/Button";

export default function UploadPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Upload"
        title="Submit your manuscript"
        description="Guest uploads are welcome. Provide your manuscript and a short project description to receive a response within 3 business days."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <GuestUploadForm />
        </Card>
        <Card className="space-y-4">
          <h3 className="text-2xl text-text">Track your submission</h3>
          <p className="text-sm text-muted">
            Create an account to track milestones, messages, and file history in your dashboard.
          </p>
          <ButtonLink href="/register" variant="outline">
            Create an Account
          </ButtonLink>
        </Card>
      </div>
    </Container>
  );
}
