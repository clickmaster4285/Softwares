'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";
import type { CountryData } from "@/lib/country";
import AnimatedPins from './AnimatedPins';

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
      className="relative h-screen flex items-center overflow-hidden"
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

      {/* Content - Left Aligned with Max Width 1600px */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div
          className="flex justify-start"
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glass Card - No white background, just blur with text visibility */}
          <motion.div className="max-w-4xl text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {country?.heroHeadline || "Empowering Digital Innovation"}
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-white/95 text-base md:text-xl leading-relaxed drop-shadow-md">
                {country?.heroSubheadline ||
                  "Transform your business with cutting-edge technology solutions."}
              </p>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                Empowering businesses with innovative software, web, and digital
                transformation solutions tailored for growth and success.
              </p>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                Our team combines technology, creativity, and strategy to deliver
                scalable solutions that drive measurable results.
              </p>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                From startups to enterprises, we help organizations streamline
                operations, enhance customer experiences, and stay ahead of the
                competition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Link
                href={`/contact-us?location=${location}`}
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 inline-block text-center shadow-lg"
              >
                Get Free Consultation
              </Link>

              <Link
                href={`/contact-us?location=${location}`}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 inline-block text-center border border-white/30 shadow-lg"
              >
                Discuss Your Project
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};