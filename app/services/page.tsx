import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SERVICE_CARDS } from "@/lib/constants";

export default function ServicesPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Services"
        title="Publishing services with studio-level polish"
        description="Editorial, design, and distribution support tailored to independent authors and small presses."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICE_CARDS.map((service) => (
          <Card key={service.title} className="space-y-4">
            <h3 className="text-2xl text-text">{service.title}</h3>
            <p className="text-sm text-muted">{service.description}</p>
            <div className="flex gap-3">
              <ButtonLink href="/upload" variant="ghost">
                Upload Manuscript
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact Us
              </ButtonLink>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
