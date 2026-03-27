"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(
  () => import("@/components/landingPage/Footer").then((mod) => mod.Footer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-foreground py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function FooterLazy() {
  return <Footer />;
}
