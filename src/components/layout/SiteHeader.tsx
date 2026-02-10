import Link from "next/link";
import { Logo } from "./Logo";
import { ButtonLink } from "../ui/Button";
import { Container } from "./Container";
import { PUBLIC_PHONE } from "@/lib/constants";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/upload", label: "Upload" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-3 text-sm text-muted lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-bgSoft hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 text-sm text-muted md:flex">
          <span className="tracking-[0.2em]">{PUBLIC_PHONE}</span>
          <ButtonLink href="/login" variant="outline">
            Sign In
          </ButtonLink>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <span className="text-xs tracking-[0.2em] text-muted">{PUBLIC_PHONE}</span>
          <Link href="/login" className="text-sm text-muted">
            Sign In
          </Link>
        </div>
      </Container>
    </header>
  );
}
