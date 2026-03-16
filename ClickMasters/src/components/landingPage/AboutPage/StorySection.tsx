'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { HeroSection, StatsSection } from '@/components/landingPage/AboutPage/Hero'
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


export const StorySection = () => {
  const storyRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(storyRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section className="mx-auto max-w-6xl mb-16">
      <motion.div
        ref={storyRef}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12 w-full"
        whileHover={{ 
          scale: 1.05, // Increases size by 5% on hover
          boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)",
          transition: { duration: 0.3 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-orange-500">Story</span>
        </motion.h2>
        
        <motion.div
          className="space-y-4 text-gray-700 "
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
          initial="hidden"
          whileInView="show"
        >
       {[
  "What started as a small group of passionate developers has grown into Clickmasters, a full-service software development company delivering innovative solutions tailored to our client's needs.",
  "Over the years, we've partnered with businesses across industries from agile startups to established enterprises, turning ideas into scalable web, mobile, and cloud applications that solve real-world problems.",
  "Today, Clickmasters is recognized as a trusted partner in software innovation. From automating workflows to developing complex enterprise platforms, we engineer solutions that accelerate growth, boost efficiency, and empower digital transformation."
].map((text, index) => (
            <motion.p
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};