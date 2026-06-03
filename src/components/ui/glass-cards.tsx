"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface GlassCardItem {
  id: number | string;
  title: string;
  description: string;
  color?: string;
  icon?: React.ReactNode;
  cta?: { label: string; href: string };
}

interface CardProps {
  item: GlassCardItem;
  index: number;
  totalCards: number;
}

const CARD_COLORS = [
  {
    accent: "from-emerald-400/20 to-teal-400/10",
    border: "rgba(52, 211, 153, 0.35)",
    glow: "rgba(52, 211, 153, 0.12)",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    cta: "text-emerald-600 hover:text-emerald-700",
    number: "text-emerald-200",
  },
  {
    accent: "from-violet-400/20 to-purple-400/10",
    border: "rgba(139, 92, 246, 0.35)",
    glow: "rgba(139, 92, 246, 0.12)",
    badge: "bg-violet-50 text-violet-700 border-violet-200/60",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    cta: "text-violet-600 hover:text-violet-700",
    number: "text-violet-200",
  },
  {
    accent: "from-orange-400/20 to-amber-400/10",
    border: "rgba(251, 146, 60, 0.35)",
    glow: "rgba(251, 146, 60, 0.12)",
    badge: "bg-orange-50 text-orange-700 border-orange-200/60",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    cta: "text-orange-600 hover:text-orange-700",
    number: "text-orange-200",
  },
  {
    accent: "from-sky-400/20 to-blue-400/10",
    border: "rgba(56, 189, 248, 0.35)",
    glow: "rgba(56, 189, 248, 0.12)",
    badge: "bg-sky-50 text-sky-700 border-sky-200/60",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    cta: "text-sky-600 hover:text-sky-700",
    number: "text-sky-200",
  },
];

const Card: React.FC<CardProps> = ({ item, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const palette = CARD_COLORS[index % CARD_COLORS.length];

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.04;

    gsap.set(card, { scale: 1, transformOrigin: "center top" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);
        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "700px",
          transformOrigin: "top",
          top: `${index * 18}px`,
        }}
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            inset: "-1px",
            borderRadius: "28px",
            background: palette.glow,
            filter: "blur(16px)",
            zIndex: -1,
          }}
        />

        {/* Colored border ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "26px",
            border: `1.5px solid ${palette.border}`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Main card */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "26px",
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(30px) saturate(200%)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
            overflow: "hidden",
            padding: "2.25rem 2.5rem 2rem",
            minHeight: "500px",
          }}
        >
          {/* Subtle top gradient accent */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${palette.accent.replace("/20", "").replace("/10", "")}`}
            style={{ opacity: 0.7 }}
          />

          {/* Diagonal background number */}
          <div
            style={{
              position: "absolute",
              right: "1.75rem",
              bottom: "1rem",
              fontSize: "7rem",
              fontWeight: 800,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.05em",
            }}
            className={palette.number}
            aria-hidden="true"
          >
            0{index + 1}
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Top row: icon + badge */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              {item.icon && (
                <div
                  className={`${palette.iconBg} ${palette.iconColor}`}
                  style={{
                    display: "inline-flex",
                    width: 52,
                    height: 52,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                    flexShrink: 0,
                  }}
                >
                  {/* Render icon with size override */}
                  <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </span>
                </div>
              )}

              <span
                className={`${palette.badge} border text-base font-semibold tracking-wider uppercase`}
                style={{
                  padding: "4px 10px",
                  borderRadius: 99,
                  letterSpacing: "0.08em",
                }}
              >
                0{index + 1} / 0{totalCards}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "hsl(var(--primary))",
                marginBottom: "0.65rem",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {item.title}
            </h3>

            {/* Divider */}
            <div
              style={{
                height: "1.5px",
                width: "2.5rem",
                borderRadius: 2,
                background: palette.border,
                marginBottom: "0.85rem",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.7,
                 color: "#111827",
                maxWidth: "90%",
              }}
            >
              {item.description}
            </p>

            {/* CTA */}
            {item.cta && (
             <a
  href={item.cta.href}
  className={`${palette.cta} inline-flex items-center gap-2 transition-all`}
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
    fontSize: "1.2rem",
    fontWeight: 700,
    textDecoration: "none",
  }}
>
  {item.cta.label}
  <ArrowUpRight style={{ width: 20, height: 20 }} />
</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StackedCardsProps {
  items: GlassCardItem[];
}

export const StackedCards: React.FC<StackedCardsProps> = ({ items }) => {
  return (
    <section style={{ width: "100%" }}>
      {items.map((card, index) => (
        <Card
          key={card.id}
          item={card}
          index={index}
          totalCards={items.length}
        />
      ))}
    </section>
  );
};

export default StackedCards;