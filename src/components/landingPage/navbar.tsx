'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { getCategoryName } from '@/lib/utils';

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
  status: 'live' | 'in-progress' | 'completed';
  technologies?: string[];
  client?: string;
  completionDate?: string;
}

type ServiceMenuItem = {
  title: string;
  description: string;
  href: string;
};

type ServiceMenuSection = {
  label: string;
  items: ServiceMenuItem[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeServiceSection, setActiveServiceSection] = useState<string>('Engineering Services');
  const [activeSolutionsSection, setActiveSolutionsSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === '/';
  const isAbout = pathname === '/about-us';

  // Fetch projects from API for Solutions dropdown
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['projects-public'],
    queryFn: async () => {
      const res = await apiFetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  // Group projects by category
  const groupedProjects = projects.reduce((acc: ProjectCategory[], project) => {
    const categoryName = getCategoryName(project.category);
    const existingCategory = acc.find((cat) => cat.category === categoryName);

    const projectItem: ProjectItem = {
      id: project._id,
      title: project.title,
      url: project.url || `/software-solutions/${project._id}`, // Use external URL if exists, otherwise internal
      externalUrl: project.url, // Store external URL separately if needed
    };

    if (existingCategory) {
      existingCategory.items.push(projectItem);
    } else {
      acc.push({
        category: categoryName,
        items: [projectItem],
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    if (activeDropdown !== 'solutions') return;
    if (groupedProjects.length === 0) return;
    if (!activeSolutionsSection || !groupedProjects.some((s) => s.category === activeSolutionsSection)) {
      setActiveSolutionsSection(groupedProjects[0]?.category ?? '');
    }
  }, [activeDropdown, groupedProjects, activeSolutionsSection]);

  // Handle project click
  const handleProjectClick = (project: ProjectItem) => {
    closeDropdowns();
    if (project.externalUrl) {
      // If it's an external URL, open in new tab
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If it's internal, navigate using router
      router.push(project.url || `/software-solutions/${project.id}`);
    }
  };

  // Handle Solutions link click
  const handleSolutionsClick = () => {
    closeDropdowns();
    router.push('/software-solutions');
  };

  const handleServicesClick = () => {
    closeDropdowns();
    router.push('/services');
  };

  const serviceSections: ServiceMenuSection[] = [
    {
      label: 'Engineering Services',
      items: [
        {
          title: 'Custom Software Development',
          description: 'Enterprise-grade systems, automation, and modernization.',
          href: `/services#${slugify('custom-software-development')}`,
        },
        {
          title: 'Web Application Development',
          description: 'Scalable SPAs, dashboards, and high-performance web apps.',
          href: `/services#${slugify('web-application-development')}`,
        },
        {
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile apps for iOS and Android.',
          href: `/services#${slugify('mobile-app-development')}`,
        },
      ],
    },
    {
      label: 'Data & Platforms',
      items: [
        {
          title: 'Database Design & Management',
          description: 'Secure SQL/NoSQL design, migrations, and performance tuning.',
          href: `/services#${slugify('database-design-management')}`,
        },
        {
          title: 'Cloud Solutions & DevOps',
          description: 'CI/CD, cloud migration, containers, reliability, and monitoring.',
          href: `/services#${slugify('cloud-solutions-devops')}`,
        },
      ],
    },
    {
      label: 'Security & Compliance',
      items: [
        {
          title: 'Cybersecurity & Compliance',
          description: 'Audits, pentesting, IAM, encryption, and regulatory readiness.',
          href: `/services#${slugify('cybersecurity-compliance')}`,
        },
      ],
    },
  ];

  useEffect(() => {
    if (activeDropdown !== 'services') return;
    if (!serviceSections.some((s) => s.label === activeServiceSection)) {
      setActiveServiceSection(serviceSections[0]?.label ?? 'Engineering Services');
    }
  }, [activeDropdown]);

  // Check if page is loading
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isLightHero = (isHome || isAbout) && !isScrolled && !isPageLoading;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    ? 'bg-white border-b border-black/10 shadow-sm'
    : isScrolled
      ? 'bg-white/95 border-b border-black/10 shadow-sm'
      : 'bg-white/10 backdrop-blur-md border-b border-transparent';

  const logoToShow = isPageLoading || !isLightHero ? '/logo.webp' : '/logo-white.webp';

  const linkStyle = (isActive: boolean) => {
    if (isPageLoading) {
      return isActive ? 'text-primary font-bold' : 'text-black/70 hover:text-primary';
    }
    if (isActive) {
      return 'text-primary font-bold';
    }
    if (isLightHero) {
      return 'text-white/90 hover:text-primary';
    }
    return 'text-black/70 hover:text-primary';
  };

  return (
    <header
      className={cn('fixed inset-x-0 top-0 z-50 w-full transition-all duration-300', navStyle)}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={closeDropdowns}
        >
          <img src={logoToShow} className="w-48 md:w-64 h-auto" alt="ClickMasters" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            onClick={closeDropdowns}
            className={cn('text-sm font-medium transition-colors', linkStyle(isActivePath('/')))}
          >
            Home
          </Link>

          {/* Solutions Dropdown - Hover with click navigation */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleSolutionsClick}
              className={cn(
                'text-sm font-medium transition-colors flex items-center gap-1',
                activeDropdown === 'solutions'
                  ? isScrolled
                    ? 'text-primary'
                    : 'text-primary'
                  : isPageLoading
                    ? 'text-black/70 hover:text-primary'
                    : isLightHero
                      ? 'text-white/90 hover:text-primary'
                      : 'text-black/70 hover:text-primary'
              )}
            >
              Solutions
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'solutions' && 'rotate-180'
                )}
              />
            </button>
          </div>

          {/* Services Dropdown - Mega menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleServicesClick}
              className={cn(
                'text-sm font-medium transition-colors flex items-center gap-1',
                activeDropdown === 'services'
                  ? 'text-primary'
                  : isPageLoading
                    ? 'text-black/70 hover:text-primary'
                    : isLightHero
                      ? 'text-white/90 hover:text-primary'
                      : 'text-black/70 hover:text-primary'
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'services' && 'rotate-180'
                )}
              />
            </button>
          </div>

          <Link
            href="/case-studies"
            onClick={closeDropdowns}
            className={cn(
              'text-sm font-medium transition-colors',
              linkStyle(isActivePath('/case-studies'))
            )}
          >
            Case Studies
          </Link>



          <Link
            href="/about-us"
            onClick={closeDropdowns}
            className={cn(
              'text-sm font-medium transition-colors',
              linkStyle(isActivePath('/about-us'))
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={closeDropdowns}
            className={cn(
              'text-sm font-medium transition-colors',
              linkStyle(isActivePath('/contact-us'))
            )}
          >
            Contact Us
          </Link>

          <Link
            href="/testimonials"
            onClick={closeDropdowns}
            className={cn(
              'text-sm font-medium transition-colors',
              linkStyle(isActivePath('/testimonials'))
            )}
          >
            Testimonials
          </Link>

          <Link
            href="/blog"
            onClick={closeDropdowns}
            className={cn('text-sm font-medium transition-colors', linkStyle(isActivePath('/blog')))}
          >
            Blog
          </Link>

        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admin/login" onClick={closeDropdowns}>
            <button
              className={cn(
                'px-5 py-2 text-sm font-medium transition-colors duration-300',
                isPageLoading
                  ? 'text-white bg-primary hover:bg-primary/90'
                  : isScrolled
                    ? 'text-white rounded-md bg-primary hover:bg-primary/90'
                    : 'text-white bg-primary rounded-md hover:bg-primary/90'
              )}
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className={cn(
                'p-2 transition-colors',
                isLightHero
                  ? 'text-white/90 hover:text-primary'
                  : 'text-black/70 hover:text-primary'
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
                <img src="/logo.webp" className="w-36 h-auto" alt="ClickMasters" />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-2">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
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
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/services')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
                    )}
                  >
                    Services
                  </Link>

                  <Link
                    href="/case-studies"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/case-studies')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
                    )}
                  >
                    Case Studies
                  </Link>

                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/blog')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
                    )}
                  >
                    Blog
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/about-us')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
                    )}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/contact-us')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
                    )}
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/testimonials"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'py-3 font-medium transition-colors border-b border-black/5',
                      isActivePath('/testimonials')
                        ? 'text-primary font-bold'
                        : 'text-black/70 hover:text-primary'
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
      {activeDropdown === 'solutions' && !isPageLoading && (
        <div
          ref={dropdownRef}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 right-0 top-full border-t border-black/5 animate-slideDown bg-transparent"
        >
          <div className="container mx-auto px-4 lg:px-8 py-0">
            {isLoadingProjects ? (
              <div className="mx-auto max-w-6xl py-10 text-center">
                <p className="text-black/40">Loading projects...</p>
              </div>
            ) : groupedProjects.length === 0 ? (
              <div className="mx-auto max-w-6xl py-10 text-center">
                <p className="text-black/40">No projects available</p>
              </div>
            ) : (
              <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
                <div className="grid grid-cols-12">
                  {/* Left rail */}
                  <div className="col-span-3 bg-slate-50 p-4 border-r border-slate-200">
                    <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                      Solutions
                    </p>
                    <ul className="space-y-1">
                      {groupedProjects.map((section) => {
                        const active = section.category === activeSolutionsSection;
                        return (
                          <li key={section.category}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveSolutionsSection(section.category)}
                              onClick={() => setActiveSolutionsSection(section.category)}
                              className={cn(
                                'w-full rounded-md px-3 py-2.5 text-left text-sm font-semibold transition-colors flex items-center justify-between',
                                active
                                  ? 'bg-white text-slate-900 shadow-sm'
                                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                              )}
                            >
                              <span>{section.category}</span>
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 -rotate-90 transition-opacity',
                                  active ? 'opacity-70' : 'opacity-0'
                                )}
                                aria-hidden
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Right content */}
                  <div className="col-span-9 p-8">
                    {groupedProjects
                      .filter((s) => s.category === activeSolutionsSection)
                      .map((section) => (
                        <div key={section.category}>
                          <div className="grid gap-6 sm:grid-cols-2">
                            {section.items.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleProjectClick(item)}
                                className="group rounded-md p-2 text-left transition-colors hover:bg-slate-50"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <p className="text-sm font-semibold text-slate-900 group-hover:text-primary">
                                    {item.title}
                                  </p>
                                  <ChevronDown className="mt-0.5 h-4 w-4 -rotate-90 text-slate-300 transition-colors group-hover:text-primary" />
                                </div>
                              </button>
                            ))}
                          </div>

                          <div className="mt-6 border-t border-slate-200 pt-4">
                            <Link
                              href="/software-solutions"
                              onClick={closeDropdowns}
                              className="text-xs font-semibold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors"
                            >
                              Browse all solutions →
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full-width Dropdown Menu for Services */}
      {activeDropdown === 'services' && !isPageLoading && (
        <div
          ref={dropdownRef}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
          }}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 right-0 top-full border-t border-black/5 animate-slideDown bg-transparent"
        >
          <div className="container mx-auto px-4 lg:px-8 py-0">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
              <div className="grid grid-cols-12">
                {/* Left rail */}
                <div className="col-span-3 bg-slate-50 p-4 border-r border-slate-200">
                  <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Services
                  </p>
                  <ul className="space-y-1">
                    {serviceSections.map((section) => {
                      const active = section.label === activeServiceSection;
                      return (
                        <li key={section.label}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveServiceSection(section.label)}
                            onClick={() => setActiveServiceSection(section.label)}
                            className={cn(
                              'w-full rounded-md px-3 py-2.5 text-left text-sm font-semibold transition-colors flex items-center justify-between',
                              active
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                            )}
                          >
                            <span>{section.label}</span>
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 -rotate-90 transition-opacity',
                                active ? 'opacity-70' : 'opacity-0 group-hover:opacity-60'
                              )}
                              aria-hidden
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right content */}
                <div className="col-span-9 p-8">
                  {serviceSections
                    .filter((s) => s.label === activeServiceSection)
                    .map((section) => (
                      <div key={section.label}>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeDropdowns}
                              className="group rounded-md p-2 transition-colors hover:bg-slate-50"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 group-hover:text-primary">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                    {item.description}
                                  </p>
                                </div>
                                <ChevronDown className="mt-0.5 h-4 w-4 -rotate-90 text-slate-300 transition-colors group-hover:text-primary" />
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-6 border-t border-slate-200 pt-4">
                          <Link
                            href="/services"
                            onClick={closeDropdowns}
                            className="text-xs font-semibold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors"
                          >
                            All services →
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
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

function MobileDropdown({
  title,
  items,
  isLoading,
  onLinkClick,
  onProjectClick,
}: MobileDropdownProps) {
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
            <h4 className="text-sm font-semibold text-primary mb-2">{section.category}</h4>
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
          className={cn('h-4 w-4 transition-transform duration-300', isExpanded && 'rotate-180')}
        />
      </button>
      {isExpanded && renderItems()}
    </div>
  );
}
