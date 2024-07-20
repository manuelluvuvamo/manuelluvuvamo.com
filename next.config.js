const { withContentlayer } = require('next-contentlayer')


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['flowbite.s3.amazonaws.com','discord.com', 'themewagon.github.io'], // Substitua pelo seu domínio de imagens
  },
  // Outras configurações do Next.js, se houver
}

module.exports = withContentlayer(nextConfig)
