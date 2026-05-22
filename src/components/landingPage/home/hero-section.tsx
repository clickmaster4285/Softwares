'use client';

import { useState, useEffect, useRef } from "react";
import { ArrowRight, FileText, Mail, Phone, User, DollarSign } from "lucide-react";
import { AuroraCanvas } from "../../ui/AuroraCanvas";

export function HeroSection() {
  return <HeroSectionContent />;
}

interface HeroSectionContentProps { }

function AnimatedCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
   const [count, setCount] = useState(0);
   const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
   const [hasMounted, setHasMounted] = useState(false);
 
 useEffect(() => {
    setHasMounted(true);
  }, []);
 
   useEffect(() => {
    if (!hasMounted) return;
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting && !hasAnimated) {
             setHasAnimated(true);
             let start = 0;
             const end = target;
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
         });
       },
       { threshold: 0.3 }
     );
 
     if (elementRef.current) {
       observer.observe(elementRef.current);
     }
 
     return () => observer.disconnect();
   }, [target, hasAnimated, hasMounted]);
 
   return (
     <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6" ref={elementRef}>
       <div className="text-4xl font-bold text-primary md:text-5xl">
          {hasMounted ? count.toLocaleString() : target.toLocaleString()}{suffix}
       </div>
       <div className="mt-2 text-sm text-muted-foreground">{label}</div>
     </div>
   );
 }

function HeroSectionContent({}: HeroSectionContentProps) {
  
  return (
    <section className="relative  min-h-screen overflow-hidden w-full">
      {/* Background with proper z-indexing - stays fixed and never turns white */}
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <AuroraCanvas />
      </div>
      <div className="flex justify-center items-center ">
      <div className="relative z-10 mx-auto grid max-w-[1600px] py-40 grid-cols-1 gap-16 lg:grid-cols-[1fr_480px]">
        {/* Left Column */}
        <div>
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl max-w-4xl font-bold leading-looose tracking-normal text-foreground">
                Software Development Company {" "}
              <span className=" text-primary"> That Scales Your Business Revenue </span>
            </h1>
          </div>

          <div>
            <p className="mt-7 max-w-3xl text-xl  text-gray-800">
              We design, build, and deploy high-performance web, mobile, SaaS,
              <br />
                and AI-powered systems for companies in the USA, Europe &amp; Middle East.
                We design, build, and deploy high-performance web, mobile, SaaS,
              <br />
                and AI-powered systems for companies in the USA, Europe &amp; Middle East.
            </p>
          </div>

          <div>
            <div className="mt-6 inline-flex text-lg items-center rounded-lg border border-primary/30 bg-white/40 px-5 py-3 text-primary backdrop-blur-sm" data-hero-chip>
              ERP, CRM, and enterprise solutions
              <span className="ml-1 inline-block h-5 w-px animate-pulse bg-primary" />
            </div>
          </div>

          <div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button data-hero-cta data-magnetic className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl">
                Get Free Software Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button data-hero-cta data-magnetic className="inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-white/50 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:bg-white/80">
                <FileText className="h-4 w-4" />
                Request Proposal
              </button>
            </div>
          </div>

          <div>
            <div className="mt-20 grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4">
              <AnimatedCounter target={1860} suffix="+" label="Projects Delivered" />
              <AnimatedCounter target={3500} suffix="+" label="Happy Clients" />
              <AnimatedCounter target={75} suffix="+" label="Awards Won" />
              <AnimatedCounter target={5} suffix="+" label="Years Experience" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
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
      className="self-start rounded-2xl border border-white/40 bg-white/35 p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl"
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
            <div key={name} className="flex items-center gap-3 rounded-lg border border-white/50 bg-white/50 px-4 py-3 backdrop-blur transition focus-within:border-primary/60">
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