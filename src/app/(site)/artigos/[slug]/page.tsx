import Prose from "@/components/site/Prose";
import { getContent } from "@/lib/api";
import { longDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const revalidate = 300;

export async function generateStaticParams() {
  const { articles } = await getContent();
  // Artigos que vivem noutro sítio não têm página própria aqui.
  return articles.filter((article) => !article.externalUrl).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { articles } = await getContent();
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { articles } = await getContent();
  const article = articles.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Sem conteúdo próprio, o artigo é apenas um apontador para a publicação original.
  if (!article.content?.trim() && article.externalUrl) {
    redirect(article.externalUrl);
  }

  const html = await renderMarkdown(article.content);

  return (
    <main className="shell py-16">
      <Link href="/escrita" className="text-sm link-muted">
        ← Escrita
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-8">
          {article.source && <p className="eyebrow mb-3">{article.source}</p>}
          <h1 className="max-w-reading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {article.title}
          </h1>
          {article.publishedAt && (
            <time
              dateTime={article.publishedAt}
              className="mt-4 block font-mono text-xs text-subtle"
              suppressHydrationWarning
            >
              {longDate(article.publishedAt)}
            </time>
          )}
        </header>

        <div className="py-10">
          <Prose html={html} />
        </div>
      </article>
    </main>
  );
}
