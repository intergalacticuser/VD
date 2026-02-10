import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SERVICE_CARDS } from "@/lib/constants";

const serviceCardStyles = [
  "border-accent/35 bg-gradient-to-br from-[#1d2129] to-[#141820]",
  "border-[#35536d]/45 bg-gradient-to-br from-[#18202a] to-[#121920]",
  "border-[#6a4f2b]/45 bg-gradient-to-br from-[#241d15] to-[#161310]",
  "border-[#49513c]/45 bg-gradient-to-br from-[#1d2319] to-[#131711]"
] as const;

export default function HomePage() {
  return (
    <div className="relative space-y-20 overflow-hidden pb-24 pt-16">
      <span className="ambient-orb ambient-orb--gold -left-16 top-12 h-44 w-44" aria-hidden />
      <span className="ambient-orb ambient-orb--blue right-0 top-40 h-52 w-52" aria-hidden />

      <Container className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-8">
          <Badge className="border-accent/40 bg-[#1a1713] text-accent">Studio Signature</Badge>
          <div className="relative space-y-4">
            <span aria-hidden className="pointer-events-none absolute -left-8 top-3 h-24 w-72 rounded-full bg-accent/20 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.34em] text-accent">VD Publishing</p>
            <h1 className="premium-title-glow relative max-w-3xl font-display text-5xl leading-tight text-text md:text-6xl">
              From Text to Book
            </h1>
            <p className="relative max-w-2xl text-base text-muted">
              VD Publishing is an independent editorial and publishing studio providing end-to-end publishing
              services from editorial work and design to ISBN assignment and global distribution.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/upload">Upload Manuscript</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-accent/25 bg-gradient-to-br from-[#18160f] to-[#121317] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Studio Standard</p>
              <p className="mt-2 text-xl text-text">Editorial + Production</p>
            </Card>
            <Card className="border-[#3f5672]/35 bg-gradient-to-br from-[#141b24] to-[#11151b] p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Distribution Ready</p>
              <p className="mt-2 text-xl text-text">ISBN + Global Channels</p>
            </Card>
          </div>
        </div>

        <Card className="space-y-6 border-accent/35 bg-gradient-to-br from-[#1b2230] to-[#131922]">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Studio Focus</p>
          <div className="space-y-4 text-sm text-muted">
            <p>Editorial development for fiction and nonfiction.</p>
            <p>Premium design, ISBN support, and global distribution preparation.</p>
            <p>Transparent collaboration with milestone-based delivery.</p>
          </div>
          <Card className="border-white/10 bg-[#10151d]/90 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">Concierge Workflow</p>
            <p className="mt-2 text-sm text-text">One team. One roadmap. One publication standard.</p>
          </Card>
          <ButtonLink href="/contact" variant="secondary">
            Schedule a Consultation
          </ButtonLink>
        </Card>
      </Container>

      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_CARDS.map((service, index) => (
            <Card
              key={service.title}
              className={`space-y-4 border transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${serviceCardStyles[index % serviceCardStyles.length]}`}
            >
              <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                Service {index + 1}
              </span>
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
        <Card className="grid gap-6 border-accent/30 bg-gradient-to-r from-[#161b22] via-[#121922] to-[#10151b] md:grid-cols-[1.2fr,0.8fr]">
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
