'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A small friendly SVG robot that floats in the bottom-right corner,
 * blinks, waves, and follows the cursor slightly for a playful touch.
 */
export function RobotMascot() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<SVGGElement>(null);
  const eyeL = useRef<SVGEllipseElement>(null);
  const eyeR = useRef<SVGEllipseElement>(null);
  const arm = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Idle float
      gsap.to(root.current, {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      // Antenna / head tilt
      gsap.to(head.current, {
        rotation: 4,
        transformOrigin: "50% 80%",
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      // Wave arm
      gsap.to(arm.current, {
        rotation: -25,
        transformOrigin: "20% 20%",
        duration: 0.6,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
      });
      // Blink
      const blink = () => {
        gsap.to([eyeL.current, eyeR.current], {
          scaleY: 0.1,
          transformOrigin: "center",
          duration: 0.08,
          yoyo: true,
          repeat: 1,
          onComplete: () => gsap.delayedCall(2 + Math.random() * 2, blink),
        });
      };
      gsap.delayedCall(1.5, blink);
    }, root);

    // Cursor follow for eyes
    const onMove = (e: MouseEvent) => {
      if (!root.current) return;
      const r = root.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-3, Math.min(3, (e.clientX - cx) / 80));
      const dy = Math.max(-2, Math.min(2, (e.clientY - cy) / 100));
      gsap.to([eyeL.current, eyeR.current], { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed bottom-6 right-6 z-50 hidden md:block"
      aria-hidden
    >
      <div className="pointer-events-auto drop-shadow-[0_10px_30px_rgba(0,120,140,0.35)]">
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          {/* Glow */}
          <ellipse cx="60" cy="130" rx="40" ry="6" fill="oklch(0.52 0.08 210)" opacity="0.25" />

          {/* Antenna */}
          <line x1="60" y1="22" x2="60" y2="10" stroke="oklch(0.52 0.08 210)" strokeWidth="2" />
          <circle cx="60" cy="8" r="4" fill="oklch(0.82 0.12 50)">
            <animate attributeName="r" values="3.5;5;3.5" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <g ref={head}>
            <rect
              x="28"
              y="22"
              width="64"
              height="54"
              rx="16"
              fill="url(#bodyGrad)"
              stroke="oklch(0.52 0.08 210)"
              strokeWidth="1.5"
            />
            {/* Visor */}
            <rect x="36" y="34" width="48" height="26" rx="10" fill="oklch(0.18 0.04 230)" />
            {/* Eyes */}
            <ellipse ref={eyeL} cx="50" cy="47" rx="4.5" ry="5" fill="oklch(0.88 0.1 150)" />
            <ellipse ref={eyeR} cx="70" cy="47" rx="4.5" ry="5" fill="oklch(0.88 0.1 150)" />
            {/* Smile */}
            <path
              d="M48 67 Q60 74 72 67"
              stroke="oklch(0.82 0.12 50)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cheek lights */}
            <circle cx="34" cy="58" r="2" fill="oklch(0.82 0.12 50)" />
            <circle cx="86" cy="58" r="2" fill="oklch(0.82 0.12 50)" />
          </g>

          {/* Body */}
          <rect
            x="36"
            y="78"
            width="48"
            height="36"
            rx="10"
            fill="url(#bodyGrad)"
            stroke="oklch(0.52 0.08 210)"
            strokeWidth="1.5"
          />
          <circle cx="60" cy="96" r="5" fill="oklch(0.88 0.1 150)" />

          {/* Left arm (static) */}
          <rect x="22" y="84" width="10" height="22" rx="5" fill="oklch(0.52 0.08 210)" />

          {/* Right arm (waving) */}
          <g ref={arm}>
            <rect x="88" y="84" width="10" height="22" rx="5" fill="oklch(0.52 0.08 210)" />
            <circle cx="93" cy="82" r="6" fill="oklch(0.82 0.12 50)" />
          </g>

          {/* Feet */}
          <rect x="42" y="114" width="14" height="8" rx="3" fill="oklch(0.52 0.08 210)" />
          <rect x="64" y="114" width="14" height="8" rx="3" fill="oklch(0.52 0.08 210)" />

          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.98 0.02 180)" />
              <stop offset="100%" stopColor="oklch(0.88 0.1 150)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
