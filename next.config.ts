import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: true,
  },

  // API proxy for development - disabled (using local API routes)
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/uploads/:path*',
          destination: '/api/uploads/:path*',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;