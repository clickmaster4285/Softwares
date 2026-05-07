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
    >
      <Card className="relative mx-auto w-full  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <motion.div
            className="flex flex-col justify-between p-6 lg:w-2/5 lg:p-10"
            initial={{ y: 20, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div>
              <CardHeader className="p-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                    <CardDescription className="mt-2">{description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <motion.div 
                className="mt-6 space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              >
                <div className="flex items-baseline">
                  {price > 0 ? (
                    <>
                      <span className="text-5xl font-extrabold">${price.toLocaleString()}</span>
                      {originalPrice && (
                        <span className="ml-2 text-xl text-muted-foreground line-through">
                          ${originalPrice.toLocaleString()}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-extrabold">Custom Pricing</span>
                  )}
                </div>
                {price > 0 && (
                  <span className="block text-sm text-muted-foreground">
                    one-time payment
                  </span>
                )}
              </motion.div>
            </div>
            <motion.div 
              className="mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <Button className="w-full" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>
          <Separator className="lg:my-6 lg:hidden" />
          <motion.div
            className="bg-muted/50 p-6 lg:w-3/5 lg:p-10"
            initial={{ y: 20, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
          >
            <div className="space-y-6">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h3 className="mb-4 text-lg font-semibold">{feature.title}:</h3>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {feature.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 100, 
                          damping: 10,
                          delay: 0.3 + (featureIndex * 0.1) + (index * 0.05)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}