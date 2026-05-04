// components/landingPage/servicesPage/WhyChooseUs.tsx
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

  const isEnterprise = slug.includes('enterprise');
  const isSaaS = slug.includes('saas');
  const isMVP = slug.includes('mvp');

  const getTitleText = () => {
    if (isEnterprise) return 'Enterprise Organizations';
    if (isSaaS) return 'SaaS Founders';
    if (isMVP) return 'Founders';
    return 'B2B Companies';
  };

  const getFirstColumnHeader = () => {
    if (isEnterprise) return 'Factor';
    if (isSaaS) return 'Consideration';
    return 'Feature';
  };

  return (
    <motion.section 
      id="why-choose-us" 
      className="scroll-mt-24 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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

      <motion.div 
        className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-white">
                <th className="px-6 py-5 font-semibold text-slate-900 border-b-2 border-slate-200 text-sm uppercase tracking-wider">
                  {getFirstColumnHeader()}
                </th>
                {isEnterprise ? (
                  <>
                    <th className="px-6 py-5 font-semibold text-orange-600 border-b-2 border-orange-200 bg-orange-50/30 text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className="inline-block w-2 h-2 rounded-full bg-orange-500"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        ClickMasters
                      </div>
                    </th>
                    <th className="px-6 py-5 font-semibold text-slate-900 border-b-2 border-slate-200 text-sm uppercase tracking-wider">SAP / Oracle</th>
                    <th className="px-6 py-5 font-semibold text-slate-900 border-b-2 border-slate-200 text-sm uppercase tracking-wider">Generic SaaS</th>
                  </>
                ) : isSaaS ? (
                  <>
                    <th className="px-6 py-5 font-semibold text-slate-900 border-b-2 border-slate-200 text-sm uppercase tracking-wider">In House Team</th>
                    <th className="px-6 py-5 font-semibold text-orange-600 border-b-2 border-orange-200 bg-orange-50/30 text-sm uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <motion.span 
                          className="inline-block w-2 h-2 rounded-full bg-orange-500"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        ClickMasters
                      </div>
                    </th>
                  </>
                ) : (
                  <th className="px-6 py-5 font-semibold text-slate-900 border-b-2 border-slate-200 text-sm uppercase tracking-wider">Description</th>
                )}
              </tr>
            </thead>
            <tbody>
              {differentiators.map((diff, idx) => {
                const parts = diff.description.split('|').map(s => s.trim());
                return (
                  <motion.tr 
                    key={diff.feature} 
                    className="group transition-all duration-200 hover:bg-slate-50/80 cursor-default"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <td className="px-6 py-5 font-semibold text-slate-900 border-b border-slate-100 bg-white group-hover:bg-transparent">
                      <div className="flex items-center gap-3">
                        <motion.span 
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {idx + 1}
                        </motion.span>
                        <span>{diff.feature}</span>
                      </div>
                    </td>
                    {parts.length > 1 ? (
                      parts.map((part, i) => (
                        <motion.td 
                          key={i} 
                          className={cn(
                            "px-6 py-5 border-b border-slate-100 transition-all duration-200",
                            (isSaaS && i === 1) || (isEnterprise && i === 0) 
                              ? "text-orange-700 font-medium bg-gradient-to-r from-orange-50/50 to-transparent border-l-2 border-l-orange-300" 
                              : "text-slate-600"
                          )}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 + i * 0.1 }}
                        >
                          <div className="flex items-start gap-2">
                            {(isSaaS && i === 1) || (isEnterprise && i === 0) ? (
                              <motion.svg 
                                className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 + i * 0.1 }}
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </motion.svg>
                            ) : (
                              <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            <span className="leading-relaxed">{part}</span>
                          </div>
                        </motion.td>
                      ))
                    ) : (
                      <td className="px-6 py-5 text-slate-600 border-b border-slate-100 leading-relaxed">
                        {diff.description}
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Enhanced Bottom Divider with Stats or CTA */}
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
            <motion.div 
              className="w-2 h-2 rounded-full bg-orange-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-orange-500"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-orange-600"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
        </div>
        
        {/* Optional: Trust Badge */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {[
            { text: 'Trusted by 500+ Companies', delay: 0 },
            { text: '4.9/5 Client Rating', delay: 0.1 },
            { text: '15+ Years Experience', delay: 0.2 }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + item.delay }}
            >
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};