/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Ghana-VAT-Portal',
  assetPrefix: '/Ghana-VAT-Portal/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
}

module.exports = nextConfig 