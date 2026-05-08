"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── DATA ───────────────────────────────────────────────── */
const values = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Agile Software Development",
    desc: "Sprint-based delivery with full transparency. Our software developers ship faster, iterate smarter, and keep you in control at every milestone.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Scalable & Future-Proof Architecture",
    desc: "We engineer software solutions on proven stacks — React, Node.js, and cloud-native infrastructure — built to scale without costly rewrites.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Enterprise Security & Compliance",
    desc: "Every product from our software house follows OWASP standards, GDPR best practices, and rigorous QA — so your business and users stay protected.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "24/7 Dedicated Support",
    desc: "Our software development company stays with you post-launch — monitoring performance, deploying updates, and resolving issues around the clock.",
  },
];


/* ── HOOKS ──────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── MAIN COMPONENT ─────────────────────────────────────── */
export function AboutSection() {
  const hero   = useInView(0.1);
  const body   = useInView(0.1);
  const cards  = useInView(0.1);
  const painSection = useInView(0.1);
  const cta    = useInView(0.2);

  return (
    <section className="bg-white text-gray-900 overflow-hidden">

      {/* ────────────────── CENTERED HEADER ────────────────── */}
      <div className=" relative" ref={hero.ref}>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.04,
          }}
        />

        <div className="mx-auto px-6 lg:px-12 py-10 lg:py-14 relative text-center">
          <div
            className="transition-all duration-700 max-w-4xl mx-auto"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "translateY(0)" : "translateY(32px)" }}
          >
            <div className="inline-flex items-center gap-2.5 mb-6 justify-center">
              <span
                className="h-[2px] bg-orange-500 rounded-full transition-all duration-700 delay-200"
                style={{ width: hero.visible ? "36px" : "0px" }}
              />
              <span className="text-orange-800 text-[11px] font-bold tracking-[0.2em] uppercase">
                About ClickMasters
              </span>
              <span
                className="h-[2px] bg-orange-500 rounded-full transition-all duration-700 delay-200"
                style={{ width: hero.visible ? "36px" : "0px" }}
              />
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
              We Don&apos;t Just Build Software —{" "}
              <span className="text-orange-500 relative inline-block">
                We Build Revenue Systems
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 6" preserveAspectRatio="none" fill="none">
                  <path
                    d="M0 3 Q75 0 150 3 Q225 6 300 3"
                    stroke="#fed7aa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-1000 delay-500"
                    style={{
                      strokeDasharray: 320,
                      strokeDashoffset: hero.visible ? 0 : 320,
                    }}
                  />
                </svg>
              </span>
            </h2>
            
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              A results-driven{" "}
              <strong className="text-gray-800 font-semibold">software house</strong>{" "}
              building custom web apps, mobile apps, and enterprise software that powers real business growth.
            </p>
          </div>
        </div>
      </div>

      {/* ────────────────── MAIN CONTENT ─────────────────── */}
      <div className="mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT: Body copy */}
          <div
            ref={body.ref}
            className="transition-all duration-700"
            style={{ opacity: body.visible ? 1 : 0, transform: body.visible ? "translateX(0)" : "translateX(-28px)" }}
          >
            <div
              className="h-[3px] bg-gradient-to-r from-orange-500 to-orange-200 rounded-full mb-8 transition-all duration-700 delay-100"
              style={{ width: body.visible ? "56px" : "0px" }}
            />

            <p className="text-lg leading-relaxed text-gray-600 mb-6">
              ClickMasters is a{" "}
              <strong className="text-gray-900 font-semibold">professional software development company</strong>{" "}
              with a proven track record delivering custom software solutions across manufacturing, healthcare,
              retail, real estate, and education sectors.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[15px] leading-relaxed text-gray-700">
                Our team of experienced{" "}
                <strong className="text-gray-700 font-medium">software developers</strong>{" "}
                works as a seamless extension of your business — translating complex requirements into reliable,
                scalable digital products that perform under real-world conditions.
              </p>
              <p className="text-[15px] leading-relaxed text-gray-700">
                As a full-service{" "}
                <strong className="text-gray-700 font-medium">software house</strong>, we handle everything from
                discovery and UI/UX design to backend development, QA testing, cloud deployment, and long-term
                maintenance — end to end, under one roof.
              </p>
              <p className="text-[15px] leading-relaxed text-gray-700">
                Explore our{" "}
                <Link href="/web-development/web-application-development" className="font-medium text-orange-600 hover:underline">
                  web application development
                </Link>
                ,{" "}
                <Link href="/mobile-development/mobile-app-development" className="font-medium text-orange-600 hover:underline">
                  mobile app development
                </Link>
                , and{" "}
                <Link href="/software-development/custom-software-development" className="font-medium text-orange-600 hover:underline">
                  custom software development
                </Link>{" "}
                services, or browse the{" "}
                <Link href="/software-solutions" className="font-medium text-orange-600 hover:underline">
                  software solutions portfolio
                </Link>{" "}
                by industry.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/contact-us"
                className="group relative inline-flex rounded-md items-center bg-orange-600 hover:bg-orange-600 active:scale-95 transition-all duration-200 text-white text-sm font-bold px-7 py-3.5 shadow-sm hover:shadow-orange-200 hover:shadow-lg overflow-hidden"
              >
                <span className="absolute inset-0 rounded-md-translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10">Start Your Project</span>
                <svg className="w-4 h-4 ml-2 relative z-10 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                className="group rounded-md inline-flex items-center border border-gray-300 hover:border-orange-400 hover:text-orange-800 hover:bg-orange-50/40 active:scale-95 transition-all duration-200 text-gray-700 text-sm font-medium px-7 py-3.5"
              >
                View Our Work
                <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT: Value Cards */}
          <div
            ref={cards.ref}
            className="relative transition-all duration-700"
            style={{ opacity: cards.visible ? 1 : 0, transform: cards.visible ? "translateX(0)" : "translateX(28px)" }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="border border-gray-200 divide-y divide-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {values.map((v, idx) => (
                <div
                  key={v.title}
                  className="group flex gap-5 items-start px-6 py-6 bg-white hover:bg-orange-50/50 transition-all duration-300 cursor-default"
                  style={{
                    transitionDelay: cards.visible ? `${idx * 80}ms` : "0ms",
                    opacity: cards.visible ? 1 : 0,
                    transform: cards.visible ? "translateX(0)" : "translateX(16px)",
                  }}
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 rounded-xl shadow-sm">
                    {v.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-orange-600 transition-colors duration-200">{v.title}</p>
                    <p className="text-[13px] leading-relaxed text-gray-700">{v.desc}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-orange-300 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

   
      {/* ────────────────── CTA BAND ──────────────────────── */}
      <div className="bg-orange-600 relative overflow-hidden" ref={cta.ref}>
        <div
          className="absolute -right-16 -top-16 w-64 h-64 bg-orange-400 rounded-full opacity-30 transition-all duration-1000"
          style={{ transform: cta.visible ? "scale(1)" : "scale(0.4)" }}
        />
        <div
          className="absolute -left-16 -bottom-16 w-64 h-64 bg-orange-600 rounded-full opacity-30 transition-all duration-1000 delay-200"
          style={{ transform: cta.visible ? "scale(1)" : "scale(0.4)" }}
        />

        <div className="mx-auto px-6 lg:px-12 py-14 lg:py-16 relative z-10">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700"
            style={{ opacity: cta.visible ? 1 : 0, transform: cta.visible ? "translateY(0)" : "translateY(24px)" }}
          >
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-orange-200/80 rounded-full" />
                <p className="text-white/95 text-[11px] font-bold uppercase tracking-[0.15em]">
                  Ready to accelerate your business?
                </p>
              </div>
              <p className="text-white text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight max-w-xl">
                Let&apos;s Build Your Next{" "}
                <span className="underline underline-offset-4 decoration-white/80">Software Product</span>{" "}
                Together
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/contact-us"
                aria-label="Contact ClickMasters to book a free business consultation"
                className="group relative inline-flex min-h-[48px] rounded-md min-w-[48px] items-center justify-center overflow-hidden bg-white px-8 py-3.5 text-sm font-bold text-orange-700 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95"
              >
                <span className="absolute rounded-md inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange-50 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative z-10">Get Free Consultation</span>
                <svg className="relative z-10 ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/about-us"
                aria-label="About ClickMasters — team, values, and how we build software"
                className="group inline-flex rounded-md min-h-[48px] min-w-[48px] items-center justify-center border border-white/60 px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
              >
                About our company &amp; team
                <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.5; }
          70%  { transform: translate(-50%,-50%) scale(1.3); opacity: 0.1; }
          100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
        }
      `}</style>

    </section>
  );
}

export default AboutSection;