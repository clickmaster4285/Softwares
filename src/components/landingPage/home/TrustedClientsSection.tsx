"use client";

import { useEffect, useRef, useState } from "react";

// Trusted clients with logos (using SVG placeholders)
const trustedClients = [
  { name: "TechCorp", logo: "🏢", industry: "Manufacturing" },
  { name: "HealthPlus", logo: "🏥", industry: "Healthcare" },
  { name: "RetailHub", logo: "🛍️", industry: "Retail" },
  { name: "EstatePro", logo: "🏘️", industry: "Real Estate" },
  { name: "EduSmart", logo: "🎓", industry: "Education" },
  { name: "FinTrust", logo: "💰", industry: "Finance" },
  { name: "LogiFlow", logo: "🚚", industry: "Logistics" },
  { name: "MediaWave", logo: "📺", industry: "Media" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TrustedClientCard({
  client,
  index,
  visible,
}: {
  client: typeof trustedClients[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="group flex flex-col items-center justify-center p-8 transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        transitionDelay: visible ? `${index * 60}ms` : "0ms",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {client.logo}
      </div>

      <p className="text-xl font-bold text-gray-800 mb-1">
        {client.name}
      </p>

      <p className="text-xs text-gray-600 uppercase tracking-wide">
        {client.industry}
      </p>
    </div>
  );
}

export function TrustedClientsSection() {
  const clients = useInView(0.2);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white" ref={clients.ref}>
      <div className="mx-auto px-6 lg:px-12 py-16 lg:py-20">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
            <p className="text-orange-800 text-[11px] font-bold tracking-[0.2em] uppercase">
              Trusted By Industry Leaders
            </p>
            <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            Our Trusted Partners & Clients
          </h3>

          <p className="text-gray-700 max-w-2xl mx-auto text-sm">
            Join 3,500+ businesses that trust ClickMasters to deliver exceptional software solutions
          </p>
        </div>

        {/* MARQUEE WRAPPER */}
        <div className="relative overflow-hidden">

          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* TRACK */}
          <div className="flex w-max gap-4 animate-marquee-left hover:[animation-play-state:paused]">

            {[...trustedClients, ...trustedClients].map((client, idx) => (
              <TrustedClientCard
                key={`${client.name}-${idx}`}
                client={client}
                index={idx}
                visible={clients.visible}
              />
            ))}

          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default TrustedClientsSection;