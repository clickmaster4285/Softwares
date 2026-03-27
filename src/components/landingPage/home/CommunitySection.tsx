'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Code,
  BookOpen,
  MessageCircle,
  Globe,
  Award,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
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
    title: 'Custom Software Development',
    description:
      'Tailored software built for your business. Web apps, desktop applications, and backend systems that scale.',
    stat: '1,860+',
    statLabel: 'Projects',
    color: 'from-primary/60 to-primary/10',
  },
  {
    icon: Users,
    title: 'Web Application Development',
    description:
      'Modern web apps with React, Node, and cloud hosting. Responsive, fast, and secure applications.',
    stat: '3,500+',
    statLabel: 'Clients',
    color: 'from-primary/60 to-primary/10',
  },
  {
    icon: BookOpen,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile apps for iOS and Android. From MVP to enterprise solutions.',
    stat: '75+',
    statLabel: 'Awards',
    color: 'from-primary/60 to-primary/10',
  },
  {
    icon: MessageCircle,
    title: 'ERP & Business Software',
    description:
      'ERP, CRM, inventory, and workflow automation. Integrate with your existing systems and processes.',
    stat: '5+',
    statLabel: 'Years',
    color: 'from-primary/60 to-primary/10',
  },
  {
    icon: Globe,
    title: 'API & Integrations',
    description:
      'REST APIs, third-party integrations, and legacy system modernization. Connect your software ecosystem.',
    stat: '24/7',
    statLabel: 'Support',
    color: 'from-primary/60 to-primary/10',
  },
  {
    icon: Award,
    title: 'Maintenance & Support',
    description:
      'Ongoing updates, security patches, and technical support. Keep your software running smoothly.',
    stat: '100%',
    statLabel: 'Dedicated',
    color: 'from-primary/60 to-primary/10',
  },
];

// YOUR ORIGINAL CONTENT - NOT CHANGED
const stats: StatItem[] = [
  { value: '1,860+', label: 'Projects Delivered' },
  { value: '3,500+', label: 'Happy Clients' },
  { value: '75+', label: 'Industry Awards' },
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

function CommunityCountUpSpan({
  countStarted,
  start,
  countUpRef,
}: {
  countStarted: boolean;
  start: () => void;
  countUpRef: React.Ref<HTMLSpanElement>;
}) {
  useEffect(() => {
    if (countStarted) {
      start();
    }
  }, [countStarted, start]);
  return <span ref={countUpRef} />;
}

function CommunityFeatureCountUp({
  countStarted,
  numericValue,
  index,
  hasPlusSign,
  isPercent,
}: {
  countStarted: boolean;
  numericValue: number;
  index: number;
  hasPlusSign: boolean;
  isPercent: boolean;
}) {
  return (
    <>
      <CountUp
        start={0}
        end={numericValue}
        duration={2.5}
        separator=","
        delay={0.2 + index * 0.1}
        useEasing={true}
        useGrouping={true}
      >
        {({ countUpRef, start }) => (
          <CommunityCountUpSpan countStarted={countStarted} start={start} countUpRef={countUpRef} />
        )}
      </CountUp>
      {hasPlusSign && <span className="text-primary ml-1">+</span>}
      {isPercent && <span className="text-primary ml-1">%</span>}
    </>
  );
}

export function CommunitySection() {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countStarted, setCountStarted] = useState(false);

  // Premium GSAP animations (matching IndustriesSection style)
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Master timeline for coordinated entrance
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              setHasAnimated(true);
              setCountStarted(true);
            },
          },
        });

        // Header animation
        if (headerRef.current) {
          masterTl.fromTo(
            headerRef.current,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
            }
          );
        }

        // Animate stats cards
        statsRef.current.forEach((card, index) => {
          if (card) {
            masterTl.fromTo(
              card,
              {
                opacity: 0,
                y: 50,
                scale: 0.8,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.2)',
                delay: index * 0.1,
              },
              '-=0.4'
            );
          }
        });

        // Animate feature cards with 3D entrance
        cardsRef.current.forEach((card, index) => {
          if (card) {
            masterTl.fromTo(
              card,
              {
                opacity: 0,
                y: 100,
                rotationX: 30,
                rotationY: index % 2 === 0 ? -15 : 15,
                scale: 0.8,
                transformPerspective: 1000,
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 1.2,
                ease: 'back.out(1.2)',
                delay: index * 0.1,
              },
              '-=0.6'
            );
          }
        });

        // CTA section entrance
        if (ctaRef.current) {
          masterTl.fromTo(
            ctaRef.current,
            {
              opacity: 0,
              y: 80,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power4.out',
            },
            '-=0.4'
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [hasAnimated]);

  // Premium hover animation for feature cards (matching IndustriesSection style)
  const handleCardHover = (index: number, isHovering: boolean) => {
    setHoveredIndex(isHovering ? index : null);
    // No GSAP animations needed - handled by Framer Motion
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white font-sans"  id="community" >
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section - matching IndustriesSection styling */}
        <div ref={headerRef} className="text-center mb-10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary mx-auto mb-8"
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black mt-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our
            <span className="text-primary block mt-2">Software Development Services</span>
          </motion.h2>

          <motion.p
            className="text-gray-700 max-w-2xl mx-auto text-base mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We deliver custom software, web apps, and mobile apps with experienced developers, agile
            process, and on-time delivery.
          </motion.p>
        </div>

        {/* Stats Row with Counters - matching IndustriesSection styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {stats.map((stat, idx) => {
            // extract numeric part from stat.value
            const numericValue = parseInt(stat.value.replace(/\D/g, ''), 10) || 0;
            const hasPlusSign = stat.value.includes('+');

            return (
              <motion.div
                key={stat.label}
                ref={(el) => {
                  statsRef.current[idx] = el;
                }}
                className="relative text-center"
                whileHover={{
                  y: -5,
                  scale: 1.05,
                }}
              >
                <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                  <motion.p
                    className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(249,115,22,0)',
                        '0 0 10px rgba(249,115,22,0.3)',
                        '0 0 0 rgba(249,115,22,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    <span className="absolute inset-0 bg-primary/10 rounded-full blur-md -z-10" />
                    <CountUp
                      start={0}
                      end={numericValue}
                      duration={2.5}
                      separator=","
                      delay={0.2}
                      useEasing={true}
                      useGrouping={true}
                    />
                    {hasPlusSign && <span className="ml-1 text-primary">+</span>}
                  </motion.p>

                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mt-1">
                    {stat.label}
                  </p>

                  <div className="absolute bottom-0 left-1/2 h-px bg-primary/30 w-10 -translate-x-1/2" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid - matching IndustriesSection card styling */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const numericValue = extractNumber(feature.stat);
            const hasPlusSign = hasPlus(feature.stat);
            const isPercent = isPercentage(feature.stat);
            const is247Format = is247(feature.stat);

            return (
              <motion.div
                key={feature.title}
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
                  borderColor: 'hsl(var(--primary))',
               
                }}
               
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Premium Card Design */}
                <div className="relative bg-white rounded-2xl p-6 border border-primary/10  h-full overflow-hidden group">
                  {/* Animated background that moves on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
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
                      
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-black/80"  />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="card-title text-xl font-bold text-black mb-2 relative z-10">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="card-desc text-gray-700 text-sm leading-relaxed mb-4 relative z-10">
                    {feature.description}
                  </p>

                  {/* Stats section - ONLY show for cards 4, 5, 6 (index >= 3) */}
                  {index >= 3 && (
                    <div className="card-stats pt-3 border-t border-primary/20 flex items-baseline justify-between relative z-10">
                      <div>
                        <motion.span
                          className="text-2xl font-bold text-primary block leading-none"
                          whileHover={{ scale: 1.05 }}
                        >
                          {is247Format ? (
                            feature.stat
                          ) : numericValue > 0 ? (
                            <CommunityFeatureCountUp
                              countStarted={countStarted}
                              numericValue={numericValue}
                              index={index}
                              hasPlusSign={hasPlusSign}
                              isPercent={isPercent}
                            />
                          ) : (
                            feature.stat
                          )}
                        </motion.span>
                        <span className="text-xs uppercase tracking-wider text-gray-500">
                          {feature.statLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Corner Accent with rotation */}
                  <div className="absolute bottom-3 right-3 w-6 h-6">
                    <motion.div
                      className="w-full h-full border-b border-r border-primary"
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

        {/* Bottom CTA Section - matching IndustriesSection styling */}
        <div ref={ctaRef} className="mt-20">
          <motion.div
            className="relative bg-gradient-to-br from-gray-50 to-primary/20 rounded-3xl p-12 overflow-hidden border border-primary/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Animated light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                className="w-12 h-px bg-primary mx-auto mb-8"
                animate={{
                  width: ['48px', '96px', '48px'],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Ready to Start Your Project?
                <span className="font-bold block mt-2 text-primary">
                  Let's Build Something Amazing Together
                </span>
              </h3>

              <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto">
                Whether you need a custom web app, mobile solution, or enterprise software, our team
                is ready to bring your vision to life.
              </p>

              {/* Trust Indicators with premium hover (matching IndustriesSection stats) */}
              <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 mt-8 pt-8 border-t border-primary/10">
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  className="text-center cursor-default"
                >
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(249,115,22,0)',
                        '0 0 10px rgba(249,115,22,0.3)',
                        '0 0 0 rgba(249,115,22,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0,
                    }}
                  >
                    Agile
                  </motion.div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mt-1">
                    Development
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  className="text-center cursor-default"
                >
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(249,115,22,0)',
                        '0 0 10px rgba(249,115,22,0.3)',
                        '0 0 0 rgba(249,115,22,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.3,
                    }}
                  >
                    On-time
                  </motion.div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mt-1">
                    Delivery
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  className="text-center cursor-default"
                >
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    animate={{
                      textShadow: [
                        '0 0 0 rgba(249,115,22,0)',
                        '0 0 10px rgba(249,115,22,0.3)',
                        '0 0 0 rgba(249,115,22,0)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.6,
                    }}
                  >
                    24/7
                  </motion.div>
                  <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 mt-1">
                    Support
                  </div>
                </motion.div>
              </motion.div>

              {/* Premium CTA Buttons - matching IndustriesSection button style */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px -5px rgba(249,115,22,0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-black text-white text-sm font-medium tracking-wider rounded-md hover:bg-primary transition-all duration-300 relative overflow-hidden group"
                  onClick={() => router.push('/contact-us')}
                >
                  <span className="relative z-10 flex items-center">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px -5px rgba(249,115,22,0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-transparent text-black text-sm font-medium tracking-wider border border-primary/20 hover:border-primary/50 rounded-md transition-all duration-300 relative overflow-hidden group"
                  onClick={() => router.push('/testimonials')}
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}