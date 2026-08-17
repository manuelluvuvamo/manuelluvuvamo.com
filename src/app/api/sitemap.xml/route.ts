import { getContent } from "@/lib/api";
import { WEBSITE_HOST_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/sobre", priority: "0.8" },
  { path: "/projectos", priority: "0.9" },
  { path: "/escrita", priority: "0.8" },
  { path: "/vlog", priority: "0.6" },
  { path: "/frases", priority: "0.5" },
  { path: "/contacto", priority: "0.6" },
];

export async function GET() {
  const { projects, posts, essays, articles } = await getContent();

  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: route.path,
      lastmod: null as string | null,
      priority: route.priority,
    })),
    ...projects.map((project) => ({
      loc: `/projectos/${project.slug}`,
      lastmod: project.updatedAt ?? null,
      priority: "0.7",
    })),
    ...posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt ?? post.publishedAt ?? null,
      priority: "0.8",
    })),
    ...essays.map((essay) => ({
      loc: `/ensaios/${essay.slug}`,
      lastmod: essay.updatedAt ?? essay.publishedAt ?? null,
      priority: "0.7",
    })),
    // Artigos publicados noutro sítio não entram no sitemap deste domínio.
    ...articles
      .filter((article) => !article.externalUrl)
      .map((article) => ({
        loc: `/artigos/${article.slug}`,
        lastmod: article.updatedAt ?? article.publishedAt ?? null,
        priority: "0.6",
      })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${WEBSITE_HOST_URL}${entry.loc}</loc>${
      entry.lastmod ? `\n    <lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : ""
    }
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
