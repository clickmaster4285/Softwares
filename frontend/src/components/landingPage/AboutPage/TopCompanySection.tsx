import React, { useRef, useEffect,useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


// Top Company Section with Floating Animation
export const TopCompanySection = () => {
  const cardsRef = useRef(null);
  
  useEffect(() => {
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
    <section ref={cardsRef} className="container mx-auto max-w-6xl px-4 mb-16">
      <motion.div
        className="bg-black rounded-2xl p-8 md:p-12 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Top Digital Marketing Company in <span className="text-orange-500">Pakistan</span>
        </motion.h2>
        
        <div className="space-y-4 text-gray-300 relative z-10">
          <motion.p
            className="company-text"
            whileHover={{ x: 10, color: "#fff" }}
          >
            Clickmasters is the top digital marketing agency in Pakistan specializing in SEO, PPC, Social Media Marketing, Web Design, Content Creation, and more.
          </motion.p>
          <motion.p
            className="company-text"
            whileHover={{ x: 10, color: "#fff" }}
          >
            As one of Pakistan's best digital marketing agencies, we are committed to supporting businesses in improving their online presence and driving growth.
          </motion.p>
          <motion.p
            className="company-text"
            whileHover={{ x: 10, color: "#fff" }}
          >
            Our expert team delivers effective, results-driven solutions. Choose Clickmasters for innovative strategies and comprehensive digital marketing services.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
