import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  className
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-dashed border-line bg-bgSoft p-6 text-center", className)}>
      <p className="text-base font-semibold text-text">{title}</p>
      {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
    </div>
  );
}
