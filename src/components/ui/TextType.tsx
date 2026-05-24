"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextTypeProps {
  text: string | string[];
  className?: string;
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  startOnView?: boolean;
  threshold?: number;
}

export default function TextType({
  text,
  className = "",
  typingSpeed = 60,
  pauseDuration = 1500,
  deletingSpeed = 30,
  loop = true,
  showCursor = true,
  cursorCharacter = "|",
  startOnView = true,
  threshold = 0.2,
}: TextTypeProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [start, setStart] = useState(!startOnView);

  const texts = Array.isArray(text) ? text : [text];
  const current = texts[currentTextIndex];

  // ✅ ScrollTrigger (same style as your SplitText)
  useEffect(() => {
    if (!ref.current || !startOnView) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => setStart(true),
    });

    return () => {
      trigger.kill();
    };
  }, [startOnView, threshold]);

  // ✅ Typing engine
  useEffect(() => {
    if (!start) return;

    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const fullText = current;

      if (!isDeleting) {
        if (index < fullText.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + fullText[index]);
            setIndex((prev) => prev + 1);
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
          setIndex(0);
          setCurrentTextIndex((prev) =>
            loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)
          );
        }
      }
    };

    handleTyping();

    return () => clearTimeout(timeout);
  }, [
    start,
    index,
    displayText,
    isDeleting,
    currentTextIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    current,
  ]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText}
      {showCursor && <span className="ml-1 animate-pulse">{cursorCharacter}</span>}
    </span>
  );
}