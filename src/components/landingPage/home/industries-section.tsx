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

  // Premium hover animation for cards (matching WhyChooseSection style)
  const handleCardHover = (index: number, isHovering: boolean) => {
    setHoveredIndex(isHovering ? index : null);
    // No GSAP animations needed - handled by Framer Motion
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-accent-200 via-accent-500/20 to-gold/80 ">
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-accent mx-auto mb-8"
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black mt-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Driving <span className="text-accent">Excellence</span>
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-2xl mx-auto text-base mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Deep expertise meets technical excellence across every sector
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.title}
                className="group relative rounded-2xl border border-white/10 bg-accent-50/15 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.06]">

                {/* Glow layer */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-[#1e3a8a]/40 to-[#c49138]/40 blur-xl" />

                {/* Content */}
                <div className="relative z-10">

                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-5">

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition">
                      <Icon className="w-5 h-5 text-white/80  transition" />
                    </div>

                    {/* Stat */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{industry.stats}</p>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">
                        {industry.statLabel}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2  transition">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {industry.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-xs text-white/70 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div ref={ctaRef} className="mt-24">
          <div className="relative bg-white rounded-3xl border border-gray-200 p-12 lg:p-16 shadow-sm">

            {/* Subtle gradient accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">

              {/* Top Label */}
              <div className="mb-6">
                <span className="text-xs tracking-[0.2em] uppercase text-accent font-semibold">
                  Start Your Project
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Ready to Build Software That Drives Revenue?
              </h3>

              {/* Subtext */}
              <p className="text-gray-600 text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                We design and develop scalable software solutions tailored to your business —
                from idea to deployment and beyond.
              </p>

              {/* Stats (clean, no animation) */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mt-10 pt-8 border-t border-gray-100">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                <button
                  onClick={() => router.push('/contact-us')}
                  className="px-8 py-3 bg-accent text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-accent/90 hover:shadow-lg active:scale-95"
                >
                  Get Free Consultation
                </button>

                <button
                  onClick={() => router.push('/case-studies')}
                  className="px-8 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5 active:scale-95"
                >
                  View Case Studies
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}