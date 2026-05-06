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