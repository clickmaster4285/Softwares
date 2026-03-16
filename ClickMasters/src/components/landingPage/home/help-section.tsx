'use client';

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Video, FileQuestion, Headphones, Search, ArrowRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define types
interface HelpResource {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  color?: string;
  stat?: string;
}

// YOUR ORIGINAL CONTENT - NOT CHANGED
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

export function HelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);


  // Premium hover animation for cards
  const handleCardHover = (index: number, isHovering: boolean) => {
    setHoveredIndex(isHovering ? index : null);
    
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        rotationX: 2,
        rotationY: index % 2 === 0 ? 2 : -2,
        boxShadow: "0 30px 40px -20px rgba(249,115,22,0.3), 0 10px 20px -10px rgba(0,0,0,0.1)",
        borderColor: "#f97316",
        duration: 0.4,
        ease: "power2.out"
      });

      // Create shine effect
      let shine = card.querySelector('.card-shine') as HTMLDivElement;
      if (!shine) {
        shine = document.createElement('div');
        shine.className = 'card-shine absolute inset-0 pointer-events-none rounded-2xl';
        shine.style.background = 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.1), transparent 70%)';
        card.appendChild(shine);
      }
      
      gsap.to(shine, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        borderColor: "rgba(249,115,22,0.1)",
        duration: 0.5,
        ease: "power3.out"
      });

      const shine = card.querySelector('.card-shine');
      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="help"
      className="relative py-24 overflow-hidden bg-white font-sans"
    >
      

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section - YOUR ORIGINAL HEADER with premium styling */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary mx-auto mb-8"
          />
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
            Resources & 
            <span className="font-bold text-orange-500 block mt-2">
              Developer Support
            </span>
          </h2>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mt-4">
            Documentation, tutorials, and technical support for your software. 
            Need a custom solution? Get in touch with our development team.
          </p>
        </div>


        {/* Resources Grid - YOUR ORIGINAL RESOURCES with premium card design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {helpResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className="group relative cursor-pointer"
                style={{ transformStyle: 'preserve-3d' as const }}
              >
                {/* Premium Card Design */}
                <div className="relative bg-white rounded-2xl p-6 border border-orange-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full overflow-hidden">
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0" style={{
                      background: 'radial-gradient(circle at 20% 30%, rgba(249,115,22,0.03) 0%, transparent 50%)',
                    }} />
                  </div>

                  {/* Header with Icon and Stat */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black/80" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {resource.stat && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-black">{resource.stat}</p>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          Articles
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-black mb-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {resource.description}
                  </p>

                  {/* Link Button */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center text-sm text-orange-500 font-medium"
                  >
                    {resource.link}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </motion.button>

                  {/* Bottom Corner Accent */}
                  <div className="absolute bottom-3 right-3 w-6 h-6">
                    <motion.div
                      className="w-full h-full border-b border-r border-orange-500"
                      animate={{
                        rotate: hoveredIndex === index ? 180 : 0,
                        opacity: hoveredIndex === index ? 0.3 : 0.1
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section - YOUR ORIGINAL CTA with premium styling */}
        <div ref={ctaRef} className="mt-20">
          <div className="relative bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-3xl p-12 overflow-hidden border border-orange-500/10">
            
         
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                className="w-12 h-px bg-orange-500 mx-auto mb-8"
                animate={{
                  width: ['48px', '96px', '48px'],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Have a software project in mind?
                <span className="font-bold block mt-2 text-orange-500">
                  Get a Free Consultation
                </span>
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                Our software development team will discuss your requirements and propose a solution 
                tailored to your needs.
              </p>

              {/* Custom CTA Buttons - YOUR ORIGINAL BUTTONS with premium styling */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t border-orange-500/10"
              >
                {/* Primary Button */}
                <Link href="/contact-us" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-black text-white text-sm font-medium tracking-wider overflow-hidden rounded-md"
                  >
                    <span className="relative z-10 flex items-center">
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-orange-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                
                {/* Secondary Button */}
                <Link href="/about-us" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-transparent text-black text-sm font-medium tracking-wider border border-orange-500/20 hover:border-orange-500/50 transition-colors duration-300 overflow-hidden rounded-md"
                  >
                    <span className="relative z-10 flex items-center">
                      About ClickMasters
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-orange-500/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators - YOUR ORIGINAL with premium styling */}
              <motion.div
                className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-500"
              >
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                  24/7 Support
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                  Free Documentation
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                  Video Tutorials
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}