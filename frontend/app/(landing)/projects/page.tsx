'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { getCategoryName, resolveImageUrl } from "@/lib/utils";
import { 
  ExternalLink, 
  FolderKanban, 
  ArrowUpRight, 
  Code, 
  Globe, 
  Smartphone, 
  ArrowRight,
  Search,
  X,
  Filter,
  ChevronDown
} from "lucide-react";
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
  technologies?: string[];
  client?: string;
  completionDate?: string;
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

// Get color for status
const getStatusColor = (status: string) => {
  switch(status) {
    case 'live': return 'bg-emerald-500/90';
    case 'in-progress': return 'bg-amber-500/90';
    case 'completed': return 'bg-blue-500/90';
    default: return 'bg-gray-500/90';
  }
};

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  // Extract unique categories and statuses for filters
  const categories = ['all', ...new Set(projects.map(p => getCategoryName(p.category)))];
  const statuses = ['all', 'live', 'in-progress', 'completed'];

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      getCategoryName(project.category) === selectedCategory;
    
    const matchesStatus = selectedStatus === 'all' || 
      project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Premium GSAP animations
  useEffect(() => {
    if (!hasAnimated && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Master timeline for coordinated entrance
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => setHasAnimated(true)
          }
        });

        // Header animation
        if (headerRef.current) {
          masterTl.fromTo(headerRef.current,
            {
              opacity: 0,
              y: 60,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out"
            }
          );
        }

        // Filters animation
        if (filtersRef.current) {
          masterTl.fromTo(filtersRef.current,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            },
            "-=0.6"
          );
        }

        // Projects grid entrance - animate each card
        const projectCards = projectsGridRef.current?.children;
        if (projectCards) {
          Array.from(projectCards).forEach((card, index) => {
            masterTl.fromTo(card,
              {
                opacity: 0,
                y: 100,
                rotationX: 30,
                scale: 0.8,
                transformPerspective: 1000
              },
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.2)",
                delay: index * 0.1
              },
              "-=0.8"
            );
          });
        }

        // Add floating particles to background
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-orange-500/20 rounded-full pointer-events-none';
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          sectionRef.current?.appendChild(particle);

          gsap.to(particle, {
            y: gsap.utils.random(-50, 50),
            x: gsap.utils.random(-50, 50),
            scale: gsap.utils.random(1, 3),
            opacity: gsap.utils.random(0.1, 0.4),
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [hasAnimated, filteredProjects.length]);

  // Project card component
  const renderProjectCard = (project: Project, index: number) => {
    const isExternal = project.url?.startsWith("http");
    const projectId = project._id;
    const isHovered = hoveredProject === projectId;
    const CategoryIcon = getCategoryIcon(getCategoryName(project.category));
    
    const cardContent = (
      <div
        onMouseEnter={() => setHoveredProject(projectId)}
        onMouseLeave={() => setHoveredProject(null)}
        className="group relative h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' as const }}
      >
        {/* Premium Card Design */}
        <div className="relative bg-white rounded-2xl border border-orange-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] h-full overflow-hidden hover:shadow-[0_20px_40px_-20px_rgba(249,115,22,0.3)] transition-shadow duration-500">
          
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
                <CategoryIcon className="h-12 w-12 text-orange-500/30" />
              </div>
            )}
            
            {/* Status Badge */}
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge className={`${getStatusColor(project.status)} text-white border-0 text-xs font-medium px-3 py-1 rounded-full`}>
                {project.status === 'live' ? 'Live' : 
                 project.status === 'in-progress' ? 'In Progress' : 'Completed'}
              </Badge>
            </motion.div>

            {/* Category Icon Overlay */}
            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <CategoryIcon className="w-4 h-4 text-orange-500" />
              </div>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-black mb-2 line-clamp-1">
              {project.title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Technologies if available */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Link */}
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

  // Loading skeletons
  if (isLoading) {
    return (
      <section className="relative py-24 overflow-hidden bg-white font-sans min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <div className="h-px w-20 bg-orange-500/30 mx-auto mb-8" />
            <div className="h-12 w-96 bg-orange-500/5 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-64 bg-orange-500/5 rounded mx-auto animate-pulse" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="relative">
                <div className="relative bg-white rounded-2xl border border-orange-500/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-orange-500/5 to-orange-500/10 animate-pulse" />
                  <div className="p-6">
                    <div className="h-5 w-3/4 bg-orange-500/5 rounded animate-pulse mb-2" />
                    <div className="h-4 w-full bg-orange-500/5 rounded animate-pulse mb-2" />
                    <div className="h-4 w-2/3 bg-orange-500/5 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-white font-sans min-h-screen"
    >
      {/* Premium Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/3 to-transparent rounded-full blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #f97316 1px, transparent 1px),
                             linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-orange-500/30 mx-auto mb-8"
          />
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-4">
            Our 
            <span className="font-bold text-orange-500 block mt-2">
              Project Portfolio
            </span>
          </h1>
          
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mt-4">
            Explore our complete collection of custom software, web applications, 
            and digital solutions built for clients across various industries.
          </p>
        </div>

        {/* Search and Filters */}
        <div ref={filtersRef} className="max-w-5xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative group mb-4">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-orange-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative flex items-center bg-white border border-orange-500/10 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search projects by title or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-base bg-transparent rounded-xl focus:outline-none focus:border-orange-500/30 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-orange-500/10 rounded-xl text-black/60 hover:text-orange-500 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          <div className={`grid lg:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-500/10 rounded-xl text-black focus:outline-none focus:border-orange-500/30 appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-500/10 rounded-xl text-black focus:outline-none focus:border-orange-500/30 appearance-none cursor-pointer"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : 
                     status === 'live' ? 'Live' : 
                     status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
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
            <h3 className="text-xl font-bold text-black mb-2">No projects found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-orange-500 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div 
            ref={projectsGridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
        )}

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors"
          >
            <ArrowUpRight className="h-4 w-4 rotate-90" />
            Back to Top
          </button>
        </motion.div>
      </div>
    </section>
  );
}