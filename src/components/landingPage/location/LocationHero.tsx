'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from "next/link";
import type { CountryData } from "@/lib/country";
import AnimatedPins from '../../ui/AnimatedPins';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  country?: CountryData;
  location?: string; 
}

// Hero Section - Full Screen (100vh) with Split Screen + Collision Effect
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
      {/* Background Color */}
      <div className="absolute inset-0 z-0 bg-bg-[#f5fbfb]" />

       {/* Background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#a7f3d0] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#fdba74] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-32 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[#93c5fd] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] left-1/4 h-[480px] w-[480px] rounded-full bg-[#a7f3d0] opacity-20 blur-3xl" />

      {/* Split Screen Content */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT SIDE - Text Content */}
          <motion.div 
            className="lg:w-1/2 w-full text-left z-20"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-primary mb-6 drop-shadow-lg"
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
              <p className=" text-black text-xl leading-relaxed text-justify">
                {country?.heroSubheadline ||
                  "Transform your business with cutting-edge technology solutions."} {" "}
                 Empowering businesses with innovative software, web, and digital transformation solutions tailored for growth and success. Our team combines technology, creativity, and strategy to deliver scalable solutions that drive measurable results.  From startups to enterprises, we help organizations streamline operations, enhance customer experiences, and stay ahead of the competition. We leverage the latest technologies including AI, cloud computing, and responsive design to future-proof your business. Partner with us to unlock new opportunities, reduce operational costs, and accelerate your digital journey with confidence.
              </p>
            </motion.div>


            {/* Fixed Clutch link - replaced anchor with Link for internal or added proper external link handling */}
            <Link 
              href="https://clutch.co/profile/clickmasters-digital-marketing-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-lg border border-white/60 bg-white/40 px-4 py-2.5 backdrop-blur-sm transition hover:bg-white/30 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col leading-tight">
                  <span className="text-md font-semibold uppercase tracking-widest text-gray-800">
                    Reviewed on
                  </span>
                  <div className="flex items-center gap-1.5">
                   <Image
              src="/partners/clutch.png"
              alt="Clutch"
              width={90}
              height={60}
              className="w-auto h-12 object-contain"
            />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5 fill-red-500" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium uppercase tracking-wider text-gray-800">
                        8 Reviews
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            

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
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 inline-block text-center border border-gray-300 shadow-lg"
              >
                Discuss Your Project
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Image with Pins INSIDE the image */}
          <motion.div 
            className="lg:w-1/2 w-full flex justify-center items-center relative"
            initial={{ x: 100, opacity: 0, rotate: 5 }}
            animate={isInView ? { x: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {/* Collision Shadow Effect */}
            <motion.div
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 blur-2xl rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* Main Animated Image Container with Collision Effect */}
            <motion.div
              className="relative"
              animate={{
                x: [0, -5, 5, -3, 3, 0], // Bounce/collision effect
                y: [0, -3, 3, -2, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/locationImg.webp"
                  alt="Digital Innovation"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl"
                />
                
                {/* PINS ONLY ON THE RIGHT SIDE IMAGE */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                  <AnimatedPins />
                </div>
                
                {/* Overlay Gradient for better blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl pointer-events-none" />
              </motion.div>

              {/* Collision Particle Effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (i + 1) * 20 * (i % 2 === 0 ? 1 : -1)],
                    y: [0, (i + 1) * 15],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{
                    top: `${30 + i * 20}%`,
                    right: `${10 + i * 5}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Decorative Collision Rings */}
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-2xl pointer-events-none"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </div>

   
    </motion.section>
  );
};