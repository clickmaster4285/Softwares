'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Database, 
  Cloud, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Award,
  BarChart,
  Settings,
  Paintbrush,
  Rocket,
  Zap,
  Sparkles,
  Target,
  PenTool,
  GitBranch,
  TestTube,
  Wrench
} from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define types
interface Service {
  icon: React.ElementType | string;
  title: string;
  description: string;
  features: string[];
  color?: string;
  gradient?: string;
}

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  duration: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
}

// Services Data
const services: Service[] = [
  {
    icon: "💻",
    title: "Custom Software Development",
    description:
      "Professional custom software development solutions tailored to your business. We build enterprise software, automation tools, and legacy system modernization solutions to increase efficiency and productivity.",
    features: [
      "Enterprise Resource Planning (ERP) Systems",
      "Customer Relationship Management (CRM) Software",
      "Inventory Management Systems",
      "Business Process Automation Solutions",
      "Legacy System Modernization Services"
    ],
    gradient: "bg-primary/10"
  },
  {
    icon: "🌐",
    title: "Web Application Development",
    description:
      "Innovative web application development for scalable and responsive websites. We specialize in single-page applications (SPA), e-commerce platforms, progressive web apps (PWA), and real-time dashboards.",
    features: [
      "Single Page Applications (SPA)",
      "Progressive Web Apps (PWA)",
      "E-commerce & Online Store Development",
      "Content Management Systems (CMS)",
      "Real-time Data Dashboards"
    ],
    gradient: "bg-primary/10"
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "High-performance mobile app development for iOS and Android platforms. We create native and cross-platform apps to deliver seamless user experiences and drive customer engagement.",
    features: [
      "iOS Native Apps (Swift)",
      "Android Native Apps (Kotlin)",
      "Cross-platform Apps (React Native, Flutter)",
      "Mobile Commerce Applications",
      "Enterprise Mobile Solutions"
    ],
    gradient: "bg-primary/10"
  },
  {
    icon: "🗄️",
    title: "Database Design & Management",
    description:
      "Expert database design and management services for secure, scalable, and high-performance data systems. We handle SQL & NoSQL solutions, data migration, and performance optimization.",
    features: [
      "Database Architecture Design",
      "SQL & NoSQL Databases",
      "Data Migration & Integration",
      "Performance Optimization",
      "Backup & Disaster Recovery Solutions"
    ],
    gradient: "bg-primary/10"
  },
  {
    icon: "☁️",
    title: "Cloud Solutions & DevOps",
    description:
      "Reliable cloud solutions and DevOps services to optimize infrastructure, automate deployment, and ensure high availability. We specialize in AWS, Azure, GCP, and container orchestration.",
    features: [
      "Cloud Migration (AWS, Azure, GCP)",
      "CI/CD Pipeline Setup & Automation",
      "Containerization with Docker & Kubernetes",
      "Infrastructure as Code (IaC)",
      "24/7 Monitoring & System Reliability"
    ],
    gradient: "bg-primary/10"
  },
  {
    icon: "🔒",
    title: "Cybersecurity & Compliance",
    description:
      "Comprehensive cybersecurity solutions to protect your digital assets and ensure regulatory compliance. We perform security audits, penetration testing, and provide enterprise-grade security solutions.",
    features: [
      "Security Audits & Penetration Testing",
      "GDPR & HIPAA Compliance Services",
      "Data Encryption & Protection",
      "Identity & Access Management",
      "Security Awareness & Training Programs"
    ],
    gradient: "bg-primary/10"
  }
];

// Process Steps - Enhanced with more details
const processSteps: ProcessStep[] = [
  {
    icon: Target,
    title: "Discovery & Strategy",
    description: "Our software development team conducts a deep discovery and strategy phase to understand your business, technical requirements, and project goals for tailored solutions.",
    details: ["Requirements Analysis", "Market Research", "Technical Feasibility", "Project Roadmap"],
    duration: "1-2 weeks"
  },
  {
    icon: PenTool,
    title: "Design & Prototyping",
    description: "We create modern UI/UX designs and interactive prototypes to ensure your web or mobile application meets user experience standards and business objectives.",
    details: ["Wireframing", "UI/UX Design", "Interactive Prototypes", "User Testing"],
    duration: "2-3 weeks"
  },
  {
    icon: GitBranch,
    title: "Agile Development",
    description: "Our agile development process ensures iterative delivery of high-quality web and mobile applications, with continuous integration, sprint planning, and weekly progress updates.",
    details: ["Sprint Planning", "Daily Standups", "Continuous Integration", "Weekly Demos"],
    duration: "4-8 weeks"
  },
  {
    icon: TestTube,
    title: "Testing & QA",
    description: "We perform rigorous testing and quality assurance to deliver secure, bug-free, and high-performance software solutions ready for production deployment.",
    details: ["Unit Testing", "Integration Testing", "Performance Testing", "User Acceptance Testing"],
    duration: "2-4 weeks"
  },
  {
    icon: Wrench,
    title: "Deployment & Support",
    description: "Post-launch support includes cloud deployment, DevOps maintenance, software updates, and feature enhancements to ensure your application runs smoothly and securely.",
    details: ["CI/CD Pipeline Management", "24/7 Monitoring", "Security Updates", "Feature Enhancements"],
    duration: "Ongoing"
  }
];

// Stats with proper numeric values for CountUp
const stats: StatItem[] = [
  { 
    value: "150", 
    label: "Successful Software Projects Delivered",
    icon: Award
  },
  { 
    value: "50", 
    label: "Satisfied Clients Worldwide",
    icon: Users
  },
  { 
    value: "98", 
    label: "Client Retention Rate",
    icon: BarChart
  },
  { 
    value: "24", 
    label: "Support Hours Available",
    icon: Clock
  }
];

// Technologies
const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "AWS Cloud", category: "Cloud" },
  { name: "Azure Cloud", category: "Cloud" },
  { name: "Docker Containerization", category: "DevOps" },
  { name: "Kubernetes Orchestration", category: "DevOps" },
  { name: "MongoDB Database", category: "Database" },
  { name: "PostgreSQL Database", category: "Database" },
  { name: "MySQL Database", category: "Database" },
  { name: "Redis Caching", category: "Database" },
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const processCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const processLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const processDetailsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [statsInView, setStatsInView] = useState(false);

  // Check if stats section is in view
  const statsInViewport = useInView(statsSectionRef, { 
    once: true, 
    amount: 0.5,
    margin: "-100px"
  });

  useEffect(() => {
    if (statsInViewport) {
      setStatsInView(true);
    }
  }, [statsInViewport]);

  // Premium GSAP animations
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Master timeline for coordinated entrance
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => setHasAnimated(true)
          }
        });

        // Header animation
        if (headerRef.current) {
          masterTl.fromTo(headerRef.current,
            {
              opacity: 0,
              y: 60,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            }
          );
        }

        // Stats animation with enhanced glow
        statsRef.current.forEach((stat, index) => {
          if (stat) {
            masterTl.fromTo(stat,
              {
                opacity: 0,
                y: 50,
                scale: 0.8
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "back.out(1.2)",
                delay: index * 0.1
              },
              "-=0.6"
            );

            // Add pulsing glow animation to stat values
            gsap.to(stat.querySelector('.stat-glow'), {
            boxShadow: `0 25px 40px -15px hsl(var(--primary) / 0.4)`,
              repeat: -1,
              yoyo: true,
              duration: 1.5,
              ease: "sine.inOut"
            });
          }
        });

        // Services animation with 3D entrance
        servicesRef.current.forEach((service, index) => {
          if (service) {
            masterTl.fromTo(service,
              {
                opacity: 0,
                y: 100,
                rotationX: 30,
                rotationY: index % 2 === 0 ? -15 : 15,
                scale: 0.8,
                transformPerspective: 1000
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.2)",
                delay: index * 0.1
              },
              "-=0.8"
            );
          }
        });

        // Process section entrance animation
        if (processSectionRef.current) {
          // Animate section title
          gsap.fromTo(processSectionRef.current.querySelector('.process-title'),
            {
              opacity: 0,
              y: 40,
              rotationX: 15
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: processSectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Animate each process card with staggered 3D flip
          processCardsRef.current.forEach((card, index) => {
            if (card) {
              gsap.fromTo(card,
                {
                  opacity: 0,
                  rotationY: 90,
                  transformPerspective: 1000,
                  transformOrigin: "left center"
                },
                {
                  opacity: 1,
                  rotationY: 0,
                  duration: 1.2,
                  delay: index * 0.15,
                  ease: "back.out(1.4)",
                  scrollTrigger: {
                    trigger: processSectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                  }
                }
              );

              // Add floating animation to icons
              gsap.to(card.querySelector('.process-icon'), {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2
              });
            }
          });

          // Animate connection lines
          processLinesRef.current.forEach((line, index) => {
            if (line) {
              gsap.fromTo(line,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  duration: 0.8,
                  delay: index * 0.15 + 0.5,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: processSectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                  }
                }
              );
            }
          });

          // Animate process details panel
          if (processDetailsRef.current) {
            gsap.fromTo(processDetailsRef.current,
              {
                opacity: 0,
                y: 50,
                scale: 0.95
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                delay: 0.8,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: processSectionRef.current,
                  start: "top 60%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        }

        // Technologies animation
        if (techRef.current) {
          const techItems = techRef.current.querySelectorAll('.tech-item');
          gsap.fromTo(techItems,
            {
              opacity: 0,
              scale: 0,
              rotation: -180
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.03,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: techRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // CTA section entrance
        if (ctaRef.current) {
          gsap.fromTo(ctaRef.current,
            {
              opacity: 0,
              y: 80,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Add floating particles to background
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full pointer-events-none';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          sectionRef.current?.appendChild(particle);

          gsap.to(particle, {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            scale: gsap.utils.random(1, 3),
            opacity: gsap.utils.random(0.1, 0.3),
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [hasAnimated]);

  // GSAP animation for active process step change
  useEffect(() => {
    if (processDetailsRef.current) {
      // Animate details panel on step change
      gsap.fromTo(processDetailsRef.current,
        {
          opacity: 0.5,
          y: 20,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        }
      );

      // Animate the active card
      processCardsRef.current.forEach((card, index) => {
        if (card) {
          if (index === activeProcessStep) {
            gsap.to(card, {
              scale: 1.05,
              y: -5,
           boxShadow: `0 25px 40px -15px hsl(var(--primary) / 0.4)`,
borderColor: `hsl(var(--primary))`,
              duration: 0.4,
              ease: "power2.out"
            });

            // Animate the icon
            gsap.to(card.querySelector('.process-icon'), {
              rotate: 360,
              scale: 1.1,
              duration: 0.6,
              ease: "back.out(1.2)"
            });
          } else {
            gsap.to(card, {
              scale: 1,
              y: 0,
             boxShadow: `0 25px 40px -15px hsl(var(--primary) / 0.4)`,
              borderColor: "#D1D5DB",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        }
      });
    }
  }, [activeProcessStep]);

  // Auto-rotate process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Hover animation for service cards
// Hover animation for service cards
const handleServiceHover = (index: number, isHovering: boolean) => {
  setHoveredService(isHovering ? index : null);
  
  const card = servicesRef.current[index];
  if (!card) return;

  if (isHovering) {
    // Card entrance animation
    gsap.to(card, {
      y: -8,
      scale: 1.02,
    boxShadow: `0 25px 40px -15px hsl(var(--primary) / 0.4)`,
borderColor: `hsl(var(--primary))`,
      duration: 0.5,
      ease: "power2.out"
    });

    // Shine effect animation
    gsap.to(card.querySelector('.card-shine'), {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // Optional: Add a subtle rotation to the icon
    gsap.to(card.querySelector('.text-3xl'), {
      rotation: 5,
      scale: 1.1,
      duration: 0.4,
      ease: "back.out(1.2)"
    });
  } else {
    // Card exit animation
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
    borderColor: `hsl(var(--primary))`,
      duration: 0.5,
      ease: "power3.out"
    });

    gsap.to(card.querySelector('.card-shine'), {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // Reset icon rotation
    gsap.to(card.querySelector('.text-3xl'), {
      rotation: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }
};

  // Helper function to get suffix from original stat value
  const getSuffix = (index: number) => {
    const suffixes = ['+', '+', '%', '/7'];
    return suffixes[index];
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white font-sans"
    >
  
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div ref={headerRef} className=" mt-20 text-center max-w-4xl mx-auto mb-16">
     
          
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4">
  Software That <span className="text-primary">Accelerates Your Business</span>
</h1>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg mt-4">
            From concept to deployment, we deliver custom software solutions that 
            automate processes, engage users, and give you a competitive edge.
          </p>
        </div>


       
      {/* Services Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
  {services.map((service, index) => {
    const isHovered = hoveredService === index;

    return (
      <div
        key={index}
        ref={(el) => { servicesRef.current[index] = el; }}
        onMouseEnter={() => handleServiceHover(index, true)}
        onMouseLeave={() => handleServiceHover(index, false)}
        className="group relative cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card */}
        <div className="relative bg-white rounded-2xl p-6 md:p-8 border border-primary/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full overflow-hidden">

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(249,115,22,0.03) 0%, transparent 50%)',
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 80% 70%, rgba(249,115,22,0.03) 0%, transparent 50%)',
            }} />
          </div>

          {/* Shine Effect */}
          <div
            className="card-shine absolute inset-0 opacity-0 pointer-events-none"
           style={{
  background:`radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0) 70%)`
}}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>

          {/* Icon + Title Row */}
          <div className="flex items-start gap-4 mb-2 relative z-10">
            {/* Emoji Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500 group-hover:scale-150" />
              <div className="relative text-3xl md:text-4xl flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                {typeof service.icon === "string" ? (
                  <span aria-hidden>{service.icon}</span>
                ) : (
                  React.createElement(service.icon, {
                    className: "h-8 w-8 md:h-10 md:w-10 text-primary",
                    "aria-hidden": true,
                  })
                )}
              </div>
              <div className="absolute -inset-2 border-2 border-primary/0 rounded-full group-hover:border-primary/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-black mb-0 group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
          </div>

          {/* Description - Full width */}
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300 mb-4">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 relative z-10">
            {service.features.map((feature, i) => (
              <div 
                key={i} 
                className="flex items-start gap-2 transform transition-all duration-300"
                style={{
                  transitionDelay: `${i * 50}ms`,
                  transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
                }}
              >
                <span className="text-primary mt-0.5 text-sm transform group-hover:rotate-12 transition-transform duration-300">✓</span>
                <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Learn More */}
          <div className="inline-flex items-center gap-1 text-xs md:text-sm font-medium text-primary relative z-10 overflow-hidden group/link">
            <span className="relative">
              Learn More
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/10 group-hover/link:w-full transition-all duration-300" />
            </span>
            <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-4 right-4 w-5 h-5 md:w-6 md:h-6">
            <div className="w-full h-full border-b-2 border-r-2 border-primary/30 group-hover:border-primary group-hover:rotate-180 group-hover:scale-125 transition-all duration-500" />
          </div>

          {/* Bottom Glow Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:w-full transition-all duration-500" />
        </div>
      </div>
    );
  })}
</div>




{/* Enhanced Process Section with Professional UI */}
<div ref={processSectionRef} className="mb-32 relative">
  {/* Section Header with Subtle Badge */}
  <div className="process-title text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
      From <span className="text-primary relative inline-block">
        Idea
      </span> to{" "}
      <span className="text-primary relative inline-block">
        Reality
      </span>
    </h2>
    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
      A transparent, collaborative approach that ensures your vision becomes a 
      successful digital product
    </p>
  </div>

  {/* Main Process Visualization */}
  <div className="relative">
    {/* Professional Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-30" />
    </div>
    
    {/* Process Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 relative z-10">
      {processSteps.map((step, index) => {
        const Icon = step.icon;
        const isActive = activeProcessStep === index;
        
        return (
          <div
            key={index}
            ref={(el) => { processCardsRef.current[index] = el; }}
            onClick={() => setActiveProcessStep(index)}
            className={`
              group relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6
              transition-all duration-500 cursor-pointer overflow-hidden
              ${isActive 
                ? 'shadow-[0_8px_30px_-5px_rgba(249,115,22,0.2)] border-2 border-primary/40' 
                : 'shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md'
              }
            `}
          >
            {/* Professional Gradient Overlay */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0
              transition-all duration-700
              ${isActive ? 'bg-gradient-to-br from-primary/5 via-transparent to-transparent' : ''}
            `} />

            {/* Step Number - Professional Badge */}
            <div className={`
              absolute -top-1 -left-1 w-7 h-7 md:w-8 md:h-8 rounded-lg
              flex items-center justify-center transition-all duration-300
              ${isActive 
                ? 'bg-primary shadow-md shadow-primary/30' 
                : 'bg-gray-100 group-hover:bg-primary/20'
              }
            `}>
              <span className={`
                font-semibold text-xs md:text-sm transition-colors duration-300
                ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}
              `}>
                {index + 1}
              </span>
            </div>

            {/* Icon Container - Professional Design */}
            <div className="relative mb-3 md:mb-4 mt-2">
              <div className={`
                process-icon w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl
                flex items-center justify-center transition-all duration-500
                ${isActive 
                  ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 scale-110' 
                  : 'bg-gray-50 group-hover:bg-primary/10 group-hover:scale-105'
                }
              `}>
                <Icon className={`
                  w-5 h-5 md:w-7 md:h-7 transition-all duration-500
                  ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}
                `} />
              </div>
              
              {/* Subtle Glow Effect */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl animate-pulse bg-primary/20 blur-md" />
              )}
            </div>

            {/* Title */}
            <h3 className={`
              text-xs md:text-sm lg:text-base font-semibold text-center mb-2
              transition-colors duration-300
              ${isActive ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'}
            `}>
              {step.title}
            </h3>

            {/* Description - Professional Truncation */}
            <p className="text-[10px] md:text-xs text-gray-500 text-center leading-relaxed line-clamp-2">
              {step.description}
            </p>

            {/* Progress Indicator - Professional Line */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </div>
        );
      })}
    </div>

    {/* Connection Lines - Professional Design */}
    <div className="absolute top-16 md:top-20 left-[5%] right-[5%] hidden lg:block pointer-events-none">
      <div className="relative h-px">
        {processSteps.map((_, index) => (
          index < processSteps.length - 1 && (
            <div
              key={index}
              ref={(el) => { processLinesRef.current[index] = el; }}
              className="absolute top-0 h-px bg-primary/20"
              style={{
                left: `${(index + 1) * 20}%`,
                width: '20%',
                transformOrigin: 'left center'
              }}
            />
          )
        ))}
      </div>
    </div>

    {/* Active Step Details Panel - Professional Card */}
    <div 
      ref={processDetailsRef}
      className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg bg-white"
    >
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* Active Step Icon - Professional */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl blur-xl bg-primary/20 opacity-50" />
          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-xl flex items-center justify-center">
            {React.createElement(processSteps[activeProcessStep].icon, { 
              className: "w-8 h-8 md:w-10 md:h-10 text-primary" 
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-3">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-flex items-center w-fit">
              Step {activeProcessStep + 1}
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-gray-900">
              {processSteps[activeProcessStep].title}
            </h4>
          </div>

          <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
            {processSteps[activeProcessStep].description}
          </p>

          {/* Detailed Features - Professional Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {processSteps[activeProcessStep].details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 group/item"
              >
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs md:text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Indicator - Professional */}
        <div className="lg:text-right flex-shrink-0">
          <div className="text-xs text-primary/60 mb-1 font-medium">Estimated Duration</div>
          <div className="text-lg md:text-2xl font-bold text-primary">
            {processSteps[activeProcessStep].duration}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">per phase</div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Technologies Section */}
        <div ref={techRef} className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
              Technologies We <span className="text-primary">Excel At</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              We work with modern, cutting-edge technologies to build robust and scalable solutions.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-primary/10 p-4 md:p-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
  {technologies.map((tech, index) => (
    <div
      key={index}
      className="tech-item relative flex items-center justify-center"
    >
      {/* Glow / Blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Actual tech label */}
      <span className="relative px-4 py-2 bg-white border border-primary/10 rounded-full text-sm text-gray-700 group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 cursor-default">
        {tech.name}
        <span className="absolute -top-2 -right-2 text-[10px] px-1 py-0.5 bg-primary/10 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tech.category}
        </span>
      </span>
    </div>
  ))}
</div>
          </div>
        </div>

        {/* CTA Section */}
        <div ref={ctaRef}>
          <div className="relative bg-gradient-to-br from-gray-50 to-primary/10 rounded-2xl md:rounded-3xl p-8 md:p-12 overflow-hidden border border-primary/10">
            
            {/* Animated Pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div
                className="w-12 h-px bg-primary/10 mx-auto mb-8 animate-width"
              />
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
                Ready to Build Your 
                <span className="font-bold block mt-2 text-primary">
                  Custom Software Solution?
                </span>
              </h3>
              
              <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                Let's discuss your project requirements and see how we can help you achieve your business goals.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us">
                  <button
                    className="group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-black text-white text-sm font-medium tracking-wider overflow-hidden rounded-md"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                     Contact us
                      <Rocket className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <div
                      className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                    />
                  </button>
                </Link>

                <Link href="/projects">
                  <button
                    className="group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-transparent text-black text-sm font-medium tracking-wider border border-primary/20 hover:border-primary/50 transition-colors duration-300 overflow-hidden rounded-md"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      View Our Work
                      <Sparkles className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </span>
                    <div
                      className="absolute inset-0 bg-primary/5 transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    />
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 text-xs text-gray-500">
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  Free Consultation
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  No Commitment
                </span>
                <span className="flex items-center">
                  <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

  {/* Add these animations to your style section */}
<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-5px) translateX(3px); }
    50% { transform: translateY(0px) translateX(5px); }
    75% { transform: translateY(5px) translateX(0px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.2; }
    100% { transform: scale(1); opacity: 0.5; }
  }
`}</style>
        
    </section>
  );
}