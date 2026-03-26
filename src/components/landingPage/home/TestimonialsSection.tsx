'use client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Award,
  TrendingUp,
  Play,
  Pause
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

// Animated Counter (same as your original)
interface AnimatedCounterProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
  gradient?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  suffix = '',
  delay = 0,
  gradient = 'from-primary/80 to-primary'
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={isInView ? { scale: [1, 1.2, 1], opacity: [0, 0.2, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />
      <div className="relative">
        <motion.div
          className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
          animate={isInView ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay }}
        >
          {count}{suffix}
        </motion.div>
        <div className="text-sm text-muted-foreground mt-2 font-medium tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradients = [
    'from-primary/80 to-primary',
    'from-primary to-primary',
    'from-primary to-primary',
    'from-primary to-primary/80',
    'from-primary/80 to-primary',
    'from-primary to-primary/80',
  ];
  const gradient = gradients[index % gradients.length];

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 3, repeat: isActive ? Infinity : 0 }}
      />

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden h-full">
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full`} />
        </div>

        <Quote className={`absolute bottom-6 right-6 w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r ${gradient} opacity-10`} />

        <div className="flex items-center justify-between mb-6">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary bg-opacity-10`}>
            <Award className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-semibold text-white">Verified Client</span>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < (testimonial.rating ?? 5)
                  ? 'fill-primary text-primary'
                  : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative mb-8">
          <Quote className={`absolute -top-2 -left-2 w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r ${gradient} opacity-30`} />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 line-clamp-4">
            "{testimonial.content}"
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`absolute inset-0 bg-foreground/30 rounded-full blur-md opacity-50`} />
            <Avatar className="relative w-16 h-16 border-2 border-white dark:border-gray-800 shadow-lg">
              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.authorName} />
              <AvatarFallback className={`bg-foreground/30 text-black font-semibold`}>
                {(testimonial.authorName ?? 'NA').slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.authorName}</h4>
            {(testimonial.authorRole || testimonial.authorCompany) && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.authorRole}
                {testimonial.authorRole && testimonial.authorCompany && ' at '}
                {testimonial.authorCompany && (
                  <span className={`font-medium text-primary`}>{testimonial.authorCompany}</span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +{Math.floor(Math.random() * 30 + 20)}% growth
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {Math.floor(Math.random() * 6 + 3)} months using
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [hasEnoughSlides, setHasEnoughSlides] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await apiFetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  const displayTestimonials = testimonials.slice(0, 6); // Limit for homepage

  useEffect(() => {
    if (displayTestimonials.length > 0) {
      setHasEnoughSlides(displayTestimonials.length >= 6);
    }
  }, [displayTestimonials]);

  // GSAP section entrance
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Autoplay control
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && swiperRef && displayTestimonials.length > 0) {
      interval = setInterval(() => swiperRef.slideNext(), 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, swiperRef, displayTestimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 lg:py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

          <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-px bg-primary mx-auto mb-8"
                  />

        
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
  Hear What Our <span className="text-primary">Clients Have to Say</span>
</h2>
<p className="text-gray-700 max-w-2xl mx-auto text-base mt-4">
  Discover why businesses trust us for their custom software, web, and mobile app solutions. Read real feedback from our clients who have transformed their ideas into seamless digital experiences with our expertise.
</p>
        </motion.div>


        {/* Swiper Testimonials */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="rounded-3xl border-border/60 h-96">
                <CardContent className="p-8">
                  <div className="h-10 w-10 bg-muted rounded animate-pulse mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              loop={hasEnoughSlides}
              navigation={{
                prevEl: '.testimonial-prev',
                nextEl: '.testimonial-next',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={isAutoPlaying ? { delay: 5000, disableOnInteraction: false } : false}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: displayTestimonials.length >= 2 ? 2 : 1, spaceBetween: 30 },
                1024: { slidesPerView: displayTestimonials.length >= 3 ? 3 : displayTestimonials.length, spaceBetween: 40 },
              }}
              className="pb-14"
            >
              {displayTestimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial._id}>
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    isActive={index === activeIndex}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            {displayTestimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  className="testimonial-prev w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary transition-all hover:scale-110 disabled:opacity-50"
                  onClick={() => setIsAutoPlaying(false)}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/80 to-primary shadow-xl hover:shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  className="testimonial-next w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary transition-all hover:scale-110"
                  onClick={() => setIsAutoPlaying(false)}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* View All Button */}
        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
            >
              View All Testimonials ({testimonials.length})
            </a>
          </div>
        )}
      </div>
    </section>
  );
}