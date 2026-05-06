"use client";
// components/landingPagePage/FAQSection.tsx
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Helper function to make text bold with orange color
  const makeBoldWithColor = (text: string) => {
    if (!text) return text;
    
    // Match text that's already marked for bolding (look for existing bold patterns or key terms)
    // For now, we'll make terms like "Custom Software Development" bold and orange
    const parts: (string | React.ReactNode)[] = [];
    const keywords = ['custom software development', 'ai development', 'mobile development', 'web development', 'data engineering', 'ui/ux design'];
    
    const  lastIndex = 0;
    const lowerText = text.toLowerCase();
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      if (regex.test(lowerText)) {
        const split = text.split(new RegExp(`(${keyword})`, 'gi'));
        parts.length = 0; // clear parts
        split.forEach((part, idx) => {
          if (part.toLowerCase() === keyword) {
            parts.push(
              <span key={idx} className="font-black text-orange-500">
                {part}
              </span>
            );
          } else {
            parts.push(part);
          }
        });
      }
    });
    
    return parts.length > 0 ? parts : text;
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 mb-10 mt-10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 rounded-full bg-orange-500" />
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white transition-all hover:border-orange-200"
            style={{ height: 'fit-content' }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
            >
              <h3 className="pr-8 font-semibold text-slate-900">
                {makeBoldWithColor(faq.question)}
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
                    <p className="text-sm leading-relaxed text-slate-600">
                      {makeBoldWithColor(faq.answer)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};