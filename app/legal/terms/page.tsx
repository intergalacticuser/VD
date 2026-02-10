import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default function TermsPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="This is a placeholder policy. Replace with your final legal copy."
      />
      <Card className="space-y-3 text-sm text-muted">
        <p>
          Services are delivered based on mutually agreed scopes, timelines, and project milestones.
        </p>
        <p>
          Please contact us with any questions about payments, cancellations, or intellectual property
          concerns.
        </p>
      </Card>
    </Container>
  );
}
