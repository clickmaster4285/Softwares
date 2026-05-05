"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

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
    <section id="checklist" className="scroll-mt-24 pt-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div className="flex items-start gap-3">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-12 w-1 rounded-full bg-orange-500 shrink-0"
          />
          <div>
            <motion.h2 
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {serviceName} Engineering Baseline
            </motion.h2>
            <motion.p
              className="text-slate-500 mt-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our engineering standards and best practices
            </motion.p>
          </div>
        </div>
        
        <motion.div
          className="flex items-center gap-2 text-sm text-orange-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>All {checklist.length} standards verified</span>
        </motion.div>
      </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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
        <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 w-0 group-hover:w-full transition-all duration-500" />
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-slate-200 group-hover:text-orange-200 transition-colors duration-300">
              {(i + 1).toString().padStart(2, '0')}
            </div>
            <Badge className="bg-transparent border border-slate-200 text-slate-500 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:text-orange-600 transition-all duration-300">
              {item.standard}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-slate-900 text-base mb-2">
            {item.item}
          </h3>
          
          <p className="text-sm text-slate-500">
            Industry-standard compliance
          </p>
          
          {/* Slide up icon on hover */}
          <div className="mt-4 flex justify-end overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-orange-500"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

              {/* Bottom Divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
  
    
    </section>
  );
};