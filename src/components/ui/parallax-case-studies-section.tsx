'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Briefcase, Calendar, Tag, Target, Award } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { resolveImageUrl } from '@/lib/utils'
import { cn } from "@/lib/utils";

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

interface ParallaxCaseStudiesProps {
  caseStudies: CaseStudy[];
  isLoading?: boolean;
}

export const ParallaxCaseStudiesSection = ({ caseStudies, isLoading }: ParallaxCaseStudiesProps) => {
  if (isLoading) {
    return <ParallaxSkeleton />;
  }

  if (!caseStudies.length) {
    return <EmptyState />;
  }

  // Transform case studies into sections with proper formatting
  const sections = caseStudies.map((study, index) => ({
    id: study._id,
    title: study.title,
    description: study.excerpt,
    imageUrl: study.thumbnail 
      ? resolveImageUrl(study.thumbnail)
      : study.project?.thumbnail 
        ? resolveImageUrl(study.project.thumbnail)
        : null,
    reverse: index % 2 !== 0,
    client: study.client,
    technologies: study.technologies || [],
    timeline: study.timeline,
    industry: study.industry,
    slug: study.slug || study._id,
    published: study.published,
    createdAt: study.createdAt
  }));

  // Create refs and animations for each section
  const sectionRefs = sections.map(() => useRef(null));
  
  const scrollYProgress = sections.map((_, index) => {
    return useScroll({
      target: sectionRefs[index],
      offset: ["start end", "center start"]
    }).scrollYProgress;
  });

  // Create animations for each section
  const opacityContents = scrollYProgress.map(progress => 
    useTransform(progress, [0, 0.7], [0, 1])
  );
  
  const clipProgresses = scrollYProgress.map(progress => 
    useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
  );
  
  const translateContents = scrollYProgress.map(progress => 
    useTransform(progress, [0, 1], [-30, 0])
  );

  const translateImages = scrollYProgress.map(progress => 
    useTransform(progress, [0, 1], [30, 0])
  );

  const formattedDate = (date?: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="relative ">
      {/* Minimal Hero Section - Reduced height */}
      <div className='w-full flex flex-col  px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex  gap-2 bg-orange-50 rounded-full px-3 py-1 mb-4">
            <Briefcase className="h-3.5 w-3.5 text-orange-600" />
            <span className="text-xs font-medium text-orange-600">Case Studies</span>
          </div>
          <h1 className='text-3xl md:text-5xl font-bold max-w-3xl mx-auto'>
            Success Stories
          </h1>
        </motion.div>
       
      </div>

      {/* Parallax Sections - Reduced spacing */}
      <div className="flex flex-col px-4 md:px-8 pb-8">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            ref={sectionRefs[index]} 
            className={cn(
              "flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-12 py-12 md:py-16",
              section.reverse ? 'lg:flex-row-reverse' : ''
            )}
          >
            {/* Content */}
            <motion.div 
              style={{ y: translateContents[index] }}
              className="w-full lg:w-1/2 max-w-xl px-4 lg:px-0"
            >
              {/* Client Badge */}
              {section.client && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-px bg-orange-400" />
                  <span className="text-xs font-medium uppercase tracking-wider text-orange-600">
                    {section.client}
                  </span>
                </div>
              )}

              {/* Title */}
              <motion.h2 
                style={{ y: translateContents[index] }} 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
              >
                {section.title}
              </motion.h2>

              {/* Description */}
              <motion.p 
                style={{ y: translateContents[index] }} 
                className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3"
              >
                {section.description}
              </motion.p>

              {/* Metadata Grid - Compact */}
              <motion.div 
                style={{ y: translateContents[index] }}
                className="flex flex-wrap gap-3 mb-4"
              >
                {section.industry && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Target className="h-3 w-3 text-orange-500" />
                    <span>{section.industry}</span>
                  </div>
                )}
                {section.timeline && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calendar className="h-3 w-3 text-orange-500" />
                    <span>{section.timeline}</span>
                  </div>
                )}
                {formattedDate(section.createdAt) && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calendar className="h-3 w-3 text-orange-500" />
                    <span>{formattedDate(section.createdAt)}</span>
                  </div>
                )}
              </motion.div>

              {/* Technologies - Compact */}
              {section.technologies && section.technologies.length > 0 && (
                <motion.div 
                  style={{ y: translateContents[index] }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Tag className="h-3 w-3 text-orange-500" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Tech Stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {section.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100"
                      >
                        {tech}
                      </span>
                    ))}
                    {section.technologies.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        +{section.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* CTA Button - Smaller */}
              <motion.div style={{ y: translateContents[index] }}>
                <Button
                  asChild
                  size="sm"
                  className="group bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 shadow-md"
                >
                  <Link href={`/case-studies/${encodeURIComponent(section.slug)}`}>
                    Read more
                    <ArrowDown className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rotate-[-90deg]" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Image - Smaller size */}
            <motion.div 
              style={{ 
                opacity: opacityContents[index],
                clipPath: clipProgresses[index],
                y: translateImages[index]
              }}
              className="relative w-full lg:w-1/2 max-w-sm md:max-w-md"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                {section.imageUrl ? (
                  <Image
                    src={section.imageUrl}
                    alt={section.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <Briefcase className="h-16 w-16 text-orange-300" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Minimal End Section */}
      <div className='w-full flex flex-col items-center justify-center px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className='text-xl md:text-2xl font-bold text-slate-900 mb-2'>
            Ready for Your Success Story?
          </h3>
          <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 mt-3">
            <Link href="/contact">
              Start Project
              <ArrowDown className="ml-1.5 h-3.5 w-3.5 rotate-[-90deg]" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// Compact Skeleton Loader
const ParallaxSkeleton = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
    <div className="text-center">
      <div className="h-8 w-32 bg-slate-200 rounded-full mx-auto mb-4 animate-pulse" />
      <div className="h-10 w-48 bg-slate-200 rounded-lg mx-auto animate-pulse" />
    </div>
  </div>
);

// Compact Empty State
const EmptyState = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
    <div className="text-center">
      <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
      <p className="text-slate-500 text-sm">No case studies available yet.</p>
    </div>
  </div>
);