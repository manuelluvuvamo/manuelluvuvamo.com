import EntryRow from "@/components/site/EntryRow";
import PageHeader from "@/components/site/PageHeader";
import Section from "@/components/site/Section";
import { getContent } from "@/lib/api";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Escrita",
  description:
    "Artigos técnicos, textos para a comunidade e ensaios sobre desenvolvimento de software em Angola.",
};

export default async function WritingPage() {
  const { posts, articles, essays } = await getContent();

  return (
    <main className="shell py-16">
      <PageHeader
        eyebrow="Escrita"
        title="O que escrevo"
        intro="Notas técnicas do que aprendo a construir, textos para quem está a começar, e ensaios mais longos sobre o ofício."
      />

      {posts.length > 0 && (
        <Section label="Blog">
          <ul className="space-y-1">
            {posts.map((post) => (
              <EntryRow
                key={post.slug}
                href={`/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt}
                meta={post.readingMinutes ? `${post.readingMinutes} min de leitura` : undefined}
              />
            ))}
          </ul>
        </Section>
      )}

      {essays.length > 0 && (
        <Section label="Ensaios">
          <ul className="space-y-1">
            {essays.map((essay) => (
              <EntryRow
                key={essay.slug}
                href={`/ensaios/${essay.slug}`}
                title={essay.title}
                excerpt={essay.subtitle}
                date={essay.publishedAt}
              />
            ))}
          </ul>
        </Section>
      )}

      {articles.length > 0 && (
        <Section label="Artigos">
          <ul className="space-y-1">
            {articles.map((article) => (
              <EntryRow
                key={article.slug}
                href={article.externalUrl ?? `/artigos/${article.slug}`}
                external={Boolean(article.externalUrl)}
                title={article.title}
                excerpt={article.excerpt}
                date={article.publishedAt}
                meta={article.source}
              />
            ))}
          </ul>
        </Section>
      )}

      {posts.length === 0 && essays.length === 0 && articles.length === 0 && (
        <p className="py-12 text-sm text-muted-foreground">Ainda não há nada publicado por aqui.</p>
      )}
    </main>
  );
}
