import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="About"
        title="Independent publishing studio"
        description="VD Publishing combines editorial excellence with thoughtful production for authors who care about craft."
      />
      <Card className="space-y-4">
        <p className="text-sm text-muted">
          We are a boutique team of editors, designers, and production specialists supporting authors from
          manuscript development through release. Our process prioritizes clarity, collaboration, and
          premium outcomes.
        </p>
        <p className="text-sm text-muted">
          Each engagement begins with a discovery review so your project receives an aligned plan, clear
          milestones, and consistent communication.
        </p>
      </Card>
    </Container>
  );
}
