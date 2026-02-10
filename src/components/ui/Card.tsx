import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line/80 bg-panel/85 p-6 shadow-soft backdrop-blur-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/[0.05]",
        className
      )}
      {...props}
    />
  );
}
