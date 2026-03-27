"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { getCategoryName } from "@/lib/utils";

// Types for dropdown data
interface ProjectItem {
  id: string;
  title: string;
  url?: string;
  externalUrl?: string;
}

interface ProjectCategory {
  category: string;
  items: ProjectItem[];
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  category: string | { _id: string; name: string };
  status: "live" | "in-progress" | "completed";
  technologies?: string[];
  client?: string;
  completionDate?: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about-us";

  // Fetch projects from API for Solutions dropdown
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  // Group projects by category
  const groupedProjects = projects.reduce((acc: ProjectCategory[], project) => {
    const categoryName = getCategoryName(project.category);
    const existingCategory = acc.find(cat => cat.category === categoryName);
    
    const projectItem: ProjectItem = {
      id: project._id,
      title: project.title,
      url: project.url || `/projects/${project._id}`, // Use external URL if exists, otherwise internal
      externalUrl: project.url // Store external URL separately if needed
    };
    
    if (existingCategory) {
      existingCategory.items.push(projectItem);
    } else {
      acc.push({
        category: categoryName,
        items: [projectItem]
      });
    }
    return acc;
  }, []);

  // Handle project click
  const handleProjectClick = (project: ProjectItem) => {
    closeDropdowns();
    if (project.externalUrl) {
      // If it's an external URL, open in new tab
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If it's internal, navigate using router
      router.push(project.url || `/projects/${project.id}`);
    }
  };

  // Handle Solutions link click
  const handleSolutionsClick = () => {
    closeDropdowns();
    router.push('/projects');
  };

  // Check if page is loading
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isLightHero = (isHome || isAbout) && !isScrolled && !isPageLoading;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  // During page loading, show black text and logo
  const navStyle = isPageLoading 
    ? "bg-white border-b border-black/10 shadow-sm"
    : isScrolled
      ? "bg-white/95 border-b border-black/10 shadow-sm"
      : "bg-white/10 backdrop-blur-md border-b border-transparent";

  const logoToShow = isPageLoading || !isLightHero ? "/logo.png" : "/logo-white.png";
  
  const linkStyle = (isActive: boolean) => {
    if (isPageLoading) {
      return isActive ? "text-primary font-bold" : "text-black/70 hover:text-primary";
    }
    if (isActive) {
      return "text-primary font-bold";
    }
    if (isLightHero) {
      return "text-white/90 hover:text-primary";
    }
    return "text-black/70 hover:text-primary";
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        navStyle
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={closeDropdowns}
        >
          <img 
            src={logoToShow}
            className="w-48 md:w-64 h-auto" 
            alt="ClickMasters" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-medium transition-colors",
              linkStyle(isActivePath("/"))
            )}
          >
            Home
          </Link>

          {/* Solutions Dropdown - Hover with click navigation */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleSolutionsClick}
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-1",
                activeDropdown === "solutions" 
                  ? isScrolled ? "text-primary" : "text-primary"
                  : isPageLoading
                    ? "text-black/70 hover:text-primary"
                    : isLightHero
                      ? "text-white/90 hover:text-primary"
                      : "text-black/70 hover:text-primary"
              )}
            >
              Solutions
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                activeDropdown === "solutions" && "rotate-180"
              )} />
            </button>
          </div>

          {/* Services Link */}
          <Link
            href="/services"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-medium transition-colors",
              linkStyle(isActivePath("/services"))
            )}
          >
            Services
          </Link>

          <Link
            href="/about-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-medium transition-colors",
              linkStyle(isActivePath("/about-us"))
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-medium transition-colors",
              linkStyle(isActivePath("/contact-us"))
            )}
          >
            Contact Us
          </Link>

          <Link
            href="/testimonials"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-medium transition-colors",
              linkStyle(isActivePath("/testimonials"))
            )}
          >
            Testimonials
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admin/login" onClick={closeDropdowns}>
            <button className={cn(
              "px-5 py-2 text-sm font-medium transition-colors duration-300",
              isPageLoading
                ? "text-white bg-primary hover:bg-primary/90"
                : isScrolled
                  ? "text-white rounded-md bg-primary hover:bg-primary/90"
                  : "text-white bg-primary rounded-md hover:bg-primary/90"
            )}>
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className={cn(
                "p-2 transition-colors",
                isLightHero
                  ? "text-white/90 hover:text-primary"
                  : "text-black/70 hover:text-primary"
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md p-0 bg-white border-l border-black/10"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <img src="/logo.png" className="w-36 h-auto" alt="ClickMasters" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-2">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 font-medium transition-colors border-b border-black/5",
                      isActivePath("/")
                        ? "text-primary font-bold"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Home
                  </Link>

                  {/* Solutions Mobile Dropdown */}
                  <MobileDropdown
                    title="Solutions"
                    items={groupedProjects}
                    isLoading={isLoadingProjects}
                    onLinkClick={() => setIsOpen(false)}
                    onProjectClick={handleProjectClick}
                  />

                  {/* Services */}
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 font-medium transition-colors border-b border-black/5",
                      isActivePath("/services")
                        ? "text-primary font-bold"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Services
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 font-medium transition-colors border-b border-black/5",
                      isActivePath("/about-us")
                        ? "text-primary font-bold"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 font-medium transition-colors border-b border-black/5",
                      isActivePath("/contact-us")
                        ? "text-primary font-bold"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/testimonials"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 font-medium transition-colors border-b border-black/5",
                      isActivePath("/testimonials")
                        ? "text-primary font-bold"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Testimonials
                  </Link>
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-black/5">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Full-width Dropdown Menu for Solutions */}
      {activeDropdown === "solutions" && !isPageLoading && (
        <div 
          ref={dropdownRef}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 right-0 bg-white border-t border-black/5 shadow-lg animate-slideDown"
        >
          <div className="container mx-auto px-4 lg:px-8 py-12">
            {isLoadingProjects ? (
              <div className="text-center py-12">
                <p className="text-black/40">Loading projects...</p>
              </div>
            ) : groupedProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-black/40">No projects available</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {groupedProjects.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-sm font-semibold mb-4 text-primary">
                        {section.category}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              onClick={() => handleProjectClick(item)}
                              className="text-black/60 hover:text-primary transition-colors block py-1 text-left w-full"
                            >
                              {item.title}
                              {item.externalUrl && (
                                <span className="ml-2 text-xs text-gray-400">(external)</span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="text-center pt-6 border-t border-black/5">
                  <Link
                    href="/projects"
                    onClick={closeDropdowns}
                    className="text-black/60 hover:text-primary transition-colors"
                  >
                    Browse all Projects →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// Mobile Dropdown Component
interface MobileDropdownProps {
  title: string;
  items: ProjectCategory[];
  isLoading?: boolean;
  onLinkClick: () => void;
  onProjectClick: (project: ProjectItem) => void;
}

function MobileDropdown({ title, items, isLoading, onLinkClick, onProjectClick }: MobileDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderItems = () => {
    if (isLoading) {
      return <p className="pl-4 text-black/40">Loading projects...</p>;
    }

    if (items.length === 0) {
      return <p className="pl-4 text-black/40">No projects available</p>;
    }

    return (
      <div className="pl-4 space-y-4 mt-3">
        {items.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-semibold text-primary mb-2">
              {section.category}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <button
                    onClick={() => {
                      onProjectClick(item);
                      onLinkClick();
                    }}
                    className="text-black/60 hover:text-primary transition-colors block py-1 text-left w-full"
                  >
                    {item.title}
                    {item.externalUrl && (
                      <span className="ml-2 text-xs text-gray-400">(external)</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-2">
          <Link
            href="/projects"
            onClick={onLinkClick}
            className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1"
          >
            View All Projects
            <ChevronDown className="h-3 w-3 -rotate-90" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="border-b border-black/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-3 font-medium text-black/70 hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && renderItems()}
    </div>
  );
}