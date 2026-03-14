'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Factory, Store, Briefcase, Heart, GraduationCap, Building2, ArrowRight, LucideIcon } from "lucide-react"

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
    title: "Manufacturing",
    description: "Custom ERP, MES, production planning, and inventory software. We build manufacturing software that integrates with your shop floor and supply chain.",
    features: ["ERP & MRP", "Production Planning", "Quality Control", "Inventory Systems"],
    stats: "40%",
    statLabel: "Efficiency Increase"
  },
  {
    icon: Store,
    title: "Retail & eCommerce",
    description: "E-commerce platforms, POS systems, and omnichannel retail software. Custom web and mobile apps for online stores and in-store operations.",
    features: ["E-commerce Apps", "POS Software", "Inventory Sync", "Customer Portals"],
    stats: "3.5x",
    statLabel: "Sales Growth"
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Project management, time tracking, billing, and client portal software. Custom software for consultancies, agencies, and service firms.",
    features: ["Project Management", "Time & Billing", "Client Portals", "Reporting"],
    stats: "60%",
    statLabel: "Time Saved"
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Patient management, scheduling, EHR integrations, and compliant healthcare software. Secure, HIPAA-aware applications for clinics and hospitals.",
    features: ["Patient Management", "Scheduling", "EHR Integration", "Telehealth"],
    stats: "99.9%",
    statLabel: "Uptime"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Learning management systems, student portals, and education software. Custom web and mobile apps for schools, universities, and ed-tech.",
    features: ["LMS", "Student Portals", "Course Management", "Attendance"],
    stats: "50k+",
    statLabel: "Students Served"
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property management, listing platforms, and real estate software. Custom solutions for agents, developers, and property managers.",
    features: ["Property Management", "Listing Platforms", "Lease Management", "Tenant Portals"],
    stats: "25k+",
    statLabel: "Properties Managed"
  },
];

const stats: StatItem[] = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '12+', label: 'Industries Served' },
  { number: '99%', label: 'Client Satisfaction' },
];

// Define animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid - Fixed TypeScript with type assertion */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #00000005 1px, transparent 1px),
                           linear-gradient(to bottom, #00000005 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        } as React.CSSProperties} 
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-px bg-primary/30 mx-auto mb-8"
          />
          
          <motion.h2
            className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4"
          >
            Industry-Specific
            <span className="font-medium block mt-2">
              Software <span className="text-primary">Solutions</span>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-black/60 max-w-2xl mx-auto text-lg"
          >
            Deep expertise meets technical excellence across every sector
          </motion.p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card Border Animation */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl p-6 border border-primary/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.06)] transition-shadow duration-500 h-full">
                  
                  {/* Icon with Animation */}
                  <motion.div
                    className="mb-5"
                    animate={{
                      x: hoveredIndex === index ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative inline-block">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black/80" strokeWidth={1.5} />
                      </div>
                      
                      {/* Animated Underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-primary"
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredIndex === index ? '32px' : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-medium text-black mb-2"
                    animate={{
                      x: hoveredIndex === index ? 4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {industry.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p
                    className="text-black/60 text-sm leading-relaxed mb-4"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                  >
                    {industry.description}
                  </motion.p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.features.map((feature: string) => (
                      <span 
                        key={feature} 
                        className="text-xs px-2 py-1 bg-black/5 text-black/60 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <motion.div
                    className="pt-3 border-t border-primary/20 flex items-baseline justify-between"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.6,
                    }}
                  >
                    <div>
                      <motion.span
                        className="text-2xl font-light text-black block leading-none"
                        animate={{
                          scale: hoveredIndex === index ? 1.1 : 1,
                          x: hoveredIndex === index ? 4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {industry.stats}
                      </motion.span>
                      <span className="text-xs uppercase tracking-wider text-black/40">
                        {industry.statLabel}
                      </span>
                    </div>
                    
                    {/* Learn More Link */}
                    <motion.div 
                      className="flex items-center text-primary text-sm"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : 10,
                      }}
                    >
                      <span className="text-xs">Learn</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </motion.div>
                  </motion.div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute bottom-3 right-3 w-6 h-6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.2 : 0,
                      rotate: hoveredIndex === index ? 180 : 0,
                    }}
                  >
                    <div className="w-full h-full border-b border-r border-primary" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-br from-black/5 to-primary/5 rounded-3xl p-12 overflow-hidden">
            {/* Animated Pattern - Fixed TypeScript */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              } as React.CSSProperties}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                className="w-12 h-px bg-primary mx-auto mb-8"
                animate={{
                  width: ['48px', '96px', '48px'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <h3 className="text-3xl md:text-4xl font-light text-black mb-4">
                Ready to Transform Your Industry?
                <span className="font-medium block mt-2 text-primary">
                  Let's Build Something Extraordinary
                </span>
              </h3>
              
              <p className="text-black/60 text-lg leading-relaxed max-w-2xl mx-auto">
                Whether you're in manufacturing, healthcare, or retail, we have the 
                expertise to build software that drives your business forward.
              </p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-12 mt-8 pt-8 border-t border-black/10"
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-medium text-black">{stat.number}</div>
                    <div className="text-xs uppercase tracking-wider text-black/40 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 px-8 py-3 bg-black text-white text-sm font-light tracking-wider hover:bg-primary transition-colors duration-300 rounded-none"
              >
                Discuss Your Project
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}