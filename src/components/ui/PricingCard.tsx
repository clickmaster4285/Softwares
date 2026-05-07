// Alternative version using inline animations instead of variants
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PricingFeature {
  title: string;
  items: string[];
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: PricingFeature[];
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
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.3 }}
      className="h-full"
    >
      <Card className="relative mx-auto w-full overflow-hidden h-full flex flex-col">
        <div className="flex flex-col lg:flex-row h-full">
          <motion.div
            className="flex flex-col justify-between p-5 lg:w-2/5 lg:p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div>
              <CardHeader className="p-0">
                <div>
                  <CardTitle className="text-2xl font-bold text-left">{title}</CardTitle>
                  <CardDescription className="mt-2 text-left">{description}</CardDescription>
                </div>
              </CardHeader>
              <motion.div 
  className="mt-6 space-y-4"
  initial={{ y: 20, opacity: 0 }}
  animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
>
  <div className="flex items-baseline justify-center">
    {price > 0 ? (
      <>
        <span className="text-4xl font-extrabold">${price.toLocaleString()}</span>
        {originalPrice && (
          <span className="ml-2 text-lg text-muted-foreground line-through">
            ${originalPrice.toLocaleString()}
          </span>
        )}
      </>
    ) : (
      <span className="text-2xl font-extrabold">Custom Pricing</span>
    )}
  </div>
  {price > 0 && (
    <span className="block text-xs text-muted-foreground text-center">
      one-time payment
    </span>
  )}
</motion.div>
            </div>
          </motion.div>
          
          <Separator className="lg:my-6 lg:hidden" />
          
          <motion.div
            className="bg-muted/50 p-5 lg:w-3/5 lg:p-6 flex-1 flex flex-col"
            initial={{ y: 20, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
          >
            <div className="space-y-4 flex-1">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h3 className="mb-3 text-base font-semibold text-left">{feature.title}:</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {feature.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 100, 
                          damping: 10,
                          delay: 0.3 + (featureIndex * 0.1) + (index * 0.05)
                        }}
                      >
                        <Check className="mr-2 h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-left">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
            
            {/* Button moved to right side */}
            <motion.div 
              className="mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <Button className="w-full" size="default" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}