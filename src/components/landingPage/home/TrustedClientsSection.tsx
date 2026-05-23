"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Cpu,
  Stethoscope,
  ShoppingBag,
  Building2,
  GraduationCap,
  Coins,
  Truck,
  Tv2,
  Landmark,
  Leaf,
  Hotel,
  Activity,
  CircuitBoard,
  ShieldCheck,
  BarChart3,
  LucideIcon,
} from "lucide-react";

type Client = {
  name: string;
  industry: string;
  icon: LucideIcon;
};

import SplitText from '../../ui/SplitText';

const trustedClients: Client[] = [
  { name: "TechCorp", industry: "Manufacturing", icon: Cpu },
  { name: "HealthPlus", industry: "Healthcare", icon: Stethoscope },
  { name: "RetailHub", industry: "Retail", icon: ShoppingBag },
  { name: "EstatePro", industry: "Real Estate", icon: Building2 },
  { name: "EduSmart", industry: "Education", icon: GraduationCap },
  { name: "FinTrust", industry: "Finance", icon: Coins },
  { name: "LogiFlow", industry: "Logistics", icon: Truck },
  { name: "MediaWave", industry: "Media", icon: Tv2 },
  { name: "NovaBank", industry: "Banking", icon: Landmark },
  { name: "GreenField", industry: "Agriculture", icon: Leaf },
  { name: "Skyline Hotels", industry: "Hospitality", icon: Hotel },
  { name: "Pulse Fitness", industry: "Health & Fitness", icon: Activity },
  { name: "Quantum Dynamics", industry: "Technology", icon: CircuitBoard },
  { name: "Lumina Insurance", industry: "Insurance", icon: ShieldCheck },
  { name: "Vertex Solutions", industry: "Consulting", icon: BarChart3 },
];

function useInView(threshold = 0.15) {
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

function ClientCard({
  client,
  index,
  visible,
}: {
  client: Client;
  index: number;
  visible: boolean;
}) {
  const Icon = client.icon;

  return (
    <div
      className="group relative bg-white/40 hover:bg-white transition-colors duration-200 p-8 flex flex-col items-center justify-center gap-5 min-h-[180px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${index * 50}ms, transform 0.4s ease ${index * 50}ms, background-color 0.2s`,
      }}
    >
      <span
        className="absolute bottom-0 left-0 w-full h-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      />

      <div className="w-16 h-16 flex items-center justify-center rounded-xl group-hover:border-primary group-hover:bg-primary/10 transition-all duration-200">
        <Icon size={28} className="text-primary" strokeWidth={1.5} />
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold text-gray-900 leading-snug">
          {client.name}
        </p>
        <p className="text-sm uppercase tracking-widest text-gray-800 mt-1">
          {client.industry}
        </p>
      </div>
    </div>
  );
}

export function TrustedClientsSection() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="relative w-full bg-[#f5fbfb] py-14">
      {/* Background Decorative Blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#a7f3d0] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#fdba74] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#93c5fd] opacity-25 blur-3xl" />

      {/* Centered Container - max-w-1600px */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-primary" />
            <div className="inline-flex items-center gap-1.5 mt-6">
              <SplitText
                text="Trusted By Industry Leaders"
                className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary"
                delay={60}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, x: 60 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.2}
              />
            </div>
            <span className="h-[2px] w-8 rounded-full bg-primary" />
          </div>

          <p className="text-gray-800 max-w-2xl mx-auto text-base md:text-lg">
            Join 3,500+ businesses that trust ClickMasters to deliver exceptional software solutions
          </p>
        </div>

        {/* Client Grid */}
        <div className="border border-gray-200 rounded-xl overflow-hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-gray-200">
          {trustedClients.map((client, idx) => (
            <ClientCard
              key={client.name}
              client={client}
              index={idx}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedClientsSection;