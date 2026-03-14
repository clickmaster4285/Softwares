'use client';

import React, { useState, useRef } from 'react';
import Link from "next/link";
import { motion, useInView, Variants } from 'framer-motion';
import { Users, Code, BookOpen, MessageCircle, Globe, Award, ArrowRight, LucideIcon } from "lucide-react";

// Define types
interface CommunityFeature {
  icon: LucideIcon;  // More specific than React.ElementType
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
}

interface StatItem {
  value: string;
  label: string;
}

const communityFeatures: CommunityFeature[] = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored software built for your business. Web apps, desktop applications, and backend systems that scale.",
    stat: "1,860+",
    statLabel: "Projects",
    color: "from-primary/60 to-primary/10",
  },
  {
    icon: Users,
    title: "Web Application Development",
    description: "Modern web apps with React, Node, and cloud hosting. Responsive, fast, and secure applications.",
    stat: "3,500+",
    statLabel: "Clients",
  color: "from-primary/60 to-primary/10",
  },
  {
    icon: BookOpen,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android. From MVP to enterprise solutions.",
    stat: "75+",
    statLabel: "Awards",
   color: "from-primary/60 to-primary/10",
  },
  {
    icon: MessageCircle,
    title: "ERP & Business Software",
    description: "ERP, CRM, inventory, and workflow automation. Integrate with your existing systems and processes.",
    stat: "5+",
    statLabel: "Years",
    color: "from-primary/60 to-primary/10",
  },
  {
    icon: Globe,
    title: "API & Integrations",
    description: "REST APIs, third-party integrations, and legacy system modernization. Connect your software ecosystem.",
    stat: "24/7",
    statLabel: "Support",
    color: "from-primary/60 to-primary/10",
  },
  {
    icon: Award,
    title: "Maintenance & Support",
    description: "Ongoing updates, security patches, and technical support. Keep your software running smoothly.",
    stat: "100%",
    statLabel: "Dedicated",
   color: "from-primary/60 to-primary/10",
  },
];

const stats: StatItem[] = [
  { value: "1,860+", label: "Projects Delivered" },
  { value: "3,500+", label: "Happy Clients" },
  { value: "75+", label: "Industry Awards" },
];

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

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="community"
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid - Fixed TypeScript */}
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
            Why Choose Our
            <span className="font-medium text-primary block mt-2">
              Software Development <span className="text-primary">Services</span>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-black/60 max-w-2xl mx-auto text-lg"
          >
            We deliver custom software, web apps, and mobile apps with experienced developers, 
            agile process, and on-time delivery.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="relative text-center"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
              />
              <div className="relative p-6">
                <motion.p 
                  className="text-3xl md:text-4xl font-light text-black mb-1"
                  animate={{
                    scale: hoveredIndex === idx ? 1.1 : 1,
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs uppercase tracking-wider text-black/40">
                  {stat.label}
                </p>
                <motion.div
                  className="absolute bottom-0 left-1/2 h-px bg-primary/30"
                  initial={{ width: 0, x: "-50%" }}
                  whileInView={{ width: "40px" }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card Border Animation */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredIndex === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl p-6 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-shadow duration-500 h-full">
                  
                  {/* Header with Icon and Stat */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      animate={{
                        x: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
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
                    
                    <motion.div 
                      className="text-right"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                    >
                      <p className="text-2xl font-light text-black">{feature.stat}</p>
                      <p className="text-xs uppercase tracking-wider text-black/40">
                        {feature.statLabel}
                      </p>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.h3
                    className="text-lg font-medium text-black mb-2"
                    animate={{
                      x: hoveredIndex === index ? 4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-black/60 text-sm leading-relaxed"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Bottom Corner Accent */}
                  <motion.div
                    className="absolute bottom-3 right-3 w-6 h-6"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.2 : 0,
                      rotate: hoveredIndex === index ? 180 : 0,
                    }}
                  >
                    <div className="w-full h-full border-b border-r border-primary/30" />
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
          transition={{ duration: 0.8, delay: 0.6 }}
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
                backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                className="w-12 h-px bg-primary/30 mx-auto mb-8"
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
                Ready to Start Your Project?
                <span className="font-medium block mt-2 text-primary">
                  Let's Build Something Amazing Together
                </span>
              </h3>
              
              <p className="text-black/60 text-lg leading-relaxed max-w-2xl mx-auto">
                Whether you need a custom web app, mobile solution, or enterprise software, 
                our team is ready to bring your vision to life.
              </p>

              {/* Custom CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-black/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Primary Button */}
                <Link href="/contact-us" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-black text-white text-sm font-light tracking-wider overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-primary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                
                {/* Secondary Button */}
                <Link href="/testimonials" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-transparent text-black text-sm font-light tracking-wider border border-black/20 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Client Stories
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-primary/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-6 mt-8 text-xs text-black/40"
              >
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  Agile Development
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  On-time Delivery
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  24/7 Support
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}