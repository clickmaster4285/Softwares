// app/services/[slug]/ServiceClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ServiceData } from '@/src/lib/services';
import HeroSection from '@/components/landingPage/slug/HeroSection';
import { CeoVision } from '@/src/components/landingPage/servicesPage/CeoVision';
import LifecycleSection from '@/src/components/landingPage/slug/LifecycleSection';
import { ParallaxProjectsSection } from '@/src/components/landingPage/slug/ProjectsSection';


interface ServiceClientProps {
  serviceData: ServiceData;
}

export default function ServiceClient({ serviceData }: ServiceClientProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto px-4 md:px-8 lg:px-12 py-3.5 mt-8 bg-white backdrop-blur-sm">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link
            href="/"
            className="text-slate-400 hover:text-orange-600 transition-colors font-medium"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="font-black text-slate-800">
            {serviceData.title}
          </span>
        </nav>
      </div>

      {/* Hero Section */}
          <HeroSection serviceData={serviceData} />
          
          <CeoVision />
          
          <LifecycleSection lifecycle={serviceData.lifecycle} />

          <ParallaxProjectsSection />
          

      {/* Features Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Our {serviceData.title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We deliver exceptional value through our comprehensive approach and proven expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceData.features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 text-center hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-orange-500/50 group">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Benefits</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-400">What you gain by choosing our {serviceData.title} services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {serviceData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-300 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/services.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our {serviceData.title} solutions can help your business grow.
          </p>
          <button className="group px-8 py-3.5 bg-white text-orange-600 rounded-md font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100">
            Contact Us Today →
          </button>
        </div>
      </section>
    </div>
  );
}