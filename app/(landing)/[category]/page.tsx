'use client';

import { notFound } from 'next/navigation';
import { serviceMenuSections } from '@/lib/service-pages';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';

// Helper function to generate slug (must match the one in Navbar)
const getCategorySlug = (label: string) => {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  // Find the matching section
  const section = serviceMenuSections.find((s) => {
    const slug = getCategorySlug(s.label);
    return slug === category;
  });
  
  if (!section) {
    notFound();
  }
  
  const displayName = section.label;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {displayName}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive {displayName.toLowerCase()} services and solutions
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center text-primary font-medium">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Need Help? Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}