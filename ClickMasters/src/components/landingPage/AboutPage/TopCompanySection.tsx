'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


// Top Company Section with Floating Animation
export const TopCompanySection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  
  useEffect(() => {
    // ClipPath animation like StorySection
    gsap.fromTo(sectionRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text animation
    gsap.fromTo('.company-text',
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={cardsRef} className="max-w-6xl mb-16 mx-auto">
      <motion.div
        ref={sectionRef}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12 w-full"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 30px 40px -20px rgba(0,0,0,0.3)",
          transition: { duration: 0.3 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-6"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Top Software Development Company in <span className="text-orange-500">Pakistan</span>
        </motion.h2>
        
        <motion.div
          className="space-y-4 text-gray-700"
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
          viewport={{ once: true }}
        >
       {[
  "Clickmasters is a top software development company in Pakistan, focused on web and mobile applications, custom software solutions, cloud integrations, and more.",
  "We are committed to helping businesses of every size harness technology to optimize operations and grow efficiently.",
  "Our skilled team provides high-quality, innovative, and outcome-driven software solutions. Choose Clickmasters for advanced, scalable development, robust applications, and full-service custom tech solutions."
].map((text, index) => (
            <motion.p
              key={index}
              className="company-text"
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