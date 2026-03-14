"use client";

import { motion, Variants } from "framer-motion";
import { HeroSection } from "@/src/components/landingPage/hero-section";
import { AppsSection } from "@/src/components/landingPage/AppsSection";
import { IndustriesSection } from "@/src/components/landingPage/industries-section";
import { CommunitySection } from "@/src/components/landingPage/CommunitySection";
import { HelpSection } from "@/src/components/landingPage/help-section";

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function LandingPage() {
  return (
    <motion.div
      className="flex flex-col"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <HeroSection />
      <AppsSection />
      <IndustriesSection />
      <CommunitySection />
      <HelpSection />
    </motion.div>
  );
}