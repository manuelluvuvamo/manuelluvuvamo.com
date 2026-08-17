/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // O dashboard grava através de server actions.
    serverActions: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    // As rotas antigas continuam a existir; passaram apenas a português.
    return [
      { source: "/projects", destination: "/projectos", permanent: true },
      { source: "/contact", destination: "/contacto", permanent: true },
      { source: "/blog", destination: "/escrita", permanent: true },
      { source: "/about", destination: "/sobre", permanent: true },
    ];
  },
};

module.exports = nextConfig;
