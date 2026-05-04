// components/landingPage/servicesPage/CaseStudySection.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ArrowRight, Database, Briefcase, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiFetch } from '@/lib/api';
import { resolveImageUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  _id: string;
  slug?: string;
  title: string;
  excerpt: string;
  client?: string;
  thumbnail?: string;
  status?: string;
  project?: any;
  results?: string;
  timeline?: string;
  industry?: string;
}

export const CaseStudySection = () => {
  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ['featured-case-study'],
    queryFn: async () => {
      const res = await apiFetch('/api/case-studies');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

    const featured = caseStudies[0];
    const featured1 = caseStudies[1];
  const remainingStudies = caseStudies.slice(1);
  
  // State for current pair index
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const itemsPerPair = 2;
  const totalPairs = Math.ceil(remainingStudies.length / itemsPerPair);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    if (totalPairs === 0) return;
    
    const interval = setInterval(() => {
      setCurrentPairIndex((prev) => (prev + 1) % totalPairs);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [totalPairs]);

  // Get current pair of studies
  const getCurrentPair = () => {
    const start = currentPairIndex * itemsPerPair;
    const end = start + itemsPerPair;
    return remainingStudies.slice(start, end);
  };

  const currentStudies = getCurrentPair();

  // Loading State
  if (isLoading) {
    return (
      <section id="case-study" className="scroll-mt-24 pt-16">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-orange-500" />
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Featured Case Study</h2>
        </div>
        <div className="mt-8 animate-pulse rounded-3xl border border-slate-200 bg-white overflow-hidden">
          <div className="aspect-video bg-slate-200" />
        </div>
      </section>
    );
  }

  // No Case Study Available
  if (!featured) {
    return (
      <section id="case-study" className="scroll-mt-24 pt-16 mb-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded-full bg-orange-500" />
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Featured Case Study</h2>
        </div>
        <div className="mt-8 p-5 rounded-3xl border border-dashed border-slate-300 bg-white text-center">
          <Database className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">No case studies available yet.</p>
          <Button asChild className="mt-6" variant="outline">
            <Link href="/case-studies">Browse All Case Studies</Link>
          </Button>
        </div>
      </section>
    );
  }

  // Main Render
  const thumbnail = featured.thumbnail 
    ? resolveImageUrl(featured.thumbnail) 
    : featured.project?.thumbnail 
      ? resolveImageUrl(featured.project.thumbnail) 
      : null;

  const slug = featured.slug || featured._id;

  return (
    <motion.section 
      id="case-study" 
      className="scroll-mt-24 pt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-10 w-1 rounded-full bg-orange-500"
        />
        <motion.h2 
          className="text-2xl font-semibold text-slate-900 sm:text-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Case Studies
        </motion.h2>
      </div>

      {/* Featured Case Study - Image on Left */}
      <motion.div 
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 mb-12"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section - Left Side */}
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden min-h-[300px] md:min-h-[450px]">
            {thumbnail ? (
              <>
                <Image
                  src={thumbnail}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                <Briefcase className="h-20 w-20 text-orange-300" />
              </div>
            )}
            
            <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-orange-600 border-orange-200 shadow-lg">
              Featured Success Story
            </Badge>
          </div>

          {/* Content Section - Right Side */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            {featured.client && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-orange-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-orange-600">
                  {featured.client}
                </span>
              </div>
            )}

            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {featured.title}
            </h3>

            <div className="flex flex-wrap gap-4 mb-5 pb-4 border-b border-slate-100">
              {featured.timeline && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured.timeline}</span>
                </div>
              )}
              {featured.results && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured.results}</span>
                </div>
              )}
              {featured.industry && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured.industry}</span>
                </div>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {featured.excerpt}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-orange-50/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-orange-600">40%</p>
                <p className="text-xs text-slate-500">Efficiency Gain</p>
              </div>
              <div className="bg-orange-50/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-orange-600">3x</p>
                <p className="text-xs text-slate-500">ROI Growth</p>
              </div>
            </div>

            <Button 
              asChild 
              className="group w-fit bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/case-studies/${encodeURIComponent(slug)}`}>
                Read full case study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

  <motion.div 
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500 mb-12"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section - Left Side */}
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden min-h-[300px] md:min-h-[450px]">
            {thumbnail ? (
              <>
                <Image
                  src={thumbnail}
                  alt={featured1.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-black/10" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                <Briefcase className="h-20 w-20 text-orange-300" />
              </div>
            )}
            
            <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-orange-600 border-orange-200 shadow-lg">
              Featured1 Success Story
            </Badge>
          </div>

          {/* Content Section - Right Side */}
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            {featured1.client && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-orange-400" />
                <span className="text-xs font-medium uppercase tracking-wider text-orange-600">
                  {featured1.client}
                </span>
              </div>
            )}

            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {featured1.title}
            </h3>

            <div className="flex flex-wrap gap-4 mb-5 pb-4 border-b border-slate-100">
              {featured1.timeline && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured1.timeline}</span>
                </div>
              )}
              {featured1.results && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured1.results}</span>
                </div>
              )}
              {featured1.industry && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-slate-600">{featured1.industry}</span>
                </div>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {featured1.excerpt}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-orange-50/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-orange-600">40%</p>
                <p className="text-xs text-slate-500">Efficiency Gain</p>
              </div>
              <div className="bg-orange-50/50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-orange-600">3x</p>
                <p className="text-xs text-slate-500">ROI Growth</p>
              </div>
            </div>

            <Button 
              asChild 
              className="group w-fit bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/case-studies/${encodeURIComponent(slug)}`}>
                Read full case study
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    
    </motion.section>
  );
};

