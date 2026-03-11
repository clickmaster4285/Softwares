import React, { useRef, useEffect,useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/landingPage/navbar';
import { Footer } from '@/components/landingPage/Footer';

import {HeroSection , StatsSection} from '@/components/landingPage/AboutPage/Hero'
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


export const TrustedPartnerSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="bg-orange-500 py-16 mb-16 overflow-hidden relative"
      whileInView={{ backgroundColor: "#f97316" }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ opacity: 0.1 }}
      />
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Your Trusted Digital Partner
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We empower businesses with Advanced Digital Marketing Solutions for sustained growth and success.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};