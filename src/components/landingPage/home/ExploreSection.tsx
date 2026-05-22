"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Smartphone, Cloud, Brain, ShoppingCart, LineChart, Palette, Shield, Database, Megaphone, ArrowRight, Glasses, CpuIcon, Globe, ShieldCheck, Workflow, BarChart3, Eye, Bot, LucideIcon, DatabaseZap, Headphones, TestTube, Link2 } from "lucide-react";
import SplitText from '../../ui/SplitText';
// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping for services
const serviceIcons: Record<string, LucideIcon> = {
  'software-development': Code2,
  'web-development': Globe,
  'mobile-development': Smartphone,
  'design-ui-ux': Palette,
  'artificial-intelligence-ai': Brain,
  'machine-learning-ml': CpuIcon,
  'nlp-computer-vision': Eye,
  'data-services': Database,
  'data-and-intelligence': BarChart3,
  'automation-and-chatbot': Bot,
  'automation-and-integration': Workflow,
  'cloud-and-devops': Cloud,
  'database-services': DatabaseZap,
  'cybersecurity': ShieldCheck,
  'testing-and-qa': TestTube,
  'support-and-outsourcing': Headphones,
  'blockchain-and-web3': Link2,
  'iot-and-emerging-tech': CpuIcon,
  'immersive-tech': Glasses,
};

// Updated services array using the icon mapping
const services = [
  {
    id: 'software-development',
    icon: serviceIcons['software-development'],
    title: "Software Development",
    desc: "Custom enterprise software solutions built with modern architectures and best practices.",
    gradient: "linear-gradient(135deg, #fda4af 0%, #fbcfe8 50%, #f9a8d4 100%)",
    accent: "#fef3c7",
    slug: "software-development"
  },
  {
    id: 'web-development',
    icon: serviceIcons['web-development'],
    title: "Web Application Development",
    desc: "Scalable web apps built with modern stacks—React, Next.js, Node, and edge-first architectures.",
    gradient: "linear-gradient(135deg, #a7f3d0 0%, #a5f3fc 50%, #bae6fd 100%)",
    accent: "#d1fae5",
    slug: "web-development"
  },
  {
    id: 'mobile-development',
    icon: serviceIcons['mobile-development'],
    title: "Mobile App Development",
    desc: "Native and cross-platform iOS & Android apps engineered for performance and delightful UX.",
    gradient: "linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 50%, #bfdbfe 100%)",
    accent: "#ede9fe",
    slug: "mobile-development"
  },
  {
    id: 'design-ui-ux',
    icon: serviceIcons['design-ui-ux'],
    title: "UI / UX Design",
    desc: "Research-led product design, design systems, and interfaces that users genuinely love.",
    gradient: "linear-gradient(135deg, #fed7aa 0%, #fecaca 50%, #ddd6fe 100%)",
    accent: "#fef3c7",
    slug: "design-ui-ux"
  },
  {
    id: 'artificial-intelligence-ai',
    icon: serviceIcons['artificial-intelligence-ai'],
    title: "AI & Machine Learning",
    desc: "LLM integrations, computer vision, and intelligent automation that move the revenue needle.",
    gradient: "linear-gradient(135deg, #bbf7d0 0%, #99f6e4 50%, #bae6fd 100%)",
    accent: "#dcfce7",
    slug: "artificial-intelligence-ai"
  },
  {
    id: 'machine-learning-ml',
    icon: serviceIcons['machine-learning-ml'],
    title: "Machine Learning",
    desc: "Custom ML models, predictive analytics, and intelligent systems for business transformation.",
    gradient: "linear-gradient(135deg, #fecaca 0%, #fed7aa 50%, #fef08a 100%)",
    accent: "#fef9c3",
    slug: "machine-learning-ml"
  },
  {
    id: 'nlp-computer-vision',
    icon: serviceIcons['nlp-computer-vision'],
    title: "NLP & Computer Vision",
    desc: "Advanced text analysis, image recognition, and visual intelligence solutions.",
    gradient: "linear-gradient(135deg, #fbcfe8 0%, #f5d0fe 50%, #ddd6fe 100%)",
    accent: "#fce7f3",
    slug: "nlp-computer-vision"
  },
  {
    id: 'data-services',
    icon: serviceIcons['data-services'],
    title: "Data Services",
    desc: "Comprehensive data solutions from collection to insights and visualization.",
    gradient: "linear-gradient(135deg, #bae6fd 0%, #a5f3fc 50%, #c7d2fe 100%)",
    accent: "#e0f2fe",
    slug: "data-services"
  },
  {
    id: 'data-and-intelligence',
    icon: serviceIcons['data-and-intelligence'],
    title: "Data & Intelligence",
    desc: "Business intelligence dashboards, analytics, and data-driven decision making.",
    gradient: "linear-gradient(135deg, #fef08a 0%, #fed7aa 50%, #fecaca 100%)",
    accent: "#fef9c3",
    slug: "data-and-intelligence"
  },
  {
    id: 'automation-and-chatbot',
    icon: serviceIcons['automation-and-chatbot'],
    title: "Automation & Chatbots",
    desc: "Intelligent chatbots and workflow automation for enhanced customer engagement.",
    gradient: "linear-gradient(135deg, #99f6e4 0%, #bbf7d0 50%, #d9f99d 100%)",
    accent: "#ccfbf1",
    slug: "automation-and-chatbot"
  },
  {
    id: 'automation-and-integration',
    icon: serviceIcons['automation-and-integration'],
    title: "Automation & Integration",
    desc: "Seamless system integrations and process automation across your tech stack.",
    gradient: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #8b5cf6 100%)",
    accent: "#ede9fe",
    slug: "automation-and-integration"
  },
  {
    id: 'cloud-and-devops',
    icon: serviceIcons['cloud-and-devops'],
    title: "Cloud & DevOps",
    desc: "AWS, GCP, Azure infrastructure with CI/CD pipelines, IaC, and 99.9% uptime SLAs.",
    gradient: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #06b6d4 100%)",
    accent: "#ecfeff",
    slug: "cloud-and-devops"
  },
  {
    id: 'database-services',
    icon: serviceIcons['database-services'],
    title: "Database Services",
    desc: "Database design, optimization, migration, and management for peak performance.",
    gradient: "linear-gradient(135deg, #86efac 0%, #4ade80 50%, #22c55e 100%)",
    accent: "#f0fdf4",
    slug: "database-services"
  },
  {
    id: 'cybersecurity',
    icon: serviceIcons['cybersecurity'],
    title: "Cybersecurity",
    desc: "Pen-testing, hardening, and compliance—SOC2, ISO, GDPR—baked into your stack.",
    gradient: "linear-gradient(135deg, #fca5a5 0%, #f87171 50%, #ef4444 100%)",
    accent: "#fef2f2",
    slug: "cybersecurity"
  },
  {
    id: 'testing-and-qa',
    icon: serviceIcons['testing-and-qa'],
    title: "Testing & QA",
    desc: "Automated testing, quality assurance, and performance testing for reliable software.",
    gradient: "linear-gradient(135deg, #d8b4fe 0%, #c084fc 50%, #a855f7 100%)",
    accent: "#faf5ff",
    slug: "testing-and-qa"
  },
  {
    id: 'support-and-outsourcing',
    icon: serviceIcons['support-and-outsourcing'],
    title: "Support & Outsourcing",
    desc: "24/7 technical support, maintenance, and managed IT services.",
    gradient: "linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)",
    accent: "#fefce8",
    slug: "support-and-outsourcing"
  },
  {
    id: 'blockchain-and-web3',
    icon: serviceIcons['blockchain-and-web3'],
    title: "Blockchain & Web3",
    desc: "Smart contracts, dApps, and decentralized solutions for the new internet.",
    gradient: "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%)",
    accent: "#f0fdfa",
    slug: "blockchain-and-web3"
  },
  {
    id: 'iot-and-emerging-tech',
    icon: serviceIcons['iot-and-emerging-tech'],
    title: "IoT & Emerging Tech",
    desc: "Connected devices, sensor networks, and cutting-edge technology solutions.",
    gradient: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)",
    accent: "#eff6ff",
    slug: "iot-and-emerging-tech"
  },
  {
    id: 'immersive-tech',
    icon: serviceIcons['immersive-tech'],
    title: "Immersive Tech",
    desc: "AR/VR experiences, metaverse solutions, and spatial computing applications.",
    gradient: "linear-gradient(135deg, #f0abfc 0%, #d946ef 50%, #c026d3 100%)",
    accent: "#fdf4ff",
    slug: "immersive-tech"
  }
];


const getServiceNavigation = () => {
  return services.map(service => ({
    id: service.id,
    title: service.title,
    slug: service.slug,
    icon: service.icon
  }));
};

// Usage example for navigation menu
const navigationItems = getServiceNavigation();


const origins = ["right", "left", "center"] as const;

export default function ExploreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-depth-card]", section);
    if (cards.length === 0) return;

    // Position all cards stacked dead-center, hidden offscreen by origin
    cards.forEach((card) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
        opacity: 0,
        scale: 0.85,
        transformOrigin: "center center",
      });
    });

    const stepPx = () => window.innerHeight;
    const totalSteps = cards.length;

    // Offscreen positions based on origin
    const offFor = (origin: string | undefined) => {
      if (origin === "right") return { x: window.innerWidth * 0.8, y: 0, rotate: 10 };
      if (origin === "left") return { x: -window.innerWidth * 0.8, y: 0, rotate: -10 };
      return { x: 0, y: window.innerHeight * 0.7, rotate: 0 };
    };

    // Final grid slots (5 cols x 2 rows)
    const FINAL_SCALE = 0.6;
   const COL = 340;
const ROW = 140;

    const finals = [
      { x: 2 * COL, y: -ROW },   // 0 right -> top far-right
      { x: -2 * COL, y: -ROW },  // 1 left  -> top far-left
      { x: 0, y: -ROW },         // 2 center-> top-center
      { x: COL, y: -ROW },       // 3 right -> top mid-right
      { x: -COL, y: -ROW },      // 4 left  -> top mid-left
      { x: 0, y: ROW },          // 5 center-> bottom-center
      { x: 2 * COL, y: ROW },    // 6 right -> bottom far-right
      { x: -2 * COL, y: ROW },   // 7 left  -> bottom far-left
      { x: COL, y: ROW },        // 8 right -> bottom mid-right
      { x: -COL, y: ROW },       // 9 left  -> bottom mid-left
    ];

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        pin: inner,
        start: "top top",
        end: () => "+=" + totalSteps * stepPx(),
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: {
          snapTo: (value: number) => {
            const increment = 1 / totalSteps;
            return Math.round(value / increment) * increment;
          },
          duration: { min: 0.2, max: 0.6 },
          delay: 0.05,
          ease: "power2.inOut",
        },
      },
    });

    cards.forEach((card, i) => {
      const origin = card.dataset.origin;
      const from = offFor(origin);
      const final = finals[i] ?? { x: 0, y: 0 };
      
      // Fly in from offscreen, land big & centered first
      tl.fromTo(
        card,
        { x: from.x, y: from.y, rotate: from.rotate, opacity: 0, scale: 0.85 },
        { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        i
      );
      // Then settle into its final grid slot
      tl.to(
        card,
        { x: final.x, y: final.y, scale: FINAL_SCALE, duration: 0.5, ease: "power2.inOut" },
        i + 0.5
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-depth-section
      data-bg-shift="services"
      className="relative min-h-screen overflow-hidden bg-foreground text-background"
    >




      
      <div ref={innerRef} data-depth-inner className="relative min-h-screen">


        <div
          data-depth-stage
          className="pointer-events-none absolute inset-0 [perspective:1600px] [transform-style:preserve-3d]"
        >




        <div className="mx-auto max-w-3xl text-center mt-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
                  <div className="inline-flex items-center gap-1.5">
  <SplitText
  text="Explore Our Ecosysystem"
  className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary/10"
  delay={60}
  duration={0.8}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, x: 60 }}
  to={{ opacity: 1, x: 0 }}
  threshold={0.2}
  
/>
</div>
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </div>

          

          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
           
               Discover our engineering capabilities, delivery expertise, case studies, and strategic technology solutions built for modern businesses.
          
          </p>
        </div>

          {services.map(({ icon: Icon, title, desc, gradient, accent }, i) => (
            <div
              key={title}
              data-depth-card
              data-index={i}
              data-origin={origins[i % origins.length]}
             className="pointer-events-auto absolute left-1/2 top-1/2 w-[520px] md:w-[560px] lg:w-[500px]
min-h-[380px] overflow-hidden rounded-3xl p-10 shadow-2xl shadow-black/30
will-change-transform [transform-style:preserve-3d]"
              style={{ background: gradient }}
            >
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-3xl"
                style={{ background: accent }}
              />
              <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/50 opacity-40 blur-3xl" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 text-foreground ring-1 ring-white/60 backdrop-blur-md">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-5 text-sm font-semibold tracking-[0.3em] text-foreground/60">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-serif text-2xl lg:text-3xl font-bold leading-tight text-foreground">{title}</h3>
                <p className="mt-3 text-xl leading-relaxed text-foreground/80">{desc}</p>
                <button
                  onClick={() => console.log(`Learn more about ${title}`)}
                  className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-foreground transition-transform hover:translate-x-1"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.3em] text-background/40">
          SCROLL ↓
        </div>
      </div>
    </section>
  );
}