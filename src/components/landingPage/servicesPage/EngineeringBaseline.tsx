// components/landingPage/servicesPage/EngineeringBaseline.tsx
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

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
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 rounded-full bg-orange-500" />
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {serviceName} Engineering Baseline
        </h2>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">
            ClickMasters Standard Engineering Baseline
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {checklist.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50/50"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </motion.div>
                <span className="font-medium text-slate-900">{item.item}</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="sm:w-auto w-fit bg-slate-100 text-slate-600 font-normal"
                >
                  {item.standard}
                </Badge>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="my-16 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </motion.div>
    </section>
  );
};