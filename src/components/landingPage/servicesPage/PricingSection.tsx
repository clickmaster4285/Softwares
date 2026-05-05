// components/landingPage/servicesPage/PricingSection.tsx
"use client";

import { motion } from "framer-motion";

interface PricingTier {
  type: string;
  investment: string;
  timeline: string;
  bestFor: string;
}

interface PricingSectionProps {
  serviceName: string;
  pricingTiers: PricingTier[];
}

export function PricingSection({ serviceName, pricingTiers }: PricingSectionProps) {
  if (!pricingTiers || pricingTiers.length === 0) return null;

  return (
    <motion.section 
      id="pricing" 
      className="scroll-mt-24 py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
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
          {serviceName} Development Pricing
        </motion.h2>
      </div>

      <motion.p 
        className="mt-4 text-lg text-slate-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transparent pricing tailored to your business needs
      </motion.p>

      {/* Cards Grid */}
      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <div className="relative rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-orange-200 hover:shadow-lg h-full">
              
              {/* Plan Type Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {tier.type}
                </h3>
                <div className="mt-2 h-0.5 w-12 bg-orange-500 rounded-full" />
              </div>

              {/* Investment Amount */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {tier.investment}
                  </span>
                  {tier.investment !== 'Custom' && (
                    <span className="text-sm text-slate-500">USD</span>
                  )}
                </div>
                {tier.investment !== 'Custom' && (
                  <p className="text-xs text-slate-400 mt-1">one-time investment</p>
                )}
              </div>

              {/* Timeline */}
              <div className="mb-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-slate-500">Timeline</p>
                  <p className="text-sm font-medium text-slate-700">{tier.timeline}</p>
                </div>
              </div>

              {/* Best For */}
              <div className="mb-6 flex items-start gap-3 rounded-lg bg-orange-50 p-3">
                <svg className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs text-orange-600">Best For</p>
                  <p className="text-sm font-medium text-slate-700">{tier.bestFor}</p>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <motion.div 
        className="mt-16 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {[
            'Transparent Pricing',
            'No Hidden Costs',
            'Flexible Engagement',
            '30-Day Support'
          ].map((text, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            >
              <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p 
          className="text-center text-xs text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          * All prices are estimates and may vary based on specific requirements. Contact us for a detailed quote.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}