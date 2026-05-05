'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn, getCategoryName, resolveImageUrl } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';
import { getServicePath, serviceMenuSections, getAllServicePages } from '@/lib/service-pages';

import { Project, ProjectCategory, ProjectItem, ResourceItem, ResourceType } from './navbar/types';
import { hireUsItems, LOGO_COLOR_SRC, LOGO_WHITE_SRC, HOVER_MENU_CLOSE_MS } from './navbar/constants';
import { NavItem } from './navbar/nav-item';
import { MegaMenu } from './navbar/mega-menu';
import { MobileNav } from './navbar/mobile-nav';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeServiceSection, setActiveServiceSection] = useState<string>(serviceMenuSections[0]?.label ?? '');
  const [activeSolutionsSection, setActiveSolutionsSection] = useState<string>('');
  const [activeResourceSection, setActiveResourceSection] = useState<ResourceType>('Case Studies');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === '/';
  const isAbout = pathname === '/about-us';

  // Fetch projects from API for Solutions dropdown
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['projects-public'],
    queryFn: () => apiGet<Project[]>('/api/projects'),
  });

  // Fetch Resources Data
  const { data: blogPosts = [], isLoading: isLoadingBlog } = useQuery<any[]>({
    queryKey: ['blog-posts-nav'],
    queryFn: () => apiGet<any[]>('/api/blog').catch(() => []),
  });

  const { data: caseStudies = [], isLoading: isLoadingCaseStudies } = useQuery<any[]>({
    queryKey: ['case-studies-nav'],
    queryFn: () => apiGet<any[]>('/api/case-studies').catch(() => []),
  });

  const { data: testimonials = [], isLoading: isLoadingTestimonials } = useQuery<any[]>({
    queryKey: ['testimonials-nav'],
    queryFn: () => apiGet<any[]>('/api/testimonials').catch(() => []),
  });

  const faqsData = useMemo(() => {
    return getAllServicePages().slice(0, 6).map(s => ({
      id: s.slug,
      title: s.title,
      description: s.metaDescription,
      href: `/faqs/${s.slug}`
    }));
  }, []);

  const isLoadingResources = isLoadingBlog || isLoadingCaseStudies || isLoadingTestimonials;

  // Group projects by category
  const groupedProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    return projects.reduce((acc: ProjectCategory[], project) => {
      const categoryName = getCategoryName(project.category);
      const existingCategory = acc.find((cat) => cat.category === categoryName);

      const projectItem: ProjectItem = {
        id: project._id,
        title: project.title,
        url: project.url || `/software-solutions/${project._id}`,
        externalUrl: project.url,
      };

      if (existingCategory) {
        existingCategory.items.push(projectItem);
      } else {
        acc.push({ category: categoryName, items: [projectItem] });
      }
      return acc;
    }, []);
  }, [projects]);

  const resourcesSections = useMemo(() => {
    const sections: Array<{ label: ResourceType; resourceItems: ResourceItem[] }> = [
      {
        label: 'Case Studies',
        resourceItems: (Array.isArray(caseStudies) ? caseStudies : []).map(cs => ({
          id: cs._id,
          title: cs.title || cs.project?.title || 'Case Study',
          description: cs.excerpt || cs.project?.description || '',
          image: resolveImageUrl(cs.thumbnail || cs.project?.thumbnail),
          href: `/case-studies/${cs.slug || cs._id}`,
          date: cs.createdAt ? new Date(cs.createdAt).toLocaleDateString() : undefined
        }))
      },
      {
        label: 'Blog',
        resourceItems: (Array.isArray(blogPosts) ? blogPosts : []).map(post => ({
          id: post._id,
          title: post.title || 'Blog Post',
          description: post.excerpt || '',
          image: resolveImageUrl(post.thumbnail),
          href: `/blog/${post.slug || post._id}`,
          date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : undefined,
          tags: post.tags
        }))
      },
      {
        label: 'FAQs',
        resourceItems: faqsData
      },
      {
        label: 'Testimonials',
        resourceItems: (Array.isArray(testimonials) ? testimonials : []).map(t => ({
          id: t._id,
          title: t.authorName || 'Client',
          description: t.content || '',
          author: t.authorName || 'Client',
          rating: t.rating || 5,
          href: '/testimonials'
        }))
      }
    ];
    return sections;
  }, [caseStudies, blogPosts, testimonials, faqsData]);

  useEffect(() => {
    if (activeDropdown === 'solutions' && groupedProjects.length > 0) {
      if (!activeSolutionsSection || !groupedProjects.some((s) => s.category === activeSolutionsSection)) {
        setActiveSolutionsSection(groupedProjects[0]?.category ?? '');
      }
    }
  }, [activeDropdown, groupedProjects, activeSolutionsSection]);

  const closeDropdowns = () => {
    setActiveDropdown(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (dropdown === 'services') setActiveServiceSection(serviceMenuSections[0]?.label ?? '');
    if (dropdown === 'solutions') setActiveSolutionsSection(groupedProjects[0]?.category ?? '');
    if (dropdown === 'resources') setActiveResourceSection('Case Studies');
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, HOVER_MENU_CLOSE_MS);
  };

  const handleProjectClick = (project: ProjectItem) => {
    closeDropdowns();
    if (project.externalUrl) {
      window.open(project.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      router.push(project.url || `/software-solutions/${project.id}`);
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  const isLightHero = (isHome || isAbout) && !isScrolled && !isPageLoading;
  const navStyle = isPageLoading
    ? 'bg-white border-b border-black/10 shadow-sm'
    : isScrolled
      ? 'bg-white/95 border-b border-black/10 shadow-sm'
      : 'bg-white/10 backdrop-blur-md border-b border-transparent';

  const logoToShow = isPageLoading || !isLightHero ? LOGO_COLOR_SRC : LOGO_WHITE_SRC;
  const isActivePath = (path: string) => pathname === path;

  const serviceSections = useMemo(() => serviceMenuSections.map((section) => ({
    label: section.label,
    items: section.items.map((item) => ({
      title: item.title,
      description: item.description,
      href: getServicePath(section.label, item.title),
      onClick: closeDropdowns
    })),
  })), []);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', navStyle)}>
      <div className="max-w-8xl mx-auto px-5 md:px-8 lg:px-10 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90" onClick={closeDropdowns}>
          <Image src={logoToShow} alt="ClickMasters" width={600} height={400} className="h-auto w-30 sm:w-48 xl:w-64" priority />
        </Link>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-8">
          <NavItem
            label="Your Solutions"
            hasDropdown
            isOpen={activeDropdown === 'solutions'}
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
            onClick={() => { }}
            isPageLoading={isPageLoading}
            isLightHero={isLightHero}
          />
          <NavItem
            label="Our Services"
            hasDropdown
            isOpen={activeDropdown === 'services'}
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
            onClick={() => { }}
            isPageLoading={isPageLoading}
            isLightHero={isLightHero}
          />
          <NavItem
            label="Hire Us"
            hasDropdown
            isOpen={activeDropdown === 'hire-us'}
            onMouseEnter={() => handleMouseEnter('hire-us')}
            onMouseLeave={handleMouseLeave}
            onClick={() => { }}
            isPageLoading={isPageLoading}
            isLightHero={isLightHero}
          />
          <NavItem
            label="Resources"
            hasDropdown
            isOpen={activeDropdown === 'resources'}
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
            onClick={() => { }}
            isPageLoading={isPageLoading}
            isLightHero={isLightHero}
          />

          {['About Us', 'Contact Us'].map((item) => (
            <NavItem
              key={item}
              label={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              isActive={isActivePath(`/${item.toLowerCase().replace(' ', '-')}`)}
              onClick={closeDropdowns}
              isPageLoading={isPageLoading}
              isLightHero={isLightHero}
            />
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <Link href="/admin/login" onClick={closeDropdowns}>
            <button className={cn('relative group p-[1px] overflow-hidden rounded-md transition-all duration-300', isPageLoading || !isLightHero ? 'bg-gold/15' : 'bg-transparent')}>
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#9b6f24_0deg,#1e3a8a_180deg,#9b6f24_360deg)]" />
              <div className="relative px-5 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#12224b] to-[#9b6f24] hover:bg-accent/90 transition-colors duration-300 w-full h-full flex items-center justify-center">
                Sign In
              </div>
            </button>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <button className={cn('p-2 transition-colors', isLightHero ? 'text-white/90 hover:text-accent' : 'text-black/70 hover:text-accent')}>
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <MobileNav
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            pathname={pathname}
            groupedProjects={groupedProjects}
            isLoadingProjects={isLoadingProjects}
            handleProjectClick={handleProjectClick}
            hireUsItems={hireUsItems}
            resourcesSections={resourcesSections}
          />
        </Sheet>
      </div>

      <MegaMenu
        title="Solutions"
        isOpen={activeDropdown === 'solutions'}
        onMouseEnter={() => handleMouseEnter('solutions')}
        onMouseLeave={handleMouseLeave}
        onClose={closeDropdowns}
        sections={groupedProjects.map(g => ({
          label: g.category,
          items: g.items.map(i => ({ title: i.title, onClick: () => handleProjectClick(i) }))
        }))}
        activeSection={activeSolutionsSection}
        setActiveSection={setActiveSolutionsSection}
        footerLink={{ label: 'Browse all solutions', href: '/software-solutions' }}
        isLoading={isLoadingProjects}
      />

      <MegaMenu
        title="Services"
        isOpen={activeDropdown === 'services'}
        onMouseEnter={() => handleMouseEnter('services')}
        onMouseLeave={handleMouseLeave}
        onClose={closeDropdowns}
        sections={serviceSections}
        activeSection={activeServiceSection}
        setActiveSection={setActiveServiceSection}
        footerLink={{ label: 'All services', href: '/services' }}
      />

      <MegaMenu
        title="Hire Us"
        isOpen={activeDropdown === 'hire-us'}
        onMouseEnter={() => handleMouseEnter('hire-us')}
        onMouseLeave={handleMouseLeave}
        onClose={closeDropdowns}
        sections={[{
          label: 'Development Services',
          items: hireUsItems.map(i => ({ title: i.title, href: i.href, onClick: closeDropdowns }))
        }]}
        activeSection="Development Services"
        setActiveSection={() => { }}
        footerLink={{ label: 'Contact sales', href: '/contact-us' }}
      />

      <MegaMenu
        title="Resources"
        isResources
        isOpen={activeDropdown === 'resources'}
        onMouseEnter={() => handleMouseEnter('resources')}
        onMouseLeave={handleMouseLeave}
        onClose={closeDropdowns}
        sections={resourcesSections}
        activeSection={activeResourceSection}
        setActiveSection={(s) => setActiveResourceSection(s as ResourceType)}
        isLoading={isLoadingResources}
      />
    </header>
  );
}