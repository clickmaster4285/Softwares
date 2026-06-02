'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";
import type { CountryData } from "@/lib/country";
import AnimatedPins from './WorldMapHero'; // We'll create this component

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  country?: CountryData;
  location?: string; 
}

// Hero Section - Full Screen (100vh) with Background Image + Pins
export const HeroSection: React.FC<HeroSectionProps> = ({ country, location }) => {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true });
  
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);

  const phrases: string[] = [
    'Building the Future, One Line at a Time',
    'Innovating Through Code',
    'Your Technology Partners',
    'Turning Ideas into Software',
    'Where Innovation Meets Excellence',
    'Crafting Scalable Solutions',
    'Engineering Your Vision',
    'Code that Powers Your Business',
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <motion.section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/locationImg.webp")',
          }}
        />
      </div>

      {/* Animated Pins Overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <AnimatedPins />
      </div>

      {/* Content - Dark Text for Light Theme */}
      <motion.div
        className="container mx-auto max-w-6xl px-4 relative z-10"
        initial={{ y: 50 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div className="text-center bg-white/80 backdrop-blur-sm py-8 px-4 rounded-2xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {country?.heroHeadline || "Empowering Digital Innovation"}
          </motion.h1>

          <motion.p
            className="text-gray-700 mt-4 text-md md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {country?.heroSubheadline || "Transform your business with cutting-edge technology solutions"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/contact-us?location=${location}`}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 inline-block text-center"
            >
              Get Free Consultation
            </Link>

            <Link
              href={`/contact-us?location=${location}`}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 inline-block text-center"
            >
              Discuss Your Project
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};