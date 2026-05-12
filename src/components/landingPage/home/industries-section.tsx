'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Factory,
  Store,
  Briefcase,
  Heart,
  GraduationCap,
  Building2,
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
interface Industry {
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

const industries: Industry[] = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description:
      'Custom ERP, MES, production planning, and inventory software. We build manufacturing software that integrates with your shop floor and supply chain.',
    features: ['ERP & MRP', 'Production Planning', 'Quality Control', 'Inventory Systems'],
    stats: '40%',
    statLabel: 'Efficiency Increase',
  },
  {
    icon: Store,
    title: 'Retail & eCommerce',
    description:
      'E-commerce platforms, POS systems, and omnichannel retail software. Custom web and mobile apps for online stores and in-store operations.',
    features: ['E-commerce Apps', 'POS Software', 'Inventory Sync', 'Customer Portals'],
    stats: '3.5x',
    statLabel: 'Sales Growth',
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    description:
      'Project management, time tracking, billing, and client portal software. Custom software for consultancies, agencies, and service firms.',
    features: ['Project Management', 'Time & Billing', 'Client Portals', 'Reporting'],
    stats: '60%',
    statLabel: 'Time Saved',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description:
      'Patient management, scheduling, EHR integrations, and compliant healthcare software. Secure, HIPAA-aware applications for clinics and hospitals.',
    features: ['Patient Management', 'Scheduling', 'EHR Integration', 'Telehealth'],
    stats: '99.9%',
    statLabel: 'Uptime',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description:
      'Learning management systems, student portals, and education software. Custom web and mobile apps for schools, universities, and ed-tech.',
    features: ['LMS', 'Student Portals', 'Course Management', 'Attendance'],
    stats: '50k+',
    statLabel: 'Students Served',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description:
      'Property management, listing platforms, and real estate software. Custom solutions for agents, developers, and property managers.',
    features: ['Property Management', 'Listing Platforms', 'Lease Management', 'Tenant Portals'],
    stats: '25k+',
    statLabel: 'Properties Managed',
  },
];

const stats: StatItem[] = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '12+', label: 'Industries Served' },
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
    <section ref={sectionRef} className="relative pb-24 overflow-hidden bg-white font-sans ">
      <div className="relative z-10 mx-auto px-4 lg:px-22">
        
        {/* Header Section - Matching FAQ Style */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
              Industries We Serve
            </p>
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
          </div>

          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            Driving Excellence
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Deep expertise meets technical excellence across every sector
          </p>
        </div>

        {/* Industries Grid - Width matched to FAQ */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3  mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        <Icon className="w-6 h-6 text-black/80 group-hover:text-orange-500 transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="card-title text-xl font-bold text-black mb-2 relative z-10 group-hover:text-orange-500 transition-colors duration-300">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="card-desc text-gray-600 text-sm leading-relaxed mb-4 relative z-10">
                    {industry.description}
                  </p>

                  {/* Features with staggered animation */}
                  <div className="card-features flex flex-wrap gap-2 mb-4 relative z-10">
                    {industry.features.map((feature: string, i: number) => (
                      <motion.span
                        key={feature}
                        className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors duration-300"
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
                        className="text-2xl font-bold text-orange-500 block leading-none"
                        whileHover={{ scale: 1.05 }}
                      >
                        {industry.stats}
                      </motion.span>
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {industry.statLabel}
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