/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Note: rewrites() don't work with static export
  // Static files in public/stakepromotions.com will be served as-is
};

export default nextConfig;
