/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  experimental: {
    turbo: false, // ⛔️ disable Turbopack
  },
};

export default nextConfig;
