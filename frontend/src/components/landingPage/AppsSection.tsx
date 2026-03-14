'use client';

import React, { useState, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion, useInView, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { getCategoryName, resolveImageUrl } from "@/lib/utils";
import { ExternalLink, FolderKanban, ArrowUpRight, Code, Globe, Smartphone, ArrowRight } from "lucide-react";

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

// Variants for animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function AppsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const byCategory = groupProjectsByCategory(projects);

  // Loading skeletons with animation
  const renderSkeletons = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} variants={itemVariants}>
          <Card className="rounded-xl border-black/5 overflow-hidden bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="h-40 bg-black/5 animate-pulse" />
            <CardHeader>
              <div className="h-5 w-3/4 bg-black/5 rounded animate-pulse" />
              <div className="h-4 w-full bg-black/5 rounded animate-pulse mt-2" />
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );

  // Empty state with animation
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 rounded-2xl border border-black/5 bg-white/50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <FolderKanban className="h-14 w-14 text-black/40 mx-auto mb-4" />
      </motion.div>
      <h3 className="font-display text-xl font-semibold text-black mb-2">No projects yet</h3>
      <p className="text-black/60 max-w-md mx-auto">
        Projects will appear here once they are added and grouped by category.
      </p>
    </motion.div>
  );

  // Project card component with animations
  const renderProjectCard = (project: Project, index: number) => {
    const isExternal = project.url?.startsWith("http");
    const projectId = project._id;
    const isHovered = hoveredProject === projectId;
    
    const cardContent = (
      <motion.div
        variants={itemVariants}
        onHoverStart={() => setHoveredProject(projectId)}
        onHoverEnd={() => setHoveredProject(null)}
        className="group relative h-full"
      >
        {/* Card Border Animation */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r from-primary/60 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={{
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
        />
        
        <Card className="relative h-full overflow-hidden rounded-2xl border-black/5 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-500">
          {/* Image Container */}
          <div className="aspect-video bg-black/5 relative overflow-hidden">
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
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <FolderKanban className="h-10 w-10 text-primary/30" />
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
                <Badge className="bg-emerald-500/90 text-white border-0 text-xs font-medium px-2 py-1">
                  Live
                </Badge>
              )}
              {project.status === "in-progress" && (
                <Badge className="bg-amber-500/90 text-white border-0 text-xs font-medium px-2 py-1">
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
          
          <CardHeader className="pb-2">
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-lg text-black line-clamp-1">
                {project.title}
              </CardTitle>
            </motion.div>
          </CardHeader>
          
          <CardContent>
            <motion.p 
              className="text-sm text-black/60 line-clamp-2 mb-3"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {project.description}
            </motion.p>
            
            {project.url && (
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary group/link"
                >
                  {isExternal ? (
                    <>
                      Visit Project
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Bottom Corner Accent */}
            <motion.div
              className="absolute bottom-3 right-3 w-6 h-6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 0.2 : 0,
                rotate: isHovered ? 180 : 0,
              }}
            >
              <div className="w-full h-full border-b border-r border-primary/30" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );

    // Wrap with appropriate link
    if (isExternal && project.url) {
      return (
        <a 
          key={project._id} 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        >
          {cardContent}
        </a>
      );
    }
    
    return (
      <Link 
        key={project._id} 
        href={`/projects/${project._id}`}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        {cardContent}
      </Link>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="apps" 
      className="relative py-24 overflow-hidden bg-white"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #00000005 1px, transparent 1px),
                           linear-gradient(to bottom, #00000005 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        } as React.CSSProperties} 
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-px bg-primary/30 mx-auto mb-8"
          />
          
          <motion.h2
            className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4"
          >
            Software 
            <span className="font-medium text-primary block mt-2">
              Projects <span className="text-primary">Portfolio</span>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-black/60 max-w-2xl mx-auto text-lg"
          >
            Explore custom software, web applications, and digital solutions we have built 
            for clients across various industries.
          </motion.p>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          renderSkeletons()
        ) : byCategory.length === 0 ? (
          renderEmptyState()
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-16"
          >
            {byCategory.map(({ categoryName, projects: categoryProjects }, categoryIndex) => {
              const CategoryIcon = getCategoryIcon(categoryName);
              
              return (
                <motion.div 
                  key={categoryName}
                  variants={itemVariants}
                  className="space-y-8"
                >
                  {/* Category Header with Animation */}
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-black/80" strokeWidth={1.5} />
                      </div>
                      <motion.div
                        className="absolute -bottom-1 left-0 h-px bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: '32px' }}
                        transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                      />
                    </motion.div>
                    
                    <div className="flex-1 flex items-center gap-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-black">
                        {categoryName}
                      </h3>
                      <motion.div 
                        className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + 0.3 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + 0.4 }}
                      >
                        <Badge variant="secondary" className="text-xs bg-black/5 text-black/60 border-0">
                          {categoryProjects.length} {categoryProjects.length === 1 ? 'Project' : 'Projects'}
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Projects Grid */}
                  <motion.div 
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                  >
                    {categoryProjects.map((project, index) => renderProjectCard(project, index))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div
            className="w-12 h-px bg-primary/30 mx-auto mb-8"
            animate={{
              width: ['48px', '96px', '48px'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <Link href="/projects" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-black text-white text-sm font-light tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}