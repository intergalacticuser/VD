import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { PUBLIC_PHONE } from "@/lib/constants";

export default function ContactPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your manuscript"
        description="Share your goals and we will reply with a tailored plan."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card>
          <ContactForm />
        </Card>
        <Card className="space-y-4">
          <h3 className="text-2xl text-text">Studio Contact</h3>
          <p className="text-sm text-muted">Phone: {PUBLIC_PHONE}</p>
          <p className="text-sm text-muted">Email: hello@vdpublishing.com</p>
          <p className="text-sm text-muted">Hours: Monday to Friday, 9am–5pm ET</p>
        </Card>
      </div>
    </Container>
  );
}
