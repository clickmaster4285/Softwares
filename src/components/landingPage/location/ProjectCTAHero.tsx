"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, ArrowRight, Phone, Calendar } from "lucide-react";

type CTAButton = {
  text: string;
  href: string;
  variant: "primary" | "outline";
  icon?: "calendar" | "phone" | "arrow";
};

type ProjectCTAHeroProps = {
  // Left side content
  badge?: string;
  title: string;
  description: string;
  buttons?: CTAButton[];
  
  // Right side slider cards
  sliderCards?: { title: string; subtitle: string }[];
  
  // For backward compatibility with existing page
  location?: string;
  countryName?: string;
  variant?: "lead" | "final" | "combined";
};

const defaultCards = [
  { title: "100+", subtitle: "Projects Delivered" },
  { title: "Agile", subtitle: "Development" },
  { title: "On-time", subtitle: "Delivery" },
  { title: "24/7", subtitle: "Support" },
  { title: "50+", subtitle: "Happy Clients" },
  { title: "10x", subtitle: "Faster Shipping" },
  { title: "ISO", subtitle: "Certified Team" },
];

export function ProjectCTAHero({ 
  badge = "Build Your Project",
  title = "Ready to Start Your Project? Let's Build Something Amazing Together",
  description = "Whether you need a custom web app, mobile solution, or enterprise software, our team is ready to bring your vision to life.",
  buttons = [
    { text: "Get In Touch", href: "/contact-us", variant: "outline", icon: "arrow" }
  ],
  sliderCards = defaultCards,
  location,
  countryName,
  variant = "combined"
}: ProjectCTAHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let y = 0;
    const step = () => {
      if (!paused) {
        y += 0.5;
        const half = el.scrollHeight / 2;
        if (y >= half) y = 0;
        el.style.transform = `translateY(${-y}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const loop = [...sliderCards, ...sliderCards];

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "arrow":
        return <ArrowRight className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getButtonStyles = (variant: "primary" | "outline") => {
    if (variant === "primary") {
      return "bg-white text-primary hover:bg-slate-100";
    }
    return "border border-primary-foreground/70 bg-transparent text-white hover:bg-primary-foreground hover:text-primary";
  };

  // Helper to process href with location parameter
  const processHref = (href: string) => {
    if (location && href === "/contact-us") {
      return `${href}?location=${location}`;
    }
    if (location && href === "#services") {
      return href;
    }
    if (countryName && href.includes("{country}")) {
      return href.replace("{country}", countryName);
    }
    return href;
  };

  // For lead generation variant (centered, no slider)
  if (variant === "lead") {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {buttons.map((button, idx) => (
                <a
                  key={idx}
                  href={processHref(button.href)}
                  className={`inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 font-semibold rounded-lg transition-colors ${getButtonStyles(button.variant)}`}
                >
                  {button.text}
                  {button.icon && (
                    <span className="ml-2">{getIcon(button.icon)}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // For final CTA variant (centered, no slider, different styling)
  if (variant === "final") {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((button, idx) => (
              <a
                key={idx}
                href={processHref(button.href)}
                className={`inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 font-semibold rounded-lg transition-colors ${
                  button.variant === "primary" 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "border-2 border-primary text-primary hover:bg-primary/10"
                }`}
              >
                {button.text}
                {button.icon && (
                  <span className="ml-2">{getIcon(button.icon)}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Combined variant with slider (default)
  return (
    <section className="mx-auto bg-white">
      <div
        className="relative overflow-hidden bg-primary text-primary-foreground"
        style={{
          clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)",
        }}
      >
        <div className="grid gap-10 px-6 sm:px-8 lg:px-24 py-20 md:py-24 lg:py-32 md:grid-cols-[1.4fr_1fr] md:px-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              {badge}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg/relaxed opacity-90">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {buttons.map((button, idx) => (
                <a
                  key={idx}
                  href={processHref(button.href)}
                  className={`inline-flex w-fit items-center gap-2 rounded-md px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium transition ${getButtonStyles(button.variant)}`}
                >
                  {button.text}
                  {button.icon && getIcon(button.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Slider Cards */}
          <div
            className="relative h-[380px] sm:h-[420px] w-full max-w-[320px] sm:max-w-[384px] mx-auto overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div ref={trackRef} className="flex flex-col gap-4 sm:gap-5 will-change-transform">
              {loop.map((c, i) => (
                <div 
                  key={i} 
                  className="rounded-2xl border border-primary-foreground/40 bg-primary-foreground/5 px-5 py-5 sm:px-6 sm:py-7 text-center backdrop-blur-sm transition hover:bg-primary-foreground/15"
                >
                  <div className="text-xl sm:text-2xl font-bold">{c.title}</div>
                  <div className="mt-1 text-xs sm:text-sm opacity-90">{c.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectCTAHero;