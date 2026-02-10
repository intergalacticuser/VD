import Link from "next/link";
import { BRAND, TAGLINE } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex flex-col gap-1">
      <span className="font-display text-xl text-text transition group-hover:text-accent">{BRAND}</span>
      <span className="text-xs uppercase tracking-[0.28em] text-muted">{TAGLINE}</span>
    </Link>
  );
}
