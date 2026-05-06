// components/landingPage/servicesPage/ProcessSection.tsx

"use client";

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useInView } from "framer-motion";
import { Sparkles, Zap, Target, Rocket, LucideIcon, ArrowRight, Clock, Gem, ChevronDown } from "lucide-react";

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

// Enhanced icon mapping with more variety
const getPhaseIcon = (phaseNumber: number): LucideIcon => {
  const icons: Record<number, LucideIcon> = {
    1: Sparkles,
    2: Zap,
    3: Target,
    4: Rocket,
  };
  return icons[phaseNumber] || Sparkles;
};

// Enhanced gradient colors
const getPhaseGradient = (phaseNumber: number): string => {
  const gradients: Record<number, string> = {
    1: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
    2: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    3: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
    4: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  };
  return gradients[phaseNumber] || "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)";
};

const getPhaseColor = (phaseNumber: number): { from: string; to: string } => {
  const colors: Record<number, { from: string; to: string }> = {
    1: { from: 'from-orange-500', to: 'to-amber-500' },
    2: { from: 'from-cyan-500', to: 'to-blue-500' },
    3: { from: 'from-purple-500', to: 'to-pink-500' },
    4: { from: 'from-emerald-500', to: 'to-teal-500' },
  };
  return colors[phaseNumber] || { from: 'from-orange-500', to: 'to-amber-500' };
};

// REDUCED timing for faster appearance
const CARD_DURATION = 0.05;
const ARROW_DURATION = 0.03;
const START_OFFSET = 0;

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
  const colors = getPhaseColor(phase.index);
  
  let opacity, y, scale;
  
  if (isFirst) {
    opacity = 1;
    y = 0;
    scale = 1;
  } else {
    opacity = useTransform(progress, [start, start + CARD_DURATION], [0, 1]);
    y = useTransform(progress, [start, end], [15, 0]);
    scale = useTransform(progress, [start, end], [0.98, 1]);
  }

  const isLeft = phase.side === "left";

  return (
    <div
      className={`relative flex w-full ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } justify-center`}
    >
      <motion.div
        style={!isFirst ? { opacity, y, scale } : {}}
        className="relative z-10 w-full max-w-md"
      >
        <div className="group relative w-full rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-start gap-5">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                style={{ background: phase.gradient }}
              >
                <Icon className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    {phase.phase}
                  </span>
                  <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 text-xs px-2.5 py-0.5 font-medium">
                    <Clock className="h-3 w-3 mr-1" />
                    {phase.timeline}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {phase.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{phase.text}</p>
                
                <div className={`mt-4 h-0.5 w-12 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full`} />
              </div>
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
  const opacity = useTransform(progress, [start, start + ARROW_DURATION], [0, 1]);
  const arrowScale = useTransform(progress, [end - 0.02, end], [0.8, 1]);

  // Better curved path for arrows
  const path = fromSide === "left"
    ? "M 60 40 C 200 40, 400 160, 540 160"
    : "M 540 40 C 400 40, 200 160, 60 160";

  return (
    <div className="relative -my-3 flex w-full justify-center md:-my-4">
      <svg
        viewBox="0 0 600 180"
        className="h-14 w-full max-w-2xl md:h-16"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`arrow-grad-${start}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id={`arrow-grad-hover-${start}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Dashed background path */}
        <path
          d={path}
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Animated gradient path */}
        <motion.path
          d={path}
          stroke={`url(#arrow-grad-${start})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength, opacity }}
        />

        {/* Animated arrowhead */}
        <motion.polygon
          points={
            fromSide === "left"
              ? "530,154 546,160 530,166"
              : "70,154 54,160 70,166"
          }
          fill={`url(#arrow-grad-hover-${start})`}
          style={{
            opacity: useTransform(progress, [end - 0.03, end], [0, 1]),
            scale: arrowScale,
          }}
        />

        {/* Glow dot at the end of arrow */}
        <motion.circle
          cx={fromSide === "left" ? 540 : 60}
          cy={160}
          r="3"
          fill="#f97316"
          style={{
            opacity: useTransform(progress, [end - 0.02, end], [0, 0.6]),
            scale: arrowScale,
          }}
        />
      </svg>
    </div>
  );
};

export const ProcessSection = ({ serviceName, processPhases }: ProcessSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
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

  const totalCards = animatedPhases.length;
  const totalArrows = totalCards - 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const getCardTiming = (cardIndex: number) => {
    let start = START_OFFSET;
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
    for (let i = 0; i <= arrowIndex; i++) {
      start += CARD_DURATION;
      if (i < arrowIndex) start += ARROW_DURATION;
    }
    return {
      start,
      end: start + ARROW_DURATION,
    };
  };

  const totalDuration = (totalCards * CARD_DURATION) + (totalArrows * ARROW_DURATION);
  const minHeight = Math.max(100, totalDuration * 50);

  useEffect(() => {
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
      className="scroll-mt-24 relative py-16"
      ref={containerRef}
      style={{
        minHeight: `calc(100vh + ${minHeight}px)`,
      }}
    >
      <div className="mx-auto w-full  px-4">
        {/* Left-aligned header matching IndustriesSection */}i
        <div className="flex tems-center gap-3">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-10 w-1 rounded-full bg-gradient-to-b from-orange-500 to-amber-500"
          />
          <motion.h2 
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="font-black">{serviceName}</span> Process
          </motion.h2>
        </div>

        <motion.p 
          className="mt-4 text-lg text-slate-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A proven methodology that transforms your vision into reality
        </motion.p>

        {/* Cards and Arrows */}
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

        {/* CTA at the end */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm">
            <span>Start Your Journey</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div className="relative z-10 mt-16 flex items-center gap-4 px-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <Gem className="h-3 w-3 text-slate-300" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
};