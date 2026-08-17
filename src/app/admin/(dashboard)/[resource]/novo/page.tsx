import ResourceForm from "@/components/admin/ResourceForm";
import { saveResource } from "@/lib/admin/actions";
import { resourceOrNull, type ResourceConfig } from "@/lib/admin/resources";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { resource: string };
}): Promise<Metadata> {
  const resource = resourceOrNull(params.resource);
  return { title: resource ? novoLabel(resource) : "Novo registo" };
}

/** "Novo projecto", "Nova frase" — o artigo concorda com o recurso. */
function novoLabel(resource: ResourceConfig): string {
  return `${resource.feminine ? "Nova" : "Novo"} ${resource.singular.toLowerCase()}`;
}

export default function NewResourcePage({ params }: { params: { resource: string } }) {
  const resource = resourceOrNull(params.resource);
  if (!resource) {
    notFound();
  }

  return (
    <div>
      <Link href={`/admin/${resource.slug}`} className="text-sm link-muted">
        ← {resource.label}
      </Link>

      <header className="mb-8 mt-6 border-b border-border pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">{novoLabel(resource)}</h1>
      </header>

      <ResourceForm
        fields={resource.fields}
        initial={defaults(resource.slug)}
        action={saveResource.bind(null, resource.slug, null)}
        submitLabel="Criar"
        redirectTo={`/admin/${resource.slug}`}
      />
    </div>
  );
}

/** Valores iniciais sensatos para não obrigar a preencher o óbvio. */
function defaults(slug: string): Record<string, unknown> {
  const base: Record<string, unknown> = { status: "DRAFT" };
  if (slug === "redes") {
    return { visible: true };
  }
  if (slug === "projectos") {
    return { status: "PUBLISHED", category: "PROFESSIONAL" };
  }
  if (slug === "frases") {
    return { status: "PUBLISHED" };
  }
  return base;
}
