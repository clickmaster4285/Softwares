"use client";

import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
}

export function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = "Get Started",
  onButtonClick,
}: PricingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Price */}
          <div className="flex flex-col justify-between p-6 lg:p-8 lg:w-5/12 bg-white">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-tight">{description}</p>

              <div className="mt-6">
                {price > 0 ? (
                  <>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold tracking-tighter">${price}</span>
                      {originalPrice && (
                        <span className="ml-2 text-lg text-slate-400 line-through">
                          ${originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">one-time payment</p>
                  </>
                ) : (
                  <span className="text-3xl font-bold">Custom Pricing</span>
                )}
              </div>
            </div>

            <div className="mt-8 lg:mt-6">
              <Button className="w-full" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="bg-slate-50 p-6 lg:p-8 lg:w-7/12">
            <div className="space-y-6">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h4 className="font-semibold text-base mb-3">{feature.title}</h4>
                  <ul className="space-y-2.5">
                    {feature.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="my-5" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}