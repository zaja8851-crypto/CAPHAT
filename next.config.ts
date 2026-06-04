import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    // base64 images from admin uploads need unoptimized
    unoptimized: true,
  },
};

export default nextConfig;
