import Prose from "@/components/site/Prose";
import { getContent } from "@/lib/api";
import { longDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

export async function generateStaticParams() {
  const { essays } = await getContent();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { essays } = await getContent();
  const essay = essays.find((item) => item.slug === params.slug);

  if (!essay) {
    return { title: "Ensaio não encontrado" };
  }

  return {
    title: essay.title,
    description: essay.subtitle,
    openGraph: {
      title: essay.title,
      description: essay.subtitle,
      type: "article",
      publishedTime: essay.publishedAt,
    },
  };
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  const { essays } = await getContent();
  const essay = essays.find((item) => item.slug === params.slug);

  if (!essay) {
    notFound();
  }

  const html = await renderMarkdown(essay.content);

  return (
    <main className="shell py-16">
      <Link href="/escrita" className="text-sm link-muted">
        ← Escrita
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-8">
          <p className="eyebrow mb-3">Ensaio</p>
          <h1 className="max-w-reading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {essay.title}
          </h1>
          {essay.subtitle && (
            <p className="mt-3 max-w-reading text-[15px] leading-relaxed text-muted-foreground">
              {essay.subtitle}
            </p>
          )}
          {essay.publishedAt && (
            <time
              dateTime={essay.publishedAt}
              className="mt-4 block font-mono text-xs text-subtle"
              suppressHydrationWarning
            >
              {longDate(essay.publishedAt)}
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
