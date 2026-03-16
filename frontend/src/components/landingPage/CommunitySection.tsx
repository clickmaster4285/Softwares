'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { Users, Code, BookOpen, MessageCircle, Globe, Award, ArrowRight, LucideIcon } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define types
interface CommunityFeature {
  icon: LucideIcon;
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

// YOUR ORIGINAL CONTENT - NOT CHANGED
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

// YOUR ORIGINAL CONTENT - NOT CHANGED
const stats: StatItem[] = [
  { value: "1,860+", label: "Projects Delivered" },
  { value: "3,500+", label: "Happy Clients" },
  { value: "75+", label: "Industry Awards" },
];

// Helper function to extract number for counting
const extractNumber = (statString: string): number => {
  const match = statString.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ''), 10);
  }
  return 0;
};

// Helper function to check if stat has plus sign
const hasPlus = (statString: string): boolean => {
  return statString.includes('+');
};

// Helper function to check if stat is percentage
const isPercentage = (statString: string): boolean => {
  return statString.includes('%');
};

// Helper function to check if stat is 24/7 format
const is247 = (statString: string): boolean => {
  return statString.includes('24/7');
};

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countStarted, setCountStarted] = useState(false);

  // Premium GSAP animations (SAME AS INDUSTRIES SECTION)
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Master timeline for coordinated entrance
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => {
              setHasAnimated(true);
              setCountStarted(true);
            }
          }
        });

        // Header animation
        if (headerRef.current) {
          masterTl.fromTo(headerRef.current,
            {
              opacity: 0,
              y: 60,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            }
          );
        }

        // Animate stats cards
        statsRef.current.forEach((card, index) => {
          if (card) {
            masterTl.fromTo(card,
              {
                opacity: 0,
                y: 50,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.2)",
                delay: index * 0.1
              },
              "-=0.4"
            );
          }
        });

        // Animate feature cards with 3D entrance
        cardsRef.current.forEach((card, index) => {
          if (card) {
            masterTl.fromTo(card,
              {
                opacity: 0,
                y: 100,
                rotationX: 30,
                rotationY: index % 2 === 0 ? -15 : 15,
                scale: 0.8,
                transformPerspective: 1000
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.2)",
                delay: index * 0.1
              },
              "-=0.6"
            );

            // Add floating particles to each card (only for cards 3+)
            if (index >= 3) {
              for (let i = 0; i < 3; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-1 h-1 bg-orange-500/20 rounded-full pointer-events-none';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                card.appendChild(particle);

                gsap.to(particle, {
                  y: gsap.utils.random(-20, 20),
                  x: gsap.utils.random(-20, 20),
                  scale: gsap.utils.random(1, 2),
                  opacity: gsap.utils.random(0.1, 0.3),
                  duration: gsap.utils.random(2, 4),
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: i * 0.2
                });
              }
            }
          }
        });

        // CTA section entrance
        if (ctaRef.current) {
          masterTl.fromTo(ctaRef.current,
            {
              opacity: 0,
              y: 80,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out"
            },
            "-=0.4"
          );
        }

        // Add floating particles to CTA
        if (ctaRef.current) {
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1.5 h-1.5 bg-orange-500/20 rounded-full pointer-events-none';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            ctaRef.current.appendChild(particle);

            gsap.to(particle, {
              y: gsap.utils.random(-30, 30),
              x: gsap.utils.random(-30, 30),
              scale: gsap.utils.random(1, 3),
              opacity: gsap.utils.random(0.1, 0.4),
              duration: gsap.utils.random(3, 6),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [hasAnimated]);

  // Premium hover animation for feature cards
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
      id="community"
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
            Why Choose Our
            <span className="font-bold text-orange-500 block mt-2">
              Software Development Services
            </span>
          </h2>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mt-4">
            We deliver custom software, web apps, and mobile apps with experienced developers, 
            agile process, and on-time delivery.
          </p>
        </div>

        {/* Stats Row with Counters */}
<div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
  {stats.map((stat, idx) => {
    // extract numeric part from stat.value
    const numericValue = parseInt(stat.value.replace(/\D/g, ""), 10) || 0;
    const hasPlusSign = stat.value.includes("+");

    return (
      <div
        key={stat.label}
        ref={(el) => { statsRef.current[idx] = el; }}
        className="relative text-center"
      >
        <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6">
          
          {/* Glow + CountUp */}
          <p className="relative text-3xl md:text-4xl font-bold text-primary">
            <span className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10" />
            <CountUp
              start={0}
              end={numericValue}
              duration={2.5}
              separator=","
              delay={0.2}
              useEasing={true}
              useGrouping={true}
            />
            {hasPlusSign && <span className="ml-1 text-orange-500">+</span>}
          </p>

          <p className="text-xs uppercase tracking-wider text-gray-500">
            {stat.label}
          </p>

          <div className="absolute bottom-0 left-1/2 h-px bg-orange-500/30 w-10 -translate-x-1/2" />
        </div>
      </div>
    );
  })}
</div>
        
        {/* Features Grid - First 3 cards have NO stats, last 3 cards HAVE stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const numericValue = extractNumber(feature.stat);
            const hasPlusSign = hasPlus(feature.stat);
            const isPercent = isPercentage(feature.stat);
            const is247Format = is247(feature.stat);
            
            return (
              <div
                key={feature.title}
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

                  {/* Header with Icon - Stats HIDDEN for first 3 cards, SHOWN for last 3 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md scale-0 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black/80" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Stats section - ONLY show for cards 4, 5, 6 (index >= 3) */}
                    {index >= 3 && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-black">
                          {is247Format ? (
                            feature.stat
                          ) : numericValue > 0 ? (
                            <>
                              <CountUp
                                start={0}
                                end={numericValue}
                                duration={2.5}
                                separator=","
                                delay={0.2 + (index * 0.1)}
                                useEasing={true}
                                useGrouping={true}
                              >
                                {({ countUpRef, start }) => {
                                  useEffect(() => {
                                    if (countStarted) {
                                      start();
                                    }
                                  }, [countStarted, start]);
                                  return <span ref={countUpRef} />;
                                }}
                              </CountUp>
                              {hasPlusSign && <span className="text-orange-500 ml-1">+</span>}
                              {isPercent && <span className="text-orange-500 ml-1">%</span>}
                            </>
                          ) : (
                            feature.stat
                          )}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                          {feature.statLabel}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

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
            
            {/* Animated Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
            
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
                Ready to Start Your Project?
                <span className="font-bold block mt-2 text-orange-500">
                  Let's Build Something Amazing Together
                </span>
              </h3>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                Whether you need a custom web app, mobile solution, or enterprise software, 
                our team is ready to bring your vision to life.
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
                      Get in Touch
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
                <Link href="/testimonials" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-8 py-4 bg-transparent text-black text-sm font-medium tracking-wider border border-orange-500/20 hover:border-orange-500/50 transition-colors duration-300 overflow-hidden rounded-md"
                  >
                    <span className="relative z-10 flex items-center">
                      Client Stories
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
                  Agile Development
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                  On-time Delivery
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2" />
                  24/7 Support
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}