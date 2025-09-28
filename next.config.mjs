/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const repoName = 'nextjs-portfolio';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // For GitHub Pages project site: https://<user>.github.io/<repo>
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;

