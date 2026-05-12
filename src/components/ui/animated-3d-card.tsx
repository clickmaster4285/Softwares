"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const THEMES = {
  primary: "from-orange-600 via-orange-200 to-orange-600",
  secondary: "from-orange-600 via-orange-500 to-orange-700",
  accent: "from-gray-800 via-gray-700 to-gray-900",
  success: "from-emerald-600 via-emerald-700 to-emerald-800",
  warning: "from-amber-600 via-amber-700 to-amber-800",
  danger: "from-red-600 via-red-700 to-red-800",
  info: "from-cyan-600 via-cyan-700 to-cyan-800",
  neutral: "from-gray-600 via-gray-700 to-gray-800",
  orangeLight: "from-orange-100 via-orange-50 to-orange-100", // Orange 50 theme
} as const;

type ThemeType = keyof typeof THEMES;

interface MousePos {
  readonly x: number;
  readonly y: number;
}

export interface CardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: ThemeType;
  gradient?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface Card3DProps {
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: ThemeType;
  gradient?: string;
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
  staggerDelay?: number;
}

const SIZES = {
  sm: "h-64",
  md: "h-80",
  lg: "h-96",
} as const;

const VARIANTS = {
  default: "shadow-lg hover:shadow-2xl",
  minimal: "shadow-md hover:shadow-lg border border-orange-200/50",
  premium: "shadow-xl hover:shadow-2xl ring-1 ring-orange-500/30",
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12, mass: 0.7 } as const,
  },
};

const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  (
    {
      title,
      description,
      image,
      icon,
      theme = "primary",
      gradient,
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

    const finalGradient = useMemo(
      () => gradient || THEMES[theme],
      [gradient, theme]
    );
    const patternId = useMemo(
      () => `pattern-${theme}-${title.replace(/\s+/g, "-").toLowerCase()}`,
      [theme, title]
    );

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

    const handleEnter = useCallback(() => {
      if (disabled) return;
      setHovered(true);
    }, [disabled]);

    const handleLeave = useCallback(() => {
      if (disabled) return;
      setHovered(false);
      setMousePos({ x: 0, y: 0 });
    }, [disabled]);

    const handleClick = useCallback(() => {
      if (disabled || loading || !onClick) return;
      onClick();
    }, [disabled, loading, onClick]);

    const isOrangeTheme = theme === "secondary" || theme === "orangeLight";
    const isLightOrangeTheme = theme === "orangeLight";
    
    // Colors for orange 50 theme (black text, dark orange accents)
    const textColor = isLightOrangeTheme ? "text-gray-900" : "text-gray-800";
    const titleColor = isLightOrangeTheme ? "text-gray-900" : "text-white";
    const descriptionColor = isLightOrangeTheme ? "text-gray-700" : "text-white/90";
    const iconColor = isLightOrangeTheme ? "text-orange-600" : "text-orange-300";
    const accentColor = isLightOrangeTheme ? "text-orange-700" : "text-orange-300";
    const dotColor = isLightOrangeTheme ? "bg-orange-600/60" : "bg-orange-400/60";
    const pulseColor = isLightOrangeTheme ? "bg-orange-600" : "bg-orange-500";
    const borderAccent = isLightOrangeTheme ? "border-orange-300" : "border-orange-400/30";
    const overlayOpacity = isLightOrangeTheme ? "bg-black/5" : "bg-black/50";

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl transform-gpu transition-all duration-500 ease-out",
          SIZES[size],
          VARIANTS[variant],
          onClick && !disabled && !loading && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          loading && "pointer-events-none",
          isLightOrangeTheme && "shadow-orange-200/50",
          className
        )}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: disabled ? 0 : mousePos.y,
          rotateY: disabled ? 0 : mousePos.x,
          z: disabled ? 0 : hovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
        whileTap={
          disabled || !onClick
            ? {}
            : {
                scale: 0.98,
                rotateX: mousePos.y + 3,
                rotateY: mousePos.x + 3,
              }
        }
        onClick={handleClick}
        style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        role={onClick ? "button" : "article"}
        tabIndex={onClick && !disabled ? 0 : -1}
        {...props}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl",
            image ? "" : `bg-gradient-to-br ${finalGradient}`
          )}
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.4 }}
          style={{ transform: "translateZ(-10px)" }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500"
              loading="lazy"
            />
          )}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
          <svg
            className="absolute -top-4 -right-4 w-32 h-32 text-orange-400/30"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="1"
                  fill="currentColor"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#${patternId})`} />
          </svg>

          <motion.div
            className="absolute -bottom-4 -left-4 w-24 h-24 opacity-30"
            animate={{ rotate: hovered ? 180 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400/40">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                rx="8"
              />
              <rect
                x="35"
                y="35"
                width="30"
                height="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                rx="4"
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isLightOrangeTheme 
              ? `linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.05) 100%)`
              : `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)`,
            transform: "translateZ(5px)",
          }}
          animate={{ opacity: hovered ? 0.3 : 0.2 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(15px)" }}
        >
          <motion.div
            className="absolute -inset-full"
            animate={{
              background: hovered
                ? `linear-gradient(${mousePos.x + 135}deg, transparent 40%, ${isLightOrangeTheme ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.25)'} 50%, transparent 60%)`
                : "transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="relative z-20 flex h-full flex-col justify-between p-6"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex justify-between items-start">
            {icon && (
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className={cn("text-3xl opacity-90 filter drop-shadow-sm", iconColor)}
                  animate={{
                    rotateZ: hovered ? 5 : 0,
                    y: hovered ? -2 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="relative"
              animate={{ scale: hovered ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={cn("h-2.5 w-2.5 rounded-full backdrop-blur-sm", dotColor)} />
              {!disabled && (
                <motion.div
                  className={cn("absolute inset-0 h-2.5 w-2.5 rounded-full", pulseColor)}
                  animate={{
                    scale: hovered ? [1, 1.4, 1] : 1,
                    opacity: hovered ? [0.7, 0.3, 0.7] : 0.7,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </div>

          <motion.div
            className="space-y-3"
            animate={{ y: hovered ? -3 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className={cn("text-xl font-semibold tracking-tight", titleColor)}
              animate={{ scale: hovered ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className={cn("text-sm leading-relaxed line-clamp-3", descriptionColor)}
              animate={{ opacity: hovered ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>

            {onClick && !disabled && (
              <motion.div
                className="flex items-center space-x-2 opacity-0"
                animate={{
                  x: hovered ? 0 : -8,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className={cn("h-0.5 w-4 rounded-full", isLightOrangeTheme ? "bg-orange-600" : "bg-orange-400")} />
                <div className={cn("text-xs font-medium", accentColor)}>
                  {loading ? "Loading..." : "Explore"}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 30%, transparent 70%, rgba(249,115,22,0.04) 100%)`,
            transform: "translateZ(25px)",
          }}
          animate={{ opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {!disabled && (
          <motion.div
            className="absolute -inset-0.5 rounded-2xl opacity-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${finalGradient})`,
              filter: "blur(15px)",
              transform: "translateZ(-5px)",
            }}
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-6 h-6 border-2 border-orange-400 border-t-orange-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </motion.div>
    );
  }
);

Card3D.displayName = "Card3D";

export const Card3DList: React.FC<Card3DListProps> = ({
  cards,
  className,
  columns = 3,
  gap = "md",
  size = "md",
  variant = "default",
  animated = true,
  staggerDelay = 0.08,
}) => {
  const gridClass = useMemo(() => GRIDS[columns], [columns]);
  const gapClass = useMemo(() => GAPS[gap], [gap]);

  const containerVariantsLocal: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const elements = useMemo(
    () =>
      cards.map((card) => (
        <motion.div
          key={card.id}
          variants={animated ? itemVariants : undefined}
          whileInView={animated ? "visible" : undefined}
          initial={animated ? "hidden" : undefined}
          viewport={
            animated ? { once: true, margin: "-50px", amount: 0.2 } : undefined
          }
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card3D
            title={card.title}
            description={card.description}
            image={card.image}
            icon={card.icon}
            theme={card.theme}
            gradient={card.gradient}
            onClick={card.onClick}
            size={size}
            variant={variant}
            disabled={card.disabled}
            loading={card.loading}
          />
        </motion.div>
      )),
    [cards, size, variant, animated]
  );

  return (
    <div className="relative">
      <motion.div
        className={cn("relative grid w-full", gridClass, gapClass, className)}
        variants={animated ? containerVariantsLocal : undefined}
        initial={animated ? "hidden" : undefined}
        animate={animated ? "visible" : undefined}
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {elements}
      </motion.div>
    </div>
  );
};

export default Card3DList;