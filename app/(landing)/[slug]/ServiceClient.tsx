// app/services/[slug]/ServiceClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Check, Clock, Star, Shield, Zap, Users, Award, TrendingUp, Code, Cloud, Database, Lock } from 'lucide-react';
import { ServiceData } from '@/src/lib/services';
import HeroSection from '@/components/landingPage/slug/HeroSection';
import { CeoVision } from '@/src/components/landingPage/servicesPage/CeoVision';
import LifecycleSection from '@/src/components/landingPage/slug/LifecycleSection';
import { ParallaxProjectsSection } from '@/src/components/landingPage/slug/ProjectsSection';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';
import { WhyChooseUs } from '@/src/components/landingPage/servicesPage/WhyChooseUs';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';
import Testimonials from '@/src/components/landingPage/Testimonials/page';
import FaqSection from '@/src/components/landingPage/home/FaqSection';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';
import ProcessPage from '@/src/components/landingPage/home/ProcessPage';
import { AppsSection } from '@/src/components/landingPage/home/AppsSection';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import ExploreSection from '@/src/components/landingPage/home/ExploreSection';
import { TestimonialsSection } from '@/src/components/landingPage/servicesPage/TestimonialsSection';

interface ServiceClientProps {
  serviceData: ServiceData;
}

export default function ServiceClient({ serviceData }: ServiceClientProps) {
  // Industry data - can be moved to a separate config file
  const industries = [
    { name: "Healthcare", icon: "🏥", description: "HIPAA-compliant solutions for medical professionals" },
    { name: "Finance", icon: "💰", description: "Secure and compliant financial technology" },
    { name: "Retail", icon: "🛒", description: "E-commerce and retail management systems" },
    { name: "Education", icon: "🎓", description: "Learning management and educational platforms" },
    { name: "Manufacturing", icon: "🏭", description: "Industrial automation and IoT solutions" },
    { name: "Logistics", icon: "🚚", description: "Supply chain and fleet management systems" },
    { name: "Real Estate", icon: "🏢", description: "Property management and real estate tech" },
    { name: "Government", icon: "🏛️", description: "Public sector digital transformation" }
  ];

  const solutions = [
    { title: "Custom Development", description: "Bespoke solutions built specifically for your business needs", icon: "⚙️" },
    { title: "Integration Services", description: "Seamless integration with your existing systems", icon: "🔗" },
    { title: "Support & Maintenance", description: "Ongoing support to keep your systems running smoothly", icon: "🛠️" },
    { title: "Consulting", description: "Expert guidance to optimize your technology strategy", icon: "💡" },
    { title: "Training & Onboarding", description: "Comprehensive training for your team", icon: "🎓" },
    { title: "Performance Optimization", description: "Enhance speed and efficiency of existing systems", icon: "⚡" }
  ];

  const techStack = [
    { name: "React/Next.js", icon: "⚛️", description: "Modern frontend frameworks" },
    { name: "Node.js/Python", icon: "🟢", description: "Scalable backend technologies" },
    { name: "AWS/Azure", icon: "☁️", description: "Cloud infrastructure platforms" },
    { name: "PostgreSQL/MongoDB", icon: "🗄️", description: "Robust database solutions" },
    { name: "Docker/Kubernetes", icon: "🐳", description: "Container orchestration" },
    { name: "GraphQL/REST APIs", icon: "🔌", description: "Modern API development" },
    { name: "TypeScript/JavaScript", icon: "📝", description: "Type-safe development" },
    { name: "CI/CD Pipelines", icon: "🔄", description: "Automated deployment workflows" }
  ];

  const caseStudies = [
    { title: "E-commerce Platform", client: "Retail Giant", result: "300% increase in online sales", description: "Built scalable e-commerce solution handling 100K+ daily transactions" },
    { title: "Healthcare Portal", client: "Medical Center", result: "50% reduction in admin time", description: "Developed HIPAA-compliant patient management system" },
    { title: "Financial Dashboard", client: "Investment Firm", result: "Real-time analytics for 10K+ users", description: "Created comprehensive financial analytics platform" }
  ];

  const whyUs = [
    { title: "10+ Years Experience", description: "Proven track record in enterprise solutions", icon: "🏆" },
    { title: "Expert Team", description: "50+ certified developers and engineers", icon: "👥" },
    { title: "Agile Methodology", description: "Fast, flexible development with continuous delivery", icon: "🔄" },
    { title: "24/7 Support", description: "Round-the-clock assistance and maintenance", icon: "🕐" },
    { title: "Quality Assurance", description: "Rigorous testing for bug-free deployments", icon: "✅" },
    { title: "Competitive Pricing", description: "Transparent pricing with no hidden costs", icon: "💰" },
    { title: "Scalable Solutions", description: "Systems that grow with your business", icon: "📈" },
    { title: "Client-Centric Approach", description: "Your success is our primary metric", icon: "🎯" }
  ];

  const pricingPlans = [
    { name: "Starter", price: "$5,000", description: "Perfect for small businesses and startups", features: ["Basic features", "Email support", "5-day delivery"] },
    { name: "Professional", price: "$15,000", description: "Ideal for growing companies", features: ["Advanced features", "Priority support", "3-day delivery", "Custom integrations"] },
    { name: "Enterprise", price: "Custom", description: "Tailored for large organizations", features: ["Custom solutions", "Dedicated team", "24/7 support", "SLA guarantee"] }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO", company: "Tech Startup", text: "Outstanding service and support. They delivered our complex software on time and exceeded expectations.", rating: 5 },
    { name: "Michael Chen", role: "Product Manager", company: "E-commerce Platform", text: "Professional team that understands business needs. The solution they built has transformed our operations.", rating: 5 },
    { name: "Emily Rodriguez", role: "CEO", company: "Healthcare Provider", text: "Reliable and secure development. They've been our trusted partner for 3+ years.", rating: 5 },
    { name: "David Kim", role: "Operations Director", company: "Logistics Company", text: "Excellent communication and delivery. They solved complex integration challenges seamlessly.", rating: 5 },
    { name: "Lisa Anderson", role: "Marketing Director", company: "Retail Chain", text: "Creative solutions with measurable results. Our conversion rates increased by 40%.", rating: 5 },
    { name: "James Wilson", role: "IT Director", company: "Financial Services", text: "Expert technical guidance and support. Highly recommend for complex projects.", rating: 5 }
  ];

  const faqs = [
    { question: `How long does a typical ${serviceData.title.toLowerCase()} project take?`, answer: "Project timelines vary based on complexity. Simple projects typically take 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during the planning phase." },
    { question: "What technologies do you use?", answer: `We use modern technologies including React, Next.js, Node.js, Python, AWS, and cloud platforms. Our tech stack is chosen based on your specific requirements and scalability needs.` },
    { question: "Do you provide ongoing support?", answer: "Yes, we offer comprehensive support packages including 24/7 monitoring, maintenance, and dedicated support teams. All projects include a warranty period with free bug fixes." },
    { question: "Can you work with our existing systems?", answer: "Absolutely! We specialize in system integration and can work seamlessly with your current infrastructure. Our team has experience with various platforms and APIs." },
    { question: "What is your pricing model?", answer: "We offer flexible pricing models including fixed-price projects, dedicated teams, and retainer agreements. Pricing is customized based on project scope and duration." }
  ];

  const footerLinks = {
    services: [
      { name: "All Services", href: "/services" },
      { name: "Software Development", href: "/services/software-development" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile Development", href: "/services/mobile-development" }
    ],
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" }
    ],
    contact: [
      { name: "Contact Us", href: "/contact-us" },
      { name: "FAQs", href: "/faqs" },
      { name: "Testimonials", href: "/testimonials" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };

const whyChooseDifferentiators = whyUs.map((item) => ({
  feature: item.title,
  description: item.description
}));
  
const pricingTiers = pricingPlans.map((plan) => ({
  type: plan.name,
  investment: plan.price,
  timeline: plan.features?.[2] || "Custom timeline",
  bestFor: plan.description,
}));
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto px-4 md:px-8 lg:px-12 py-3.5 mt-8 bg-white backdrop-blur-sm border-b border-gray-100">
        <nav className="flex items-center gap-1.5 text-sm max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-gray-500 hover:text-orange-600 transition-colors font-medium"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <Link
            href="/services"
            className="text-gray-500 hover:text-orange-600 transition-colors font-medium"
          >
            Services
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          <span className="font-semibold text-gray-900">
            {serviceData.title}
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <HeroSection serviceData={serviceData} />


    <ExploreSection/>

   

     <AppsSection/>

     <ProcessPage/>

    <TechStackSection/>
    

      <FeaturedInsights/>




      
      <div className='m-4 lg:m-10'>
 <WhyChooseUs
  slug={serviceData.slug}
  differentiators={whyChooseDifferentiators}
      />
   </div>

      

<div className='m-4 lg:m-10'>
         <PricingSection
  serviceName={serviceData.title}
  pricingTiers={pricingTiers}
/>
   </div>

<div className='m-4 lg:m-10'>
 <TestimonialsSection/>
   </div>




      <FaqSection/>

      {/* Final CTA Section */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services.jpg"
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg text-orange-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our {serviceData.title} expertise can help you achieve your goals and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100">
              Get Free Consultation
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

    
    </div>
  );
}