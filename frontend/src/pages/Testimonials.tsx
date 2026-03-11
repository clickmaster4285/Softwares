// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/landingPage/navbar";
import { Footer } from "@/components/landingPage/Footer";
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
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';



// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

interface AnimatedCounterProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
  gradient?: string;
}

// Animated Counter Component with Glow Effect
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  label, 
  suffix = '', 
  delay = 0, 
  gradient = 'from-orange-400 to-orange-500' 
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
      {/* Glow effect on hover and pulse */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={isInView ? {
          scale: [1, 1.2, 1],
          opacity: [0, 0.2, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />

      <div className="relative">
        <motion.div
          className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
          animate={isInView ? {
            scale: [1, 1.05, 1],
          } : {}}
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
    'from-orange-400 to-orange-500',
    'from-amber-400 to-orange-500',
    'from-orange-500 to-amber-500',
    'from-amber-500 to-orange-400',
    'from-orange-400 to-amber-500',
    'from-amber-400 to-orange-400',
  ];

  const gradient = gradients[index % gradients.length];

  useEffect(() => {
    // GSAP animation for card entrance
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
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
      {/* Animated background gradient */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 3, repeat: isActive ? Infinity : 0 }}
      />

      {/* Main card */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden h-full">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full`} />
        </div>

        <Quote className={`absolute bottom-6 right-6 w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r ${gradient} opacity-10`} />

        {/* Company badge */}
        <div className="flex items-center justify-between mb-6">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary bg-opacity-10`}>
            <Award className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-semibold text-white">
              Verified Client
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star
                  className={`w-4 h-4 ${i < (testimonial.rating ?? 5)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                    }`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial content with quote mark */}
        <div className="relative mb-8">
          <Quote className={`absolute -top-2 -left-2 w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r ${gradient} opacity-30`} />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 line-clamp-4">
            "{testimonial.content}"
          </p>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`absolute inset-0 bg-foreground/30 rounded-full blur-md opacity-50`} />
            <Avatar className="relative w-16 h-16 border-2 border-white dark:border-gray-800 shadow-lg">
              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.authorName} />
              <AvatarFallback className={`bg-foreground/30 text-white font-semibold`}>
                {testimonial.authorName.slice(0, 2).toUpperCase()}
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
                  <span className={`font-medium text-primary`}>
                    {testimonial.authorCompany}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Stats indicator */}
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

const Testimonials: React.FC = () => {
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

  // Check if we have enough slides for loop mode
  useEffect(() => {
    if (testimonials.length > 0) {
      // For coverflow effect with slidesPerView=3, we need at least 6 slides for loop to work properly
      setHasEnoughSlides(testimonials.length >= 6);
    }
  }, [testimonials]);

  // GSAP animation for section entrance
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
        },
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && swiperRef && testimonials.length > 0) {
      interval = setInterval(() => {
        swiperRef.slideNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, swiperRef, testimonials.length]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-4 pb-20">
        <section ref={sectionRef} className="py-20 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-700" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
            {/* Header with floating elements */}
            <motion.div
              className="text-center max-w-3xl mx-auto mb-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
             

              <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-bold text-foreground mb-4">
                What our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Clients Says</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Feedback from businesses who chose our software development company for custom software, web apps, and mobile apps.
              </p>
            </motion.div>

            {/* Stats Section with Glow Effects */}
            {!isLoading && testimonials.length > 0 && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 py-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedCounter value="5000" label="Happy Clients" suffix="+" delay={0.1} gradient="from-orange-400 to-orange-500" />
                <AnimatedCounter value="98" label="Satisfaction Rate" suffix="%" delay={0.2} gradient="from-amber-400 to-orange-500" />
                <AnimatedCounter value="50" label="Industry Awards" suffix="+" delay={0.3} gradient="from-orange-500 to-amber-500" />
                <AnimatedCounter value="24" label="Support Team" suffix="/7" delay={0.4} gradient="from-amber-500 to-orange-400" />
              </motion.div>
            )}

            {/* Testimonials Content */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="rounded-xl border-border/60">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 bg-muted rounded animate-pulse mb-4" />
                      <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse mb-4" />
                      <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : testimonials.length === 0 ? (
              <motion.div
                className="text-center py-16 rounded-2xl border border-border/60 bg-card/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Quote className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">No testimonials yet</h2>
                <p className="text-muted-foreground">Check back later for client stories.</p>
              </motion.div>
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
                  loop={hasEnoughSlides} // Only enable loop if we have enough slides
                  navigation={{
                    prevEl: '.testimonial-prev',
                    nextEl: '.testimonial-next',
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  autoplay={isAutoPlaying ? {
                    delay: 5000,
                    disableOnInteraction: false,
                  } : false}
                  onSwiper={setSwiperRef}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: testimonials.length >= 2 ? 2 : 1,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: testimonials.length >= 3 ? 3 : testimonials.length,
                      spaceBetween: 40,
                    },
                  }}
                  className="pb-14"
                >
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={testimonial._id}>
                      <TestimonialCard
                        testimonial={testimonial}
                        index={index}
                        isActive={index === activeIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation with Glow Effects - Only show if we have more than 1 slide */}
                {testimonials.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      className="testimonial-prev w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setIsAutoPlaying(false)}
                      disabled={testimonials.length <= 1}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-xl hover:shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 hover:shadow-orange-500/25"
                    >
                      {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>

                    <button
                      className="testimonial-next w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setIsAutoPlaying(false)}
                      disabled={testimonials.length <= 1}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;