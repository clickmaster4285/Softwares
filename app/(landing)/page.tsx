'use client';

import { motion, Variants } from 'framer-motion';
import { Suspense } from 'react';

import { HeroSection } from '@/components/landingPage/home/hero-section';
import { AppsSection } from '@/components/landingPage/home/AppsSection';
import { IndustriesSection } from '@/components/landingPage/home/industries-section';
import { CommunitySection } from '@/components/landingPage/home/CommunitySection';
import { TestimonialsSection } from '@/components/landingPage/home/TestimonialsSection';
import { HelpSection } from '@/components/landingPage/home/help-section';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function LandingPage() {
  return (
    <main
      className="min-h-screen"
      role="main"
      aria-label="ClickMasters software development company homepage"
    >
      {/* Sections */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Suspense
          fallback={
            <div className="py-24">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <AppsSection />
        </Suspense>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <IndustriesSection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CommunitySection />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Suspense
          fallback={
            <div className="py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-96 bg-gradient-to-br from-gray-200 via-white to-gray-100 rounded-3xl animate-pulse shadow-xl"
                    />
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <TestimonialsSection />
        </Suspense>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <HelpSection />
      </motion.div>
    </main>
  );
}
