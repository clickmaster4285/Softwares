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

  // API proxy for development
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination:
            (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/:path*",
        },
      ],
    };
  },

  // TypeScript configuration is in tsconfig.json, not here
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
