/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/pjx9e2r5/**",
      },
      // Fallback for other images
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  i18n: undefined,
};

export default nextConfig;
