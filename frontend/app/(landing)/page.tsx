'use client';

import { motion, Variants } from "framer-motion";

import { HeroSection } from "@/components/landingPage/hero-section";
import { AppsSection } from "@/components/landingPage/AppsSection";
import { IndustriesSection } from "@/components/landingPage/industries-section";
import { CommunitySection } from "@/components/landingPage/CommunitySection";
import { HelpSection } from "@/components/landingPage/help-section";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function LandingPage() {
  return (
    <main 
      className="min-h-screen"
      role="main"
      aria-label="ClickMasters software development company homepage"
    >
      {/* Remove the parent motion.main and let each section animate independently on scroll */}
      
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
        <AppsSection />
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
        <HelpSection />
      </motion.div>
    </main>
  );
}