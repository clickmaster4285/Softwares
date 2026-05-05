"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ArrowRight, Database, Briefcase, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiFetch } from '@/lib/api';
import { resolveImageUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxCaseStudiesSection } from '../../ui/parallax-case-studies-section';

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
  technologies?: string[];
  published?: boolean;
  createdAt?: string;
}

function CaseStudyCard({ study, reverse = false }: { study: CaseStudy; reverse?: boolean }) {
  const thumbnail = study.thumbnail
    ? resolveImageUrl(study.thumbnail)
    : study.project?.thumbnail
      ? resolveImageUrl(study.project.thumbnail)
      : null;

  const slug = study.slug || study._id;

  const formattedDate = study.createdAt
    ? new Date(study.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="overflow-hidden  rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>

        {/* Image */}
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden min-h-[300px] md:min-h-[400px]">
          {thumbnail ? (
            <>
              <Image
                src={thumbnail}
                alt={study.title}
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

          {/* Published badge */}
          {study.published && (
            <Badge className="absolute top-4 left-4 bg-orange-900 backdrop-blur-sm text-green-600 border-green-200 shadow-lg flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Published
            </Badge>
          )}

          {/* Created at — bottom of image */}
          {formattedDate && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
              <Calendar className="h-3 w-3 text-white/80" />
              <span className="text-xs text-white/90">{formattedDate}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">

          {/* Client */}
          {study.client && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-orange-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-orange-600">
                {study.client}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4 line-clamp-2">
            {study.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 leading-relaxed mb-5 line-clamp-3">
            {study.excerpt}
          </p>

          {/* Technologies */}
          {study.technologies && study.technologies.length > 0 && (
            <div className="mb-5 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
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
    </div>
  );
}

// In your original file, replace the CaseStudySection export with:

export const CaseStudySection = () => {
  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ['featured-case-study'],
    queryFn: async () => {
      const res = await apiFetch('/api/case-studies');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  return <ParallaxCaseStudiesSection caseStudies={caseStudies} isLoading={isLoading} />;
};