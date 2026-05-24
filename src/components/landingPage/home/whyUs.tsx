'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Code2,
  Shield,
  Zap,
  Users,
  Clock,
  LucideIcon,
} from 'lucide-react';
import SplitText from '../../ui/SplitText';
import { TiltCard } from '../../ui/tilt-card';


interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  stats: string;
  statLabel: string;
}

interface SimpleWhyChooseUsItem {
  title: string;
  desc: string;
}

interface WhyChooseUsProps {
  countryName?: string;
  items?: SimpleWhyChooseUsItem[];
  subtitle?: string;
}

const defaultBenefits: Benefit[] = [
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
      "We don't disappear after launch. Maintenance, updates, scaling, and 24/7 support to keep your software running smoothly.",
    features: ['24/7 Support', 'Regular Updates', 'Scaling Help', 'Bug Fixes'],
    stats: '5+ Years',
    statLabel: 'Avg Partnership',
  },
];

const getIconForTitle = (title: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    'Agile Development': Rocket,
    'Dedicated Teams': Users,
    'Transparent Communication': Zap,
    'Timezone Flexibility': Clock,
    'Scalable Architecture': Rocket,
    'Ongoing Support': Clock,
  };
  return iconMap[title] || Rocket;
};

export function WhyChooseUs({
  items,
  subtitle = 'Competitive differentiation that sets us apart',
}: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasCustomItems = items && items.length > 0;

  const renderCard = (children: React.ReactNode) => (
    <div
      className="
        relative overflow-hidden h-full rounded-2xl
        border border-white/15
        bg-white/40
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        group
        transition-all duration-500
        hover:border-primary/30
        hover:bg-white/50
        hover:shadow-[0_12px_40px_rgba(0,148,173,0.18)]
      "
    >
      {/* glass shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-white/20 blur-2xl group-hover:translate-x-[250%] transition-transform duration-1000" />
      </div>

      {children}
    </div>
  );

  return (
  <section
  ref={sectionRef}
  className="relative py-24 overflow-hidden bgwhite"
>
<div className="pointer-events-none absolute inset-0">
  <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      

     <div className="absolute inset-0 bg-white/0" />

   

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 flex flex-col items-center">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-primary/60" />

            <SplitText
              text="Why Choose ClickMasters"
              className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary"
              delay={60}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, x: 60 }}
              to={{ opacity: 1, x: 0 }}
              threshold={0.2}
            />

            <span className="h-[2px] w-8 rounded-full bg-primary/60" />
          </div>

          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-16">
          {(hasCustomItems ? items : defaultBenefits).map((item: any, index) => {
            const Icon = hasCustomItems ? getIconForTitle(item.title) : item.icon;

            return (
              <motion.div
                key={item.title}
                className="relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TiltCard
                  tiltLimit={10}
                  scale={1.02}
                  perspective={1000}
                  effect="gravitate"
                  spotlight={true}
                  className="w-full h-full rounded-2xl"
                >
                  {renderCard(
                    <div className="relative z-10 p-6">
                      <div className="mb-5">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/40 backdrop-blur-md border border-white/20">
                          <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-700/80 text-sm leading-relaxed">
                        {item.desc || item.description}
                      </p>

                      {!hasCustomItems && (
                        <>
                          <div className="flex flex-wrap gap-2 mt-4 mb-4">
                            {item.features.map((feature: string) => (
                              <span
                                key={feature}
                                className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-700"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-white/20 flex justify-between items-baseline">
                            <span className="text-2xl font-bold text-primary">
                              {item.stats}
                            </span>
                            <span className="text-xs text-gray-600/70 uppercase">
                              {item.statLabel}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;