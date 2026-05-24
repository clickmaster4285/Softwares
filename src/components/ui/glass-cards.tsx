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
    accentSolid: "from-emerald-400 to-teal-400",
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
    accentSolid: "from-violet-400 to-purple-400",
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
    accentSolid: "from-orange-400 to-amber-400",
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
    accentSolid: "from-sky-400 to-blue-400",
  },
];

interface StackedCardsProps {
  items: GlassCardItem[];
}

export const StackedCards: React.FC<StackedCardsProps> = ({ items }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sectionEl = wrapper.closest("section");
    if (!sectionEl) return;

    const totalCards = items.length;
    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      if (i === 0) {
        // Card 1 is immediately visible, full size, no animation needed
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      } else {
        // Cards 2+ start hidden below
        gsap.set(card, { opacity: 0, y: 60, scale: 0.94 });
      }
    });

    // Each subsequent card (index 1+) gets its own scroll window
    // We divide the section scroll into (totalCards - 1) windows
    const windows = totalCards - 1;

    cardRefs.current.forEach((card, i) => {
      if (!card || i === 0) return; // skip card 1

      const stepSize = 1 / windows;
      const windowStart = (i - 1) * stepSize;
      const revealEnd = windowStart + stepSize * 0.45; // reveal in first 45% of window

      const trigger = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          if (p >= windowStart) {
            // Reveal this card
            const revealP = Math.min(1, (p - windowStart) / (revealEnd - windowStart));
            gsap.set(card, {
              opacity: revealP,
              y: gsap.utils.interpolate(60, 0, revealP),
              scale: gsap.utils.interpolate(0.94, 1, revealP),
            });
          } else {
            gsap.set(card, { opacity: 0, y: 60, scale: 0.94 });
          }

          // Scale back cards that are now "underneath"
          cardRefs.current.forEach((prevCard, j) => {
            if (!prevCard || j >= i) return;
            // How many cards are on top of this one?
            const cardsOnTop = cardRefs.current.slice(j + 1).filter((c, ci) => {
              const cardIndex = j + 1 + ci;
              const cardWindowStart = (cardIndex - 1) * stepSize;
              return p >= cardWindowStart * 0.5;
            }).length;
            const scaleBack = 1 - cardsOnTop * 0.04;
            gsap.set(prevCard, { scale: Math.max(scaleBack, 0.84) });
          });
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [items.length]);

  return (
    /*
     * All cards absolutely stacked. The wrapper height = card height (set by first card).
     * Each card sits at top:0 so they layer exactly on top of each other.
     * The top offset (index * 18px) gives that "peeking deck" look.
     */
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ minHeight: "420px" }}
    >
      {items.map((item, index) => {
        const palette = CARD_COLORS[index % CARD_COLORS.length];

        return (
          <div
            key={item.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            style={{
              position: "absolute",
              inset: 0,
              top: `${index * 20}px`,
              transformOrigin: "top center",
              willChange: "transform, opacity",
              zIndex: index + 1, // later cards on top
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
              }}
            >
              {/* Top gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${palette.accentSolid}`}
                style={{ opacity: 0.7 }}
              />

              {/* Background number */}
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
                {/* Icon + badge row */}
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
                      <span
                        style={{
                          width: 24,
                          height: 24,
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
                    className={`${palette.badge} border text-xs font-semibold tracking-wider uppercase`}
                    style={{ padding: "4px 10px", borderRadius: 99, letterSpacing: "0.08em" }}
                  >
                    0{index + 1} / 0{items.length}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.3rem",
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
                    fontSize: "0.925rem",
                    lineHeight: 1.7,
                    color: "rgba(0,0,0,0.6)",
                    maxWidth: "90%",
                  }}
                >
                  {item.description}
                </p>

                {/* CTA */}
                {item.cta && (
                  <a
                    href={item.cta.href}
                    className={`${palette.cta} inline-flex items-center gap-1.5 transition-all`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      marginTop: "1.35rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.cta.label}
                    <ArrowUpRight style={{ width: 15, height: 15 }} />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StackedCards;