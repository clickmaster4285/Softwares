'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Mail, User, Phone, Send, CheckCircle2, DollarSign } from "lucide-react";
import { motion, useInView } from 'framer-motion';

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
    <span className="relative block w-full max-w-full min-w-0 text-left sm:inline-block sm:min-w-[min(100%,24rem)] lg:min-w-[28rem]">
      {/* Reserve space: wraps on small screens, single line from sm up */}
      <span
        className="invisible block max-w-full break-words whitespace-pre-wrap sm:inline sm:whitespace-pre"
        aria-hidden="true"
      >
        {longestText}
      </span>

      {/* Animated text: wraps on narrow viewports to avoid horizontal scroll */}
      <span className="absolute left-0 top-0 w-full max-w-full break-words whitespace-normal sm:whitespace-nowrap">
        {displayText}
        <motion.span
          className="inline-block w-0.5 min-h-[1em] align-middle bg-primary ml-0.5 sm:ml-1"
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

const stats: StatItem[] = [
  { end: 1860, label: 'Projects Delivered' },
  { end: 3500, label: 'Happy Clients' },
  { end: 75, label: 'Awards Won' },
  { end: 5, label: 'Years Experience' }
];

const particlePositions = [
  { top: '14%', left: '22%' },
  { top: '31%', left: '68%' },
  { top: '52%', left: '40%' },
  { top: '67%', left: '83%' },
  { top: '79%', left: '19%' },
  { top: '90%', left: '56%' },
] as const;

export function HeroSection(): JSX.Element {
  const [glowIntensity, setGlowIntensity] = useState<number>(1);
  const [heroForm, setHeroForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });
  const [heroSending, setHeroSending] = useState(false);
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);

  const heroFieldClass =
    'w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 pl-9 text-base sm:text-sm text-white placeholder:text-gray-400 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30';

  const handleHeroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHeroSending(true);
    setHeroError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroForm.name,
          email: heroForm.email,
          message: heroForm.message,
          phone: heroForm.phone || undefined,
          budget: heroForm.budget || undefined,
          services: 'Homepage — hero inquiry',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setHeroSuccess(true);
      setHeroForm({ name: '', email: '', phone: '', budget: '', message: '' });
      setTimeout(() => setHeroSuccess(false), 5000);
    } catch (err: unknown) {
      setHeroError(
        err instanceof Error ? err.message : 'Failed to send. Please try again.',
      );
    } finally {
      setHeroSending(false);
    }
  };

  useEffect(() => {
    // Pulsing glow effect
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.2 : 1);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-[max(1rem,env(safe-area-inset-top))] pb-10 sm:pb-12 md:py-12 lg:py-20"
      aria-labelledby="hero-heading"
    >
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
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              top: position.top,
              left: position.left,
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

      <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10 w-full max-w-full min-w-0">
        <div className="mx-auto max-w-7xl w-full min-w-0">
          <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1fr_minmax(280px,400px)] xl:grid-cols-[1fr_420px] items-start mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="min-w-0">
              {/* Heading with Typing Animation - LEFT ALIGNED */}
              <motion.div
                className="mb-4 sm:mb-6 text-left min-w-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 
                  id="hero-heading" 
                  className="font-display text-[1.65rem] leading-tight sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-pretty text-left [overflow-wrap:anywhere]"
                >
                  Your Trusted{' '}
                  <span className="text-primary block mt-1.5 sm:mt-2 text-left min-w-0">
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
                className="text-base sm:text-lg md:text-xl text-gray-200 text-left mb-6 sm:mb-8 text-pretty leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                ClickMasters builds custom software, web applications, mobile apps, and ERP solutions. We are a software development company that turns your ideas into reliable, scalable software.
              </motion.p>

              {/* CTA Buttons - LEFT ALIGNED */}
              <motion.div 
                className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-3 sm:gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto min-h-[48px] touch-manipulation bg-primary text-white hover:bg-primary px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all relative overflow-hidden group" 
                    asChild
                  >
                    <Link href="/contact-us">
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
                  className="w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto min-h-[48px] touch-manipulation px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-xl bg-black/30 backdrop-blur-sm border-2 border-white/20 hover:bg-black/40 text-white hover:border-primary/50 transition-all" 
                    asChild
                  >
                    <Link href="/services">
                      <Play className="mr-2 h-5 w-5" />
                      Our Services
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Hero CTA form — readable on busy background */}
            <motion.div
              className="w-full min-w-0 max-w-md mx-auto lg:mx-0 lg:max-w-none"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="rounded-xl sm:rounded-2xl border border-white/15 bg-black/45 backdrop-blur-md p-4 sm:p-5 md:p-6 shadow-2xl shadow-black/40">
                <h2 className="text-base sm:text-lg font-bold text-white mb-1 font-display">
                  Get a free quote
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-snug sm:leading-normal">
                  Share your details—we&apos;ll respond within one business day.
                </p>

                {heroError && (
                  <div
                    className="mb-3 rounded-xl border border-red-400/40 bg-red-950/50 px-3 py-2 text-sm text-red-200"
                    role="alert"
                  >
                    {heroError}
                  </div>
                )}

                {heroSuccess ? (
                  <div className="rounded-xl border border-green-400/30 bg-green-950/40 px-4 py-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <p className="font-semibold text-white">Message received</p>
                    <p className="mt-1 text-sm text-gray-300">We&apos;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-3">
                    <div className="relative">
                      <User
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      />
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={heroForm.name}
                        onChange={handleHeroChange}
                        placeholder="Full name"
                        className={heroFieldClass}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={heroForm.email}
                        onChange={handleHeroChange}
                        placeholder="Work email"
                        className={heroFieldClass}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      />
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={heroForm.phone}
                        onChange={handleHeroChange}
                        placeholder="Phone (optional)"
                        className={heroFieldClass}
                      />
                    </div>
                    <div className="relative">
                      <DollarSign
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                        aria-hidden
                      />
                      <input
                        type="text"
                        name="budget"
                        value={heroForm.budget}
                        onChange={handleHeroChange}
                        placeholder="Estimated budget (optional)"
                        className={heroFieldClass}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={3}
                        value={heroForm.message}
                        onChange={handleHeroChange}
                        placeholder="What would you like to build?"
                        className="w-full min-h-[88px] resize-y rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-gray-400 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={heroSending}
                      className="flex w-full min-h-[48px] items-center justify-center gap-2 touch-manipulation rounded-xl bg-primary px-4 py-3 text-base sm:text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {heroSending ? (
                        'Sending…'
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden />
                          Send message
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      <Link href="/contact-us" className="text-gray-300 underline-offset-4 hover:text-white hover:underline">
                        More contact options
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats - LEFT ALIGNED */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:gap-8 pt-8 sm:pt-10 border-t border-white/20 text-left"
            role="list" 
            aria-label="Company achievements"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-left relative min-w-0"
                role="listitem"
              >
                <div className="relative z-10 py-2 pl-0 pr-0.5 sm:p-4 sm:pl-0">
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display transition-colors text-left tabular-nums"
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <Counter end={stat.end} duration={2} delay={0.2 * index} />
                  </motion.p>
                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-300 mt-1 text-left leading-snug">
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