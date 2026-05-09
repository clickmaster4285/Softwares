"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { CardStack } from "@/components/ui/card-stack";
import { resolveImageUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  title: string;
  description: string;
  url?: string;
  category?: {
    _id: string;
    name: string;
  };
  tags?: string[];
  status?: string;
  thumbnail?: string;
  createdAt?: string;
}

export default function SolutionsPage() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const phasesRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const metrics = [
    { value: 98, suffix: "%", label: "Projects delivered on time" },
    { value: 3.5, suffix: "x", label: "Avg. client revenue growth", isFloat: true },
    { value: 40, suffix: "%", label: "Faster time-to-market*" },
    { value: 100, suffix: "%", label: "IP ownership & transparency" },
  ];

  // Map projects to CardStack format
  const cardStackItems = projects.slice(0,8).map((project, index) => ({
    id: project._id,
    title: project.title || "Untitled Project",
    description: project.description && project.description.length > 100 
      ? `${project.description.substring(0, 100)}...` 
      : project.description || "No description available",
    imageSrc: project.thumbnail ? resolveImageUrl(project.thumbnail) : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    href: project.url || "#",
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelectorAll('.hero-animate');
        gsap.fromTo(heroContent,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 80%",
            }
          }
        );
      }

      phasesRef.current.forEach((phase, index) => {
        if (phase) {
          gsap.fromTo(phase,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              scrollTrigger: {
                trigger: phase,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              ease: "back.out(0.4)",
            }
          );
        }
      });

      counterRefs.current.forEach((counter, idx) => {
        if (counter) {
          const target = metrics[idx].value;
          gsap.fromTo(counter,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function() {
                const current = Math.floor(Number(counter.innerText));
                if (metrics[idx].isFloat) {
                  counter.textContent = current.toFixed(1);
                } else {
                  counter.textContent = current.toString();
                }
              }
            }
          );
        }
      });

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.querySelectorAll('.cta-animate'),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
            },
            ease: "back.out(0.5)",
          }
        );
      }

      if (heroRef.current) {
        const heroBg = heroRef.current.querySelector('.hero-bg');
        if (heroBg) {
          gsap.to(heroBg, {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [metrics]);

  // Show loading state
  if (isLoading) {
    return (
      <main className="bg-white overflow-x-hidden">
        <div className="py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="h-12 w-96 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="h-6 w-64 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white overflow-x-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes growLine {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(249, 115, 22, 0.2); }
          50% { border-color: rgba(249, 115, 22, 0.8); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-grow-line {
          animation: growLine 1.5s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 1.5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .border-pulse {
          animation: borderPulse 2s ease-in-out infinite;
        }
        
        .bg-gradient-animate {
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }
        
        .grow-line {
          animation: growWidth 1s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .hover-rotate:hover {
          transform: rotate(3deg) scale(1.02);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
      `}</style>

      {/* Card Stack Animation Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16">
  <div className="inline-flex items-center gap-2 mb-3">
    <span className="h-[2px] w-8 rounded-full bg-orange-400" />
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
      Success Stories
    </p>
    <span className="h-[2px] w-8 rounded-full bg-orange-400" />
  </div>

  <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-4xl">
    Our Work in  Action
   
  </h2>

  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
    See how we've helped businesses transform their ideas into
    successful digital products and scalable solutions.
  </p>
</div>

          {cardStackItems.length > 0 ? (
            <CardStack
              items={cardStackItems}
              initialIndex={Math.min(2, cardStackItems.length - 1)}
              autoAdvance
              intervalMs={3000}
              pauseOnHover
              showDots
              spreadDeg={38}
              overlap={0.52}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects available yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}