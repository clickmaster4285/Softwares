'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Code2,
  Shield,
  Zap,
  Users,
  Clock,
  Target,
  Cloud,
  Smartphone,
  Globe,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  stats: string;
  statLabel: string;
}

interface StatItem {
  number: string;
  label: string;
}

const benefits: Benefit[] = [
  {
    icon: Rocket,
    title: 'Rapid Delivery',
    description:
      'Agile development methodology ensures your software is delivered on time, every time. We work in sprints with complete transparency.',
    features: ['2-Week Sprints', 'Daily Updates', 'Fast Turnaround', 'No Delays'],
    stats: '2x',
    statLabel: 'Faster Delivery',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description:
      'Enterprise-grade code with best practices, design patterns, and comprehensive documentation. Built to scale with your business.',
    features: ['SOLID Principles', 'Unit Testing', 'Code Reviews', 'Documentation'],
    stats: '99.9%',
    statLabel: 'Code Quality',
  },
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Bank-grade security implementation with regular audits, encryption, and compliance standards including GDPR and SOC2.',
    features: ['End-to-End Encryption', 'Regular Audits', 'GDPR Compliant', 'Secure APIs'],
    stats: '100%',
    statLabel: 'Data Protection',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description:
      'Lightning-fast applications with optimized databases, caching strategies, and CDN integration for global reach.',
    features: ['< 1s Load Time', 'Database Optimization', 'CDN Ready', 'Caching'],
    stats: '300%',
    statLabel: 'Speed Boost',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description:
      'You are part of the team. Transparent communication, weekly demos, and dedicated project managers for your success.',
    features: ['Dedicated PM', 'Weekly Demos', '24/7 Support', 'Transparent Pricing'],
    stats: '98%',
    statLabel: 'Client Retention',
  },
  {
    icon: Clock,
    title: 'Long-Term Support',
    description:
      'We don\'t disappear after launch. Maintenance, updates, scaling, and 24/7 support to keep your software running smoothly.',
    features: ['24/7 Support', 'Regular Updates', 'Scaling Help', 'Bug Fixes'],
    stats: '5+ Years',
    statLabel: 'Avg Partnership',
  },


 
];

const stats: StatItem[] = [
  { number: '250+', label: 'Projects Delivered' },
  { number: '15+', label: 'Countries Served' },
  { number: '99%', label: 'Client Satisfaction' },
];

export function IndustriesSection() {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Premium hover animation for cards
  const handleCardHover = (index: number, isHovering: boolean) => {
    setHoveredIndex(isHovering ? index : null);
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white font-sans ">
      <div className="relative z-10 mx-auto px-16">
        
        {/* Header Section - Matching FAQ Style */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
              Why Choose ClickMasters
            </p>
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
          </div>

          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            The ClickMasters Difference
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Top-tier software development with enterprise excellence and startup speed
          </p>
        </div>

        {/* Benefits Grid - 10 items (2 rows x 5 columns on large screens) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  mx-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 35px -15px rgba(249,115,22,0.3)',
                  borderColor: 'rgb(249, 115, 22)',
                  transition: { duration: 0.3 },
                }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Premium Card Design */}
                <div className="relative bg-white rounded-2xl p-6 border border-orange-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full overflow-hidden group">
                  {/* Animated background that moves on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Icon with rotation on hover */}
                  <motion.div
                    className="card-icon relative mb-5 transform-gpu transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-orange-200 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black/80 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="card-title text-xl font-bold text-black mb-2 relative z-10 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="card-desc text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                    {benefit.description}
                  </p>

                  {/* Features with staggered animation */}
                  <div className="card-features flex flex-wrap gap-2 mb-4 relative z-10">
                    {benefit.features.map((feature: string, i: number) => (
                      <motion.span
                        key={feature}
                        className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full group-hover:bg-orange-50 group-hover:text-primary transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* Stats with premium animation */}
                  <div className="card-stats pt-3 border-t border-orange-100 flex items-baseline justify-between relative z-10">
                    <div>
                      <motion.span
                        className="text-2xl font-bold text-primary block leading-none"
                        whileHover={{ scale: 1.05 }}
                      >
                        {benefit.stats}
                      </motion.span>
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accent with rotation */}
                  <div className="absolute bottom-3 right-3 w-6 h-6">
                    <motion.div
                      className="w-full h-full border-b border-r border-orange-200 group-hover:border-orange-400 transition-colors duration-300"
                      animate={{
                        rotate: hoveredIndex === index ? 180 : 0,
                        opacity: hoveredIndex === index ? 0.3 : 0.1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;