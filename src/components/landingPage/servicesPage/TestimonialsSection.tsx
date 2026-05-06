// components/landingPage/servicesPage/TestimonialsSection.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  rating?: number;
  featured?: boolean;
  avatarUrl?: string;
}

export function TestimonialsSection({ 
  featuredOnly = true, 
  limit = 9 
}: { 
  featuredOnly?: boolean; 
  limit?: number;
}) {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const { data: allTestimonials = [], isLoading, error } = useQuery({
    queryKey: ['testimonials', featuredOnly, limit],
    queryFn: async () => {
      const res = await apiFetch('/api/testimonials');
      if (!res.ok) {
        const text = await res.text();
        console.error('Testimonials fetch failed:', res.status, text);
        throw new Error(`Failed: ${res.status}`);
      }
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const testimonials = useMemo(() => {
    let filtered = [...allTestimonials];
    if (featuredOnly) {
      filtered = filtered.filter((t) => t.featured === true || (t as any).isActive === true);
    }
    return limit ? filtered.slice(0, limit) : filtered;
  }, [allTestimonials, featuredOnly, limit]);

  const groupedTestimonials = useMemo(() => {
    const groups = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      groups.push(testimonials.slice(i, i + 3));
    }
    return groups;
  }, [testimonials]);

  useEffect(() => {
    setCurrentGroup(0);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && groupedTestimonials.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentGroup((prev) => (prev + 1) % groupedTestimonials.length);
      }, 4800);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, groupedTestimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentGroup((prev) => (prev - 1 + groupedTestimonials.length) % groupedTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentGroup((prev) => (prev + 1) % groupedTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="scroll-mt-24 pt-20 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-1 rounded-full bg-gradient-to-b from-orange-500 to-orange-600" />
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              What Our Clients Say
            </h2>
          </div>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-slate-400">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="scroll-mt-24 pt-20 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">What Our Clients Say</h2>
          <p className="text-slate-500">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  const currentTestimonials = groupedTestimonials[currentGroup] || [];

  return (
    <section id="testimonials" className="scroll-mt-24 pt-20 pb-20 bg-slate-50 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#f97316_0.5px,transparent_1px)] bg-[length:20px_20px] opacity-30" />

      <div className=" mx-auto px-6 relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-1 rounded-full bg-gradient-to-b from-orange-500 to-orange-600" />
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 mt-2">Real stories from founders and teams we’ve helped</p>
          </div>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          {groupedTestimonials.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white border border-slate-200 shadow-xl hover:shadow-2xl hover:border-orange-200 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6 text-slate-700" />
              </button>

              <button
                onClick={handleNext}
                className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white border border-slate-200 shadow-xl hover:shadow-2xl hover:border-orange-200 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6 text-slate-700" />
              </button>
            </>
          )}

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentTestimonials.map((testimonial, idx) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl border border-slate-100 hover:border-orange-100 transition-all duration-500 flex flex-col">
                      {/* Large Quote Icon */}
                      <Quote className="h-10 w-10 text-orange-200 mb-6" />

                      <p className="text-lg leading-relaxed text-slate-700 flex-1">
                        “{testimonial.content}”
                      </p>

                      {/* Rating */}
                      {testimonial.rating && (
                        <div className="flex gap-1 mt-6 mb-6">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 transition-colors ${
                                i <= testimonial.rating!
                                  ? 'fill-orange-400 text-orange-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-xl shadow-inner">
                          {testimonial.authorName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">
                            {testimonial.authorName}
                          </p>
                          {(testimonial.authorRole || testimonial.authorCompany) && (
                            <p className="text-sm text-slate-500">
                              {[testimonial.authorRole, testimonial.authorCompany]
                                .filter(Boolean)
                                .join(' • ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          {groupedTestimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {groupedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentGroup(idx);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentGroup 
                      ? 'bg-orange-600 w-10' 
                      : 'bg-slate-300 hover:bg-slate-400 w-3'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}