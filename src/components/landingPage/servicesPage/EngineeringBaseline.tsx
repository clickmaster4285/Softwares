





"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SplitText from "../../ui/SplitText";

interface ChecklistItem {
  item: string;
  standard: string;
}

interface EngineeringBaselineProps {
  serviceName: string;
  checklist: ChecklistItem[];
}

export const EngineeringBaseline = ({ serviceName, checklist }: EngineeringBaselineProps) => {
  if (!checklist || checklist.length === 0) return null;

  return (
   <section  className="relative w-full bg-[#f5fbfb] py-14">
    {/* Background Blobs */}
    <div
    className="absolute inset-0 opacity-[0.45]"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }}
  />
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-[2px] w-8 rounded-full bg-primary" />
                  <div className="inline-flex items-center gap-1.5">
                    <SplitText
                      text={`${serviceName} Engineering Baseline`}
                      className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary"
                      delay={60}
                      duration={0.8}
                      ease="power3.out"
                      splitType="words"
                      from={{ opacity: 0, x: 60 }}
                      to={{ opacity: 1, x: 0 }}
                      threshold={0.2}
                    />
                  </div>
                  <span className="h-[2px] w-8 rounded-full bg-primary" />
                </div>
      
                {/* <p className="mx-auto max-w-2xl text-base leading-7 text-slate-800 sm:text-lg">
                   Our engineering standards and best practices
                </p> */}
      </div>
      




      {/* Mobile: 1 column, Tablet: 2-3 columns, Desktop: 5 columns */}
     <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full">
        {checklist.map((item, i) => (
          <motion.div
            key={i}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-primary to-primary w-0 group-hover:w-full transition-all duration-500" />
              
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl font-bold text-primary  transition-colors duration-300">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <Badge className="bg-transparent border border-slate-200 text-slate-800 group-hover:bg-primary/10 group-hover:border-primary/10 group-hover:text-primary transition-all duration-300 text-xs sm:text-xs">
                    {item.standard}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-slate-900 text-lg mb-1 sm:mb-2 line-clamp-2">
                  {item.item}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-800">
                  Industry-standard compliance
                </p>
                
                {/* Slide up icon on hover - visible on desktop only */}
                <div className="mt-3 sm:mt-4 flex justify-end overflow-hidden">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary hidden sm:block"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                  {/* Always visible arrow on mobile */}
                  <ArrowRight className="w-3 h-3 text-primary sm:hidden" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Divider */}
      <div className="my-8 sm:my-12 md:my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
};


