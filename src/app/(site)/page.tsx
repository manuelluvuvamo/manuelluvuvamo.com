import EntryRow from "@/components/site/EntryRow";
import ProjectRow from "@/components/site/ProjectRow";
import Section from "@/components/site/Section";
import SocialIcon from "@/components/site/SocialIcon";
import { getContent } from "@/lib/api";
import Link from "next/link";

export const revalidate = 300;

export default async function HomePage() {
  const { profile, projects, posts, essays, quotes, skills, socialLinks } = await getContent();

  const featuredProjects = pick(projects, (p) => p.featured, 4);
  const recentPosts = posts.slice(0, 3);
  const recentEssays = essays.slice(0, 2);
  const featuredQuote = quotes.find((quote) => quote.featured) ?? quotes[0];
  const stack = skills.filter((skill) => skill.featured).map((skill) => skill.name);

  return (
    <main className="shell pb-8">
      {/* ---------------------------------------------------------- hero --- */}
      <section className="animate-fade-up py-16 sm:py-24">
        {profile.availableForWork && (
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {profile.availabilityNote ?? "Disponível para novos projectos"}
          </p>
        )}

        <h1 className="max-w-reading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {profile.fullName}
        </h1>

        {profile.headline && (
          <p className="mt-4 max-w-reading text-lg text-muted-foreground">{profile.headline}</p>
        )}

        {profile.shortBio && (
          <p className="mt-6 max-w-reading text-[17px] leading-relaxed text-muted-foreground">
            {profile.shortBio}
          </p>
        )}

        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {profile.currentRole && (
            <div className="flex gap-2">
              <dt className="text-subtle">Agora</dt>
              <dd>
                {profile.currentRole}
                {profile.currentCompany && (
                  <>
                    {" na "}
                    {profile.currentCompanyUrl ? (
                      <a
                        href={profile.currentCompanyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link underline"
                      >
                        {profile.currentCompany}
                      </a>
                    ) : (
                      profile.currentCompany
                    )}
                  </>
                )}
              </dd>
            </div>
          )}
          {profile.location && (
            <div className="flex gap-2">
              <dt className="text-subtle">Onde</dt>
              <dd>{profile.location}</dd>
            </div>
          )}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/projectos"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Ver projectos
          </Link>
          <Link href="/contacto" className="text-sm link underline">
            Falar comigo
          </Link>
          {profile.resumePtUrl && (
            <a
              href={profile.resumePtUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm link-muted"
            >
              Currículo (PT)
            </a>
          )}
          {profile.resumeEnUrl && (
            <a
              href={profile.resumeEnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm link-muted"
            >
              CV (EN)
            </a>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------ projectos --- */}
      {featuredProjects.length > 0 && (
        <Section label="Projectos seleccionados" action={{ label: "Todos", href: "/projectos" }}>
          <ul className="space-y-1">
            {featuredProjects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </Section>
      )}

      {/* --------------------------------------------------------- frase --- */}
      {featuredQuote && (
        <section className="border-t border-border py-14">
          <blockquote className="max-w-reading">
            <p className="text-xl font-medium leading-relaxed tracking-tight text-balance">
              “{featuredQuote.text}”
            </p>
            {featuredQuote.context && (
              <footer className="mt-3 text-sm text-subtle">
                {featuredQuote.author ? `${featuredQuote.author} · ` : ""}
                {featuredQuote.context}
              </footer>
            )}
          </blockquote>
        </section>
      )}

      {/* -------------------------------------------------------- escrita --- */}
      {(recentPosts.length > 0 || recentEssays.length > 0) && (
        <Section label="Escrita recente" action={{ label: "Tudo", href: "/escrita" }}>
          <ul className="space-y-1">
            {recentPosts.map((post) => (
              <EntryRow
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt}
                meta={post.readingMinutes ? `${post.readingMinutes} min de leitura` : undefined}
              />
            ))}
            {recentEssays.map((essay) => (
              <EntryRow
                key={essay.slug}
                href={`/ensaios/${essay.slug}`}
                title={essay.title}
                excerpt={essay.subtitle}
                date={essay.publishedAt}
                meta="Ensaio"
              />
            ))}
          </ul>
        </Section>
      )}

      {/* ---------------------------------------------------------- stack --- */}
      {stack.length > 0 && (
        <Section label="Stack" action={{ label: "Percurso completo", href: "/sobre" }}>
          <p className="max-w-reading text-[15px] leading-relaxed text-muted-foreground">
            {stack.join(" · ")}
          </p>
        </Section>
      )}

      {/* ---------------------------------------------------- redes sociais --- */}
      {socialLinks.length > 0 && (
        <Section label="Onde me encontras">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm link-muted"
                >
                  <SocialIcon name={link.icon} size={15} />
                  {link.username ?? link.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}

/** Devolve os itens marcados; se não houver nenhum, os primeiros da lista. */
function pick<T>(items: T[], predicate: (item: T) => boolean | undefined, limit: number): T[] {
  const preferred = items.filter((item) => predicate(item));
  return (preferred.length > 0 ? preferred : items).slice(0, limit);
}
