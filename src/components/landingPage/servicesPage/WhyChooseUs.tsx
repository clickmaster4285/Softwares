"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Differentiator {
  feature: string;
  description: string;
}

interface WhyChooseUsProps {
  slug: string;
  differentiators: Differentiator[];
}

export const WhyChooseUs = ({ slug, differentiators }: WhyChooseUsProps) => {
  if (!differentiators || differentiators.length === 0) return null;

  const isEnterprise = slug.includes("enterprise");
  const isSaaS = slug.includes("saas");
  const isMVP = slug.includes("mvp");

  const getTitleText = () => {
    if (isEnterprise) return "Enterprise Organizations";
    if (isSaaS) return "SaaS Founders";
    if (isMVP) return "Founders";
    return "B2B Companies";
  };

  const getColumnHeaders = () => {
    if (isEnterprise) return ["ClickMasters", "SAP / Oracle", "Generic SaaS"];
    if (isSaaS) return ["In House Team", "ClickMasters"];
    return ["Description"];
  };

  const getHighlightedIndex = () => {
    if (isEnterprise) return 0;
    if (isSaaS) return 1;
    return -1;
  };

  const columnHeaders = getColumnHeaders();
  const highlightedIndex = getHighlightedIndex();

  return (
    <motion.section
      id="why-choose-us"
      className="scroll-mt-24 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-10 w-1 rounded-full bg-orange-500"
        />
        <motion.h2
          className="text-2xl font-semibold text-slate-900 sm:text-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why {getTitleText()} Choose ClickMasters
        </motion.h2>
      </div>

      {/* Cards Grid - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {differentiators.map((diff, idx) => {
    const parts = diff.description.split("|").map((s) => s.trim());
    const isMultiCol = parts.length > 1;

    return (
      <motion.div
        key={diff.feature}
        className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-slate-200 hover:border-orange-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: idx * 0.07 }}
      >
        {/* Card Header - Enhanced Gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative px-5 pt-5 pb-4">
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-bold shrink-0"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {idx + 1}
              </motion.span>
              <span className="font-bold text-white text-base leading-snug flex-1">
                {diff.feature}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body - Improved Multi-Column Support */}
        <div className="flex flex-col flex-1">
          {isMultiCol ? (
            <div className="divide-y divide-slate-100">
              {parts.map((part, i) => {
                const isHighlighted = (isSaaS && i === highlightedIndex) || 
                                     (isEnterprise && i === highlightedIndex);
                
                // Determine column label and styling based on index
                const getColumnStyle = () => {
                  if (isEnterprise) {
                    if (i === 0) return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", label: "ClickMasters" };
                    if (i === 1) return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", label: "SAP / Oracle" };
                    return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", label: "Generic SaaS" };
                  }
                  if (isSaaS) {
                    if (i === 0) return { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", label: "In House Team" };
                    return { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", label: "ClickMasters ✓" };
                  }
                  return { bg: "bg-white", border: "border-slate-100", text: "text-slate-600", label: columnHeaders[i] };
                };
                
                const style = getColumnStyle();
                
                return (
                  <motion.div
                    key={i}
                    className={cn(
                      "p-4 transition-all duration-200",
                      style.bg,
                      i !== parts.length - 1 && `border-b ${style.border}`
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.07 + i * 0.08 }}
                  >
                    {/* Header with icon and label */}
                    <div className="flex items-center gap-2 mb-2">
                      {isHighlighted ? (
                        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider",
                        isHighlighted ? "text-orange-600" : "text-slate-500"
                      )}>
                        {style.label}
                      </span>
                      
                      {/* Performance badge */}
                      {isHighlighted && (
                        <span className="ml-auto text-[9px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                          Best Choice
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <p className={cn(
                      "text-sm leading-relaxed",
                      style.text
                    )}>
                      {part}
                    </p>
                    
                    {/* Feature tags for enterprise version */}
                    {isEnterprise && i === 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Enterprise-ready</span>
                        <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">24/7 Support</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-5 flex-1">
              <div className="flex items-start gap-2">
                <div className="w-1 h-8 bg-orange-500 rounded-full shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          )}
        </div>
        
     
      </motion.div>
    );
  })}
</div>

      {/* Bottom Divider */}
      <motion.div
        className="mt-16 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
          <div className="flex gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i === 0 ? "bg-orange-400" : i === 1 ? "bg-orange-500" : "bg-orange-600"
                )}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay }}
              />
            ))}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {[
            { text: "Trusted by 500+ Companies", delay: 0 },
            { text: "4.9/5 Client Rating", delay: 0.1 },
            { text: "15+ Years Experience", delay: 0.2 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + item.delay }}
            >
              <svg
                className="w-4 h-4 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};