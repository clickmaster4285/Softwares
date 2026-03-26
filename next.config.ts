import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    formats: ["image/avif", "image/webp"],
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

  poweredByHeader: false,
  reactStrictMode: true,
  compiler:
    process.env.NODE_ENV === "production"
      ? { removeConsole: { exclude: ["error", "warn"] } }
      : undefined,
};

export default nextConfig;