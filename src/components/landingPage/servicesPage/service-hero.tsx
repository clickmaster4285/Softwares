// components/service-hero.tsx
"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Star,
  Award,
  Layers3,
  Users,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
function Counter({ targetValue, suffix = '', prefix = '' }: { targetValue: string | number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const numericMatch = String(targetValue).match(/\d+/);
  const numericTarget = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const originalSuffix = String(targetValue).replace(/\d+/, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

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
      const currentValue = Math.floor(easeOutQuart * numericTarget);
      
      setCount(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericTarget);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, numericTarget]);

  return (
    <motion.div
      ref={elementRef}
      className="text-2xl font-semibold text-slate-900"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      {prefix}{count}{suffix || originalSuffix}
    </motion.div>
  );
}

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export function ServiceHero({ page }: ServiceHeroProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const stats = [
    { icon: Award, value: '8+', label: 'Years Experience' },
    { icon: Layers3, value: '150+', label: 'Projects Delivered' },
    { icon: Users, value: '98%', label: 'Client Satisfaction' },
    { icon: Headphones, value: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-orange-50 via-white to-slate-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-200 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-100 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-50 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Breadcrumb Strip - Improved Styling */}
      <motion.div 
        className="border-b border-slate-100 w-full bg-white/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-8xl px-4 md:px-8 lg:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-slate-500 hover:text-orange-600 transition-colors">
                Home
              </Link>
            </motion.div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
              <span className="text-slate-600">{page.category}</span>
            </motion.div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-slate-900 font-medium bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                {page.serviceName}
              </span>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Hero Section - Full Width */}
      <section id="overview" className="relative overflow-hidden w-full" ref={ref}>
        <div className="relative mx-auto max-w-8xl px-4 md:px-8 lg:px-16 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            <motion.div 
              className="flex-1"
              variants={staggerContainer}
              initial="hidden"
              animate={controls}
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 rounded-full border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 hover:bg-orange-100 transition-all duration-300">
                  {page.category}
                </Badge>
              </motion.div>

              <motion.h1 
                className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
                variants={fadeInUp}
              >
                {page.title}
              </motion.h1>

              <motion.p 
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:text-xl"
                variants={fadeInUp}
              >
                {page.lead}
              </motion.p>

              {/* Trust Badges */}
              {page.highlights && page.highlights.length > 0 && (
                <motion.div className="mt-8 flex flex-wrap gap-3" variants={staggerContainer}>
                  {page.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-1.5 text-sm font-medium text-orange-800 backdrop-blur-sm cursor-default"
                    >
                      <CheckCircle2 className="h-4 w-4 text-orange-600" />
                      {highlight}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Market Stats Bar */}
              {page.marketStats && page.marketStats.length > 0 && (
                <motion.div 
                  className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm sm:grid-cols-4 sm:gap-8"
                  variants={fadeInUp}
                  whileHover={{ boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                  transition={{ duration: 0.3 }}
                >
                  {page.marketStats.map((stat, index) => (
                    <motion.div 
                      key={stat.label} 
                      className="text-center sm:text-left"
                      variants={fadeInUp}
                      custom={index}
                    >
                      <motion.p 
                        className="text-2xl font-bold text-orange-600 sm:text-3xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* CTA Buttons */}
              <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={staggerContainer}>
                <motion.div
                  variants={fadeInUp}
                  {...scaleOnHover}
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-orange-600 px-8 text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30"
                  >
                    <Link href="/contact-us">
                      Get your free strategy call
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="group rounded-full border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-orange-200 transition-all"
                  >
                    <Link href="/services">
                      View all services
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500"
                variants={staggerContainer}
              >
                <motion.div className="flex items-center gap-2" variants={fadeInUp}>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span>
                    <strong className="text-slate-900">150+</strong> clients worldwide
                  </span>
                </motion.div>
                <motion.div className="flex items-center gap-1" variants={fadeInUp}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                    </motion.div>
                  ))}
                  <span className="ml-1">
                    <strong className="text-slate-900">4.9/5</strong> rating
                  </span>
                </motion.div>
                <motion.div className="flex items-center gap-1" variants={fadeInUp}>
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <span>
                    <strong className="text-slate-900">100+</strong> successful launches
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Grid with Counter Animation */}
          <motion.div 
            className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:gap-6 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="flex items-center gap-4 rounded-xl p-4 transition-all hover:bg-white/50 hover:shadow-md group cursor-default"
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 group-hover:bg-orange-100 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-5 w-5 text-orange-600" />
                </motion.div>
                <div>
                  <Counter targetValue={stat.value} />
                  <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}