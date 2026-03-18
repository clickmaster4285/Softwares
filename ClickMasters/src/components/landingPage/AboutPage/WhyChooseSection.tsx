import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Why Choose Section with Slide-up Cards
export const WhyChooseSection = () => {
 const reasons = [
  {
    icon: '🤝',
    title: 'Your Dedicated Partner',
    description: 'At ClickMasters, we’re not just another company – we’re your dedicated partner in building solutions that grow your business.'
  },
  {
    icon: '🎯',
    title: 'Full Range of Services',
    description: 'We provide a complete suite of software development services, from web and mobile apps to custom enterprise solutions.'
  },
  {
    icon: '⭐',
    title: 'Trusted by Brands',
    description: 'We’re proud to be recognized as a leading software development company delivering innovative solutions worldwide.'
  }
];

  return (
    <section className="container mx-auto max-w-6xl px-4 mt-16 mb-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-black text-center mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Why Choose <span className="text-orange-500">Clickmasters</span>
      </motion.h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl border border-orange-500/10 p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              scale: 1.08, // Increased from 1.05 to 1.08 for more noticeable size increase
              boxShadow: "0 25px 35px -15px rgba(249, 115, 22, 0.3)",
              borderColor: "#f97316",
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background that moves on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl">{reason.icon}</span>
            </motion.div>
            <h3 className="text-xl font-semibold text-black mb-4 relative z-10">{reason.title}</h3>
            <p className="text-gray-700 relative z-10">{reason.description}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Customized Strategies Section with BLACK background and ROCKET icon behind */}
      <motion.div
        className="mt-8 rounded-xl p-8 relative overflow-hidden group bg-black"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Rocket Icon Behind Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-9xl">🚀</span>
        </motion.div>

        {/* Animated light sweep */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <h3 className="text-xl font-semibold mb-4 relative z-10 text-white">
  Tailored Software Solutions for Every Business
</h3>
<p className="relative z-10 text-gray-300">
  At Clickmasters, we understand that each business has unique requirements. As a leading software development company, we create custom solutions that help your business thrive.
</p>
      </motion.div>
    </section>
  );
};