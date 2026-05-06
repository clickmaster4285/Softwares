"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Star,
  Award,
  Layers3,
  Users,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceHeroProps {
  page: {
    category: string;
    serviceName: string;
    title: string;
    lead: string;
    highlights?: string[];
    marketStats?: Array<{ label: string; value: string }>;
  };
}

// Counter Component with Animation
function Counter({
  targetValue,
  suffix = "",
  prefix = "",
}: {
  targetValue: string | number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const numericMatch = String(targetValue).match(/\d+/);
  const numericTarget = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const originalSuffix = String(targetValue).replace(/\d+/, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericTarget));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericTarget);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, numericTarget]);

  return (
    <div ref={elementRef} className="text-2xl sm:text-2xl lg:text-4xl xl:text-4xl  font-bold text-slate-900">
      {prefix}
      {count}
      {suffix || originalSuffix}
    </div>
  );
}

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

// Line animation variants
const lineDrawLeft: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.3 },
  },
};

const lineDrawRight: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.5 },
  },
};

const lineDrawCenter: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut", delay: 0.7 },
  },
};

export function ServiceHero({ page }: ServiceHeroProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Helper function to make service name bold in text
  const makeBoldInText = (text: string, serviceName: string) => {
    if (!text || !serviceName) return text;
    
    const parts: (string | React.ReactNode)[] = [];
    const regex = new RegExp(`(${serviceName})`, 'gi');
    const split = text.split(regex);
    
    split.forEach((part, index) => {
      if (part.toLowerCase() === serviceName.toLowerCase()) {
        parts.push(
          <span key={index} className="font-black">
            {part}
          </span>
        );
      } else {
        parts.push(part);
      }
    });
    
    return parts;
  };

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const stats = [
    { icon: Award, value: "8+", label: "Years Experience" },
    { icon: Layers3, value: "150+", label: "Projects Delivered" },
    { icon: Users, value: "98%", label: "Client Satisfaction" },
    { icon: Headphones, value: "24/7", label: "Support Available" },
  ];

  return (
    <div
      className="w-full relative overflow-hidden bg-white p-2 mb-2 px-20"
    
    >
      {/* Animated Background Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal Line 1 - Top */}
        <motion.line
          x1="0"
          y1="120"
          x2="1920"
          y2="120"
          stroke="url(#lineGradient1)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
        
        {/* Horizontal Line 2 - Middle */}
        <motion.line
          x1="0"
          y1="400"
          x2="1920"
          y2="400"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          strokeDasharray="4 12"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
        
        {/* Vertical Line - Left */}
        <motion.line
          x1="100"
          y1="0"
          x2="100"
          y2="800"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          strokeDasharray="6 10"
          variants={lineDrawRight}
          initial="hidden"
          animate={controls}
        />
        
        {/* Diagonal Line */}
        <motion.line
          x1="1200"
          y1="0"
          x2="1600"
          y2="800"
          stroke="url(#lineGradient3)"
          strokeWidth="1.5"
          strokeDasharray="10 15"
          variants={lineDrawCenter}
          initial="hidden"
          animate={controls}
        />
        
        {/* Additional Decorative Lines */}
        <motion.line
          x1="300"
          y1="600"
          x2="800"
          y2="600"
          stroke="url(#lineGradient1)"
          strokeWidth="0.8"
          strokeDasharray="3 8"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
        
        <motion.line
          x1="1400"
          y1="200"
          x2="1900"
          y2="200"
          stroke="url(#lineGradient1)"
          strokeWidth="0.8"
          strokeDasharray="5 10"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
      </svg>

      {/* Animated Corner Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left Corner */}
        <motion.path
          d="M 0 0 L 80 0 M 0 0 L 0 80"
          stroke="#ea580c"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
        
        {/* Top Right Corner */}
        <motion.path
          d="M 1920 0 L 1840 0 M 1920 0 L 1920 80"
          stroke="#ea580c"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          variants={lineDrawRight}
          initial="hidden"
          animate={controls}
        />
        
        {/* Bottom Left Corner */}
        <motion.path
          d="M 0 800 L 80 800 M 0 800 L 0 720"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          variants={lineDrawLeft}
          initial="hidden"
          animate={controls}
        />
        
        {/* Bottom Right Corner */}
        <motion.path
          d="M 1920 800 L 1840 800 M 1920 800 L 1920 720"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          variants={lineDrawRight}
          initial="hidden"
          animate={controls}
        />
      </svg>

      {/* ── Breadcrumb ── */}
      <motion.div
        className="relative z-10 border-b border-orange-100/60 w-full"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto px-4 md:px-8 lg:px-12 py-3.5 bg-white/50 backdrop-blur-sm">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-slate-400 hover:text-orange-600 transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-500 font-medium">{page.category}</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-black text-slate-800">
              {page.serviceName}
            </span>
          </nav>
        </div>
      </motion.div>

      {/* ── Main Hero Content ── */}
      <section ref={ref} className="relative z-10 w-full">
        <div className="mx-auto px-4 md:px-8 lg:px-12 pt-12 pb-0 lg:pt-16">
          {/* Two-column layout: left text, right image */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
            {/* ── LEFT COLUMN ── */}
            <motion.div
              className="flex-1 min-w-0 pb-12 lg:pb-16"
              variants={staggerContainer}
              initial="hidden"
              animate={controls}
            >
              {/* Category Badge */}
              <motion.div variants={fadeInUp}>
                <Badge
                  className="mb-5 rounded-md border-0 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                  style={{ background: "#ea580c" }}
                >
                  {page.category}
                </Badge>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-balance text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.15]"
                variants={fadeInUp}
              >
                {page.title}
              </motion.h1>

              {/* Lead */}
              <motion.p
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg"
                variants={fadeInUp}
              >
                {makeBoldInText(page.lead, page.serviceName)}
              </motion.p>

              {/* Highlight Pills */}
              {page.highlights && page.highlights.length > 0 && (
                <motion.div
                  className="mt-6 flex flex-wrap gap-2.5"
                  variants={staggerContainer}
                >
                  {page.highlights.map((h) => (
                    <motion.div
                      key={h}
                      variants={fadeInUp}
                      className="flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-slate-700 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                      {h}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Market Stats */}
              {page.marketStats && page.marketStats.length > 0 && (
                <motion.div
                  className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-orange-100 bg-white/70 p-5 backdrop-blur-sm sm:grid-cols-4"
                  variants={fadeInUp}
                >
                  {page.marketStats.map((stat) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <p className="text-2xl font-extrabold text-orange-600 sm:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-7 text-white font-semibold shadow-lg transition-all"
                    style={{
                      background: "#ea580c",
                      boxShadow: "0 8px 24px rgba(234,88,12,0.30)",
                    }}
                  >
                    <Link href="/contact-us">
                      Get your free strategy call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="group rounded-full border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-orange-300 font-semibold text-slate-700 transition-all"
                  >
                    <Link href="#">View all services</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500"
                variants={staggerContainer}
              >
                {/* Avatars */}
                <motion.div
                  className="flex items-center gap-2"
                  variants={fadeInUp}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white"
                        style={{
                          background: `hsl(${20 + i * 15}, 30%, ${70 + i * 4}%)`,
                        }}
                      />
                    ))}
                  </div>
                  <span>
                    <strong className="text-slate-800">150+</strong> clients
                    worldwide
                  </span>
                </motion.div>

                {/* Stars */}
                <motion.div
                  className="flex items-center gap-1"
                  variants={fadeInUp}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                  <span className="ml-1">
                    <strong className="text-slate-800">4.9/5</strong> rating
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN — Hero Image ── */}
            <motion.div
              className="relative flex-shrink-0 w-full lg:w-[52%] xl:w-[55%] flex items-end justify-center lg:justify-end"
              variants={fadeInRight}
              initial="hidden"
              animate={controls}
            >
              <div className="relative w-full max-w-2xl lg:max-w-none">
                <Image
                  src="/hero-img.png"
                  alt="Platform dashboard preview"
                  width={860}
                  height={620}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{ maxHeight: "520px" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
     <motion.div
  className="relative z-10 w-full border-t border-orange-100 bg-white/60 backdrop-blur-sm"
  variants={staggerContainer}
  initial="hidden"
  animate={controls}
>
  <div className="mx-auto px-3 sm:px-4 md:px-8 lg:px-12">
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-orange-100">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 group hover:bg-orange-50/50 transition-colors cursor-default"
          variants={fadeInUp}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors">
            <stat.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-orange-600" />
          </div>
          <div>
            <Counter targetValue={stat.value} />
            <p className="text-[10px] sm:text-xs font-medium text-slate-500 mt-0.5">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>
    </div>
  );
}