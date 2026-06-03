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
  tags?: string[];
  metrics?: { label: string; value: string }[];
  backgroundImage?: string;
}

interface CardProps {
  item: LargeGlassCardItem;
  index: number;
  totalCards: number;
}

const CARD_COLORS = [
  {
    border: "rgba(253, 164, 175, 0.5)", // rose
    buttonBg: "bg-rose-300 hover:bg-rose-400",
    badge: "bg-rose-300/20 text-rose-200 border-rose-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-rose-300",
    cta: "text-rose-300 hover:text-rose-200",
    number: "text-rose-300/30",
  },
  {
    border: "rgba(167, 243, 208, 0.5)", // mint
    buttonBg: "bg-emerald-300 hover:bg-emerald-400",
    badge: "bg-emerald-300/20 text-emerald-200 border-emerald-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-emerald-300",
    cta: "text-emerald-300 hover:text-emerald-200",
    number: "text-emerald-300/30",
  },
  {
    border: "rgba(221, 214, 254, 0.5)", // lavender
    buttonBg: "bg-violet-300 hover:bg-violet-400",
    badge: "bg-violet-300/20 text-violet-200 border-violet-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-violet-300",
    cta: "text-violet-300 hover:text-violet-200",
    number: "text-violet-300/30",
  },
  {
    border: "rgba(254, 215, 170, 0.5)", // peach
    buttonBg: "bg-orange-300 hover:bg-orange-400",
    badge: "bg-orange-300/20 text-orange-200 border-orange-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-orange-300",
    cta: "text-orange-300 hover:text-orange-200",
    number: "text-orange-300/30",
  },
  {
    border: "rgba(187, 247, 208, 0.5)", // soft green
    buttonBg: "bg-green-300 hover:bg-green-400",
    badge: "bg-green-300/20 text-green-200 border-green-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-green-300",
    cta: "text-green-300 hover:text-green-200",
    number: "text-green-300/30",
  },
  {
    border: "rgba(254, 202, 202, 0.5)", // coral
    buttonBg: "bg-red-300 hover:bg-red-400",
    badge: "bg-red-300/20 text-red-200 border-red-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-red-300",
    cta: "text-red-300 hover:text-red-200",
    number: "text-red-300/30",
  },
  {
    border: "rgba(251, 207, 232, 0.5)", // pink
    buttonBg: "bg-pink-300 hover:bg-pink-400",
    badge: "bg-pink-300/20 text-pink-200 border-pink-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-pink-300",
    cta: "text-pink-300 hover:text-pink-200",
    number: "text-pink-300/30",
  },
  {
    border: "rgba(186, 230, 253, 0.5)", // sky
    buttonBg: "bg-sky-300 hover:bg-sky-400",
    badge: "bg-sky-300/20 text-sky-200 border-sky-300/30",
    iconBg: "bg-white/10",
    iconColor: "text-sky-300",
    cta: "text-sky-300 hover:text-sky-200",
    number: "text-sky-300/30",
  },
];

// Default background images
const DEFAULT_BG_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c2236a9d?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop",
];

const Card: React.FC<CardProps> = ({ item, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const palette = CARD_COLORS[index % CARD_COLORS.length];
  const backgroundImage = item.backgroundImage || DEFAULT_BG_IMAGES[index % DEFAULT_BG_IMAGES.length];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const targetScale = Math.max(0.88, 1 - (totalCards - index) * 0.045);

    gsap.set(card, { 
      scale: 1, 
      y: index * 32,
      transformOrigin: "center top" 
    });

    const trigger = ScrollTrigger.create({
      trigger: card.parentElement,
      start: "top top",
      end: "bottom center",
      scrub: 1.1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);
        const y = gsap.utils.interpolate(index * 32, 0, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          y: Math.max(y, 0),
        });
      },
    });

    return () => trigger.kill();
  }, [index, totalCards]);

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center z-10">
      <div
        ref={cardRef}
        className="relative w-full max-w-[1080px] mx-auto"
        style={{ transformOrigin: "center top" }}
      >
        {/* Outer glow */}
        <div
          style={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "32px",
            background: palette.border.replace('0.5', '0.15'),
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

        {/* Main card - DARK THEME */}
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "30px",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(20px) saturate(200%)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.5), 0 5px 20px rgba(0,0,0,0.3)",
            overflow: "hidden",
            padding: "3rem 3rem 2.5rem",
            minHeight: "580px",
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.4,
              zIndex: 0,
            }}
          />

          {/* Dark Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)",
              zIndex: 0,
            }}
          />

          {/* Color Tint Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${palette.border.replace('0.5', '0.2')}, transparent)`,
              zIndex: 0,
            }}
          />

          {/* Diagonal background number */}
          <div
            style={{
              position: "absolute",
              right: "2rem",
              bottom: "1.5rem",
              fontSize: "9rem",
              fontWeight: 800,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.05em",
              zIndex: 1,
            }}
            className={palette.number}
            aria-hidden="true"
          >
            {(index + 1).toString().padStart(2, "0")}
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Top row: icon + badge */}
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
                    width: 64,
                    height: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    flexShrink: 0,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </span>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                {item.tags && item.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className={`${palette.badge} border text-xs font-semibold tracking-wider uppercase`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 99,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={`${palette.badge} border text-sm font-semibold tracking-wider uppercase`}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    letterSpacing: "0.08em",
                  }}
                >
                  {(index + 1).toString().padStart(2, "0")} / {totalCards.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "white",
                marginBottom: "0.85rem",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {item.title}
            </h3>

            {/* Divider */}
            <div
              style={{
                height: "2px",
                width: "3rem",
                borderRadius: 2,
                background: palette.border,
                marginBottom: "1.25rem",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.7)",
                maxWidth: "90%",
                marginBottom: "1.5rem",
              }}
            >
              {item.description}
            </p>

            {/* Metrics */}
            {item.metrics && item.metrics.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
                {item.metrics.map((metric, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: palette.border.replace('0.5', '1'),
                      }}
                    >
                      {metric.value}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {item.cta && (
              <a
                href={item.cta.href}
                className={`${palette.buttonBg} inline-flex items-center gap-2 transition-all`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  color: "white",
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [items.length]);

  return (
    <section ref={sectionRef} className="relative">
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