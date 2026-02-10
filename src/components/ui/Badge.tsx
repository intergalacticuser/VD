import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-bgSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted",
        className
      )}
      {...props}
    />
  );
}
