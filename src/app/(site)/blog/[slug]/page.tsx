import PostMetrics from "@/components/site/PostMetrics";
import Prose from "@/components/site/Prose";
import { getContent } from "@/lib/api";
import { compactNumber, longDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

export async function generateStaticParams() {
  const { posts } = await getContent();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { posts } = await getContent();
  const post = posts.find((item) => item.slug === params.slug);

  if (!post) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { posts } = await getContent();
  const post = posts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);

  return (
    <main className="shell py-16">
      <Link href="/escrita" className="text-sm link-muted">
        ← Escrita
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-8">
          <h1 className="max-w-reading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-xs text-subtle">
            {post.publishedAt && (
              <time dateTime={post.publishedAt} suppressHydrationWarning>
                {longDate(post.publishedAt)}
              </time>
            )}
            {post.readingMinutes && <span>· {post.readingMinutes} min de leitura</span>}
            {typeof post.viewCount === "number" && post.viewCount > 0 && (
              <span>· {compactNumber(post.viewCount)} {post.viewCount === 1 ? "leitor" : "leitores"}</span>
            )}
          </p>
        </header>

        <div className="py-10">
          <Prose html={html} />
        </div>

        {/* Conta a abertura, e a leitura quando este marcador entrar no ecrã. */}
        <PostMetrics slug={post.slug} />

        {post.tags && post.tags.length > 0 && (
          <footer className="border-t border-border pt-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-subtle">
              {post.tags.join(" · ")}
            </p>
          </footer>
        )}
      </article>
    </main>
  );
}
