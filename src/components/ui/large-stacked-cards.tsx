// src/components/ui/large-stacked-cards.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface LargeGlassCardItem {
  id: number | string;
  title: string;
  description: string;
  color?: string;
  icon?: React.ReactNode;
  cta?: { label: string; href: string };
}

interface CardProps {
  item: LargeGlassCardItem;
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

    const targetScale = 1 - (totalCards - index) * 0.03; // Less scale reduction for larger cards

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
          maxWidth: "880px", // Increased from 660px
          transformOrigin: "top",
          top: `${index * 24}px`, // Increased stack offset
        }}
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            inset: "-2px", // Slightly larger glow
            borderRadius: "32px", // Larger border radius
            background: palette.glow,
            filter: "blur(20px)",
            zIndex: -1,
          }}
        />

        {/* Colored border ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "30px",
            border: `2px solid ${palette.border}`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Main card - LARGER with more height */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "30px",
            background: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(30px) saturate(200%)",
            boxShadow:
              "0 25px 70px rgba(0,0,0,0.08), 0 5px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
            overflow: "hidden",
            padding: "3rem 3rem 2.5rem", // Increased padding
            minHeight: "480px", // Added minimum height
          }}
        >
          {/* Subtle top gradient accent - thicker */}
          <div
            className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.accent.replace("/20", "").replace("/10", "")}`}
            style={{ opacity: 0.7 }}
          />

          {/* Diagonal background number - larger */}
          <div
            style={{
              position: "absolute",
              right: "2rem",
              bottom: "1.5rem",
              fontSize: "9rem", // Larger number
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
            {/* Top row: icon + badge - larger */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
              }}
            >
              {item.icon && (
                <div
                  className={`${palette.iconBg} ${palette.iconColor}`}
                  style={{
                    display: "inline-flex",
                    width: 64, // Larger icon container
                    height: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </span>
                </div>
              )}

              <span
                className={`${palette.badge} border text-sm font-semibold tracking-wider uppercase`} // Larger text
                style={{
                  padding: "6px 14px",
                  borderRadius: 99,
                  letterSpacing: "0.08em",
                }}
              >
                0{index + 1} / 0{totalCards}
              </span>
            </div>

            {/* Title - larger */}
            <h3
              style={{
                fontSize: "2rem", // Larger title
                fontWeight: 700,
                color: "hsl(var(--primary))",
                marginBottom: "0.85rem",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {item.title}
            </h3>

            {/* Divider - thicker */}
            <div
              style={{
                height: "2px",
                width: "3rem",
                borderRadius: 2,
                background: palette.border,
                marginBottom: "1.25rem",
              }}
            />

            {/* Description - larger text with more spacing */}
            <p
              style={{
                fontSize: "1.25rem", // Larger description text
                lineHeight: 1.75,
                color: "rgba(0,0,0,0.65)",
                maxWidth: "90%",
                marginBottom: "1.5rem",
              }}
            >
              {item.description}
            </p>

            {/* Optional bullet points or features */}
            {/* {item.features && (
              <ul style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                {item.features.map((feature, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.95rem", color: "rgba(0,0,0,0.6)" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: palette.border }} />
                    {feature}
                  </li>
                ))}
              </ul>
            )} */}

            {/* CTA - larger */}
            {item.cta && (
              <a
                href={item.cta.href}
                className={`${palette.cta} inline-flex items-center gap-2 transition-all`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                {item.cta.label}
                <ArrowUpRight style={{ width: 18, height: 18 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LargeStackedCardsProps {
  items: LargeGlassCardItem[];
}

export const LargeStackedCards: React.FC<LargeStackedCardsProps> = ({ items }) => {
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

export default LargeStackedCards;