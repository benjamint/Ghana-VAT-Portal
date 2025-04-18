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
  // Enable type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint during build
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configure error handling
  onError: (err) => {
    console.error('Next.js error:', err);
  },
  // Disable middleware for static export
  middleware: false,
  // Disable server components for static export
  experimental: {
    serverComponents: false,
  }
}

module.exports = nextConfig 