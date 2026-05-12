'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Mail, User, Phone, Send, CheckCircle2, DollarSign } from 'lucide-react';
import { NeonOrbs } from '@/components/ui/neon-orbs';

interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

interface StatItem {
  end: number;
  label: string;
}

const heroBullets: string[] = [
  'MVP to full-scale SaaS development',
  'Native, cross-platform & enterprise mobile apps',
  'AI & automation systems',
  'ERP, CRM, and enterprise solutions',
  'Built for scalability, performance & ROI',
];

function useInViewOnce(ref: React.RefObject<Element | null>, threshold = 0.15): boolean {
  const [visible, setVisible] = useState(false);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          done.current = true;
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '40px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return visible;
}

const Counter = ({ end, duration = 2, delay = 0 }: CounterProps): JSX.Element => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInViewOnce(ref, 0.2);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(startValue + end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeoutId = window.setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}+</span>;
};

const stats: StatItem[] = [
  { end: 1860, label: 'Projects Delivered' },
  { end: 3500, label: 'Happy Clients' },
  { end: 75, label: 'Awards Won' },
  { end: 5, label: 'Years Experience' },
];

// Simple Typewriter Component
const Typewriter = ({ texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1500 }: { texts: string[], typingSpeed?: number, deletingSpeed?: number, pauseTime?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timer);
    }

    const currentText = texts[currentIndex];
    
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === currentText.length) {
        setIsWaiting(true);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => currentText.slice(0, prev.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isWaiting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="relative inline-block min-w-[280px] text-center text-orange-400 font-medium sm:min-w-[340px] md:min-w-[400px]">
      {displayText}
      <span className="absolute -right-3 top-1/2 h-6 w-0.5 -translate-y-1/2 animate-pulse bg-orange-400"></span>
    </span>
  );
};

export function HeroSection(): JSX.Element {
  const [heroForm, setHeroForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });
  const [heroSending, setHeroSending] = useState(false);
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);

  const heroFieldClass =
    'w-full rounded-xl border border-white/25 bg-white/5 px-3 py-2.5 pl-9 text-base sm:text-sm text-white placeholder:text-gray-200 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30';

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeroSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHeroSending(true);
    setHeroError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroForm.name,
          email: heroForm.email,
          message: heroForm.message,
          phone: heroForm.phone || undefined,
          budget: heroForm.budget || undefined,
          services: 'Homepage — hero inquiry',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setHeroSuccess(true);
      setHeroForm({ name: '', email: '', phone: '', budget: '', message: '' });
      setTimeout(() => setHeroSuccess(false), 5000);
    } catch (err: unknown) {
      setHeroError(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    } finally {
      setHeroSending(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-[max(9.5rem,calc(1rem+env(safe-area-inset-top)))] pb-10 sm:pb-12 md:pt-[10rem] md:pb-12 lg:pt-[9rem] lg:pb-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* NeonOrbs Background - Full screen animated gradient orbs */}
      <div className="absolute inset-0 -z-30">
        <NeonOrbs />
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 -z-20 bg-black/50" />

      {/* Subtle gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute right-0 top-0 h-[70%] w-[60%] translate-x-1/4 -translate-y-1/3 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[50%] w-[40%] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-primary/15 to-transparent opacity-50 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-full min-w-0 px-3 sm:px-4 lg:px-14">
        <div className="mx-auto w-full min-w-0 max-w-5xl">
          {/* Centered Content Block */}
          <div className="mb-10 text-center sm:mb-12 md:mb-16 lg:mb-20">
            {/* Animated Words "Custom Software Development That Scales Your Business Revenue" split into two lines with slide animation */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="overflow-hidden">
                <div 
                  className="animate-slide-in-up font-display text-[1.55rem] font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"
                  style={{ animationDelay: '0ms', animationFillMode: 'both' }}
                >
                  Custom Software Development
                </div>
              </div>
              <div className="overflow-hidden mt-1 sm:mt-2">
                <div 
                  className="animate-slide-in-up font-display text-[1.55rem] font-bold leading-tight tracking-tight text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"
                  style={{ animationDelay: '80ms', animationFillMode: 'both' }}
                >
                  That Scales Your Business Revenue <span className="text-primary">— Not Just Code</span>
                </div>
              </div>
            </div>

            {/* Sub-description */}
            <p
              className="animate-slide-in-up mx-auto max-w-3xl text-pretty text-base leading-relaxed text-gray-100 sm:mb-5 sm:text-lg md:text-xl"
              style={{ animationDelay: '160ms', animationFillMode: 'both' }}
            >
              We design, build, and deploy high-performance web, mobile, SaaS, and AI-powered
              systems for companies in the USA, Europe &amp; Middle East.
            </p>

            {/* Typewriter List */}
            <div className="animate-slide-in-up mt-6 flex justify-center" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
              <div className="inline-block rounded-2xl bg-white/5 px-6 py-3 backdrop-blur-sm border border-white/10">
                <div className="text-center text-base font-medium text-gray-100 sm:text-lg">
                  <Typewriter texts={heroBullets} typingSpeed={60} deletingSpeed={30} pauseTime={2000} />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="animate-slide-in-up mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              style={{ animationDelay: '320ms', animationFillMode: 'both' }}
            >
              <div className="w-full transition-transform duration-200 ease-out hover:scale-[1.02] sm:w-auto">
                <Button
                  size="lg"
                  className="group relative w-full overflow-hidden rounded-xl bg-primary px-4 py-5 text-center text-sm leading-snug text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary hover:shadow-xl hover:shadow-primary/50 sm:w-auto sm:px-6 sm:py-6 md:px-8 md:text-base min-h-[48px] touch-manipulation"
                  asChild
                >
                  <Link
                    href="/contact-us"
                    aria-label="Book a free software strategy call with ClickMasters"
                  >
                    <span className="relative z-10">Get Free Software Strategy Call</span>
                    <ArrowRight className="relative z-10 ml-2 h-5 w-5 shrink-0" aria-hidden />
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>

              <div className="w-full transition-transform duration-200 ease-out hover:scale-[1.02] sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-h-[48px] touch-manipulation rounded-xl border-2 border-white/25 bg-black/30 px-4 py-5 text-center text-sm leading-snug text-white backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-black/40 sm:w-auto sm:px-6 sm:py-6 md:px-8 md:text-base"
                  asChild
                >
                  <Link
                    href="/contact-us"
                    aria-label="Request a formal project proposal from ClickMasters"
                  >
                    <FileText className="mr-2 h-5 w-5 shrink-0" aria-hidden />
                    Request Proposal
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div
            className="animate-slide-in-up grid grid-cols-2 gap-x-3 gap-y-6 border-t border-white/25 pt-8 text-left sm:gap-x-6 sm:gap-y-8 sm:pt-10 md:grid-cols-4 md:gap-8"
            role="list"
            aria-label="Company achievements"
            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="relative min-w-0 text-left" role="listitem">
                <div className="relative z-10 py-2 pl-0 pr-0.5 sm:p-4 sm:pl-0">
                  <p className="font-display text-left text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl">
                    <Counter end={stat.end} duration={2} delay={0.2 * index} />
                  </p>
                  <p className="mt-1 text-left text-[11px] leading-snug text-gray-100 sm:text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-up {
          animation: slideInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}