"use client";

import { useInView } from "@/hooks/useInView";
import { HeroSection } from "./HeroSection";
import { MainContent } from "./MainContent";
import { TrustedClientsSection } from "./TrustedClientsSection";
import { TechStackSection } from "./TechStackSection";
import { CTASection } from "./CTASection";

export function AboutSection() {
  const hero = useInView(0.1);
  const body = useInView(0.1);
  const cards = useInView(0.1);
  const clients = useInView(0.2);
  const tech = useInView(0.15);
  const cta = useInView(0.2);

  return (
    <section className="bg-accent-50 text-gray-900 overflow-hidden">
      <HeroSection  />
      <MainContent />
      <TrustedClientsSection visible={clients.visible} />
      <TechStackSection visible={tech.visible} />
      <CTASection />

      {/* Keyframe for ping rings */}
      <style>{`
        @keyframes ping {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          70%  { transform: translate(-50%,-50%) scale(1.3); opacity: 0.1; }
          100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;