import DeleteButton from "@/components/admin/DeleteButton";
import ResourceForm from "@/components/admin/ResourceForm";
import { deleteResource, saveResource } from "@/lib/admin/actions";
import { resourceOrNull } from "@/lib/admin/resources";
import { adminGet } from "@/lib/admin/session";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { resource: string };
}): Promise<Metadata> {
  const resource = resourceOrNull(params.resource);
  return { title: `Editar ${resource?.singular.toLowerCase() ?? "registo"}` };
}

export default async function EditResourcePage({
  params,
}: {
  params: { resource: string; id: string };
}) {
  const resource = resourceOrNull(params.resource);
  if (!resource) {
    notFound();
  }

  const record = await adminGet<Record<string, unknown>>(`${resource.apiPath}/${params.id}`);
  const title = typeof record[resource.titleField] === "string"
    ? (record[resource.titleField] as string)
    : resource.singular;

  return (
    <div>
      <Link href={`/admin/${resource.slug}`} className="text-sm link-muted">
        ← {resource.label}
      </Link>

      <header className="mb-8 mt-6 border-b border-border pb-6">
        <p className="eyebrow mb-2">Editar {resource.singular.toLowerCase()}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      </header>

      <ResourceForm
        fields={resource.fields}
        initial={record}
        action={saveResource.bind(null, resource.slug, params.id)}
      />

      <div className="mt-12 border-t border-border pt-6">
        <DeleteButton
          action={deleteResource.bind(null, resource.slug, params.id)}
          label={`Eliminar ${resource.singular.toLowerCase()}`}
          redirectTo={`/admin/${resource.slug}`}
        />
      </div>
    </div>
  );
}
