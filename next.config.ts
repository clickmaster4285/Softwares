import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },

  // API proxy for development - disabled (using local API routes)
  rewrites: async () => {
    return {
      beforeFiles: [],
    };
  },

  // TypeScript configuration is in tsconfig.json, not here
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
