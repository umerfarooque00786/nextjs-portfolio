/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel deployment
  images: {
    unoptimized: false,
    domains: ['via.placeholder.com']
  },
  // Remove output: 'export' for Vercel (supports SSR)
  // Remove basePath and assetPrefix (not needed for Vercel)
  trailingSlash: false,
};

export default nextConfig;

