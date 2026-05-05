'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrustedPartnerSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(contentRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
              invalidateOnRefresh: true
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gold/80 py-16 mb-16 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-10" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div
          ref={contentRef}
          className="text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            Your Trusted Software Development Partner
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We empower businesses with innovative software solutions for scalable growth and transformation.
          </motion.p>
        </div>
      </div>
    </section>
  );
};