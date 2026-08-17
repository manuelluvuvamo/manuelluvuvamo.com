import Link from "next/link";

/** Bloco de secção com etiqueta à esquerda e, opcionalmente, um link "ver tudo". */
export default function Section({
  label,
  action,
  children,
}: {
  label: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-12">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="eyebrow">{label}</h2>
        {action && (
          <Link href={action.href} className="text-sm link-muted">
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
