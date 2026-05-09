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


      {/* Core Services Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Comprehensive {serviceData.title} solutions tailored to meet your specific business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(serviceData.subServices || serviceData.features).map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                >
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Industries
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Transforming businesses across multiple sectors with our {serviceData.title} expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{industry.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Tailored {serviceData.title} solutions designed to solve your business challenges
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{solution.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Proven methodology for successful {serviceData.title} delivery
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200" />
              
              <div className="space-y-12">
                {serviceData.lifecycle.map((step, index) => (
                  <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{step.description}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full text-sm text-orange-700 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Cutting-edge technologies we use for {serviceData.title} development
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Success stories from our {serviceData.title} projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <div 
                  key={index} 
                  className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="mb-4">
                    <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">{caseStudy.client}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{caseStudy.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{caseStudy.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{caseStudy.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ClickMasters</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                The trusted partner for enterprise {serviceData.title} solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((reason, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-orange-200"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{reason.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-600">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Flexible {serviceData.title} pricing to match your business needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 border ${
                    plan.name === "Professional" 
                      ? "border-orange-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30" 
                      : "border-gray-200 hover:border-orange-200"
                  }`}
                >
                  {plan.name === "Professional" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                      {plan.price}
                    </div>
                    <div className="text-xl font-bold text-gray-900">{plan.name}</div>
                    <div className="text-sm text-gray-500 mt-2">{plan.description}</div>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                What our clients say about our {serviceData.title} services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className={`w-4 h-4 ${starIndex < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-8xl mx-auto">
                Common questions about our {serviceData.title} services
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {faq.question}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-4">ClickMasters</h3>
                <p className="text-sm text-gray-400 mb-4 max-w-md">
                  Empowering businesses with cutting-edge technology solutions and digital transformation expertise.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 012-2 2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 11.21 0 12.79l-3.54-3.54c-.88-.88-1.42-1.59-1.59-.82.28-1.18-.47-.34-.96-.36-2.04-.033-2.04.033v1.518c0 1.933.415 2.04.042 2.04.042.82.28 1.18.47.34.96.36 2.04.033 2.04.033v-1.518c0-1.933-.415-2.04-.042-2.04-.042-.82-.28-1.18-.47-.34-.96-.36-2.04-.033z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-5.373C5.373.657 5.373 12 5.373 12s0 6.627 5.373 12 5.373c0 5.52 4.473 10 10 10s10-4.473 10-10c0 5.52-4.473 10-10 10-10z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  {footerLinks.services.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="hover:text-orange-400 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  {footerLinks.company.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="hover:text-orange-400 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  {footerLinks.contact.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="hover:text-orange-400 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <p className="text-gray-400">Islamabad, Pakistan</p>
                    <p className="text-gray-400">info@clickmasters.com</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm">
              <p>© {new Date().getFullYear()} ClickMasters. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* CeoVision and other optional components - uncomment as needed */}
      {/* <CeoVision /> */}
      {/* <LifecycleSection lifecycle={serviceData.lifecycle} /> */}
      {/* <ParallaxProjectsSection /> */}
    </div>
  );
}