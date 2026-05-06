// components/landingPage/servicesPage/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface Testimonial {
  _id: string;
  authorName: string;
  content: string;
  role?: string;
  company?: string;
  rating?: number;
  featured?: boolean;
}

export function TestimonialsSection({ featuredOnly = true, limit = 10 }) {
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

const { data: testimonials = [] } = useQuery({
  queryKey: ['testimonials-count'],
  queryFn: async () => {
    const res = await apiFetch('/api/testimonials');
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },
});

  console.log("testimonials", testimonials)
  

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="scroll-mt-24 pt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-1 rounded-full bg-orange-500" />
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            What Founders Say
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div>Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="scroll-mt-24 pt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-1 rounded-full bg-orange-500" />
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            What Founders Say
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <Quote className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="scroll-mt-24 pt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-1 rounded-full bg-orange-500" />
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          What Founders Say
        </h2>
      </div>

     <section>
      
     </section>
    </section>
  );
}