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
const CARD_DURATION = 0.8;  // slower card entrance
const PIPE_DURATION = 1.0;  // slower pipe fill
const STEP_GAP = CARD_DURATION + PIPE_DURATION;
const TOTAL_DURATION = 4 * STEP_GAP + 1.2;

// Animated Pipe Components - with visible empty background (orange-50/100)
const HPipe = ({ delay, reverse = false, startAnimation }: { delay: number; reverse?: boolean; startAnimation: boolean }) => (
  <div className="relative flex-1 h-3 mx-2 rounded-full bg-orange-100 overflow-hidden min-w-[40px]">
    {/* Empty pipe background - ALWAYS VISIBLE like orange-50 */}
    <div className="absolute inset-0 bg-orange-100 rounded-full" />
    
    {/* Animated fill that flows over the empty background */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ delay, duration: PIPE_DURATION, ease: "easeInOut" }}
      style={{ transformOrigin: reverse ? "right" : "left" }}
      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full"
    />
    
    {/* arrow head */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay: delay + PIPE_DURATION * 0.85, duration: 0.25 }}
      className={`absolute top-1/2 -translate-y-1/2 ${
        reverse ? "left-1" : "right-1"
      } w-0 h-0 border-y-[6px] border-y-transparent ${
        reverse
          ? "border-r-[8px] border-r-orange-500"
          : "border-l-[8px] border-l-orange-500"
      } z-10`}
    />
  </div>
);

const VPipe = ({ delay, startAnimation }: { delay: number; startAnimation: boolean }) => (
  <div className="relative w-3 h-16 my-2 rounded-full bg-orange-100 overflow-hidden">
    {/* Empty pipe background - ALWAYS VISIBLE like orange-50 */}
    <div className="absolute inset-0 bg-orange-100 rounded-full" />
    
    {/* Animated fill that flows from top to bottom */}
    <motion.div
      initial={{ scaleY: 0 }}
      animate={startAnimation ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ delay, duration: PIPE_DURATION, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-700 rounded-full"
    />
    
    {/* arrow head at bottom */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay: delay + PIPE_DURATION * 0.85, duration: 0.25 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-orange-500 z-10"
    />
  </div>
);

// Animated Card Component
const AnimatedProcessCard = ({ phase, delay, side, startAnimation }: { phase: any; delay: number; side: "left" | "right"; startAnimation: boolean }) => {
  const Icon = phase.icon;
  const colors = getPhaseColor(phase.index);
  
  const initialX = side === "left" ? -80 : 80;

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
      className="relative w-72 h-80 sm:w-80 sm:h-88 rounded-3xl bg-white border border-orange-200 shadow-lg p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
            {phase.phase}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 text-xs px-2.5 py-0.5 font-medium">
              <Clock className="h-3 w-3 mr-1" />
              {phase.timeline}
            </Badge>
          </div>
        </div>
        <motion.div 
          className="w-10 h-10 rounded-xl shadow-md flex items-center justify-center"
          style={{ background: phase.gradient }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-white" />
        </motion.div>
      </div>

      <div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.25 }}
          className="text-2xl font-bold text-slate-900 leading-tight"
        >
          {phase.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.35 }}
          className="mt-2 text-sm text-slate-600 leading-relaxed"
        >
          {phase.text}
        </motion.p>

        <motion.div 
          initial={{ scaleX: 0 }}
          animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.45, duration: 0.4 }}
          className={`mt-4 h-0.5 w-12 bg-gradient-to-r ${colors.from} ${colors.to} rounded-full origin-left`}
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
      { threshold: 0.3 }
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
      className="scroll-mt-24  bg-white"
    >
      <div className="mx-auto w-full ">
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
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Our <span className="font-black">{serviceName}</span> Process
            </h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl"
          >
            A proven methodology that transforms your vision into reality
          </motion.p>
        </motion.div>

        <div className="mt-12">
          {/* Top Row: Phase 1 → Phase 2 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <AnimatedProcessCard phase={phases[0]} delay={c1} side="left" startAnimation={startAnimation} />
            <HPipe delay={p1} startAnimation={startAnimation} />
            <AnimatedProcessCard phase={phases[1]} delay={c2} side="right" startAnimation={startAnimation} />
          </div>

          {/* Vertical Connection */}
          <div className="flex justify-end pr-[8%] md:pr-[18%] my-4">
            <VPipe delay={p2} startAnimation={startAnimation} />
          </div>

          {/* Bottom Row: Phase 4 ← Phase 3 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <AnimatedProcessCard phase={phases[3]} delay={c4} side="left" startAnimation={startAnimation} />
            <HPipe delay={p3} reverse startAnimation={startAnimation} />
            <AnimatedProcessCard phase={phases[2]} delay={c3} side="right" startAnimation={startAnimation} />
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: TOTAL_DURATION - 1, duration: 0.5 }}
        >
          <motion.button 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-orange-600 text-white font-semibold shadow-md hover: transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
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

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: TOTAL_DURATION - 0.5, duration: 0.6 }}
        className="mt-16 flex items-center gap-4 px-4 max-w-7xl mx-auto"
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