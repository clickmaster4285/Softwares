// components/landingPage/servicesPage/ProcessSection.tsx

"use client";

import { Badge } from '@/components/ui/badge';
import { Search, Zap, Target, Rocket, LucideIcon, ArrowRight, Clock, Gem } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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

// Icon & Gradient Mapping
const getPhaseIcon = (phaseNumber: number): LucideIcon => {
  const icons: Record<number, LucideIcon> = {
    1: Search,
    2: Zap,
    3: Target,
    4: Rocket,
  };
  return icons[phaseNumber] || Search;
};

const getPhaseGradient = (phaseNumber: number): string => {
  const gradients: Record<number, string> = {
    1: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
    2: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    3: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
    4: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
  };
  return gradients[phaseNumber] || "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)";
};

const getPhaseColor = (phaseNumber: number) => {
  const colors: Record<number, { from: string; to: string }> = {
    1: { from: 'from-orange-500', to: 'to-amber-500' },
    2: { from: 'from-orange-700', to: 'to-blue-500' },
    3: { from: 'from-purple-500', to: 'to-pink-500' },
    4: { from: 'from-emerald-500', to: 'to-teal-500' },
  };
  return colors[phaseNumber] || { from: 'from-orange-500', to: 'to-amber-500' };
};

// Timing constants for animations
const CARD_DURATION = 0.8;
const PIPE_DURATION = 1.0;
const STEP_GAP = CARD_DURATION + PIPE_DURATION;
const TOTAL_DURATION = 4 * STEP_GAP + 1.2;

const HPipe = ({ delay, reverse = false, startAnimation }: { delay: number; reverse?: boolean; startAnimation: boolean }) => (
  <div className="relative flex items-center">
    {/* Arrow for normal flow (left to right) - appears on RIGHT end */}
    {!reverse && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 15 }}
        animate={startAnimation ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0, x: 15 }}
        transition={{ delay: delay + PIPE_DURATION, duration: 0.3, type: "spring", stiffness: 200 }}
        className="hidden md:block order-last -ml-4"
      >
        <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[24px] border-l-orange-700" />
      </motion.div>
    )}
    
    {/* Pipe line */}
    <div className="relative flex-1 h-3 mx-2 rounded-full bg-orange-100 overflow-hidden min-w-[250px] hidden md:block">
      <div className="absolute inset-0 bg-orange-100 rounded-full" />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay, duration: PIPE_DURATION, ease: "easeInOut" }}
        style={{ transformOrigin: reverse ? "right" : "left" }}
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"
      />
    </div>
    
    {/* Arrow for reverse flow (right to left) - appears on LEFT end */}
    {reverse && (
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -15 }}
        animate={startAnimation ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0, x: -15 }}
        transition={{ delay: delay + PIPE_DURATION, duration: 0.3, type: "spring", stiffness: 200 }}
        className="hidden md:block order-first -mr-4"
      >
        <div className="w-0 h-0 border-y-[14px] border-y-transparent border-r-[24px] border-r-orange-500" />
      </motion.div>
    )}
  </div>
);

const VPipe = ({ delay, startAnimation }: { delay: number; startAnimation: boolean }) => (
  <div className="relative flex flex-col items-center">
    {/* Vertical pipe line */}
    <div className="relative w-3 h-16 my-2 rounded-full bg-orange-100 overflow-hidden hidden md:block">
      {/* Empty pipe background */}
      <div className="absolute inset-0 bg-orange-100 rounded-full" />
      
      {/* Animated fill that flows from top to bottom */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={startAnimation ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ delay, duration: PIPE_DURATION, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full"
      />
    </div>
    
    {/* BIG Arrow head at bottom - appears AFTER pipe fills */}
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -10 }}
      animate={startAnimation ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: -10 }}
      transition={{ delay: delay + PIPE_DURATION, duration: 0.3, type: "spring", stiffness: 200 }}
      className="hidden md:block -mt-3"
    >
      <div className="w-0 h-0 border-x-[12px] border-x-transparent border-t-[20px] border-t-orange-700" />
    </motion.div>
  </div>
);

// Animated Card Component - Mobile First
const AnimatedProcessCard = ({ phase, delay, side, startAnimation }: { phase: any; delay: number; side: "left" | "right"; startAnimation: boolean }) => {
  const Icon = phase.icon;
  const colors = getPhaseColor(phase.index);
  
  const initialX = side === "left" ? -80 : 80;

  // Get icon color based on phase index
  const getIconColor = (index: number) => {
    const colors: Record<number, string> = {
      1: "text-orange-500",
      2: "text-cyan-500",
      3: "text-purple-500",
      4: "text-emerald-500",
    };
    return colors[index] || "text-orange-500";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -8, x: initialX }}
      animate={startAnimation ? { scale: 1, opacity: 1, rotate: 0, x: 0 } : { scale: 0, opacity: 0, rotate: -8, x: initialX }}
      transition={{
        delay,
        type: "spring",
        stiffness: 360,
        damping: 16,
        mass: 0.7,
      }}
      className="relative w-full md:w-80 lg:w-96 rounded-2xl bg-white border border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col gap-4 mx-auto"
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            {phase.phase}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 text-xs px-2.5 py-1 font-medium">
              <Clock className="h-3 w-3 mr-1" />
              {phase.timeline}
            </Badge>
          </div>
        </div>
        <motion.div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className={`h-6 w-6 ${getIconColor(phase.index)}`} />
        </motion.div>
      </div>

      {/* Content section */}
      <div className="flex-1">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.25 }}
          className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-3"
        >
          {phase.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.35 }}
          className="text-sm md:text-base text-slate-600 leading-relaxed"
        >
          {phase.text}
        </motion.p>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.45, duration: 0.4 }}
          className={`mt-4 h-1 w-16 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full origin-left`}
        />
      </div>
    </motion.div>
  );
};

export const ProcessSection = ({ serviceName, processPhases }: ProcessSectionProps) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [cycle, setCycle] = useState(0);

  // Start animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startAnimation) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [startAnimation]);

  // Auto-loop the animation only after it has started
  useEffect(() => {
    if (!startAnimation) return;
    
    const id = setInterval(() => setCycle((c) => c + 1), TOTAL_DURATION * 1000);
    return () => clearInterval(id);
  }, [startAnimation]);

  const phases = processPhases.map((phase, index) => ({
    ...phase,
    index: index + 1,
    side: (index + 1) % 2 === 0 ? "right" : "left" as "left" | "right",
    gradient: getPhaseGradient(index + 1),
    icon: getPhaseIcon(index + 1),
  }));

  const c1 = 0;
  const p1 = c1 + CARD_DURATION;
  const c2 = p1 + PIPE_DURATION;
  const p2 = c2 + CARD_DURATION;
  const c3 = p2 + PIPE_DURATION;
  const p3 = c3 + CARD_DURATION;
  const c4 = p3 + PIPE_DURATION;

  return (
    <section 
      key={cycle} 
      ref={sectionRef}
      id="our-process" 
      className="scroll-mt-24 py-8 md:py-16 bg-white px-4 md:px-0"
    >

         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={startAnimation ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 w-1 rounded-full bg-gradient-to-b from-orange-500 to-amber-500"
            />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900">
              Our <span className="font-black">{serviceName}</span> Process
            </h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            A proven methodology that transforms your vision into reality
          </motion.p>
      </motion.div>
      
      <div className="mx-auto w-full max-w-7xl">
     

        {/* Mobile Layout - Simple Vertical Stack */}
        <div className="block md:hidden mt-8 space-y-6">
          {phases.map((phase, idx) => (
            <AnimatedProcessCard 
              key={idx}
              phase={phase} 
              delay={idx === 0 ? c1 : idx === 1 ? c2 : idx === 2 ? c3 : c4} 
              side="left" 
              startAnimation={startAnimation} 
            />
          ))}
        </div>

        {/* Desktop Layout - S-Shape with Pipes */}
        <div className="hidden md:block mt-12">
          {/* Top Row: Phase 1 → Phase 2 */}
          <div className="flex flex-row items-center justify-center gap-6">
            <AnimatedProcessCard phase={phases[0]} delay={c1} side="left" startAnimation={startAnimation} />
            <HPipe delay={p1} startAnimation={startAnimation} />
            <AnimatedProcessCard phase={phases[1]} delay={c2} side="right" startAnimation={startAnimation} />
          </div>

          {/* Vertical Connection */}
          <div className="flex justify-end pr-[18%] my-4">
            <VPipe delay={p2} startAnimation={startAnimation} />
          </div>

          {/* Bottom Row: Phase 4 ← Phase 3 */}
          <div className="flex flex-row items-center justify-center gap-6">
            <AnimatedProcessCard phase={phases[3]} delay={c4} side="left" startAnimation={startAnimation} />
            <HPipe delay={p3} reverse startAnimation={startAnimation} />
            <AnimatedProcessCard phase={phases[2]} delay={c3} side="right" startAnimation={startAnimation} />
          </div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: TOTAL_DURATION - 1, duration: 0.5 }}
        >
          <motion.button 
            className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-6 py-3 rounded-md bg-orange-700 text-white font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <motion.div
              animate={startAnimation ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: TOTAL_DURATION - 0.5, duration: 0.6 }}
        className="mt-12 md:mt-16 flex items-center gap-4 px-4 max-w-7xl mx-auto"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <motion.div
          animate={startAnimation ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Gem className="h-3 w-3 text-slate-300" />
        </motion.div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </motion.div>
    </section>
  );
};