'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      }, sectionRef);

      return () => {
        ctx.revert(); // Cleanup GSAP animations
      };
    }
  }, []);

  return (
    <section className="mx-auto max-w-6xl mb-16">
      <motion.div
        ref={sectionRef}
        className="bg-section rounded-2xl border border-gray-200 p-8 md:p-12 w-full"
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
          Our <span className="text-accent">Story</span>
        </motion.h2>

        <div
          ref={contentRef}
          className="space-y-4 text-gray-700"
        >
          {[
            "What began as a small team of passionate coders has evolved into Clickmasters, a full-service software development company delivering cutting-edge solutions designed to meet our clients' unique challenges.",
            "Over time, we've collaborated with organizations across sectors, from nimble startups to large enterprises, transforming concepts into scalable web, mobile, and cloud applications that address real-world needs.",
            "Today, Clickmasters is known as a reliable partner in software innovation. From streamlining processes to building complex enterprise systems, we create solutions that drive growth and enhance efficiency."
          ].map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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