'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion, useInView, Variants } from 'framer-motion';

// Define types
interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

interface StatItem {
  end: number;
  label: string;
}

// Typing animation component with fixed width
const TypingAnimation = ({ texts, speed = 100, delay = 2000 }: { texts: string[]; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Find the longest text for consistent width
  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentFullText = texts[currentIndex];
      
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, delay]);

  return (
    <span className="relative inline-block min-w-[300px] sm:min-w-[400px] lg:min-w-[500px] text-left">
      {/* Invisible placeholder to maintain width */}
      <span className="invisible whitespace-pre" aria-hidden="true">
        {longestText}
      </span>
      
      {/* Actual animated text */}
      <span className="absolute left-0 top-0 whitespace-nowrap">
        {displayText}
        <motion.span 
          className="inline-block w-1 h-full bg-primary ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </span>
    </span>
  );
};

// Counter component for stats
const Counter = ({ end, duration = 2, delay = 0 }: CounterProps): JSX.Element => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;
    
    const startValue = 0;
    const increment = end / (duration * 60); // 60fps

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.min(Math.floor(startValue + (end * progress)), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}+</span>;
};

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const stats: StatItem[] = [
  { end: 1860, label: 'Projects Delivered' },
  { end: 3500, label: 'Happy Clients' },
  { end: 75, label: 'Awards Won' },
  { end: 5, label: 'Years Experience' }
];

export function HeroSection(): JSX.Element {
  const [glowIntensity, setGlowIntensity] = useState<number>(1);

  useEffect(() => {
    // Pulsing glow effect
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center" aria-labelledby="hero-heading">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Glowing Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main glowing orb - top right */}
        <motion.div 
          className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/3"
          style={{
            background: `radial-gradient(circle, rgba(249,115,22,${0.2 * glowIntensity}) 0%, rgba(249,115,22,0) 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glowing orb - bottom left */}
        <motion.div 
          className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/3"
          style={{
            background: `radial-gradient(circle, rgba(249,115,22,${0.15 * glowIntensity}) 0%, rgba(249,115,22,0) 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Central radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <motion.div 
            className="w-full h-full"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,${0.1 * glowIntensity}), transparent)`,
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating particles for extra glow */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Heading with Typing Animation - LEFT ALIGNED */}
          <motion.div
            className="mb-6 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 
              id="hero-heading" 
              className="font-display text-4xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] text-left"
            >
              Your Trusted{' '}
              <span className="text-primary block mt-2 text-left">
                <TypingAnimation 
                  texts={[
                    "Software Development Company",
                    "Web App Development Agency",
                    "Mobile App Developers",
                    "ERP Solution Providers"
                  ]} 
                  speed={100}
                  delay={2000}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subheading - LEFT ALIGNED */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-200 text-left mb-8 text-pretty leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            ClickMasters builds custom software, web applications, mobile apps, and ERP solutions. We are a software development company that turns your ideas into reliable, scalable software.
          </motion.p>

          {/* CTA Buttons - LEFT ALIGNED */}
          <motion.div 
            className="flex flex-col sm:flex-row items-start justify-start gap-4 mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 px-8 py-6 text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all relative overflow-hidden group" 
                asChild
              >
                <Link href="/admin/login">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
                  <motion.span 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 hover:bg-black/40 text-white hover:border-orange-500/50 transition-all" 
                asChild
              >
                <Link href="/services">
                  <Play className="mr-2 h-5 w-5" />
                  Our Services
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats - LEFT ALIGNED */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/20 text-left"
            role="list" 
            aria-label="Company achievements"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-left relative"
                role="listitem"
              >
                <div className="relative z-10 p-4 pl-0">
                  <motion.p
                    className="text-3xl sm:text-4xl font-bold text-white font-display transition-colors text-left"
                    animate={{
                      textShadow: [
                        "0 0 2px rgba(249,115,22,0.3)",
                        "0 0 10px rgba(249,115,22,0.7)",
                        "0 0 2px rgba(249,115,22,0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Counter end={stat.end} duration={2} delay={0.2 * index} />
                  </motion.p>
                  <p className="text-sm text-gray-300 mt-1 text-left">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}