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
    accent: "from-emerald-400/30 to-teal-400/15",
    border: "rgba(52, 211, 153, 0.4)",
    glow: "rgba(52, 211, 153, 0.1)",
    badge: "bg-white/80 text-emerald-700 border-emerald-200",
    iconBg: "bg-white/80",
    iconColor: "text-emerald-600",
    cta: "text-emerald-600 hover:text-emerald-700",
    number: "text-black/10",
    ctaColor: "#059669",
  },
  {
    accent: "from-violet-400/30 to-purple-400/15",
    border: "rgba(139, 92, 246, 0.4)",
    glow: "rgba(139, 92, 246, 0.1)",
    badge: "bg-white/80 text-violet-700 border-violet-200",
    iconBg: "bg-white/80",
    iconColor: "text-violet-600",
    cta: "text-violet-600 hover:text-violet-700",
    number: "text-black/10",
    ctaColor: "#7c3aed",
  },
  {
    accent: "from-orange-400/30 to-amber-400/15",
    border: "rgba(251, 146, 60, 0.4)",
    glow: "rgba(251, 146, 60, 0.1)",
    badge: "bg-white/80 text-orange-700 border-orange-200",
    iconBg: "bg-white/80",
    iconColor: "text-orange-600",
    cta: "text-orange-600 hover:text-orange-700",
    number: "text-black/10",
    ctaColor: "#ea580c",
  },
  {
    accent: "from-sky-400/30 to-blue-400/15",
    border: "rgba(56, 189, 248, 0.4)",
    glow: "rgba(56, 189, 248, 0.1)",
    badge: "bg-white/80 text-sky-700 border-sky-200",
    iconBg: "bg-white/80",
    iconColor: "text-sky-600",
    cta: "text-sky-600 hover:text-sky-700",
    number: "text-black/10",
    ctaColor: "#0284c7",
  },
];

const CARD_BG_IMAGES = [
  "/images/card-stack/bg1.jpg",
  "/images/card-stack/bg2.jpg",
  "/images/card-stack/bg4.jpg",
  "/images/card-stack/bg5.jpg",
  "/images/card-stack/bg7.jpg",
  "/images/card-stack/bg3.jpg",
];

const Card: React.FC<CardProps> = ({ item, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const palette = CARD_COLORS[index % CARD_COLORS.length];
  const cardBgImage = CARD_BG_IMAGES[index % CARD_BG_IMAGES.length];

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.025;

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
    <>
      {/* Inject responsive CSS once */}
      <style>{`
        .lsc-card-inner {
          padding: 3.5rem 3.5rem 3rem;
        }
        .lsc-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
        }
        .lsc-description {
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          max-width: 85%;
        }
        .lsc-icon-box {
          width: 72px;
          height: 72px;
          border-radius: 24px;
        }
        .lsc-icon-inner {
          width: 36px;
          height: 36px;
        }
        .lsc-number {
          font-size: 10rem;
          right: 2rem;
          bottom: 1.5rem;
        }
        .lsc-card-min-height {
          min-height: 560px;
        }
        @media (max-width: 768px) {
          .lsc-card-inner {
            padding: 2rem 1.5rem 1.75rem;
          }
          .lsc-description {
            max-width: 100%;
          }
          .lsc-icon-box {
            width: 52px;
            height: 52px;
            border-radius: 16px;
          }
          .lsc-icon-inner {
            width: 26px;
            height: 26px;
          }
          .lsc-number {
            font-size: 5.5rem;
            right: 1rem;
            bottom: 1rem;
            opacity: 0.3;
          }
          .lsc-card-min-height {
            min-height: auto;
          }
        }
        @media (max-width: 480px) {
          .lsc-card-inner {
            padding: 1.5rem 1.25rem 1.5rem;
          }
          .lsc-number {
            font-size: 4rem;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          // On very small screens, allow content to breathe
          minHeight: "100svh",
        }}
      >
        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1080px",
            transformOrigin: "top",
            top: `${index * 20}px`,
          }}
        >
          {/* Colored border ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "30px",
              border: "1px solid rgba(255,255,255,0.12)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Main card with background image */}
          <div
            className="lsc-card-min-height"
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "30px",
              backgroundImage: `url(${cardBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden",
            }}
          >
            {/* Lighter overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.6) 100%)",
                zIndex: 1,
              }}
            />

            {/* Minimal glass overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: "blur(1px)",
                zIndex: 2,
              }}
            />

            {/* Content container */}
            <div
              className="lsc-card-inner"
              style={{
                position: "relative",
                zIndex: 3,
              }}
            >
              {/* Subtle top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.accent}`}
                style={{ opacity: 0.5 }}
              />

              {/* Diagonal background number */}
              <div
                className={`lsc-number ${palette.number}`}
                style={{
                  position: "absolute",
                  fontWeight: 800,
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.05em",
                  opacity: 0.4,
                }}
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
                    marginBottom: "1.5rem",
                    gap: "0.75rem",
                  }}
                >
                  {item.icon && (
                    <div
                      className={`lsc-icon-box ${palette.iconBg} ${palette.iconColor}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <span
                        className="lsc-icon-inner"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </span>
                    </div>
                  )}

                  <span
                    className={`${palette.badge} border text-sm font-semibold tracking-wider uppercase`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 99,
                      letterSpacing: "0.08em",
                      background: "rgba(255, 255, 255, 0.9)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    0{index + 1} / 0{totalCards}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="lsc-title"
                  style={{
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginBottom: "1rem",
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </h3>

                {/* Divider */}
                <div
                  style={{
                    height: "3px",
                    width: "5rem",
                    borderRadius: 2,
                    background: palette.border,
                    marginBottom: "1.25rem",
                  }}
                />

                {/* Description */}
                <p
                  className="lsc-description"
                  style={{
                    lineHeight: 1.6,
                    color: "#1F2937",
                    marginBottom: "1.5rem",
                  }}
                >
                  {item.description} We build software that scales with your
                  ambition from first-user MVPs to enterprise-grade,
                  cloud-native systems. Whether you need a multi-tenant SaaS
                  platform, a custom ERP, an API-first integration layer, or a
                  cross-platform mobile app, our approach remains the same,
                  clean architecture, production-ready quality, and
                  infrastructure designed for 10x growth. 
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
                      marginTop: "0.5rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "0.01em",
                      background: "rgba(255, 255, 255, 0.95)",
                      padding: "10px 22px",
                      borderRadius: 99,
                      color: palette.ctaColor,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
      </div>
    </>
  );
};

interface LargeStackedCardsProps {
  items: LargeGlassCardItem[];
}

export const LargeStackedCards: React.FC<LargeStackedCardsProps> = ({
  items,
}) => {
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