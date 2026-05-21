"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from '../../ui/SplitText';

type FaqItem = {
  question: string;
  answer: string;
  more?: { href: string; label: string };
};

// Default FAQs (shown when no prop is passed)
const defaultFaqItems: FaqItem[] = [
  {
    question: 'How much does custom software development cost?',
    answer:
      'Custom software development costs vary based on complexity, features, and timeline. A basic web application typically starts from $5,000-$15,000, while enterprise systems range from $30,000-$200,000+. We provide free consultations to give accurate project estimates.',
    more: { href: '/contact-us', label: 'Get a free consultation' },
  },
  {
    question: 'How long does it take to build a custom software application?',
    answer:
      'Development timelines depend on the project scope. An MVP takes 6-12 weeks, a full web or mobile application takes 3-6 months, and enterprise systems can take 6-18 months. We use agile sprints to deliver working software every 2 weeks.',
    more: { href: '/case-studies', label: 'See how we deliver' },
  },
  {
    question: 'What technologies does ClickMasters use?',
    answer:
      "We use modern, proven technologies including React, Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud, and Azure. We choose the best stack for each project's specific needs.",
    more: { href: '/services', label: 'Explore our services' },
  },
  {
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Yes. ClickMasters provides 24/7 post-launch support, security updates, performance monitoring, and feature development. We offer monthly maintenance plans to keep your software running smoothly.',
    more: { href: '/testimonials', label: 'What clients say' },
  },
  {
    question: 'Can ClickMasters work with international clients?',
    answer:
      'Yes. We work with clients across the USA, Europe, Middle East, and worldwide. Our team operates across time zones and uses agile project management tools to ensure seamless collaboration regardless of location.',
    more: { href: '/software-solutions', label: 'Browse solutions by industry' },
  },
];

export function FaqSection({ faqItems }: { faqItems?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Use provided FAQs or fallback to default ones
  const displayedFaqs = faqItems && faqItems.length > 0 ? faqItems : defaultFaqItems;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white py-16 sm:py-20 lg:px-10" 
      aria-labelledby="homepage-faq-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-8 rounded-full bg-primary" />
            
            <div className="inline-flex items-center gap-1.5">
              <SplitText
                text="FAQ's"
                className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary"
                delay={60}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, x: 60 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.2}
              />
            </div>

            <span className="h-[2px] w-8 rounded-full bg-primary" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Everything you need to know about our process, timelines, technology stack, and post-launch support.
          </p>
        </div>

        {/* FAQ List */}
        <div className="grid gap-4 sm:grid-cols-1">
          {displayedFaqs.map((item, index) => (
            <div
              key={index}
              className="border-b border-slate-200 transition-all"
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
                        {item.more && (
                          <>
                            {' '}
                            <Link
                              href={item.more.href}
                              className="font-medium text-primary hover:underline"
                              aria-label={`${item.more.label}`}
                            >
                              {item.more.label}
                            </Link>
                          </>
                        )}
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