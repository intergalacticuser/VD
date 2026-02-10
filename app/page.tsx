import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { SERVICE_CARDS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-24 pt-16">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-8">
          <Badge>VD Publishing</Badge>
          <PageHeader
            title="From Manuscript to Book"
            description="VD Publishing is an independent editorial and publishing studio providing end-to-end publishing services — from editorial work and design to ISBN assignment and global distribution."
          />
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/upload">Upload Manuscript</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </div>
        </div>
        <Card className="space-y-6 bg-gradient-to-br from-[#1c222d] to-[#14181f]">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Studio Focus</p>
          <div className="space-y-4 text-sm text-muted">
            <p>Editorial development for fiction and nonfiction.</p>
            <p>Premium design, ISBN support, and global distribution preparation.</p>
            <p>Transparent collaboration with milestone-based delivery.</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">
            Schedule a Consultation
          </ButtonLink>
        </Card>
      </Container>

      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_CARDS.map((service) => (
            <Card key={service.title} className="space-y-4">
              <h3 className="text-2xl text-text">{service.title}</h3>
              <p className="text-sm text-muted">{service.description}</p>
              <ButtonLink href="/upload" variant="ghost">
                Start a Project
              </ButtonLink>
            </Card>
          ))}
        </div>
      </Container>

      <Container>
        <Card className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-3">
            <h2 className="text-3xl text-text">How we collaborate</h2>
            <p className="text-sm text-muted">
              Every manuscript receives a tailored roadmap. Our editorial team works alongside design and
              production to meet release goals with premium craft.
            </p>
          </div>
          <div className="space-y-3 text-sm text-muted">
            <p>1. Submit your manuscript and goals.</p>
            <p>2. Receive a curated service plan within 3 business days.</p>
            <p>3. Collaborate through milestone-based reviews and approvals.</p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
