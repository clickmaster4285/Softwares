'use client';

import { useState, useEffect, useRef } from "react";
import { ArrowRight, FileText, Mail, Phone, User, DollarSign } from "lucide-react";
import { AuroraCanvas } from "../../ui/AuroraCanvas";
import Link from "next/link";


function AnimatedCounter({ 
  target, 
  suffix, 
  label 
}: { 
  target: number; 
  suffix: string; 
  label: string 
}) {
  const [count, setCount] = useState(0); // Start from 0
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let start = 0;
            const duration = 1600;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-60px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6 transition-all duration-300"
    >
      <div className="text-4xl font-bold text-primary md:text-5xl tabular-nums font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
export function HeroSection() {
  return <HeroSectionContent />;
}

function HeroSectionContent() {
  return (
    <section className="relative min-h-screen overflow-hidden w-full">
      {/* Background */}
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <AuroraCanvas />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] min-w-0 grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-16 lg:py-20">
          
          {/* Left Column */}
          <div className="min-w-0">
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-7xl">
              Software Development Company{" "}
              <span className="text-primary">That Scales Your Business Revenue</span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg text-gray-800 sm:text-xl">
              We design, build, and deploy high-performance web, mobile, SaaS,
              <br className="hidden sm:block" />
              and AI-powered systems for companies in the USA, Europe &amp; Middle East.
            </p>

            <div className="mt-6 inline-flex max-w-full items-center rounded-lg border border-primary/30 bg-white/40 px-4 py-3 text-base text-primary backdrop-blur-sm sm:px-5 sm:text-lg">
              ERP, CRM, and enterprise solutions
              <span className="ml-1 inline-block h-5 w-px animate-pulse bg-primary" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact-us">
  <button
    data-hero-cta
    data-magnetic
    className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl"
  >
    Get Free Software Strategy Call
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </button>
</Link>


 <Link href="/contact-us">
              <button
                data-hero-cta
                data-magnetic
                className="inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-white/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-white/80"
              >
                <FileText className="h-4 w-4" />
                Request Proposal
              </button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:mt-20 lg:gap-x-10 lg:gap-y-8">
              <AnimatedCounter target={1860} suffix="+" label="Projects Delivered" />
              <AnimatedCounter target={3500} suffix="+" label="Happy Clients" />
              <AnimatedCounter target={75} suffix="+" label="Awards Won" />
              <AnimatedCounter target={5} suffix="+" label="Years Experience" />
            </div>
          </div>

          {/* Right Column */}
          <div className="min-w-0">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', budget: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <form
      data-hero-form
      className="min-h-[520px] w-full self-start rounded-2xl border border-white/40 bg-white/35 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold text-primary">Get a free quote</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Share your details we'll respond within one business day.
      </p>

      {isSuccess ? (
        <div className="mt-6 rounded-xl bg-green-500/20 p-6 text-center backdrop-blur-sm">
          <div className="text-green-600 font-semibold">✓ Message received!</div>
          <p className="mt-2 text-sm text-foreground/70">We'll get back to you shortly.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {[
            { icon: User, name: "fullName", ph: "Full name", type: "text" },
            { icon: Mail, name: "email", ph: "Work email", type: "email" },
            { icon: Phone, name: "phone", ph: "Phone (optional)", type: "tel" },
            { icon: DollarSign, name: "budget", ph: "Estimated budget (optional)", type: "text" },
          ].map(({ icon: Icon, name, ph, type }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-lg border border-white/50 bg-white/50 px-4 py-3 backdrop-blur transition focus-within:border-primary/60"
            >
              <Icon className="h-4 w-4 text-primary" />
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder={ph}
                required={name !== 'phone' && name !== 'budget'}
              />
            </div>
          ))}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/50 bg-white/50 px-4 py-3 text-sm outline-none backdrop-blur placeholder:text-muted-foreground focus:border-primary/60"
            rows={3}
            placeholder="What would you like to build?"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        data-magnetic
        className="mt-5 w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
