"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: any[];
  buttonText?: string;
  onButtonClick?: () => void;
  highlighted?: boolean;
}

export function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = "Get Started",
  onButtonClick,
  highlighted = false,
}: PricingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  const hasValidPrice = price > 0;
  const hasRange = originalPrice && originalPrice > price;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: highlighted ? 60 : 40 }}
      animate={
        hasAnimated
          ? { opacity: 1, y: highlighted ? -16 : 0 }
          : { opacity: 0, y: highlighted ? 60 : 40 }
      }
      transition={{ type: "spring", duration: 0.7 }}
      whileHover={{ scale: highlighted ? 1.04 : 1.03 }}
      className={`relative w-full rounded-3xl border backdrop-blur-md transition-all
        ${
          highlighted
            ? "z-20 scale-105 border-2 border-primary/30 bg-primary/10 text-black shadow-2xl px-10 py-14"
            : "z-10 border border-gray-200 bg-white text-black shadow-md px-8 py-10"
        }`}
    >
      {highlighted && (
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary border border-primary/20 px-5 py-1 text-xs font-extrabold text-primary-foreground shadow whitespace-nowrap"
        >
          Best Value
        </motion.div>
      )}

      <div className={`mb-2 text-lg font-bold ${highlighted ? "text-primary" : "text-black/50"}`}>
        {title}
      </div>

      <div className={`mb-2 font-black tracking-tight ${highlighted ? "text-3xl text-primary" : "text-2xl text-black"}`}>
        {!hasValidPrice ? (
          "Custom"
        ) : hasRange ? (
          ` ${price.toLocaleString()} – ${originalPrice!.toLocaleString()}`
        ) : (
          ` ${price.toLocaleString()}`
        )}
      </div>

      <p className={`text-md mb-4 mt-2 ${highlighted ? "text-gray-800" : "text-gray-800"}`}>
        {description}
      </p>

      <div className="space-y-5 mb-6">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex}>
            <h4 className={`font-semibold text-sm mb-3 ${highlighted ? "text-primary/80" : "text-gray-800"}`}>
              {feature.title}
            </h4>
            <ul className="space-y-2">
              {feature.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className={`h-4 w-4 mt-0.5 text-primary flex-shrink-0 ${highlighted ? "text-primary" : "text-black"}`} />
                  <span className="text-gray-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {featureIndex < features.length - 1 && (
              <Separator className={`mt-4 ${highlighted ? "bg-primary/20" : "bg-black/10"}`} />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onButtonClick}
        className={`w-full rounded-md py-2.5 font-semibold transition ${
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-black text-white hover:bg-black/80"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}