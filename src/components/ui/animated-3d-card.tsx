"use client";

import React, { useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* =========================
   TYPES
========================= */

interface MousePos {
  x: number;
  y: number;
}

export interface CardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface Card3DProps {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  disabled?: boolean;
  loading?: boolean;
}

interface Card3DListProps {
  cards: CardData[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "xl";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "premium";
  animated?: boolean;
}

/* =========================
   STYLES
========================= */

const SIZES = {
  sm: "h-64",
  md: "h-80",
  lg: "h-96",
} as const;

const VARIANTS = {
  default: "shadow-lg hover:shadow-2xl",
  minimal: "shadow-md hover:shadow-lg",
  premium: "shadow-xl hover:shadow-2xl ring-1 ring-white/10",
} as const;

const GRIDS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

const GAPS = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-10",
} as const;

/* =========================
   ANIMATION
========================= */

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

/* =========================
   CARD
========================= */

const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  (
    {
      title,
      description,
      image,
      icon,
      onClick,
      className,
      size = "md",
      variant = "default",
      disabled = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    const handleMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({
          x: (x / rect.width - 0.5) * 25,
          y: (y / rect.height - 0.5) * -25,
        });
      },
      [disabled]
    );

    const handleClick = useCallback(() => {
      if (!disabled && !loading) onClick?.();
    }, [disabled, loading, onClick]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl transform-gpu transition-all duration-500",
          SIZES[size],
          VARIANTS[variant],
          onClick && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        animate={{
          rotateX: disabled ? 0 : mousePos.y,
          rotateY: disabled ? 0 : mousePos.x,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
        onClick={handleClick}
        {...props}
      >
        {/* =========================
            BACKGROUND LAYER (FAR)
        ========================= */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* =========================
            LIGHT LAYER (MID)
        ========================= */}
        <div
          className="absolute inset-0 bg-white/5"
          style={{ transform: "translateZ(10px)" }}
        />

        {/* =========================
            CONTENT (FRONT)
        ========================= */}
        <div
          className="relative flex h-full flex-col justify-between p-6 text-white"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Top icon */}
          <div>
            {icon && <div className="text-3xl">{icon}</div>}
          </div>

          {/* Bottom content */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-white/90 line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
    );
  }
);

Card3D.displayName = "Card3D";

/* =========================
   LIST
========================= */

export const Card3DList: React.FC<Card3DListProps> = ({
  cards,
  className,
  columns = 3,
  gap = "md",
  size = "md",
  variant = "default",
  animated = true,
}) => {
  return (
    <div className={cn("grid w-full", GRIDS[columns], GAPS[gap], className)}>
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={animated ? itemVariants : undefined}
          initial={animated ? "hidden" : undefined}
          whileInView={animated ? "visible" : undefined}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card3D
            title={card.title}
            description={card.description}
            image={card.image}
            icon={card.icon}
            onClick={card.onClick}
            size={size}
            variant={variant}
            disabled={card.disabled}
            loading={card.loading}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Card3DList;