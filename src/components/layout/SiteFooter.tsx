import Link from "next/link";
import { Container } from "./Container";
import { PUBLIC_PHONE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bgSoft py-12">
      <Container className="grid gap-8 md:grid-cols-3">
        <div className="space-y-2 text-sm text-muted">
          <p className="text-base font-semibold text-text">VD Publishing</p>
          <p>From Manuscript to Book</p>
          <p className="tracking-[0.2em]">{PUBLIC_PHONE}</p>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="text-base font-semibold text-text">Company</p>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="hover:text-text">
              About
            </Link>
            <Link href="/services" className="hover:text-text">
              Services
            </Link>
            <Link href="/how-it-works" className="hover:text-text">
              How It Works
            </Link>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <p className="text-base font-semibold text-text">Legal</p>
          <div className="flex flex-col gap-2">
            <Link href="/legal/privacy" className="hover:text-text">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-text">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
