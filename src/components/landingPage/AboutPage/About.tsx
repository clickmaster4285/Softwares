'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection, StatsSection } from './Hero'
import { TrustedPartnerSection } from './TrustedPartnerSection'
import { StorySection } from './StorySection'
import { TopCompanySection } from './TopCompanySection'
import { CoreValuesSection } from './CoreValuesSection'
import { MissionVisionSection } from './MissionVisionSection'
import { WhyChooseSection } from './WhyChooseSection'
import { TeamSection } from './TeamSection'
import { ContactSection } from './ContactSection'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after a short delay to ensure all content is loaded
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.div
      ref={mainRef}
      className="min-h-screen bg-card text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }} // Reduced from 0.8
    >
      <main className="bg-gradient-to-b from-accent-50 via-accent-300/50  to-gold/80">
        <HeroSection />
        <StatsSection />

        <section className="mx-auto  max-w-6xl mt-16 grid md:grid-cols-2 gap-6">
          <StorySection />
          <TopCompanySection />
        </section>

        <TrustedPartnerSection />
        <MissionVisionSection />
        <WhyChooseSection />
        <CoreValuesSection />
        <TeamSection />
        <ContactSection />
      </main>
    </motion.div>
  );
};

export default About;