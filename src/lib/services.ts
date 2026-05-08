// app/services/[slug]/data.ts
export type LifecycleStep = {
  step: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
};

export type ServiceData = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroBadge: string;
  stats: Array<{ value: string; label: string }>;
  features: Array<{ title: string; description: string; icon: string }>;
  benefits: string[];
  ctaText: string;
  lifecycle: LifecycleStep[];
};

export const servicesData: Record<string, ServiceData> = {
  // Software Development
  "software-development": {
    slug: "software-development",
    title: "Software Development",
    tagline: "Build Scalable, Robust Enterprise Solutions",
    description: "We craft custom software solutions that streamline operations, enhance productivity, and drive business growth. From concept to deployment, our expert engineers deliver high-performance applications tailored to your unique needs.",
    heroBadge: "10+ Enterprise Solutions Delivered",
    stats: [
      { value: "200+", label: "Projects Delivered" },
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "50+", label: "Expert Engineers" },
      { value: "24/7", label: "Support" }
    ],
    features: [
      { title: "Custom Architecture", description: "Tailored solutions built for your specific business requirements", icon: "🏗️" },
      { title: "Agile Development", description: "Rapid iterations with continuous feedback and improvements", icon: "🔄" },
      { title: "Quality Assurance", description: "Comprehensive testing ensuring bug-free deployments", icon: "✅" }
    ],
    benefits: ["Reduced operational costs", "Increased efficiency", "Scalable infrastructure", "Future-proof technology"],
    ctaText: "Start Your Software Project",
    lifecycle: [
      { step: 1, title: "Discovery & Planning", description: "We analyze your requirements, define project scope, and create a detailed roadmap.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Design & Prototyping", description: "Create wireframes, UI/UX designs, and interactive prototypes for validation.", duration: "2-3 weeks", icon: "🎨" },
      { step: 3, title: "Development", description: "Agile development with regular sprints, code reviews, and continuous integration.", duration: "8-12 weeks", icon: "💻" },
      { step: 4, title: "Testing & QA", description: "Comprehensive testing including unit, integration, performance, and security tests.", duration: "2-3 weeks", icon: "🧪" },
      { step: 5, title: "Deployment & Launch", description: "Smooth deployment, data migration, and go-live support.", duration: "1 week", icon: "🚀" }
    ]
  },

  // Web Development
  "web-development": {
    slug: "web-development",
    title: "Web Development",
    tagline: "Create Stunning, High-Performance Websites",
    description: "We build modern, responsive websites and web applications that captivate audiences and drive conversions. Using the latest frameworks and technologies, we deliver lightning-fast, SEO-optimized web experiences.",
    heroBadge: "500+ Websites Launched",
    stats: [
      { value: "500+", label: "Websites Built" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "40ms", label: "Avg Load Time" },
      { value: "100+", label: "Team Members" }
    ],
    features: [
      { title: "Responsive Design", description: "Perfect viewing experience on all devices", icon: "📱" },
      { title: "SEO Optimized", description: "Built-in best practices for search rankings", icon: "🔍" },
      { title: "E-commerce Ready", description: "Powerful online store solutions", icon: "🛒" }
    ],
    benefits: ["Increased online visibility", "Higher conversion rates", "Better user engagement", "Mobile-first approach"],
    ctaText: "Launch Your Website",
    lifecycle: [
      { step: 1, title: "Requirements Gathering", description: "Understand your business goals, target audience, and technical needs.", duration: "1 week", icon: "📋" },
      { step: 2, title: "Wireframing & Design", description: "Create site structure, wireframes, and visual designs.", duration: "2 weeks", icon: "✏️" },
      { step: 3, title: "Frontend Development", description: "Build responsive, interactive user interfaces.", duration: "4-6 weeks", icon: "🎨" },
      { step: 4, title: "Backend Integration", description: "Connect with databases, APIs, and CMS.", duration: "3-4 weeks", icon: "⚙️" },
      { step: 5, title: "Launch & Optimization", description: "Deploy, test, and optimize for performance and SEO.", duration: "1-2 weeks", icon: "🚀" }
    ]
  },

  // Mobile Development
  "mobile-development": {
    slug: "mobile-development",
    title: "Mobile Development",
    tagline: "Native & Cross-Platform Mobile Apps",
    description: "Transform your ideas into powerful mobile applications for iOS and Android. We specialize in both native and cross-platform development, delivering seamless user experiences that keep users coming back.",
    heroBadge: "100+ Apps on App Stores",
    stats: [
      { value: "100+", label: "Apps Published" },
      { value: "4.8★", label: "Avg Rating" },
      { value: "10M+", label: "Total Downloads" },
      { value: "50+", label: "Mobile Experts" }
    ],
    features: [
      { title: "Native Development", description: "Swift, Kotlin, and Java expertise", icon: "📱" },
      { title: "Cross-Platform", description: "React Native & Flutter solutions", icon: "🔄" },
      { title: "App Store Optimization", description: "Maximize your app's visibility", icon: "📈" }
    ],
    benefits: ["Reach mobile users", "Offline functionality", "Push notifications", "App store presence"],
    ctaText: "Build Your App",
    lifecycle: [
      { step: 1, title: "Ideation & Strategy", description: "Define app concept, features, and target platforms.", duration: "1-2 weeks", icon: "💡" },
      { step: 2, title: "UI/UX Design", description: "Create intuitive mobile interfaces and user flows.", duration: "2-3 weeks", icon: "🎨" },
      { step: 3, title: "App Development", description: "Code native or cross-platform app with best practices.", duration: "8-10 weeks", icon: "📱" },
      { step: 4, title: "Testing & Refinement", description: "Test on multiple devices and refine based on feedback.", duration: "2 weeks", icon: "🧪" },
      { step: 5, title: "App Store Submission", description: "Prepare assets, submit to stores, and manage release.", duration: "1-2 weeks", icon: "📲" }
    ]
  },

  // Design
  "design-ui-ux": {
    slug: "design",
    title: "Design",
    tagline: "Beautiful, User-Centered Design Solutions",
    description: "Our design team creates intuitive, engaging experiences that users love. From UI/UX design to branding and visual identity, we craft designs that communicate your brand story effectively.",
    heroBadge: "Award-Winning Design Team",
    stats: [
      { value: "300+", label: "Design Projects" },
      { value: "15+", label: "Design Awards" },
      { value: "95%", label: "User Satisfaction" },
      { value: "40+", label: "Designers" }
    ],
    features: [
      { title: "UX Research", description: "Data-driven design decisions", icon: "🔬" },
      { title: "UI Design", description: "Beautiful, modern interfaces", icon: "🎨" },
      { title: "Brand Identity", description: "Coherent brand experiences", icon: "🏷️" }
    ],
    benefits: ["Improved user engagement", "Higher conversion rates", "Brand consistency", "Reduced bounce rates"],
    ctaText: "Start Designing",
    lifecycle: [
      { step: 1, title: "Research & Discovery", description: "User research, competitor analysis, and requirements gathering.", duration: "1-2 weeks", icon: "🔍" },
      { step: 2, title: "Information Architecture", description: "Structure content and create user flow diagrams.", duration: "1 week", icon: "🏗️" },
      { step: 3, title: "Wireframing", description: "Create low-fidelity wireframes for layout and functionality.", duration: "1-2 weeks", icon: "📐" },
      { step: 4, title: "Visual Design", description: "Design high-fidelity mockups with brand elements.", duration: "2-3 weeks", icon: "🎨" },
      { step: 5, title: "Prototyping & Testing", description: "Create interactive prototypes and user testing.", duration: "1-2 weeks", icon: "🧪" }
    ]
  },

  // Add lifecycle for other services similarly...
  // For brevity, I'll show a template you can copy for remaining services
};

// Helper function to get service data by slug
export function getServiceData(slug: string): ServiceData | null {
  return servicesData[slug] || null;
}

// Get all service slugs for static generation
export function getAllServiceSlugs(): string[] {
  return Object.keys(servicesData);
}