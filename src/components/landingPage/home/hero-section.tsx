'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Mail, User, Phone, CheckCircle2, DollarSign } from 'lucide-react';
import { Typewriter, Counter } from '@/components/ui/typewriter';
import { HeroHomeAnimation } from '../../ui/hero-home-animation';

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

const stats: StatItem[] = [
  { end: 1860, label: 'Projects Delivered' },
  { end: 3500, label: 'Happy Clients' },
  { end: 75, label: 'Awards Won' },
  { end: 5, label: 'Years Experience' },
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
  
  // Smooth scroll animation
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Different elements move at different speeds (all upward)
  const headingMove = Math.min(scrollY * 0.06, 80);      // Heading moves up 30px max
  const subheadingMove = Math.min(scrollY * 0.05, 25);  // Subheading moves up 25px max
  const typewriterMove = Math.min(scrollY * 0.04, 20);  // Typewriter moves up 20px max
  const buttonsMove = Math.min(scrollY * 0.03, 15);     // Buttons move up 15px max
  const statsMove = Math.min(scrollY * 0.02, 10);       // Stats move up 10px max
  const formMove = Math.min(scrollY * 0.04, 70);        // Form card moves up 20px max
  
  // Fade out effect
  const fadeOut = Math.min(scrollY / 500, 0.5); // Max 50% fade

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
          services: 'Homepage hero inquiry',
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
      className="relative min-h-screen flex flex-col lg:flex-row lg:items-stretch overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroHomeAnimation />
      
      {/* Main Content */}
      <div className="container relative z-10 mx-auto w-full max-w-full min-w-0 px-3 sm:px-4 lg:px-14 flex flex-col justify-center min-h-screen">
        <div className="mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-10">
          
          <div className="grid gap-10 pt-24 pb-10 lg:pt-0 lg:pb-0 lg:min-h-screen lg:grid-cols-[1fr_610px] xl:gap-16 lg:items-center">

            {/* Left Column */}
            <div className="flex flex-col justify-center text-left">
              
              {/* Heading - moves up */}
              <div 
                className="mb-6 md:mb-8"
                style={{
                  transform: `translateY(${-headingMove}px)`,
                  opacity: 1 - fadeOut,
                  transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
                }}
              >
                <h1
                  id="hero-heading"
                  className="font-display text-[1.65rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  Software Development Company <br/>
                  <span className="text-primary">That Scales Your Business Revenue</span>
                </h1>
              </div>

              {/* Sub-description - moves up slower */}
              <p 
                className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mb-8"
                style={{
                  transform: `translateY(${-subheadingMove}px)`,
                  opacity: 1 - fadeOut * 0.8,
                  transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
                }}
              >
                We design, build, and deploy high-performance web, mobile, SaaS, <br/> and AI-powered
                systems for companies in the USA, Europe &amp; Middle East.
              </p>

              {/* Typewriter - moves up even slower */}
              <div 
                className="animate-slide-in-up mb-10"
                style={{
                  transform: `translateY(${-typewriterMove}px)`,
                  opacity: 1 - fadeOut * 0.6,
                  transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
                }}
              >
                <div className="inline-block rounded-2xl bg-white/30 sm:px-6 py-3 backdrop-blur-sm border border-white/20 max-w-full overflow-hidden">
                  <div className="text-left text-sm sm:text-base lg:text-lg font-medium text-gray-200">
                    <Typewriter texts={heroBullets} typingSpeed={60} deletingSpeed={30} pauseTime={2000} />
                  </div>
                </div>
              </div>

              {/* Buttons - moves up slowly */}
              <div 
                className="animate-slide-in-up flex flex-col sm:flex-row gap-4"
                style={{
                  transform: `translateY(${-buttonsMove}px)`,
                  opacity: 1 - fadeOut * 0.4,
                  transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
                }}
              >
                <Button
                  size="lg"
                  className="group w-full sm:w-auto min-h-[52px] rounded-xl bg-primary px-6 text-sm sm:text-base font-medium hover:bg-primary/90"
                  asChild
                >
                  <Link href="/contact-us">
                    Get Free Software Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-h-[52px] rounded-xl bg-white/30 bg-transparent border-transparent hover:bg-gray-900"
                  asChild
                >
                  <Link href="/contact-us">
                    <FileText className="mr-2 h-5 w-5" />
                    Request Proposal
                  </Link>
                </Button>
              </div>

              {/* Stats - moves up very slowly */}
              <div
                className="animate-slide-in-up mt-6 lg:mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-10 pt-10 pb-10"
                role="list"
                aria-label="Company achievements"
                style={{
                  transform: `translateY(${-statsMove}px)`,
                  opacity: 1 - fadeOut * 0.2,
                  transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
                }}
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-left" role="listitem">
                    <p className="font-display font-bold tabular-nums tracking-[-2px] text-2xl md:text-4xl lg:text-6xl text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.55)] [text-shadow:0_0_8px_rgba(255,255,255,0.25)]">
                      <Counter end={stat.end} duration={2.2} delay={0.1 * index} />
                    </p>
                    <p className="mt-2 text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form Card moves up */}
            <div 
              className="flex items-center justify-center lg:h-screen w-full"
              style={{
                transform: `translateY(${-formMove}px)`,
                opacity: 1 - fadeOut * 0.7,
                transition: 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.08s ease-out',
              }}
            >
              <div className="animate-slide-in-up w-full">
                <div className="rounded-2xl border border-white/20 bg-white/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                  <h2 className="font-display text-xl font-bold text-primary">Get a free quote</h2>
                  <p className="mt-1 mb-6 text-sm text-gray-600">
                    Share your details we&apos;ll respond within one business day.
                  </p>

                  {heroError && (
                    <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 backdrop-blur-sm px-4 py-3 text-sm text-red-100">
                      {heroError}
                    </div>
                  )}

                  {heroSuccess ? (
                    <div className="rounded-xl bg-green-500/10 border border-green-400/30 backdrop-blur-sm p-8 text-center">
                      <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-400" />
                      <p className="font-semibold text-primary">Message received!</p>
                      <p className="mt-1 text-sm text-primary/80">We&apos;ll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleHeroSubmit} className="space-y-4">
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <input
                          type="text"
                          name="name"
                          value={heroForm.name}
                          onChange={handleHeroChange}
                          placeholder="Full name"
                          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 pl-10 text-sm text-white placeholder:text-gray-800 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <input
                          type="email"
                          name="email"
                          value={heroForm.email}
                          onChange={handleHeroChange}
                          placeholder="Work email"
                          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 pl-10 text-sm text-gray-800 placeholder:text-gray-800 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <input
                          type="tel"
                          name="phone"
                          value={heroForm.phone}
                          onChange={handleHeroChange}
                          placeholder="Phone (optional)"
                          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 pl-10 text-sm text-gray-800 placeholder:text-gray-800 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>

                      <div className="relative">
                        <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" />
                        <input
                          type="text"
                          name="budget"
                          value={heroForm.budget}
                          onChange={handleHeroChange}
                          placeholder="Estimated budget (optional)"
                          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 pl-10 text-sm text-white placeholder:text-gray-800 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                      </div>

                      <textarea
                        name="message"
                        rows={3}
                        value={heroForm.message}
                        onChange={handleHeroChange}
                        placeholder="What would you like to build?"
                        className="min-h-[88px] w-full resize-y rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-3 py-3 text-sm text-white placeholder:text-gray-800 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                      />

                      <button
                        type="submit"
                        disabled={heroSending}
                        className="w-full min-h-[52px] rounded-xl bg-primary text-white font-semibold text-gray-900 transition hover:bg-primary/90 disabled:opacity-60"
                      >
                        {heroSending ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}