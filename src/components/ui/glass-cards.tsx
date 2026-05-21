"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const Card: React.FC<CardProps> = ({ item, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

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
          maxWidth: "620px",
          height: "420px",
          borderRadius: "24px",
          isolation: "isolate",
          top: `calc(-15vh + ${index * 25}px)`,
          transformOrigin: "top",
        }}
      >
        {/* Electric Primary Border */}
        <div
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "27px",
            padding: "3px",
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              hsl(var(--primary)) 60deg,
              hsl(var(--primary) / 0.6) 120deg,
              transparent 180deg,
              hsl(var(--primary) / 0.4) 240deg,
              transparent 360deg
            )`,
            zIndex: -1,
          }}
        />

        {/* Main Card - White Glass Effect */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(25px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
            overflow: "hidden",
          }}
        >
          {/* Top reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Shine */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              right: "12px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
              borderRadius: "1px",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {item.icon && (
              <div
                style={{
                  display: "inline-flex",
                  width: 48,
                  height: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  background: "hsl(var(--neutral-100))",
                  color: "hsl(var(--primary))",
                  marginBottom: 16,
                }}
              >
                {item.icon}
              </div>
            )}

            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "hsl(var(--primary))",   // ← Primary Heading
                marginBottom: 12,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.65)",
              }}
            >
              {item.description}
            </p>

            {item.cta && (
              <a
                href={item.cta.href}
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                }}
              >
                {item.cta.label} →
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