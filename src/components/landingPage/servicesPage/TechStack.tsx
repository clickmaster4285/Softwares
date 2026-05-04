// components/landingPage/servicesPage/TechStack.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface TechItem {
  name: string;
  icon: string;
}

interface Subcategory {
  name?: string;
  items: TechItem[];
}

interface TechStackCategory {
  category: string;
  subcategories: Subcategory[];
}

interface TechStackProps {
  techStack: TechStackCategory[];
}

export const TechStack = ({ techStack }: TechStackProps) => {
  if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
    return null;
  }

  // State for each category's current slide index
  const [currentSlides, setCurrentSlides] = useState<{ [key: string]: number }>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState<{ [key: string]: boolean }>({});

  // Group all items by category
  const categoryItems = techStack.map(stack => ({
    category: stack.category,
    items: stack.subcategories.flatMap(sub => sub.items)
  }));

  // Initialize states
  useEffect(() => {
    const initialSlides: { [key: string]: number } = {};
    const initialAutoPlay: { [key: string]: boolean } = {};
    categoryItems.forEach(({ category }) => {
      initialSlides[category] = 0;
      initialAutoPlay[category] = true;
    });
    setCurrentSlides(initialSlides);
    setIsAutoPlaying(initialAutoPlay);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    categoryItems.forEach(({ category, items }) => {
      if (isAutoPlaying[category] && items.length > 1) {
        const interval = setInterval(() => {
          setCurrentSlides(prev => ({
            ...prev,
            [category]: (prev[category] + 1) % items.length
          }));
        }, 3000); // Slide every 3 seconds
        
        intervals.push(interval);
      }
    });
    
    return () => intervals.forEach(clearInterval);
  }, [isAutoPlaying, categoryItems]);

  const goToSlide = (category: string, index: number) => {
    setCurrentSlides(prev => ({ ...prev, [category]: index }));
    // Pause auto-play temporarily when manually navigating
    setIsAutoPlaying(prev => ({ ...prev, [category]: false }));
    // Resume after 5 seconds
    setTimeout(() => {
      setIsAutoPlaying(prev => ({ ...prev, [category]: true }));
    }, 5000);
  };

  const nextSlide = (category: string, totalItems: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: (prev[category] + 1) % totalItems
    }));
  };

  const prevSlide = (category: string, totalItems: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [category]: (prev[category] - 1 + totalItems) % totalItems
    }));
  };

  return (
    <motion.section 
      id="tech-stack" 
      className="scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-10 w-1 rounded-full bg-orange-500"
        />
        <motion.h2 
          className="text-2xl font-semibold text-slate-900 sm:text-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technology Stack
        </motion.h2>
      </div>

      <motion.p 
        className="mt-4 text-lg text-slate-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Modern tools we use to build scalable, secure applications.
      </motion.p>

      {/* Auto-sliding Carousels for each category */}
      <div className="mt-10 space-y-16">
        {categoryItems.map(({ category, items }, stackIndex) => (
          <motion.div
            key={category}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: stackIndex * 0.1 }}
          >
            {/* Category Header */}
            <div className="mb-6 flex items-center justify-between">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-slate-800 border-l-4 border-orange-500 pl-3">
                  {category}
                </h3>
              </motion.div>

              {/* Auto-play indicator */}
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isAutoPlaying[category] ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-xs text-slate-400">
                  {isAutoPlaying[category] ? 'Auto-sliding' : 'Paused'}
                </span>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Left Navigation Button */}
              {items.length > 1 && (
                <button
                  onClick={() => prevSlide(category, items.length)}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 rounded-full bg-white border border-slate-200 p-2 text-slate-600 shadow-lg transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 md:-translate-x-6"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Main Slider */}
              <div className="overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlides[category]}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex justify-center"
                  >
                    <div className="w-full max-w-md">
                      <div className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10">
                        {/* Icon with Animation */}
                        <motion.div
                          className="mb-4 flex justify-center"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md scale-0 group-hover:scale-150 transition-transform duration-500" />
                            <Image
                              src={items[currentSlides[category]]?.icon || ''}
                              alt={items[currentSlides[category]]?.name || ''}
                              width={80}
                              height={80}
                              className="h-20 w-20 object-contain relative z-10"
                            />
                          </div>
                        </motion.div>
                        
                        {/* Tech Name */}
                        <h4 className="text-xl font-semibold text-slate-800">
                          {items[currentSlides[category]]?.name}
                        </h4>
                        
                        {/* Description placeholder */}
                        <p className="mt-2 text-sm text-slate-500">
                          {category} technology
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Navigation Button */}
              {items.length > 1 && (
                <button
                  onClick={() => nextSlide(category, items.length)}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white border border-slate-200 p-2 text-slate-600 shadow-lg transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 md:translate-x-6"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dot Indicators */}
            {items.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(category, idx)}
                    className={`rounded-full transition-all duration-300 ${
                      currentSlides[category] === idx
                        ? 'w-8 bg-orange-500 h-2'
                        : 'w-2 h-2 bg-slate-300 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Items Counter */}
            <div className="mt-3 text-center text-xs text-slate-400">
              {currentSlides[category] + 1} / {items.length}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};