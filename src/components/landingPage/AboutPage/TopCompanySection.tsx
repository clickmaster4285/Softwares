'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TopCompanySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      const ctx = gsap.context(() => {
        // ClipPath animation - only play once
        gsap.fromTo(contentRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true, // Only play once, no reverse
              invalidateOnRefresh: true
            }
          }
        );

        // Text animation with stagger
        gsap.fromTo('.company-text',
          {
            opacity: 0,
            x: -30
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              once: true // Only play once
            }
          }
        );
      }, sectionRef);

      return () => {
        ctx.revert(); // Cleanup GSAP animations
      };
    }
  }, []);

  return (
    <section className="max-w-6xl bg-section mb-16 mx-auto">
      <motion.div
        ref={sectionRef}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12 w-full"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 35px -15px rgba(0,0,0,0.2)",
          transition: { duration: 0.2 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-6"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          Top Software Development Company in <span className="text-accent">Pakistan</span>
        </motion.h2>

        <div
          ref={contentRef}
          className="space-y-4 text-gray-700"
        >
          {[
            "Clickmasters is a top software development company in Pakistan, focused on web and mobile applications, custom software solutions, cloud integrations, and more.",
            "We are committed to helping businesses of every size harness technology to optimize operations and grow efficiently.",
            "Our skilled team provides high-quality, innovative, and outcome-driven software solutions. Choose Clickmasters for advanced, scalable development, robust applications, and full-service custom tech solutions."
          ].map((text, index) => (
            <motion.p
              key={index}
              ref={(el) => { textRefs.current[index] = el; }}
              className="company-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};