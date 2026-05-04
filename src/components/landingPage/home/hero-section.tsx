'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Mail, User, Phone, Send, CheckCircle2, DollarSign, Rocket, Users, Trophy, Clock } from 'lucide-react';
import { BackgroundAnimation } from './BackgroundAnimation';

interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

interface StatItem {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ElementType;
}

const heroBullets = [
  'MVP to full-scale SaaS development',
  'Native, cross-platform & enterprise mobile apps',
  'AI & automation systems',
  'ERP, CRM, and enterprise solutions',
  'Built for scalability, performance & ROI',
] as const;

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

const Counter = ({ end, duration = 2, delay = 0 }: CounterProps & { suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInViewOnce(ref, 0.2);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const rawProgress = (timestamp - startTime) / (duration * 1000);
      const progress = easeOut(Math.min(rawProgress, 1));

      setCount(Math.floor(end * progress));

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration, delay]);

  return (
    <span ref={ref}>
      {count}
    </span>
  );
};

const stats: StatItem[] = [
  {
    end: 1860,
    label: 'Projects Delivered Across SaaS & AI',
    suffix: '+',
    icon: Rocket,
  },
  {
    end: 3500,
    label: 'Clients Served Globally',
    suffix: '+',
    icon: Users,
  },
  {
    end: 75,
    label: 'Awards & Recognitions',
    suffix: '+',
    icon: Trophy,
  },
  {
    end: 5,
    label: 'Years Building Scalable Systems',
    suffix: '+',
    icon: Clock,
  },
];

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
      className="relative min-h-screen flex items-center pt-[max(9.5rem,calc(1rem+env(safe-area-inset-top)))] pb-10 sm:pb-12 md:pt-[10rem] md:pb-12 lg:pt-[9rem] lg:pb-20"
      aria-labelledby="hero-heading"
    >
      <BackgroundAnimation />

      <div className="container relative z-10 mx-auto w-full px-3 sm:px-4 lg:px-8">
        <div className="mx-auto w-full  max-w-[85rem]">
          <div className="mb-10 grid items-start gap-8 sm:mb-12 sm:gap-10 md:mb-16 md:gap-12 lg:mb-20 lg:grid-cols-[1fr_minmax(280px,400px)] xl:grid-cols-[1fr_420px]">
            <div className=''>
              <div
                className="hero-enter mb-4 min-w-0 text-left sm:mb-6"
                style={{ ['--hero-enter-delay' as string]: '60ms' }}
              >
                <h1
                  id="hero-heading"
                  className="font-display text-left text-[1.55rem] font-bold leading-snug tracking-tight text-white text-pretty [overflow-wrap:anywhere] sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-5xl"
                >
                  Custom Software Development That Scales Your Business Revenue{' '}
                  <span className="text-[gold]">— Not Just Code</span>
                </h1>
              </div>

              <p
                className="hero-enter mb-4 max-w-2xl text-left text-pretty text-base leading-relaxed text-gray-100 sm:mb-5 sm:text-lg md:text-xl"
                style={{ ['--hero-enter-delay' as string]: '120ms' }}
              >
                We design, build, and deploy high-performance web, mobile, SaaS, and AI-powered
                systems for companies in the USA, Europe &amp; Middle East.
              </p>

              <ul
                className="hero-enter mb-6 max-w-2xl space-y-2 text-left sm:mb-8 sm:space-y-2.5"
                style={{ ['--hero-enter-delay' as string]: '160ms' }}
              >
                {heroBullets.map((text) => (
                  <li
                    key={text}
                    className="relative pl-5 text-sm leading-snug text-gray-100 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/90 sm:text-base"
                  >
                    {text}
                  </li>
                ))}
              </ul>

              <div
                className="hero-enter flex w-full flex-col items-stretch justify-start gap-3 sm:w-auto sm:flex-row sm:items-start sm:gap-4"
                style={{ ['--hero-enter-delay' as string]: '200ms' }}
              >
                <div className="group relative w-full transition-transform duration-200 ease-out hover:scale-[1.02] sm:w-auto">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#c49138] opacity-40 blur-sm group-hover:opacity-60 transition-opacity" />
                  <div className="relative overflow-hidden rounded-xl p-[1px]">
                    <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e3a8a_0%,#c49138_50%,#1e3a8a_100%)] opacity-80" />
                    <Button
                      size="lg"
                      className="group/btn relative w-full overflow-hidden rounded-[11px] bg-gradient-to-r from-[#12224b] to-[#9b6f24] px-4 py-5 text-center text-sm leading-snug text-white shadow-primary/30 transition-all hover:opacity-95 sm:w-auto sm:px-6 sm:py-6 md:px-8 md:text-base min-h-[48px] touch-manipulation"
                      asChild
                    >
                      <Link
                        href="/contact-us"
                        aria-label="Book a free software strategy call with ClickMasters"
                      >
                        <span className="relative z-10">Get Free Software Strategy Call</span>
                        <ArrowRight className="relative z-10 ml-2 h-5 w-5 shrink-0" aria-hidden />
                        <span
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover/btn:translate-x-full"
                          aria-hidden
                        />
                      </Link>
                    </Button>
                  </div>
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

            <div
              className="hero-enter mx-auto w-full w-xl"
              style={{ ['--hero-enter-delay' as string]: '160ms' }}
            >
              <div className="rounded-xl border border-white/15 bg-white/15 p-4 shadow-2xl shadow-black/40 backdrop-blur-md sm:rounded-2xl sm:p-5 md:p-6">
                <h2 className="mb-1 font-display text-base font-bold text-white sm:text-lg">
                  Get a free quote
                </h2>
                <p className="mb-3 text-xs leading-snug text-gray-100 sm:mb-4 sm:text-sm sm:leading-normal">
                  Share your details—we&apos;ll respond within one business day.
                </p>

                {heroError && (
                  <div
                    className="mb-3 rounded-xl border border-red-400/40 bg-red-950/50 px-3 py-2 text-sm text-red-100"
                    role="alert"
                  >
                    {heroError}
                  </div>
                )}

                {heroSuccess ? (
                  <div className="rounded-xl border border-green-400/30 bg-green-950/40 px-4 py-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle2 className="h-6 w-6 text-primary-300" aria-hidden />
                    </div>
                    <p className="font-semibold text-white">Message received</p>
                    <p className="mt-1 text-sm text-gray-100">We&apos;ll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-3">
                    <div className="relative">
                      <User
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200"
                        aria-hidden
                      />
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={heroForm.name}
                        onChange={handleHeroChange}
                        placeholder="Full name"
                        className={heroFieldClass}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200"
                        aria-hidden
                      />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={heroForm.email}
                        onChange={handleHeroChange}
                        placeholder="Work email"
                        className={heroFieldClass}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200"
                        aria-hidden
                      />
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={heroForm.phone}
                        onChange={handleHeroChange}
                        placeholder="Phone (optional)"
                        className={heroFieldClass}
                      />
                    </div>
                    <div className="relative">
                      <DollarSign
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200"
                        aria-hidden
                      />
                      <input
                        type="text"
                        name="budget"
                        value={heroForm.budget}
                        onChange={handleHeroChange}
                        placeholder="Estimated budget (optional)"
                        className={heroFieldClass}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={3}
                        value={heroForm.message}
                        onChange={handleHeroChange}
                        placeholder="What would you like to build?"
                        className="min-h-[88px] w-full resize-y rounded-xl border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-gray-200 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        required
                      />
                    </div>
                    <div className="group relative w-full transition-transform duration-200 ease-out hover:scale-[1.01]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#c49138] opacity-40 blur-sm group-hover:opacity-60 transition-opacity" />
                      <div className="relative overflow-hidden rounded-xl p-[1px]">
                        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e3a8a_0%,#c49138_50%,#1e3a8a_100%)] opacity-80" />
                        <button
                          type="submit"
                          disabled={heroSending}
                          className="relative flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-[#12224b] to-[#9b6f24] px-4 py-3 text-base font-semibold text-white shadow-primary/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                        >
                          {heroSending ? (
                            'Sending…'
                          ) : (
                            <>
                              <Send className="h-4 w-4" aria-hidden />
                              Send message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-200">
                      <Link
                        href="/contact-us"
                        className="text-[gold] underline-offset-4 hover:text-white hover:underline"
                      >
                        View phone, email, and office details on our contact page
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div
            className="hero-enter mt-10 border-t border-white/10 pt-8"
            style={{ ['--hero-enter-delay' as string]: '240ms' }}
          >
            <p className="mb-6 text-center text-sm text-gray-300">
              Trusted by startups, enterprises & global brands
            </p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-primary/40"
                  >

                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-white sm:text-3xl">
                        <Counter
                          end={stat.end}
                          duration={2}
                          delay={0.2 * index}
                        />
                        {stat.suffix}
                      </p>
                      <Icon className="mb-2 h-9 w-9 text-accent" />
                    </div>

                    <p className="mt-1 text-xs text-gray-300 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
