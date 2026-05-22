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
import ColorBends from '../../ui/ColorBends';

// Default full benefits with all features and stats
interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  stats: string;
  statLabel: string;
}

// Simple item type for custom data
interface SimpleWhyChooseUsItem {
  title: string;
  desc: string;
}

interface WhyChooseUsProps {
  countryName?: string;
  items?: SimpleWhyChooseUsItem[];
  subtitle?: string;
}

// Default benefits (full featured)
const defaultBenefits: Benefit[] = [
  {
    icon: Rocket,
    title: 'Rapid Delivery',
    description: 'Agile development methodology ensures your software is delivered on time, every time. We work in sprints with complete transparency.',
    features: ['2-Week Sprints', 'Daily Updates', 'Fast Turnaround', 'No Delays'],
    stats: '2x',
    statLabel: 'Faster Delivery',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Enterprise-grade code with best practices, design patterns, and comprehensive documentation. Built to scale with your business.',
    features: ['SOLID Principles', 'Unit Testing', 'Code Reviews', 'Documentation'],
    stats: '99.9%',
    statLabel: 'Code Quality',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Bank-grade security implementation with regular audits, encryption, and compliance standards including GDPR and SOC2.',
    features: ['End-to-End Encryption', 'Regular Audits', 'GDPR Compliant', 'Secure APIs'],
    stats: '100%',
    statLabel: 'Data Protection',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description: 'Lightning-fast applications with optimized databases, caching strategies, and CDN integration for global reach.',
    features: ['< 1s Load Time', 'Database Optimization', 'CDN Ready', 'Caching'],
    stats: '300%',
    statLabel: 'Speed Boost',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'You are part of the team. Transparent communication, weekly demos, and dedicated project managers for your success.',
    features: ['Dedicated PM', 'Weekly Demos', '24/7 Support', 'Transparent Pricing'],
    stats: '98%',
    statLabel: 'Client Retention',
  },
  {
    icon: Clock,
    title: 'Long-Term Support',
    description: 'We don\'t disappear after launch. Maintenance, updates, scaling, and 24/7 support to keep your software running smoothly.',
    features: ['24/7 Support', 'Regular Updates', 'Scaling Help', 'Bug Fixes'],
    stats: '5+ Years',
    statLabel: 'Avg Partnership',
  },
];

// Map simple title to an icon
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

export function WhyChooseUs({ countryName, items, subtitle = "Competitive differentiation that sets us apart" }: WhyChooseUsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Check if custom items were passed
  const hasCustomItems = items && items.length > 0;

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-black font-sans">



  <ColorBends
          colors={["#003843", "#005f6f", "#007f92"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent={true}
          className="w-full h-full"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />





      
     <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-10">

  {/* Header Section */}
  <div className="mx-auto max-w-3xl text-center mb-12">
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="h-[2px] w-8 rounded-full bg-primary" />

      <div className="inline-flex items-center gap-1.5">
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
      </div>

      <span className="h-[2px] w-8 rounded-full bg-primary" />
    </div>

    <p className="mx-auto max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
      {subtitle}
    </p>
  </div>

  {/* Benefits Grid */}
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-16">
    {hasCustomItems ? (
      items.map((item, index) => {
        const Icon = getIconForTitle(item.title);

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
              <div
                className="
                  relative overflow-hidden h-full rounded-2xl
                  border border-white/30
                  bg-white/[0.06]
                  backdrop-blur-xl
                  p-6
                  shadow-[0_8px_32px_rgba(0,148,173,0.12)]
                  group
                  transition-all duration-500
                  hover:border-primary/30
                  hover:bg-white/[0.09]
                  hover:shadow-[0_12px_45px_rgba(0,148,173,0.25)]
                "
              >
                {/* Glass Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent pointer-events-none" />

                {/* Top Glow */}
                <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-60" />

                <div className="relative z-10">
                  <div className="mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Icon
                        className="w-6 h-6 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })
    ) : (
      defaultBenefits.map((benefit, index) => {
        const Icon = benefit.icon;

        return (
          <motion.div
            key={benefit.title}
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
              <div
                className="
                  relative overflow-hidden h-full rounded-2xl
                  border border-white/10
                  bg-white/[0.06]
                  backdrop-blur-xl
                  p-6
                  shadow-[0_8px_32px_rgba(0,148,173,0.12)]
                  group
                  transition-all duration-500
                  hover:border-primary/30
                  hover:bg-white/[0.09]
                  hover:shadow-[0_12px_45px_rgba(0,148,173,0.25)]
                "
              >
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent pointer-events-none" />

                {/* Glow */}
                <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-60" />

                <div className="relative z-10">
                  <div className="mb-5">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Icon
                        className="w-6 h-6 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {benefit.features.map((feature) => (
                      <span
                        key={feature}
                        className="
                          text-xs px-2 py-1 rounded-full
                          bg-white/[0.05]
                          border border-white/10
                          text-white/60
                          group-hover:bg-primary/10
                          group-hover:text-primary
                          group-hover:border-primary/20
                          transition-all duration-300
                        "
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary block leading-none">
                        {benefit.stats}
                      </span>

                      <span className="text-xs uppercase tracking-wider text-white/40">
                        {benefit.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })
    )}
  </div>
</div>




    </section>
  );
}

export default WhyChooseUs;