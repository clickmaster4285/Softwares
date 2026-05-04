// components/landingPage/servicesPage/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/testimonials');
        
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        
        const data = await res.json();
        
        // Map the API response
        let mappedData = data.map((item: any) => ({
          _id: item._id,
          authorName: item.authorName || 'Anonymous',
          content: item.content || 'No content available',
          role: item.authorRole || item.role || '',
          company: item.authorCompany || item.company || '',
          rating: item.rating || 5,
          featured: item.featured || false
        }));
        
        if (featuredOnly) {
          mappedData = mappedData.filter((t: Testimonial) => t.featured === true);
        }
        
        if (limit && mappedData.length > limit) {
          mappedData = mappedData.slice(0, limit);
        }
        
        setTestimonials(mappedData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [featuredOnly, limit]);

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
          <div className="animate-pulse">Loading testimonials...</div>
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

      <div className="relative">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-orange-50"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white border border-slate-200 shadow-lg hover:bg-orange-50"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          )}

          {/* Content */}
          <Quote className="mx-auto h-12 w-12 text-orange-200" />
          
          <p className="mt-4 text-lg italic text-slate-600 leading-relaxed max-w-3xl mx-auto">
            "{currentTestimonial.content}"
          </p>
          
          <div className="mt-6">
            <p className="font-semibold text-slate-900 text-lg">
              {currentTestimonial.authorName}
            </p>
            {(currentTestimonial.role || currentTestimonial.company) && (
              <p className="text-sm text-slate-500 mt-1">
                {[currentTestimonial.role, currentTestimonial.company]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
          </div>
          
          <div className="mt-3 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star 
                key={i}
                className={`h-4 w-4 ${
                  i <= (currentTestimonial.rating || 5) 
                    ? 'fill-orange-400 text-orange-400' 
                    : 'text-slate-300'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}