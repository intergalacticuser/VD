import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="This is a placeholder policy. Replace with your final legal copy."
      />
      <Card className="space-y-3 text-sm text-muted">
        <p>
          We collect the data you submit to provide publishing services, respond to inquiries, and manage
          projects.
        </p>
        <p>
          You can request data exports or account deletion at any time through your dashboard settings.
        </p>
      </Card>
    </Container>
  );
}
