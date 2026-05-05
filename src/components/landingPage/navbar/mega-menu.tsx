import React from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResourceCard } from './resource-card';
import { ResourceType, ResourceItem } from './types';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  title: string;
  sections: Array<{
    label: string;
    items?: Array<{
      id?: string;
      title: string;
      description?: string;
      href?: string;
      onClick?: () => void;
    }>;
    resourceItems?: ResourceItem[];
  }>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  footerLink?: {
    label: string;
    href: string;
  };
  isLoading?: boolean;
  emptyMessage?: string;
  maxItemsPerSection?: number;
  isResources?: boolean;
  onClose?: () => void;
}

export function MegaMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  title,
  sections,
  activeSection,
  setActiveSection,
  footerLink,
  isLoading,
  emptyMessage = 'No items available',
  maxItemsPerSection = 16,
  isResources = false,
  onClose,
}: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full border-t border-black/5 bg-transparent animate-in fade-in-0 slide-in-from-top-1 duration-150 ease-out"
    >
      <div className="max-w-8xl mx-auto px-5 md:px-8 lg:px-10 py-0">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
          {isLoading ? (
            <div className="px-6 py-10 text-center">
              <p className="text-black/40">Loading {title.toLowerCase()}...</p>
            </div>
          ) : sections.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-black/40">{emptyMessage}</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 min-h-[400px]">
              {/* Left rail */}
              <div className="col-span-3 bg-slate-50 p-4 border-r border-slate-200 overflow-y-auto max-h-[520px]">
                <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  {title}
                </p>
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const active = section.label === activeSection;
                    return (
                      <li key={section.label}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveSection(section.label)}
                          onClick={() => setActiveSection(section.label)}
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
              <div className="col-span-9 p-8 overflow-y-auto max-h-[520px]">
                {sections
                  .filter((s) => s.label === activeSection)
                  .map((section) => (
                    <div key={section.label} className="flex h-full flex-col">
                      {isResources ? (
                        <div className="flex h-full flex-col">
                          {section.resourceItems && section.resourceItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {section.resourceItems.slice(0, 3).map((item, idx) => (
                                <ResourceCard
                                  key={item.id || idx}
                                  type={activeSection as ResourceType}
                                  item={item}
                                  onClick={onClose}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-1 items-center justify-center py-10">
                              <div className="text-center">
                                <p className="text-sm font-medium text-slate-400">
                                  No {activeSection.toLowerCase()} available at the moment.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid flex-1 content-start gap-6 sm:grid-cols-2">
                          {section.items?.slice(0, maxItemsPerSection).map((item, idx) => {
                            const itemContent = (
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 group-hover:text-accent">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <ChevronDown className="mt-0.5 h-4 w-4 -rotate-90 text-slate-300 transition-colors group-hover:text-accent" />
                              </div>
                            );

                            if (item.href) {
                              return (
                                <Link
                                  key={item.href || idx}
                                  href={item.href}
                                  onClick={item.onClick}
                                  className="group rounded-md p-2 transition-colors hover:bg-slate-50"
                                >
                                  {itemContent}
                                </Link>
                              );
                            }

                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={item.onClick}
                                className="group rounded-md p-2 text-left transition-colors hover:bg-slate-50"
                              >
                                {itemContent}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {(footerLink || isResources) && (
                        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-center">
                          <Link
                            href={footerLink?.href || `/${activeSection.toLowerCase().replace(' ', '-')}`}
                            onClick={onClose}
                            className="group inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/5 text-accent text-sm font-bold hover:bg-accent hover:text-white transition-all duration-300"
                          >
                            {isResources ? `Click here to see more ${activeSection}` : footerLink?.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
