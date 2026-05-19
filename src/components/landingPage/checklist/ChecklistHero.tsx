"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { subpageInnerPadding, subpageOuterPadding } from "@/src/components/landingPage/servicesPage/subpage-layout";

interface ChecklistHeroProps {
  checklist: any;
  overallPercentage: number;
  phaseIcons: Record<string, { icon: string; color: string; bg: string }>;
  getPhasePercentage: (phaseKey: string) => number;
  getDoneCount: (phaseKey: string) => number;
}

function AnimatedCounter({ end, duration = 1200 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(end * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span className="font-head text-4xl font-extrabold text-[#1A1A2E] tabular-nums">{count}</span>;
}

export default function ChecklistHero({
  checklist,
  overallPercentage,
  phaseIcons,
  getPhasePercentage,
  getDoneCount,
}: ChecklistHeroProps) {
  return (
    <section className="bg-white border-b border-[#E4E6EF] py-16">
      <div className={subpageOuterPadding}>
        <div className={`${subpageInnerPadding} grid md:grid-cols-[1fr_420px] gap-16 items-start`}>
        
        {/* Left Section - Hero Content */}
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFF3ED] border border-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            <i className="fa-solid fa-circle-check text-[11px]"></i>
            {checklist.heroBadgeText.split("|")[0].trim()}
          </div>

          {/* Title */}
          <h1 className="font-head text-4xl md:text-6xl font-extrabold text-[#1A1A2E] leading-[1.1] tracking-tighter mb-6">
            {checklist.heroTitleMain.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">{checklist.heroTitleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-[#5A5A72] leading-relaxed max-w-xl mb-10">
            {checklist.heroDescription}
          </p>

          {/* Stats with Counters */}
          <div className="flex gap-10">
            {checklist.stats.map((stat: any, idx: number) => (
              <div key={idx} className="group">
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter end={parseInt(stat.num)} />
                  {stat.suffix && (
                    <span className="text-3xl font-bold text-[#1A1A2E]">{stat.suffix}</span>
                  )}
                </div>
                <div className="text-sm text-[#8888A0] font-medium mt-1 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Professional Progress Card */}
        <div>
          <div className="bg-white border border-[#E4E6EF] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
               
                <div>
                  <h3 className="font-bold text-xl text-[#1A1A2E]">Your Progress</h3>
                  <p className="text-sm text-[#8888A0]">Real-time completion tracker</p>
                </div>
              </div>

              {/* Overall Percentage */}
              <div className="text-right">
                <div className="text-5xl font-extrabold text-primary tabular-nums">
                  {overallPercentage}
                  <span className="text-2xl">%</span>
                </div>
                <div className="text-xs text-[#8888A0] -mt-1">COMPLETE</div>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-[#5A5A72] mb-2.5">
                <span className="font-medium">Overall Progress</span>
                <span className="font-semibold text-primary">{overallPercentage}%</span>
              </div>
              <div className="h-3 bg-[#F1F3F7] rounded-2xl overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-primary to-primary/90 rounded-2xl transition-all duration-700 ease-out relative"
                  style={{ width: `${overallPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>

            {/* Phase Progress */}
            <div className="space-y-6">
              {checklist.phases.map((phase: any) => {
                const percentage = getPhasePercentage(phase.key);
                const phaseIcon = phaseIcons[phase.key];

                return (
                  <div key={phase.key} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                    
                                <Check className="h-5 w-5 text-green-600"/>
                        <span className="font-semibold text-[#1A1A2E]">{phase.title}</span>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <span className="font-bold text-primary text-base tabular-nums">
                          {percentage}%
                        </span>
                        <span className="text-xs text-[#8888A0] font-medium">
                          {getDoneCount(phase.key)}/{phase.items.length}
                        </span>
                      </div>
                    </div>

                    {/* Phase Bar */}
                    <div className="h-2 bg-[#F1F3F7] rounded-2xl overflow-hidden">
                      <div
                        className="h-full rounded-2xl transition-all duration-700 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: phaseIcon?.color || "#6366f1",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Motivational Footer */}
            <div className="mt-8 pt-6 border-t border-[#E4E6EF]">
              <div className="flex gap-3 text-sm">
                <i
                  className={`fa-solid mt-0.5 text-lg ${
                    overallPercentage === 100
                      ? "fa-trophy text-amber-500"
                      : overallPercentage >= 75
                      ? "fa-rocket text-primary"
                      : overallPercentage >= 50
                      ? "fa-fire text-orange-500"
                      : "fa-bullhorn text-[#8888A0]"
                  }`}
                />
                <p className="text-[#5A5A72] leading-relaxed">
                  {overallPercentage === 100
                    ? "🎉 Outstanding! You've completed the entire checklist."
                    : overallPercentage >= 75
                    ? "You're almost there. Just a few more steps to go!"
                    : overallPercentage >= 50
                    ? "Solid progress! You're more than halfway through."
                    : overallPercentage >= 25
                    ? "Great start — keep the momentum going."
                    : "Start completing tasks to track your progress."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}