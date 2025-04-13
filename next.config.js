/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Ghana-VAT-Portal',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 