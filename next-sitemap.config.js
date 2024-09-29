/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'http://manuelluvuvamo.vercel.app/',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/galeria', '/api/contact'],
  alternateRefs: [
    {
      href: 'https://en.manuelluvuvamo.vercel.app',
      hreflang: 'en',
    },
    {
      href: 'https://pt.manuelluvuvamo.vercel.app',
      hreflang: 'pt',
    },
  ],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/posts'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'test-bot',
        allow: ['/path', '/path-2'],
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/api/contact'],
      },
    ],
    additionalSitemaps: [ 
      'https://manuelluvuvamo.vercel.app/api/sitemap.xml', // Seu sitemap de posts
    ],
  },
}