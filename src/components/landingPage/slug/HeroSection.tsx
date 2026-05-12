// app/services/[slug]/HeroSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ServiceData } from '@/src/lib/services';

// Counter component with animation
function Counter({ targetValue }: { targetValue: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const parseValue = (val: string): number => {
    const match = val.match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };
  
  const rawNumber = parseValue(targetValue);
  const displaySuffix = targetValue.replace(/\d+(?:\.\d+)?/, '');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = rawNumber / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= rawNumber) {
              setCount(rawNumber);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [rawNumber, hasAnimated]);
  
  return (
    <div ref={elementRef}>
      {hasAnimated ? count.toLocaleString() : '0'}{displaySuffix}
    </div>
  );
}

// Typewriter component
function TypewriterText({ texts, delay = 100 }: { texts: string[]; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(waitTimer);
    }

    let timer: NodeJS.Timeout;
    
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, delay / 2);
      }
    } else {
      if (displayText.length === currentText.length) {
        setIsWaiting(true);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, delay);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isWaiting, currentIndex, texts, delay]);

  return (
    <>
      {displayText}
      <span className="animate-pulse text-orange-400">|</span>
    </>
  );
}

interface HeroSectionProps {
  serviceData: ServiceData;
}

export default function HeroSection({ serviceData }: HeroSectionProps) {
  // Create typewriter phrases from service title and tagline
  const typewriterPhrases = [
    serviceData.title,
    serviceData.tagline,
    "Innovation Delivered",
    "Excellence Guaranteed",
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/services.jpg"
          alt="Services Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        {/* Dark overlay with orange tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-950/70 to-black/80" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* ── Breadcrumb ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 border-b border-white/10 w-full"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto px-4 md:px-8 lg:px-12 py-3.5 bg-black/20 backdrop-blur-md">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-orange-400 transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-bold text-white">
              {serviceData.title}
            </span>
          </nav>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 z-10 flex-grow flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-orange-500/30 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-orange-300">{serviceData.heroBadge}</span>
          </div>

          {/* Main Heading with Typewriter */}
          <div className="mb-6 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards] opacity-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              <TypewriterText texts={typewriterPhrases} delay={120} />
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s_forwards] opacity-0">
            {serviceData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards] opacity-0">
            <button className="group relative px-8 py-3.5 bg-gradient-to-r from-primaryto-primaryrounded-md text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
              <span className="relative z-10">{serviceData.ctaText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondaryto-primaryopacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
              Learn More
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {serviceData.stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.7)] transition-all duration-300">
                  <Counter targetValue={stat.value} />
                </div>
                <div className="text-sm text-gray-400 mt-2 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}