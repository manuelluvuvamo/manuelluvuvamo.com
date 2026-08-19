import EntityIcon, { hasIcon } from "@/components/site/EntityIcon";
import PageHeader from "@/components/site/PageHeader";
import Prose from "@/components/site/Prose";
import Section from "@/components/site/Section";
import { getContent } from "@/lib/api";
import { longDate, period } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Certification } from "@/lib/types";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Percurso, experiência profissional, formação e certificações de Manuel Luvuvamo.",
};

export default async function AboutPage() {
  const { profile, experiences, education, certifications, skills } = await getContent();
  const bio = await renderMarkdown(profile.longBio ?? profile.shortBio);

  const skillsByCategory = groupBy(skills, (skill) => skill.category);

  return (
    <main className="shell py-16">
      <PageHeader eyebrow="Sobre" title={profile.headline ?? profile.fullName} />

      {bio && (
        <section className="py-12">
          <Prose html={bio} />
        </section>
      )}

      {experiences.length > 0 && (
        <Section label="Experiência">
          <ol className="space-y-10">
            {experiences.map((item) => (
              <li key={item.id ?? `${item.company}-${item.role}`} className="group relative">
                {hasIcon(item.icon) && (
                  // Fica na margem em ecrãs largos, para não empurrar o texto.
                  <span className="absolute -left-11 top-0 hidden h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent lg:flex">
                    <EntityIcon name={item.icon} size={15} />
                  </span>
                )}

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
                    {hasIcon(item.icon) && (
                      <EntityIcon
                        name={item.icon}
                        size={15}
                        className="shrink-0 text-subtle lg:hidden"
                      />
                    )}
                    <span>
                      {item.role}
                      <span className="text-muted-foreground"> · {item.company}</span>
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-subtle">
                    {period(item.startDate, item.endDate, item.current)}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-2 max-w-reading text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-border"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {item.projects && item.projects.length > 0 && (
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-subtle">
                    {item.projects.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {Object.keys(skillsByCategory).length > 0 && (
        <Section label="Competências técnicas">
          <dl className="space-y-5">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category} className="sm:flex sm:gap-8">
                <dt className="w-48 shrink-0 text-sm font-medium">{category}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-0">
                  {items.map((skill) => skill.name).join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {education.length > 0 && (
        <Section label="Formação">
          <ol className="space-y-8">
            {education.map((item) => (
              <li key={item.id ?? item.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-medium tracking-tight">
                    {item.degree}
                    <span className="text-muted-foreground"> · {item.institution}</span>
                  </h3>
                  <span className="font-mono text-xs text-subtle">
                    {period(item.startDate, item.endDate, item.current)}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-2 max-w-reading text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
                {item.grade && (
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-subtle">
                    Classificação final: {item.grade}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {GRUPOS_DE_CREDENCIAIS.map(({ kind, label, intro }) => {
        const grupo = certifications.filter((item) => (item.kind ?? "COURSE") === kind);
        if (grupo.length === 0) return null;

        return (
          <Section key={kind} label={label}>
            {intro && <p className="mb-5 max-w-reading text-sm text-muted-foreground">{intro}</p>}
            <CredentialList items={grupo} />
          </Section>
        );
      })}
    </main>
  );
}

/**
 * Uma certificação é atribuída depois de uma avaliação; um curso é formação
 * concluída. Misturá-los faria o currículo dizer menos do que diz.
 */
const GRUPOS_DE_CREDENCIAIS = [
  {
    kind: "CERTIFICATION" as const,
    label: "Certificações",
    intro: "Credenciais obtidas após avaliação, verificáveis junto de quem as emitiu.",
  },
  {
    kind: "COURSE" as const,
    label: "Cursos e formação",
    intro: "Formação concluída, com certificado de conclusão.",
  },
];

function CredentialList({ items }: { items: Certification[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const content = (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <span className="font-mono text-xs text-subtle">{longDate(item.issuedAt)}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.issuer}
              {item.description ? ` — ${item.description}` : ""}
            </p>
          </>
        );

        return (
          <li key={item.id ?? item.title}>
            {item.credentialUrl ? (
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="row group"
              >
                {content}
              </a>
            ) : (
              <div className="row">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function groupBy<T>(items: T[], key: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const group = key(item);
    (groups[group] ??= []).push(item);
    return groups;
  }, {});
}
