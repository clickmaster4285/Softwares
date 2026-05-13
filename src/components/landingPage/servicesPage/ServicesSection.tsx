// components/landingPage/servicesPage/ServicesSection.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  serviceName: string;
  servicesCards: ServiceCard[];
}

export const ServicesSection = ({ serviceName, servicesCards }: ServicesSectionProps) => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="our-services" className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 rounded-full bg-primary" />
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          <span className="font-black">{serviceName}</span> Services We Deliver
        </h2>
      </div>

      <p className="mt-6 text-lg text-slate-600 leading-relaxed">
        ClickMasters operates as a full-stack <span className="font-black">{serviceName.toLowerCase()}</span> partner. Our team handles every layer of the software delivery lifecycle — product strategy, UI/UX design, backend engineering, cloud infrastructure, QA, and ongoing support.
      </p>

      {/* Cards Container - 3 in a row */}
      <div 
        ref={cardsRef}
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {servicesCards.map((service, index) => (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-orange-50/60 hover:to-orange-50"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r from-primary to-primary transition-all duration-500 group-hover:w-full" />

            <div className="relative z-10 pt-2">
              <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                {service.title}
              </h3>

              <div className="my-6 h-px bg-slate-100 group-hover:bg-orange-100 transition-colors" />

              <p className="text-slate-600 leading-relaxed text-[17px]">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Divider */}
      <div className="mt-16 flex items-center">
        <div className="h-px w-full bg-gray-300" />
      </div>
    </section>
  );
};