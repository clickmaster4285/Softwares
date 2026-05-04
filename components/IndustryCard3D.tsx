"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Heart,
  Landmark,
  Umbrella,
  Wallet,
  CreditCard,
  LineChart,
  Building2,
  ShoppingCart,
  Factory,
  Truck,
  Droplets,
  Lightbulb,
  Briefcase,
  Radio,
  HardHat,
  Plane,
  Globe,
  type LucideIcon,
} from "lucide-react";

// Map icon names to components
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Landmark,
  Umbrella,
  Wallet,
  CreditCard,
  LineChart,
  Building2,
  ShoppingCart,
  Factory,
  Truck,
  Droplets,
  Lightbulb,
  Briefcase,
  Radio,
  HardHat,
  Plane,
  Globe,
};

interface IndustryCard3DProps {
  name: string;
  iconName: string;
  gradient: string;
  index: number;
}

export function IndustryCard3D({
  name,
  iconName,
  gradient,
  index,
}: IndustryCard3DProps) {
  const IconComponent = iconMap[iconName] || Globe;
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateXValue = (mouseY / (rect.height / 2)) * -15;
    const rotateYValue = (mouseX / (rect.width / 2)) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className="relative"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "group relative flex flex-col items-center justify-center rounded-2xl bg-white p-8 cursor-pointer",
          "border border-slate-200/60",
          "transition-shadow duration-300",
          isHovered && "shadow-2xl"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? "translateZ(10px)" : "translateZ(0)"}`,
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease-out"
            : "transform 0.5s ease-out, box-shadow 0.3s ease-out",
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Card background layers for depth */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100/50 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: "translateZ(-5px)",
          }}
        />

        {/* Glossy reflection layer */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(1px)" }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        {/* Moving shine effect */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(2px)" }}
        >
          <div
            className={cn(
              "absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12",
              "transition-transform duration-700 ease-out"
            )}
            style={{
              transform: isHovered ? "translateX(400%)" : "translateX(0)",
            }}
          />
        </div>

        {/* Arrow icon */}
        <div
          className="absolute right-4 top-4 transition-all duration-300"
          style={{
            transform: `translateZ(30px) ${isHovered ? "translate(0, 0)" : "translate(-4px, 4px)"}`,
            opacity: isHovered ? 1 : 0,
          }}
        >
          <ArrowUpRight className="h-4 w-4 text-slate-500" />
        </div>

        {/* Icon container with 3D pop effect */}
        <div
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
            "transition-all duration-300",
            gradient
          )}
          style={{
            transform: `translateZ(${isHovered ? "40px" : "20px"}) ${isHovered ? "scale(1.1)" : "scale(1)"}`,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 0, 0, 0.1)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent" />

          {/* Glow effect behind icon */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br blur-xl transition-opacity duration-300",
              gradient
            )}
            style={{
              opacity: isHovered ? 0.6 : 0,
              transform: "translateZ(-10px) scale(1.5)",
            }}
          />

          <IconComponent className="relative h-8 w-8 text-white drop-shadow-md" />
        </div>

        {/* Industry name with 3D effect */}
        <h3
          className="mt-6 text-center text-sm font-semibold text-slate-700 leading-snug transition-all duration-300"
          style={{
            transform: `translateZ(${isHovered ? "25px" : "10px"})`,
            color: isHovered ? "#1e293b" : "#475569",
          }}
        >
          {name}
        </h3>

        {/* Animated bottom accent */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 h-1 rounded-full bg-gradient-to-r transition-all duration-500",
            gradient
          )}
          style={{
            width: isHovered ? "48px" : "0px",
            transform: "translateX(-50%) translateZ(5px)",
          }}
        />

        {/* Side shadow for depth */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? `
                inset 0 0 0 1px rgba(255,255,255,0.1),
                0 0 0 1px rgba(0,0,0,0.05)
              `
              : "none",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* Card base shadow */}
      <div
        className="absolute inset-0 rounded-2xl bg-black/5 transition-all duration-300"
        style={{
          transform: `translateY(${isHovered ? "8px" : "4px"}) translateZ(-20px) scale(${isHovered ? 0.95 : 0.98})`,
          filter: `blur(${isHovered ? "12px" : "8px"})`,
          opacity: isHovered ? 0.4 : 0.2,
        }}
      />
    </div>
  );
}