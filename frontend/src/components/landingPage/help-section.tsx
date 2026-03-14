'use client';

import Link from "next/link";
import React, { useState, useRef } from "react";
import { motion, useInView, Variants } from 'framer-motion';
import { BookOpen, MessageCircle, Video, FileQuestion, Headphones, Search, ArrowRight } from "lucide-react";

// Define types
interface HelpResource {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color?: string;
  stat?: string;
}

const helpResources: HelpResource[] = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Technical documentation and developer guides for our software and APIs.",
    link: "Browse Docs",
    stat: "150+",
    color: "from-primary to primary/80",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step videos to get started with your software and features.",
    link: "Watch Videos",
    stat: "200+",
color: "from-primary to primary/80",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time. Get help with development and technical questions.",
    link: "Start Chat",
    stat: "24/7",
 color: "from-primary to primary/80",
  },
  {
    icon: FileQuestion,
    title: "FAQ",
    description: "Common questions about our software development services, pricing, and process.",
    link: "View FAQ",
    stat: "50+",
   color: "from-primary to primary/80",
  },
  {
    icon: Headphones,
    title: "Contact Support",
    description: "Request a callback or submit a ticket. Our development team responds within 24 hours.",
    link: "Get Help",
    stat: "24h",
 color: "from-primary to primary/80",
  },
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

export function HelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="help"
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid */}
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
            Resources & 
            <span className="font-medium text-primary block mt-2">
              Developer <span className="text-primary">Support</span>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-black/60 max-w-2xl mx-auto text-lg"
          >
            Documentation, tutorials, and technical support for your software. 
            Need a custom solution? Get in touch with our development team.
          </motion.p>
        </motion.div>

        {/* Search Bar with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-16"
        >
          <div className="relative group">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40" />
              <input 
                placeholder="Search for help articles..." 
                className="w-full pl-12 pr-32 py-4 text-base bg-white border border-black/10 rounded-xl focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-black text-white text-sm font-light tracking-wider rounded-lg overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center">
                  Search
                  <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {helpResources.map((resource, index) => {
            const Icon = resource.icon;
            const gradient = resource.color || "from-primary/60 to-primary/10";
            
            return (
              <motion.div
                key={resource.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card Border Animation */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
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
                    
                    {resource.stat && (
                      <motion.div 
                        className="text-right"
                        animate={{
                          scale: hoveredIndex === index ? 1.1 : 1,
                        }}
                      >
                        <p className="text-2xl font-light text-black">{resource.stat}</p>
                        <p className="text-xs uppercase tracking-wider text-black/40">
                          Articles
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <motion.h3
                    className="text-lg font-medium text-black mb-2"
                    animate={{
                      x: hoveredIndex === index ? 4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {resource.title}
                  </motion.h3>
                  
                  <motion.p
                    className="text-black/60 text-sm leading-relaxed mb-4"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                  >
                    {resource.description}
                  </motion.p>

                  {/* Link Button */}
                  <motion.div
                    animate={{
                      x: hoveredIndex === index ? 4 : 0,
                    }}
                  >
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="flex items-center text-sm text-black/40 hover:text-primary transition-colors duration-300"
                    >
                      {resource.link}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </motion.button>
                  </motion.div>

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
            {/* Animated Pattern */}
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
                Have a software project in mind?
                <span className="font-medium block mt-2 text-primary">
                  Get a Free Consultation
                </span>
              </h3>
              
              <p className="text-black/60 text-lg leading-relaxed max-w-2xl mx-auto">
                Our software development team will discuss your requirements and propose a solution 
                tailored to your needs.
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
                      Contact Us
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
                <Link href="/about-us" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-transparent text-black text-sm font-light tracking-wider border border-black/20 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      About ClickMasters
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
                  24/7 Support
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  Free Documentation
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  Video Tutorials
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}