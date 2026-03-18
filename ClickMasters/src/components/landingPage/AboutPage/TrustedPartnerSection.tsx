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
          once: true // This makes it run only once
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
          scale: 1.05,
          boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }} // This makes it run only once
          transition={{ duration: 0.5 }}
        >
          Our <span className="text-orange-500">Story</span>
        </motion.h2>
        
        <motion.div
          className="space-y-4 text-gray-700 mb-3"
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
          viewport={{ once: true }} // This makes it run only once
        >
          {[
            "Founded with a vision to transform the digital landscape of Pakistan, Clickmasters has grown from a small startup to one of the most trusted digital marketing agencies in the country.",
            "Over the years, we've helped thousands of businesses across Pakistan - from startups to established enterprises - achieve their digital marketing goals.",
            "Today, we stand proud as one of the most recognized and trusted industry leaders in digital marketing across Pakistan, having earned the confidence of countless businesses through consistent results and innovation."
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
          once: true // This makes it run only once
        }
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 mb-16 overflow-hidden relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black to-gray-900"
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
          viewport={{ once: true }} // This makes it run only once
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Your Trusted Software Development Partner
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }} // This makes it run only once
            transition={{ delay: 0.3 }}
          > We empower businesses with innovative software solutions for scalable growth and transformation.
            
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};