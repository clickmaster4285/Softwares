import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mission Vision Section with Premium Animations
export const MissionVisionSection = () => {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && missionRef.current && visionRef.current) {
      // Premium reveal animation for both cards
      const ctx = gsap.context(() => {
        // Master timeline for coordinated animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => setHasAnimated(true)
          }
        });

        // Animate mission card
        tl.fromTo(missionRef.current,
          {
            opacity: 0,
            x: -100,
            rotateY: 30,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          }
        )
        // Animate vision card with slight delay
        .fromTo(visionRef.current,
          {
            opacity: 0,
            x: 100,
            rotateY: -30,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          },
          "-=0.8"
        );

        // Add floating particles for luxury effect
        gsap.to('.particle', {
          y: 'random(-20, 20)',
          x: 'random(-20, 20)',
          rotation: 'random(0, 360)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
      });

      return () => ctx.revert();
    }
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef} 
      className="container  py-8 mx-auto max-w-6xl px-4 mb-16 relative"
    >
      {/* Premium background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute w-1 h-1 bg-orange-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Section title with sophisticated animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
     
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mt-2"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Driving <span className="text-orange-500">Excellence</span>
        </motion.h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Mission Card - Premium Design */}
        <motion.div
          ref={missionRef}
          className="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border border-orange-500/20 p-8 overflow-hidden"
          whileHover={{
            y: -10,
       boxShadow: "0 10px 20px -10px rgba(249, 115, 22, 0.05)",
          borderColor: "#fde8d0" ,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.03) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Premium icon container */}
          <motion.div
            className="relative w-20 h-20 mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0  rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0  rounded-2xl flex items-center justify-center  group-hover:shadow-2xl transition-all duration-500">
              <span className="text-4xl transform group-hover:scale-110 transition-transform duration-500">🎯</span>
            </div>
          </motion.div>

          {/* Content with elegant hover effects */}
          <motion.h3 
            className="text-2xl font-bold text-black mb-4 relative inline-block"
            whileHover={{ x: 5 }}
          >
            Our Mission
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
            />
          </motion.h3>
          
          <motion.p 
            className="text-gray-700 leading-relaxed"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            To deliver innovative, data-driven software solutions that empower businesses to achieve sustainable growth and dominate their markets.
          </motion.p>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rotate-12 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
          </div>
        </motion.div>

        {/* Vision Card - Premium Design */}
        <motion.div
          ref={visionRef}
          className="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border border-orange-500/20 p-8 overflow-hidden"
          whileHover={{
            y: -10,
            boxShadow: "0 10px 20px -10px rgba(249, 115, 22, 0.05)",
          borderColor: "#fde8d0" ,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 80% 50%, rgba(249,115,22,0.03) 0%, transparent 50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Premium icon container */}
          <motion.div
            className="relative w-20 h-20 mb-6"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-2xl flex items-center justify-center group-hover:shadow-2xl transition-all duration-500">
              <span className="text-4xl transform group-hover:scale-110 transition-transform duration-500">🧭</span>
            </div>
          </motion.div>

          {/* Content with elegant hover effects */}
          <motion.h3 
            className="text-2xl font-bold text-black mb-4 relative inline-block"
            whileHover={{ x: 5 }}
          >
            Our Vision
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-500"
            />
          </motion.h3>
          
          <motion.p 
            className="text-gray-700 leading-relaxed"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            To become Pakistan's most trusted and innovative software development company, setting new standards of excellence and helping businesses unlock their full potential.
          </motion.p>

          {/* Decorative corner elements */}
          <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-500/5 -rotate-12 -translate-x-10 translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};