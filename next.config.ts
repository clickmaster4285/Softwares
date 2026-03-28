import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}",
    },
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
   allowedDevOrigins: [
    "http://192.168.88.33:3000", // your LAN IP + port
    "http://localhost:3000",      // keep localhost
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "your-actual-domain.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
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
        source: "/solutions",
        destination: "/software-solutions",
        permanent: true,
      },
      {
        source: "/solutions/:path*",
        destination: "/software-solutions/:path*",
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
  compiler:
    process.env.NODE_ENV === "production"
      ? { removeConsole: { exclude: ["error", "warn"] } }
      : undefined,
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      if (dev) {
        config.devtool = "source-map";
      }
      const optimization = config.optimization ?? {};
      const splitChunks = optimization.splitChunks;
      if (splitChunks && typeof splitChunks === "object") {
        splitChunks.cacheGroups = {
          ...(splitChunks.cacheGroups ?? {}),
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: "lucide",
            chunks: "async",
            priority: 30,
            enforce: true,
          },
        };
      }
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
