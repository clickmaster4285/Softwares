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
    <motion.main 
      className="min-h-screen"
      role="main"
      aria-label="ClickMasters software development company homepage"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
    >
    

      {/* Rest of the sections with their animations */}
      <motion.div variants={scaleIn} viewport={{ once: true, margin: "-100px" }}>
        <HeroSection />
      </motion.div>

      <motion.div variants={fadeInUp} viewport={{ once: true, margin: "-100px" }}>
        <AppsSection />
      </motion.div>

      <motion.div variants={fadeIn} viewport={{ once: true, margin: "-100px" }}>
        <IndustriesSection />
      </motion.div>

      <motion.div variants={fadeInUp} viewport={{ once: true, margin: "-100px" }}>
        <CommunitySection />
      </motion.div>

      <motion.div variants={fadeInUp} viewport={{ once: true, margin: "-100px" }}>
        <HelpSection />
      </motion.div>

     
    </motion.main>
  );
}