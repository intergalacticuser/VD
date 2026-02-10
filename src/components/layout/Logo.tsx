import Link from "next/link";
import { BRAND } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="group relative inline-flex flex-col gap-1 rounded-xl px-3 py-2">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 -top-2 h-12 w-40 rounded-full bg-accent/20 blur-2xl transition group-hover:bg-accent/30"
      />
      <span className="relative font-display text-2xl tracking-[0.02em] text-text transition group-hover:text-accent">
        {BRAND}
      </span>
      <span className="relative text-[10px] uppercase tracking-[0.34em] text-muted">From Text to Book</span>
    </Link>
  );
}
