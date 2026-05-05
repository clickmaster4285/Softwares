"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroSection } from "./HeroSection";
import { MainContent } from "./MainContent";
import { TechStackSection } from "./TechStackSection";
import { CTASection } from "./CTASection";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Expensive-looking parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-section text-gray-900 overflow-hidden relative"
    >
      {/* Decorative Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 -left-20 w-64 h-64 bg-accent-100/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 -right-20 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <MainContent />
        </motion.div>

        <TechStackSection visible={true} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <CTASection />
        </motion.div>
      </motion.div>

      {/* Keyframe for ping rings */}
      <style>{`
        @keyframes ping {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          70%  { transform: translate(-50%,-50%) scale(1.3); opacity: 0.1; }
          100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;