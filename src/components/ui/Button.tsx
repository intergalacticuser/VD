import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-bg hover:bg-[#d6b276]",
  secondary: "bg-panel text-text hover:bg-[#242a36]",
  ghost: "text-text hover:bg-bgSoft",
  outline: "border border-line text-text hover:bg-bgSoft"
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button className={cn(baseStyles, variants[variant], className)} type={type} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) {
  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      {children}
    </Link>
  );
}
