"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
};

function wrapIndex(n: number, len: number) {
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number) {
  const raw = i - active;
  if (len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  cardWidth = 440,
  cardHeight = 270,
  overlap = 0.48,
  spreadDeg = 32,
  autoAdvance = false,
  intervalMs = 3000,
  pauseOnHover = true,
  showDots = true,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const actualCardWidth = React.useMemo(() => {
    if (windowWidth < 640) return Math.min(260, windowWidth - 48);
    if (windowWidth < 768) return Math.min(310, windowWidth - 60);
    if (windowWidth < 1024) return Math.min(380, windowWidth - 70);
    return Math.min(cardWidth, 440);
  }, [windowWidth, cardWidth]);

  const maxOffset = 3;
  const cardSpacing = actualCardWidth * (1 - overlap);

  const prev = () => setActive((a) => wrapIndex(a - 1, len));
  const next = () => setActive((a) => wrapIndex(a + 1, len));

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;

    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, next]);

  if (!len) return null;

  return (
    <div className="w-full mb-20">
      <div
        className="relative mx-auto"
        style={{ height: cardHeight + 100 }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-44 w-4/5 rounded-full bg-black/5 blur-3xl" />

        <div
          className="absolute inset-0 flex items-end justify-center overflow-hidden"
          style={{ perspective: "1100px" }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;

              const isActive = off === 0;

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-3xl overflow-hidden shadow-xl border border-black/10",
                    isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                  )}
                  style={{
                    width: actualCardWidth,
                    height: cardHeight,
                    zIndex: 100 - abs,
                  }}
                  animate={{
                    x: off * cardSpacing,
                    y: abs * 8 + (isActive ? -20 : 0),
                    rotateZ: off * (spreadDeg / maxOffset),
                    rotateX: isActive ? 0 : 8,
                    scale: isActive ? 1.035 : 0.90,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={() => setActive(i)}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: -50, right: 50 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 60) prev();
                    if (info.offset.x < -60) next();
                  }}
                >
                  <DefaultFanCard item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots && (
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                idx === active ? "bg-orange-500 w-8" : "bg-gray-300 w-2.5 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item }: { item: CardStackItem }) {
  return (
    <div className="relative h-full w-full">
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={item.title}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="h-full w-full bg-gray-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="font-semibold text-lg leading-tight">{item.title}</div>
        {item.description && (
          <p className="mt-1 text-sm text-white/90 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}