'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Types
interface ValueItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface CoreValueCardProps {
  value: ValueItem;
  index: number;
}

export const CoreValuesSection = () => {
  const values: ValueItem[] = [
    { 
      icon: '🏆', 
      title: 'Excellence', 
      description: 'We pursue excellence in everything we do, constantly raising the bar.',
      features: [
        'Continuous Improvement',
        'Quality First Approach',
        'Best Practices Implementation',
        'Performance Optimization'
      ]
    },
    { 
      icon: '🤝', 
      title: 'Integrity', 
      description: 'We believe in honest, transparent communication and ethical business practices.',
      features: [
        'Transparent Communication',
        'Ethical Decision Making',
        'Client-First Mindset',
        'Honest Feedback Culture'
      ]
    },
    { 
      icon: '💡', 
      title: 'Innovation', 
      description: 'We embrace change and continuously innovate to deliver cutting-edge solutions.',
      features: [
        'Creative Problem Solving',
        'Latest Technology Adoption',
        'R&D Investment',
        'Forward Thinking'
      ]
    },
    { 
      icon: '📈', 
      title: 'Results', 
      description: 'We are obsessed with delivering measurable results that drive real business growth.',
      features: [
        'Data-Driven Decisions',
        'ROI Focused',
        'Performance Tracking',
        'Goal Achievement'
      ]
    }
  ];

  return (
    <section className="bg-gray-50 py-24 relative overflow-hidden">
      {/* Background Pattern - matching Features component */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Section Header - matching Features component */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">The Principles That </span>
            <span className="bg-primary bg-clip-text text-transparent">
              Drive Us Forward
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These core values shape our culture, guide our decisions, and define how we work with our clients and each other.
          </p>
        </motion.div>
        
        {/* Values Grid - matching FeatureCard design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => (
            <CoreValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Core Value Card Component - styled exactly like FeatureCard
const CoreValueCard = ({ value, index }: CoreValueCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary transition-all duration-300 h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl">
        {/* Icon */}
        <motion.div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform duration-300"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            delay: index * 0.2
          }}
        >
          {value.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{value.description}</p>

        {/* Features List - appears on hover (exactly like FeatureCard) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white p-6 rounded-2xl border-2 border-primary/50 z-10 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title} - Key Traits</h3>
              <div className="space-y-2">
                {value.features.map((feature: string, idx: number) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-primary text-sm">•</span>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-3 right-3 text-xs text-primary/50">
                {value.features.length} traits
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <motion.div
          className="text-xs text-gray-400 mt-2"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Hover to explore
        </motion.div>
      </div>
    </motion.div>
  );
};