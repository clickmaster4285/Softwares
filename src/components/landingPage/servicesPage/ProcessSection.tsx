// components/landingPage/servicesPage/ProcessSection.tsx

"use client";

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Sparkles, Zap, Target, Rocket, LucideIcon } from "lucide-react";

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

// Map phase numbers to appropriate icons
const getPhaseIcon = (phaseNumber: number): LucideIcon => {
  const icons: Record<number, LucideIcon> = {
    1: Sparkles,
    2: Zap,
    3: Target,
    4: Rocket,
  };
  return icons[phaseNumber] || Sparkles;
};

// Map phase numbers to gradient colors
const getPhaseGradient = (phaseNumber: number): string => {
  const gradients: Record<number, string> = {
    1: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    2: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    3: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    4: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  };
  return gradients[phaseNumber] || "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
};

// Smoother timing segments
const CARD_DURATION = 0.15;
const ARROW_DURATION = 0.08;
const START_OFFSET = 0; // Changed from 0.05 to 0 so first card starts immediately

interface ProcessPhaseWithAnimation extends ProcessPhase {
  index: number;
  side: "left" | "right";
  gradient: string;
  icon: LucideIcon;
}

const AnimatedCard = ({
  phase,
  progress,
  start,
  end,
  isFirst = false,
}: {
  phase: ProcessPhaseWithAnimation;
  progress: MotionValue<number>;
  start: number;
  end: number;
  isFirst?: boolean;
}) => {
  const Icon = phase.icon;
  
  // For first card, set initial opacity to 1 so it's visible immediately
  const opacity = isFirst 
    ? useTransform(progress, [start, start + CARD_DURATION * 0.5], [1, 1])
    : useTransform(progress, [start, start + CARD_DURATION * 0.5], [0, 1]);
  
  const y = useTransform(progress, [start, end], [isFirst ? 0 : 30, 0]);
  const scale = useTransform(progress, [start, end], [isFirst ? 1 : 0.96, 1]);

  const isLeft = phase.side === "left";

  return (
    <div
      className={`relative flex w-full ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } justify-center`}
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 w-full max-w-sm"
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="group relative w-full rounded-xl bg-white p-5 transition-all duration-300 hover:shadow-lg border border-slate-100">
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ background: phase.gradient }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {phase.phase}
                </span>
                <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 text-xs px-2 py-0">
                  {phase.timeline}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{phase.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{phase.text}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedArrow = ({
  fromSide,
  progress,
  start,
  end,
}: {
  fromSide: "left" | "right";
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, start + ARROW_DURATION * 0.3], [0, 0.6]);

  const path =
    fromSide === "left"
      ? "M 80 30 C 220 30, 380 170, 520 170"
      : "M 520 30 C 380 30, 220 170, 80 170";

  return (
    <div className="relative -my-4 flex w-full justify-center md:-my-6">
      <svg
        viewBox="0 0 600 200"
        className="h-20 w-full max-w-2xl md:h-24"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`arrow-grad-${start}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <path
          d={path}
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
          opacity="0.3"
        />

        <motion.path
          d={path}
          stroke={`url(#arrow-grad-${start})`}
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />

        <motion.polygon
          points={
            fromSide === "left"
              ? "514,164 530,170 514,176"
              : "86,164 70,170 86,176"
          }
          fill="#f97316"
          style={{
            opacity: useTransform(progress, [end - ARROW_DURATION * 0.2, end], [0, 0.8]),
          }}
        />
      </svg>
    </div>
  );
};

export const ProcessSection = ({ serviceName, processPhases }: ProcessSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Prepare animated phases
  const animatedPhases: ProcessPhaseWithAnimation[] = processPhases.map((phase, index) => {
    const phaseNumber = index + 1;
    return {
      ...phase,
      index: phaseNumber,
      side: phaseNumber % 2 === 0 ? "right" : "left",
      gradient: getPhaseGradient(phaseNumber),
      icon: getPhaseIcon(phaseNumber),
    };
  });

  // Calculate total scroll duration needed
  const totalCards = animatedPhases.length;
  const totalArrows = totalCards - 1;
  const totalDuration = (totalCards * CARD_DURATION) + (totalArrows * ARROW_DURATION);
  const endOffset = START_OFFSET + totalDuration + 0.15; // Extra space for last card

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", `end end`],
  });

  // Calculate timing for each element
  const getCardTiming = (cardIndex: number) => {
    let start = START_OFFSET;
    // Add previous cards and arrows
    for (let i = 0; i < cardIndex; i++) {
      start += CARD_DURATION;
      if (i < totalArrows) start += ARROW_DURATION;
    }
    return {
      start,
      end: start + CARD_DURATION,
    };
  };

  const getArrowTiming = (arrowIndex: number) => {
    let start = START_OFFSET;
    // Add cards and arrows before this arrow
    for (let i = 0; i <= arrowIndex; i++) {
      start += CARD_DURATION;
      if (i < arrowIndex) start += ARROW_DURATION;
    }
    return {
      start,
      end: start + ARROW_DURATION,
    };
  };

  useEffect(() => {
    // Smooth scroll behavior
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const hash = target.getAttribute('href');
      if (hash && hash !== '#') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return (
    <section 
      id="our-process" 
      className="scroll-mt-24 relative"
      ref={containerRef}
      style={{
        minHeight: `calc(100vh + ${Math.max(300, animatedPhases.length * 100)}px)`,
      }}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center py-16">
        <div className="mx-auto w-full max-w-5xl px-4">
          {/* Original Header */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 rounded-full bg-orange-500" />
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Our {serviceName} Process
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-1 md:gap-2">
            {animatedPhases.map((phase, i) => {
              const cardTiming = getCardTiming(i);
              const arrowTiming = i < totalArrows ? getArrowTiming(i) : null;
              const isFirst = i === 0;

              return (
                <div key={phase.title}>
                  <AnimatedCard 
                    phase={phase} 
                    progress={scrollYProgress} 
                    start={cardTiming.start}
                    end={cardTiming.end}
                    isFirst={isFirst}
                  />
                  {arrowTiming && (
                    <AnimatedArrow
                      fromSide={phase.side}
                      progress={scrollYProgress}
                      start={arrowTiming.start}
                      end={arrowTiming.end}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
};