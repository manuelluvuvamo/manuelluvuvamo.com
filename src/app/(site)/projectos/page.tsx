import PageHeader from "@/components/site/PageHeader";
import ProjectRow from "@/components/site/ProjectRow";
import Section from "@/components/site/Section";
import { getContent } from "@/lib/api";
import type { Project, ProjectCategory } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projectos",
  description:
    "Plataformas para o sector público angolano, pacotes open source e experiências pessoais.",
};

const GROUPS: { category: ProjectCategory; label: string }[] = [
  { category: "PROFESSIONAL", label: "Trabalho profissional" },
  { category: "OPEN_SOURCE", label: "Open source" },
  { category: "EXPERIMENT", label: "Experiências e estudos" },
];

export default async function ProjectsPage() {
  const { projects } = await getContent();

  return (
    <main className="shell py-16">
      <PageHeader
        eyebrow="Projectos"
        title="O que construí"
        intro="Plataformas para o sector público angolano, pacotes open source e experiências que servem para estudar uma ideia até ao fim."
      />

      {GROUPS.map(({ category, label }) => {
        const group = projects.filter((project) => (project.category ?? "PROFESSIONAL") === category);
        if (group.length === 0) return null;

        return (
          <Section key={category} label={label}>
            <ul className="space-y-1">
              {group.map((project: Project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </ul>
          </Section>
        );
      })}
    </main>
  );
}
