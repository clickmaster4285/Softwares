import { ReactNode } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(
  () => import("@/components/landingPage/Footer").then((mod) => mod.Footer),
  {
    loading: () => (
      <div className="h-20 w-full border-b border-black/10 bg-white/95" />
    ),
  }
);
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

      {/* Page content */}
      <main className="">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}