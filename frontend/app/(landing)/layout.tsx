"use client";

import { ReactNode } from "react";
import { Navbar } from "@/src/components/landingPage/Navbar";
import { Footer } from "@/src/components/landingPage/Footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
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