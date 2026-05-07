// /src/components/landingPage/servicesPage/PricingSection.tsx
"use client";

import { motion } from "framer-motion";
import { PricingCard } from "@/components/ui/PricingCard";

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

  // Transform your pricing tiers to match PricingCard props
  const pricingCardsData = pricingTiers.map((tier, index) => {
    // Parse investment string to extract numeric value
    const priceMatch = tier.investment.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : 0;
    
    // Check if investment contains a range or "Custom"
    const isCustom = tier.investment.toLowerCase().includes('custom');
    
    return {
      title: tier.type,
      description: `Perfect for businesses that need ${tier.type.toLowerCase()} solutions`,
      price: isCustom ? 0 : price,
      originalPrice: isCustom ? undefined : price * 1.5,
      features: [
        {
          title: "Package Includes",
          items: [
            `Timeline: ${tier.timeline}`,
            `Best For: ${tier.bestFor}`,
            "Dedicated Project Manager",
            "Quality Assurance Testing",
            "Documentation & Training",
          ],
        },
      ],
      buttonText: isCustom ? "Contact Us" : "Get Started",
      onButtonClick: () => {
        console.log(`Selected ${tier.type} plan`);
        // Add your booking/contact logic here
      },
    };
  });

  return (
    <motion.section 
      id="pricing" 
      className="scroll-mt-24 py-6 sm:py-8 md:py-12"
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
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-black">{serviceName}</span> Development Pricing
        </motion.h2>
      </div>

      <motion.p 
        className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transparent pricing tailored to your business needs
      </motion.p>

      {/* Grid layout for cards */}
  <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
        {pricingCardsData.map((cardData, index) => (
          <PricingCard key={index} {...cardData} />
        ))}
      </div>

      {/* Bottom Section - Trust Indicators and Note */}
      <motion.div 
        className="mt-12 sm:mt-16 flex flex-col items-center gap-5 sm:gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-slate-500 px-2">
          {[
            'Transparent Pricing',
            'No Hidden Costs',
            'Flexible Engagement',
            '30-Day Support'
          ].map((text, idx) => (
            <motion.div 
              key={idx}
              className="flex items-center gap-1.5 sm:gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            >
              <svg className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p 
          className="text-center text-xs text-slate-400 max-w-md mx-auto px-4 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          * All prices are estimates and may vary based on specific requirements. 
          Contact us for a detailed quote.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}




