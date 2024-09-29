import { allPosts } from 'contentlayer/generated' // Pega os posts gerados automaticamente pelo ContentLayer
import { NextResponse } from 'next/server'

export async function GET() {
  // Pegando todos os posts gerados pelo ContentLayer
  const posts = allPosts;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map(post => {
          return `
            <!-- ${post.title} -->  <!-- Incluindo o título como comentário -->
            <url>
              <loc>${`https://manuelluvuvamo.vercel.app/blog/${post._raw.flattenedPath}`}</loc>
              <lastmod>${new Date(post.date).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `
        })
        .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
