import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  {
    title: "Submit your manuscript",
    body: "Upload your manuscript and share your publishing goals."
  },
  {
    title: "Receive a tailored plan",
    body: "We review and propose editorial, design, and distribution scopes within 3 business days."
  },
  {
    title: "Collaborate on production",
    body: "Work with your dedicated team through milestones, reviews, and approvals."
  },
  {
    title: "Launch with confidence",
    body: "We finalize files, metadata, and distribution setup for a polished release."
  }
];

export default function HowItWorksPage() {
  return (
    <Container className="space-y-12 pb-24 pt-16">
      <PageHeader
        eyebrow="Process"
        title="A clear path from manuscript to market"
        description="A structured workflow with transparent milestones and studio-led craftsmanship."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <Card key={step.title} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Step {index + 1}</p>
            <h3 className="text-2xl text-text">{step.title}</h3>
            <p className="text-sm text-muted">{step.body}</p>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h3 className="text-2xl text-text">Ready to start?</h3>
          <p className="text-sm text-muted">Upload your manuscript or schedule a consultation.</p>
        </div>
        <div className="flex gap-3">
          <ButtonLink href="/upload">Upload</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact
          </ButtonLink>
        </div>
      </Card>
    </Container>
  );
}
