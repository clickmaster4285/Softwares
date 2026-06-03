import { ReactNode } from "react";
import dynamic from "next/dynamic";
import FooterLazy from "@/components/landingPage/FooterLazy";
import { Footer } from "@/src/components/landingPage/Footer";

const Navbar = dynamic(
  () => import("@/components/landingPage/navbar").then((mod) => mod.Navbar),
  {
    loading: () => (
      <div className="h-20 w-full border-b border-black/10 bg-white/95" />
    ),
  }
);

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Page content — no overflow here so sticky TOC / card stacks use document scroll */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}