// components/landingPage/servicesPage/ProcessSection.tsx

"use client";

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessPhase {
  phase: string;
  title: string;
  timeline: string;
  text: string;
}

interface ProcessSectionProps {
  serviceName: string;
  processPhases: ProcessPhase[];
}

export const ProcessSection = ({ serviceName, processPhases }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const phasesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate each phase with alternate directions
    phasesRef.current.forEach((phase, index) => {
      if (!phase) return;

      // Determine animation direction based on index
      const fromX = index % 2 === 0 ? -100 : 100; // Even: from left, Odd: from right
      
      gsap.fromTo(phase,
        {
          opacity: 0,
          x: fromX,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phase,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="our-process" 
      className="scroll-mt-24"
      ref={sectionRef}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 rounded-full bg-orange-500" />
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Our {serviceName} Process
        </h2>
      </div>

      <div className="mt-10 space-y-8">
        {processPhases.map((p, index) => (
          <div 
            key={p.title} 
            className="flex gap-6"
            ref={(el) => {
              phasesRef.current[index] = el;
            }}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                {p.phase.replace('Phase ', '')}
              </div>
              {index !== processPhases.length - 1 && (
                <div className="w-px h-full bg-slate-200 mt-2" />
              )}
            </div>

            <div className="pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
                  {p.timeline}
                </Badge>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
};