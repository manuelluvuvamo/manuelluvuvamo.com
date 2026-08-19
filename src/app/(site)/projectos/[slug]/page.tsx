import { ExternalLink } from "@/components/site/ProjectRow";
import ProjectThumb from "@/components/site/ProjectThumb";
import Prose from "@/components/site/Prose";
import { getContent } from "@/lib/api";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

const CATEGORY_LABEL: Record<string, string> = {
  PROFESSIONAL: "Trabalho profissional",
  OPEN_SOURCE: "Open source",
  EXPERIMENT: "Experiência",
};

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { projects } = await getContent();
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return { title: "Projecto não encontrado" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { projects } = await getContent();
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  const description = await renderMarkdown(project.description);

  return (
    <main className="shell py-16">
      <Link href="/projectos" className="text-sm link-muted">
        ← Projectos
      </Link>

      <header className="mt-8 border-b border-border pb-10">
        <div className="group mb-6">
          <ProjectThumb
            title={project.title}
            slug={project.slug}
            src={project.coverImage}
            className={
              project.coverImage
                ? "aspect-[2/1] h-auto w-full"
                : "h-16 w-16"
            }
          />
        </div>

        <p className="eyebrow mb-3">
          {CATEGORY_LABEL[project.category ?? "PROFESSIONAL"]}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-reading text-[15px] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {project.url && <ExternalLink href={project.url} label="Visitar" />}
          {project.repositoryUrl && (
            <ExternalLink href={project.repositoryUrl} label="Código-fonte" />
          )}
        </div>
      </header>

      <dl className="grid gap-6 border-b border-border py-8 sm:grid-cols-3">
        {project.role && (
          <div>
            <dt className="eyebrow mb-1.5">Papel</dt>
            <dd className="text-sm">{project.role}</dd>
          </div>
        )}
        {project.tech && project.tech.length > 0 && (
          <div className="sm:col-span-2">
            <dt className="eyebrow mb-1.5">Tecnologias</dt>
            <dd className="text-sm text-muted-foreground">{project.tech.join(" · ")}</dd>
          </div>
        )}
      </dl>

      {description && (
        <section className="py-10">
          <Prose html={description} />
        </section>
      )}
    </main>
  );
}
