"use client";

import React, { useEffect, useRef, useState } from "react";

// Trusted clients with logos
const trustedClients = [
  { name: "TechCorp", logo: "🏢", industry: "Manufacturing" },
  { name: "HealthPlus", logo: "🏥", industry: "Healthcare" },
  { name: "RetailHub", logo: "🛍️", industry: "Retail" },
  { name: "EstatePro", logo: "🏘️", industry: "Real Estate" },
  { name: "EduSmart", logo: "🎓", industry: "Education" },
  { name: "FinTrust", logo: "💰", industry: "Finance" },
  { name: "LogiFlow", logo: "🚚", industry: "Logistics" },
  { name: "MediaWave", logo: "📺", industry: "Media" },
  { name: "NovaBank", logo: "🏦", industry: "Banking" },
  { name: "GreenField", logo: "🌱", industry: "Agriculture" },
  { name: "Skyline Hotels", logo: "🏨", industry: "Hospitality" },
  { name: "Pulse Fitness", logo: "💪", industry: "Health & Fitness" },
  { name: "Quantum Dynamics", logo: "⚡", industry: "Technology" },
  { name: "Lumina Insurance", logo: "🛡️", industry: "Insurance" },
  { name: "Vertex Solutions", logo: "📊", industry: "Consulting" },

];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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
      className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        transitionDelay: visible ? `${index * 50}ms` : "0ms",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">
        {client.logo}
      </div>

      <p className="text-xl font-bold text-gray-800 mb-1 text-center">
        {client.name}
      </p>

      <p className="text-xs text-gray-600 uppercase tracking-widest text-center">
        {client.industry}
      </p>
    </div>
  );
}

export function TrustedClientsSection() {
  const clients = useInView(0.15);

  return (
    <div ref={clients.ref}>
      <div className="mx-auto px-6 lg:px-12 py-16 lg:py-20 bg-white">
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

        {/* GRID - Showing All 8 Clients */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-6">
          {trustedClients.map((client, idx) => (
            <TrustedClientCard
              key={client.name}
              client={client}
              index={idx}
              visible={clients.visible}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          + Many more happy clients worldwide
        </p>
      </div>
    </div>
  );
}

export default TrustedClientsSection;