/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'Ghana-VAT-Portal';

const nextConfig = {
  output: 'export',
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}/` : '',
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