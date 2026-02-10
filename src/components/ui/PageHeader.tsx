export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      ) : null}
      <h1 className="font-display text-4xl text-text md:text-5xl">{title}</h1>
      {description ? <p className="max-w-2xl text-base text-muted">{description}</p> : null}
    </div>
  );
}
