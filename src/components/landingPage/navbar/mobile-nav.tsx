import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SheetContent } from '@/components/ui/sheet';
import { LOGO_COLOR_SRC, mobileServicePageLinks } from './constants';
import { ProjectCategory, ProjectItem, HireUsItem, ResourceItem } from './types';

interface MobileAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function MobileAccordion({ title, isOpen, onToggle, children }: MobileAccordionProps) {
  return (
    <div className="border-b border-black/5">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 font-medium text-black/70 hover:text-accent transition-colors"
      >
        {title}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && <div className="mt-2 pb-4">{children}</div>}
    </div>
  );
}

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  groupedProjects: ProjectCategory[];
  isLoadingProjects: boolean;
  handleProjectClick: (project: ProjectItem) => void;
  hireUsItems: HireUsItem[];
  resourcesSections?: Array<{ label: string; resourceItems: ResourceItem[] }>;
}

export function MobileNav({
  isOpen,
  setIsOpen,
  pathname,
  groupedProjects,
  isLoadingProjects,
  handleProjectClick,
  hireUsItems,
  resourcesSections = [],
}: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActivePath = (path: string) => pathname === path;
  const closeMenu = () => setIsOpen(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      onClick={closeMenu}
      className={cn(
        'py-3 font-medium transition-colors border-b border-black/5 block',
        isActivePath(href) ? 'text-accent font-bold' : 'text-black/70 hover:text-accent'
      )}
    >
      {children}
    </Link>
  );

  return (
    <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-white border-l border-black/10">
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <Image
            src={LOGO_COLOR_SRC}
            alt="ClickMasters"
            width={800}
            height={400}
            className="h-auto w-36"
          />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col space-y-1">
            <NavLink href="/">Home</NavLink>

            {/* Solutions */}
            <MobileAccordion
              title="Solutions"
              isOpen={expandedSection === 'solutions'}
              onToggle={() => toggleSection('solutions')}
            >
              {isLoadingProjects ? (
                <p className="pl-4 text-black/40 text-sm">Loading projects...</p>
              ) : groupedProjects.length === 0 ? (
                <p className="pl-4 text-black/40 text-sm">No projects available</p>
              ) : (
                <div className="pl-4 space-y-4">
                  {groupedProjects.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-semibold text-accent mb-2">{section.category}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              onClick={() => {
                                handleProjectClick(item);
                                closeMenu();
                              }}
                              className="text-black/60 hover:text-accent transition-colors block py-1 text-left w-full text-sm"
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
                      href="/software-solutions"
                      onClick={closeMenu}
                      className="text-accent hover:text-accent/80 text-sm font-medium inline-flex items-center gap-1"
                    >
                      View All Projects <ChevronDown className="h-3 w-3 -rotate-90" />
                    </Link>
                  </div>
                </div>
              )}
            </MobileAccordion>

            {/* Services */}
            <MobileAccordion
              title="Services"
              isOpen={expandedSection === 'services'}
              onToggle={() => toggleSection('services')}
            >
              <div className="pl-4 space-y-2">
                {mobileServicePageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-1.5 text-sm text-black/60 hover:text-accent transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </MobileAccordion>

            {/* Resources */}
            <MobileAccordion
              title="Resources"
              isOpen={expandedSection === 'resources'}
              onToggle={() => toggleSection('resources')}
            >
              <div className="pl-4 space-y-4">
                {resourcesSections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-semibold text-accent mb-2">{section.label}</h4>
                    <ul className="space-y-2">
                      {section.resourceItems.slice(0, 5).map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="text-black/60 hover:text-accent transition-colors block py-1 text-sm"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={`/${section.label.toLowerCase().replace(' ', '-')}`}
                          onClick={closeMenu}
                          className="text-accent hover:text-accent/80 text-xs font-bold block py-1"
                        >
                          View All {section.label} →
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </MobileAccordion>

            {/* Hire Us */}
            <MobileAccordion
              title="Hire Us"
              isOpen={expandedSection === 'hire-us'}
              onToggle={() => toggleSection('hire-us')}
            >
              <div className="pl-4 space-y-2">
                {hireUsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-1.5 text-sm text-black/60 hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-black/40" />
                      <span>{item.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </MobileAccordion>

            <NavLink href="/about-us">About Us</NavLink>
            <NavLink href="/contact-us">Contact Us</NavLink>
          </div>
        </nav>

        {/* Mobile Footer */}
        <div className="p-6 border-t border-black/5">
          <Link href="/admin/login" onClick={closeMenu}>
            <button className="w-full px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#12224b] to-[#9b6f24] hover:bg-accent/90 transition-colors duration-300 rounded-md">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </SheetContent>
  );
}
