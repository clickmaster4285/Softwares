import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  allowedDevOrigins: [
    "http://192.168.88.33:3000",
    "http://192.168.88.40:3000",
    "http://localhost:3000",
  ],

  images: {
    // ✅ Reduced to only required domains (fixes 50+ limit issue)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // devicons CDN (your main source)
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // uploads / dynamic assets
      },
    ],

    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 100],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,
  },

  async redirects() {
    return [
      {
        source: "/logo.webp",
        destination: "/images/logo.webp",
        permanent: true,
      },
      {
        source: "/logo-white.webp",
        destination: "/images/logo-white.webp",
        permanent: true,
      },
          ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/uploads/:path*",
          destination: "/api/uploads/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { 
            key: "Content-Security-Policy", 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.googletagmanager.com;" 
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=120",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  poweredByHeader: false,
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withBundleAnalyzer(nextConfig);