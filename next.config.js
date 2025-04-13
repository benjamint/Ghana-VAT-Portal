/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'Ghana-VAT-Portal';

const nextConfig = {
  output: 'export',
  basePath: isProduction ? `/${repoName}` : '',
  assetPrefix: isProduction ? `/${repoName}` : '',
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
  // Add publicRuntimeConfig for client-side configuration
  publicRuntimeConfig: {
    basePath: isProduction ? `/${repoName}` : '',
  },
  // Ensure scripts are loaded with correct paths
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  },
  // Handle static export configuration
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig 