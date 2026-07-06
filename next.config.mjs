/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Disable ESLint during builds to prevent build failures from warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable type checking during builds for deployment speed
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
