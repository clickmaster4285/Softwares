'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export function RobotMascot() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<SVGGElement>(null);
  const eyeL = useRef<SVGEllipseElement>(null);
  const eyeR = useRef<SVGEllipseElement>(null);
  const armL = useRef<SVGGElement>(null);
  const armR = useRef<SVGGElement>(null);
  const speechBubble = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");

  const messages = [
    "Hi there! 👋",
    "Need a website or app?",
    "Software Development Experts",
    "Let's build something great!",
    "Contact Us",
  ];

  const showMessage = (index: number) => {
    setCurrentMessage(messages[index]);
    
    gsap.fromTo(speechBubble.current, 
      { opacity: 0, y: 12, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
    );

    setTimeout(() => {
      gsap.to(speechBubble.current, {
        opacity: 0,
        y: 12,
        duration: 0.3,
        onComplete: () => setCurrentMessage(""),
      });
    }, 4200);
  };

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.to(root.current, {
        y: -12,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(head.current, {
        rotation: 5,
        transformOrigin: "50% 80%",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const blink = () => {
        gsap.to([eyeL.current, eyeR.current], {
          scaleY: 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => gsap.delayedCall(2 + Math.random() * 3, blink),
        });
      };
      gsap.delayedCall(1.5, blink);

      const clap = () => {
        gsap.to([armL.current, armR.current], {
          rotation: -45,
          transformOrigin: "center 20%",
          duration: 0.18,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 3,
          onComplete: () => gsap.delayedCall(4 + Math.random() * 5, clap),
        });
      };
      gsap.delayedCall(6, clap);

      let msgIndex = 0;
      const messageInterval = setInterval(() => {
        showMessage(msgIndex);
        msgIndex = (msgIndex + 1) % messages.length;
      }, 9000);

      return () => clearInterval(messageInterval);
    }, root);

    const onMove = (e: MouseEvent) => {
      if (!root.current) return;
      const r = root.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-4, Math.min(4, (e.clientX - cx) / 70));
      const dy = Math.max(-3, Math.min(3, (e.clientY - cy) / 90));

      gsap.to([eyeL.current, eyeR.current], {
        x: dx,
        y: dy,
        duration: 0.35,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const handleClick = () => {
    router.push("/contact-us");
  };

  return (
    <div
      ref={root}
      className="pointer-events-none fixed bottom-8 right-8 z-50 hidden md:block"
      aria-hidden
    >
      {/* Speech Bubble - Lower Position */}
      <div
        ref={speechBubble}
        className="pointer-events-auto absolute -top-20 right-2 
                   bg-white/70  backdrop-blur-md
                   px-4 py-3 rounded-2xl shadow-lg border border-white/30 
                   text-sm font-medium max-w-[165px] text-center
                   leading-tight opacity-0"
      >
        {currentMessage}
        
        {/* Bubble Tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 
                        bg-white/70  backdrop-blur-md 
                        border-r border-b border-white/30  rotate-45" />
      </div>

      <div 
        className="pointer-events-auto cursor-pointer drop-shadow-[0_12px_35px_rgba(0,120,140,0.4)] active:scale-95 transition-transform"
        onClick={handleClick}
      >
        <svg width="130" height="150" viewBox="0 0 130 150" fill="none">
          {/* Glow */}
          <ellipse cx="65" cy="138" rx="45" ry="7" fill="oklch(0.52 0.08 210)" opacity="0.25" />

          {/* Antenna */}
          <line x1="65" y1="24" x2="65" y2="11" stroke="oklch(0.52 0.08 210)" strokeWidth="2.5" />
          <circle cx="65" cy="9" r="4.5" fill="oklch(0.82 0.12 50)">
            <animate attributeName="r" values="3.8;5.2;3.8" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <g ref={head}>
            <rect x="29" y="24" width="72" height="58" rx="18" fill="url(#bodyGrad)" stroke="oklch(0.52 0.08 210)" strokeWidth="2" />
            <rect x="38" y="36" width="54" height="29" rx="12" fill="oklch(0.18 0.04 230)" />
            <ellipse ref={eyeL} cx="51" cy="49" rx="5" ry="5.5" fill="oklch(0.88 0.1 150)" />
            <ellipse ref={eyeR} cx="79" cy="49" rx="5" ry="5.5" fill="oklch(0.88 0.1 150)" />
            <path d="M48 70 Q65 78 82 70" stroke="oklch(0.82 0.12 50)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="36" cy="60" r="2.5" fill="oklch(0.82 0.12 50)" />
            <circle cx="94" cy="60" r="2.5" fill="oklch(0.82 0.12 50)" />
          </g>

          {/* Body */}
          <rect x="37" y="84" width="56" height="40" rx="12" fill="url(#bodyGrad)" stroke="oklch(0.52 0.08 210)" strokeWidth="2" />
          <circle cx="65" cy="104" r="6" fill="oklch(0.88 0.1 150)" />

          {/* Arms */}
          <g ref={armL}>
            <rect x="20" y="88" width="12" height="26" rx="6" fill="oklch(0.52 0.08 210)" />
            <circle cx="26" cy="87" r="7" fill="oklch(0.82 0.12 50)" />
          </g>
          <g ref={armR}>
            <rect x="98" y="88" width="12" height="26" rx="6" fill="oklch(0.52 0.08 210)" />
            <circle cx="104" cy="87" r="7" fill="oklch(0.82 0.12 50)" />
          </g>

          {/* Feet */}
          <rect x="43" y="124" width="16" height="9" rx="4" fill="oklch(0.52 0.08 210)" />
          <rect x="71" y="124" width="16" height="9" rx="4" fill="oklch(0.52 0.08 210)" />

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