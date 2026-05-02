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
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.worldvectorlogo.com" },
      { protocol: "https", hostname: "bun.sh" },
      { protocol: "https", hostname: "capacitorjs.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "chakra-ui.com" },
      { protocol: "https", hostname: "developer.apple.com" },
      { protocol: "https", hostname: "developers.google.com" },
      { protocol: "https", hostname: "directus.io" },
      { protocol: "https", hostname: "drizzle.team" },
      { protocol: "https", hostname: "esbuild.github.io" },
      { protocol: "https", hostname: "ethers.org" },
      { protocol: "https", hostname: "fly.io" },
      { protocol: "https", hostname: "hardhat.org" },
      { protocol: "https", hostname: "htmx.org" },
      { protocol: "https", hostname: "jwt.io" },
      { protocol: "https", hostname: "kit.svelte.dev" },
      { protocol: "https", hostname: "langchain.com" },
      { protocol: "https", hostname: "llama.meta.com" },
      { protocol: "https", hostname: "mantine.dev" },
      { protocol: "https", hostname: "mongoosejs.com" },
      { protocol: "https", hostname: "mqtt.org" },
      { protocol: "https", hostname: "nodemailer.com" },
      { protocol: "https", hostname: "oauth.net" },
      { protocol: "https", hostname: "ollama.ai" },
      { protocol: "https", hostname: "playwright.dev" },
      { protocol: "https", hostname: "pocketbase.io" },
      { protocol: "https", hostname: "python-poetry.org" },
      { protocol: "https", hostname: "qwik.io" },
      { protocol: "https", hostname: "railway.app" },
      { protocol: "https", hostname: "react-query.tanstack.com" },
      { protocol: "https", hostname: "recoiljs.org" },
      { protocol: "https", hostname: "render.com" },
      { protocol: "https", hostname: "resend.com" },
      { protocol: "https", hostname: "sendgrid.com" },
      { protocol: "https", hostname: "stimulus.hotwired.dev" },
      { protocol: "https", hostname: "tachyons.io" },
      { protocol: "https", hostname: "trufflesuite.com" },
      { protocol: "https", hostname: "typeorm.io" },
      { protocol: "https", hostname: "typesense.org" },
      { protocol: "https", hostname: "vlang.io" },
      { protocol: "https", hostname: "vuex.vuejs.org" },
      { protocol: "https", hostname: "www.babylonjs.com" },
      { protocol: "https", hostname: "www.braintreepayments.com" },
      { protocol: "https", hostname: "www.espressif.com" },
      { protocol: "https", hostname: "www.keycloak.org" },
      { protocol: "https", hostname: "www.lemonsqueezy.com" },
      { protocol: "https", hostname: "www.mailgun.com" },
      { protocol: "https", hostname: "www.meilisearch.com" },
      { protocol: "https", hostname: "www.okta.com" },
      { protocol: "https", hostname: "www.paddle.com" },
      { protocol: "https", hostname: "www.passportjs.org" },
      { protocol: "https", hostname: "www.solidjs.com" },
      { protocol: "https", hostname: "www.vultr.com" },
      { protocol: "https", hostname: "ziglang.org" },
      { protocol: "https", hostname: "zustand-demo.pmnd.rs" },
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
        source: "/logo.webp",
        destination: "/images/logo.webp",
        permanent: true,
      },
      {
        source: "/logo-white.webp",
        destination: "/images/logo-white.webp",
        permanent: true,
      },
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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withBundleAnalyzer(nextConfig);
