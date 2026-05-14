"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FaqItem = {
  question: string;
  answer: string;
  more?: { href: string; label: string };
};

type FaqSectionProps = {
  faqs: FaqItem[];
  location?: string;
  title?: string;
  subtitle?: string;
};

export function FaqSection({ 
  faqs, 
  location, 
  title = "Frequently Asked Questions",
  subtitle = "Answer objections and improve SEO"
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If no FAQs are provided, don't render the section
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white py-16 sm:py-20 lg:px-10" 
      aria-labelledby="faq-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
              {title}
            </p>
            <span className="h-[2px] w-8 rounded-full bg-orange-400" />
          </div>

          <h2 
            id="faq-heading"
            className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl"
          >
            {subtitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Everything you need to know about our process, timelines, technology stack, and post-launch support.
          </p>
        </div>

        {/* FAQ Grid - 2 columns */}
        <div className="grid gap-4 sm:grid-cols-1">
          {faqs.map((item, index) => (
            <div
              key={item.question}
              className="border-b border-slate-200 transition-all"
              style={{ height: 'fit-content' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <h3 className="pr-8 text-lg font-semibold leading-7 text-slate-900">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence mode="wait">
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 px-6 pb-6 pt-4">
                      <p className="text-base leading-7 text-slate-600">
                        {item.answer}
                        {item.more ? (
                          <>
                            {' '}
                            <Link
                              href={item.more.href}
                              className="font-medium text-primary hover:underline"
                              aria-label={`${item.more.label} ${item.more.href}`}
                            >
                              {item.more.label}
                            </Link>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;