'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RefObject } from "react";
import { memo, useEffect, useState, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Type definitions
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  iconName: "Twitter" | "Linkedin" | "Github" | "Youtube";
  href: string;
  label: string;
  color: string;
}

interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
}

function useInViewport<T extends HTMLElement>(
  targetRef: RefObject<T>,
  options?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || isInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef, options, isInView]);

  return isInView;
}

const footerLinks: FooterLinks = {
  services: [
    { label: "Custom Software", href: "/about-us" },
    { label: "Web Development", href: "/about-us" },
    { label: "Mobile App Development", href: "/about-us" },
    { label: "ERP & Business Apps", href: "/about-us" },
    { label: "Our Projects", href: "/#apps" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Industries", href: "/#industries" },
    { label: "Support", href: "/#help" },
  ],
  resources: [
    { label: "Help & FAQ", href: "/#help" },
    { label: "Why Choose Us", href: "/#community" },
    { label: "Case Studies", href: "/#apps" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks: SocialLink[] = [
  { iconName: "Twitter", href: "#", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
  { iconName: "Linkedin", href: "#", label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
  { iconName: "Github", href: "#", label: "GitHub", color: "hover:bg-[#333]" },
  { iconName: "Youtube", href: "#", label: "YouTube", color: "hover:bg-[#FF0000]" },
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const clearMessageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clearMessageTimeout.current) {
        clearTimeout(clearMessageTimeout.current);
      }
    };
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Successfully subscribed!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
      clearMessageTimeout.current = setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-background">
        <Icon name="Mail" className="h-5 w-5" />
        Subscribe to our newsletter
      </h3>
      <p className="mb-4 text-sm text-background/70">
        Get product updates, tech insights, and company news.
      </p>

      {message && (
        <div
          className={`mb-3 p-2 rounded text-sm ${
            message.type === "success"
              ? "bg-green-500/20 text-green-200"
              : "bg-red-500/20 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Input
            placeholder="Enter your email"
            className="bg-background/10 border-background/20 pr-10 text-background placeholder:text-background/50 focus:border-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            disabled={isSubmitting}
            aria-label="Email for newsletter"
          />
          <Icon
            name="Send"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-background/30 pointer-events-none"
          />
        </div>
        <Button
          onClick={handleSubscribe}
          disabled={isSubmitting}
          className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Subscribe to newsletter"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </div>
  );
};

const SocialLinks = memo(function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-transform duration-200 hover:scale-110 ${social.color}`}
          aria-label={social.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={social.iconName} className="h-5 w-5 text-background" />
        </Link>
      ))}
    </div>
  );
});

const FooterLinksSection = memo(function FooterLinksSection() {
  const categories = Object.entries(footerLinks) as [keyof FooterLinks, FooterLink[]][];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      {categories.map(([category, links]) => (
        <div key={category}>
          <h4 className="font-semibold text-background mb-4 capitalize text-sm">
            {category}
          </h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-block text-sm text-background/60 transition-all duration-200 hover:translate-x-1 hover:text-background"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

const FooterSkeleton = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-12 w-36 rounded bg-white/10 mb-8" />
        <div className="mb-8 h-32 rounded bg-white/10" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="mb-4 h-4 w-20 rounded bg-white/10" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-3 w-32 rounded bg-white/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInViewport(footerRef, {
    root: null,
    rootMargin: "100px 0px",
    threshold: 0.01,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <FooterSkeleton />;
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12 lg:px-8">
        {isInView && (
          <>
            <div className="mb-12 grid gap-12 border-b border-white/20 pb-8 lg:grid-cols-2">
              <div>
                <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
                <OptimizedImage
                  src="/logo-white.png"
                  alt="ClickMasters"
                  width={144}
                  height={36}
                  className="w-36 h-auto"
                  priority={false}
                />
                </Link>
                <p className="mt-4 mb-6 max-w-md text-sm leading-relaxed text-white/70">
                  ClickMasters is a software development company. We build custom software,
                  web applications, mobile apps, and ERP solutions for businesses worldwide.
                </p>
                <SocialLinks />
              </div>

              <div>
                <NewsletterSection />
              </div>
            </div>

            <FooterLinksSection />
          </>
        )}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} ClickMasters. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="cursor-pointer transition-colors hover:text-white">
              English (US)
            </span>
            <span className="cursor-pointer transition-colors hover:text-white">
              USD ($)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}