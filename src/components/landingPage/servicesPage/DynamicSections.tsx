'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

type Section = {
  heading: string;
  body: string;
  items?: string[];
};

type DynamicSectionsProps = {
  sections: Section[];
  serviceName: string;
};

export default function DynamicSections({ sections, serviceName }: DynamicSectionsProps) {
  
  const makeBoldServiceName = (text: string, serviceName: string): string => {
    if (!text || !serviceName) return text || "";
    const regex = new RegExp(`(${serviceName})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  const getSectionId = (heading: string, index: number): string => {
    const h = heading.toLowerCase();
    if (h.includes('what is')) return 'what-is';
    if (h.includes('services we deliver') || h.includes('includes')) return 'our-services';
    if (h.includes('why b2b companies') || h.includes('why choose')) return 'why-choose-us';
    if (h.includes('process')) return 'our-process';
    if (h.includes('technology stack') || h.includes('tech stack')) return 'tech-stack';
    if (h.includes('industry use cases') || h.includes('industries')) return 'industries';
    if (h.includes('pricing')) return 'pricing';
    if (h.includes('testimonials')) return 'testimonials';
    if (h.includes('case study')) return 'case-study';
    return `section-${index}-${heading.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <>
      {sections.map((section, index) => {
        const items = section.items || [];
        const isTwoItems = items.length === 2;

        return (
          <motion.section
            key={section.heading}
            id={getSectionId(section.heading, index)}
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            {/* Improved Header */}
            <div className="mx-auto pt-20 pb-12 text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-[2px] w-10 rounded-full bg-orange-400" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">
                  SERVICE DETAIL
                </p>
                <span className="h-[2px] w-10 rounded-full bg-orange-400" />
              </div>

              <h2
                className="font-display text-3xl md:text-3xl font-bold tracking-tight leading-tight text-slate-900"
                dangerouslySetInnerHTML={{
                  __html: makeBoldServiceName(section.heading, serviceName),
                }}
              />
            </div>

            {/* Content */}
            <div className="mx-auto  pb-16">
              <div className="space-y-6 text-slate-600 leading-relaxed text-[17px]">
                <p
                  dangerouslySetInnerHTML={{
                    __html: makeBoldServiceName(section.body, serviceName),
                  }}
                />
              </div>

              {/* Smart Items Layout */}
              {items.length > 0 && (
                <div className="mt-12">
                  {isTwoItems ? (
                    // 2 Cards Side by Side
                    <div className="grid md:grid-cols-2 gap-6">
                      {items.map((item, i) => (
                        <motion.div
                          key={i}
                          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                        >
                          <div className="flex gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                              <Star className="h-4 w-4 fill-current" />
                            </div>
                            <span
                              className="leading-relaxed text-[17px]"
                              dangerouslySetInnerHTML={{
                                __html: makeBoldServiceName(item, serviceName),
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    // Normal List (1 or 3+ items)
                    <ul className="space-y-6">
                      {items.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 mt-0.5">
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                          <span
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: makeBoldServiceName(item, serviceName),
                            }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mx-auto ">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>
          </motion.section>
        );
      })}
    </>
  );
}