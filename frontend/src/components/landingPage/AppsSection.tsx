'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { getCategoryName, resolveImageUrl } from "@/lib/utils";
import { ExternalLink, FolderKanban, ArrowUpRight, Code, Globe, Smartphone, ArrowRight } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface Category {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  category: string | Category;
  status: "live" | "in-progress" | "completed";
}

interface GroupedProjects {
  categoryName: string;
  projects: Project[];
}

// Helper function with proper typing
function groupProjectsByCategory(projects: Project[]): GroupedProjects[] {
  const map = new Map<string, Project[]>();
  
  for (const p of projects) {
    const name = getCategoryName(p.category);
    if (!map.has(name)) map.set(name, []);
    map.get(name)!.push(p);
  }
  
  return Array.from(map.entries())
    .map(([categoryName, projects]) => ({ categoryName, projects }))
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName));
}

// Get icon for category
const getCategoryIcon = (categoryName: string) => {
  const icons: Record<string, React.ElementType> = {
    'Web Development': Globe,
    'Mobile Apps': Smartphone,
    'Custom Software': Code,
  };
  return icons[categoryName] || FolderKanban;
};

export function AppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const byCategory = groupProjectsByCategory(projects);
  
  // Get only the first 2 categories
  const displayedCategories = byCategory.slice(0, 2);
  const remainingCount = byCategory.length - 2;



  // Loading skeletons with premium styling
  const renderSkeletons = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative">
          <div className="relative bg-white rounded-2xl border border-orange-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-orange-500/5 to-orange-500/10 animate-pulse" />
            <div className="p-6">
              <div className="h-5 w-3/4 bg-orange-500/5 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-orange-500/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state with premium styling
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 rounded-3xl border border-orange-500/10 bg-gradient-to-br from-gray-50 to-orange-50/30"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="relative inline-block"
      >
        <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl" />
        <FolderKanban className="relative h-14 w-14 text-orange-500 mx-auto mb-4" />
      </motion.div>
      <h3 className="text-xl font-bold text-black mb-2">No projects yet</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Projects will appear here once they are added and grouped by category.
      </p>
    </motion.div>
  );

  // Project card component with premium animations
  const renderProjectCard = (project: Project, index: number) => {
    const isExternal = project.url?.startsWith("http");
    const projectId = project._id;
    const isHovered = hoveredProject === projectId;
    
    const cardContent = (
      <div
        onMouseEnter={() => setHoveredProject(projectId)}
        onMouseLeave={() => setHoveredProject(null)}
        className="group relative h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' as const }}
      >
        {/* Premium Card Design */}
        <div className="relative bg-white rounded-2xl border border-orange-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full overflow-hidden">
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(249,115,22,0.03) 0%, transparent 50%)',
            }} />
          </div>

          {/* Image Container */}
          <div className="aspect-video bg-gradient-to-br from-orange-500/5 to-orange-500/10 relative overflow-hidden">
            {project.thumbnail ? (
              <motion.img
                src={resolveImageUrl(project.thumbnail)}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <FolderKanban className="h-10 w-10 text-orange-500/30" />
              </div>
            )}
            
            {/* Status Badge Overlay with Animation */}
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {project.status === "live" && (
                <Badge className="bg-emerald-500/90 text-white border-0 text-xs font-medium px-2 py-1 rounded-full">
                  Live
                </Badge>
              )}
              {project.status === "in-progress" && (
                <Badge className="bg-amber-500/90 text-white border-0 text-xs font-medium px-2 py-1 rounded-full">
                  In Progress
                </Badge>
              )}
            </motion.div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-black mb-2 line-clamp-1">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
              {project.description}
            </p>
            
            {project.url && (
              <motion.div
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-1 text-sm font-medium text-orange-500"
              >
                {isExternal ? (
                  <>
                    Visit Project
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                ) : (
                  <>
                    View Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </motion.div>
            )}

            {/* Bottom Corner Accent */}
            <div className="absolute bottom-3 right-3 w-6 h-6">
              <motion.div
                className="w-full h-full border-b border-r border-orange-500"
                animate={{
                  rotate: isHovered ? 180 : 0,
                  opacity: isHovered ? 0.3 : 0.1
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    );

    // Wrap with appropriate link
    if (isExternal && project.url) {
      return (
        <a 
          key={project._id} 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
        >
          {cardContent}
        </a>
      );
    }
    
    return (
      <Link 
        key={project._id} 
        href={`/projects/${project._id}`}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
      >
        {cardContent}
      </Link>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="apps" 
      className="relative py-24 overflow-hidden bg-white font-sans"
    >
 
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primarymx-auto mb-8"
          />
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
            Our Projects
          </h2>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mt-4">
            Explore custom software, web applications, and digital solutions we have built 
            for clients across various industries.
          </p>
        </div>

        {/* Content - Only first 2 categories */}
        {isLoading ? (
          renderSkeletons()
        ) : byCategory.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-16">
            {displayedCategories.map(({ categoryName, projects: categoryProjects }, categoryIndex) => {
              const CategoryIcon = getCategoryIcon(categoryName);
              
              return (
                <div
                  key={categoryName}
                  ref={(el) => { categoriesRef.current[categoryIndex] = el; }}
                  className="space-y-8"
                >
                  {/* Category Header with Premium Styling */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md" />
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-black">
                        {categoryName}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
                      <Badge className="text-xs bg-orange-50 text-orange-600 border-0 rounded-full px-3 py-1">
                        {categoryProjects.length} {categoryProjects.length === 1 ? 'Project' : 'Projects'}
                      </Badge>
                    </div>
                  </div>

                  {/* Projects Grid - Show all projects for this category */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProjects.map((project, index) => renderProjectCard(project, index))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA - Enhanced to show remaining categories count */}
        <div ref={ctaRef} className="mt-20 text-center">
        
          
          <Link href="/projects" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-black text-white text-sm font-medium tracking-wider overflow-hidden rounded-md"
            >
              <span className="relative z-10 flex items-center">
                {remainingCount > 0 ? (
                  <>View All Projects ({remainingCount} more {remainingCount === 1 ? 'category' : 'categories'})</>
                ) : (
                  <>View All Projects</>
                )}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}