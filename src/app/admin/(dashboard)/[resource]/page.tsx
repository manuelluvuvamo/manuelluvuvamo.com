import { longDate } from "@/lib/format";
import { resourceOrNull, type ResourceConfig } from "@/lib/admin/resources";
import { adminGet } from "@/lib/admin/session";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Row = Record<string, unknown> & { id: string };

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "Rascunho",
  PUBLISHED: "Publicado",
  ARCHIVED: "Arquivado",
};

export async function generateMetadata({
  params,
}: {
  params: { resource: string };
}): Promise<Metadata> {
  const resource = resourceOrNull(params.resource);
  return { title: resource?.label ?? "Recurso" };
}

export default async function ResourceListPage({ params }: { params: { resource: string } }) {
  const resource = resourceOrNull(params.resource);
  if (!resource) {
    notFound();
  }

  const rows = await adminGet<Row[]>(resource.apiPath);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow mb-2">Conteúdo</p>
          <h1 className="text-2xl font-semibold tracking-tight">{resource.label}</h1>
          {resource.description && (
            <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
          )}
        </div>

        <Link
          href={`/admin/${resource.slug}/novo`}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Novo
        </Link>
      </header>

      {rows.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">
          Ainda não há nada aqui. Começa por criar {article(resource)}.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                href={`/admin/${resource.slug}/${row.id}`}
                className="group flex items-start justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium transition-colors group-hover:text-accent">
                    {text(row[resource.titleField]) || "(sem título)"}
                  </p>
                  {resource.subtitleField && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                      {text(row[resource.subtitleField])}
                    </p>
                  )}

                  {resource.metrics && (
                    <p className="mt-1.5 font-mono text-[11px] text-subtle">
                      {resource.metrics
                        .map((metric) => {
                          const total = Number(row[metric.name] ?? 0);
                          return `${total} ${total === 1 ? metric.singular : metric.plural}`;
                        })
                        .join(" · ")}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {resource.metaField && (
                    <span className="font-mono text-xs text-subtle">
                      {meta(row[resource.metaField])}
                    </span>
                  )}
                  {resource.hasStatus && <StatusBadge status={text(row.status)} />}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (!status) return null;
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[11px]",
        status === "PUBLISHED"
          ? "border-accent/40 text-accent"
          : "border-border text-muted-foreground"
      )}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function text(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

/** Datas ISO passam a legíveis; o resto sai como está (ano, ordem, …). */
function meta(value: unknown): string {
  const raw = text(value);
  return /^\d{4}-\d{2}-\d{2}/.test(raw) ? longDate(raw) : raw;
}

function article(resource: ResourceConfig): string {
  return `o primeiro registo de ${resource.label.toLowerCase()}`;
}
