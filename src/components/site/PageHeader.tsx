export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="animate-fade-up border-b border-border pb-10">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {intro && (
        <p className="mt-4 max-w-reading text-[15px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </header>
  );
}
