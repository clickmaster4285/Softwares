'use client';


import { useEffect, useState, useRef } from 'react';


export function useInViewOnce(ref: React.RefObject<Element | null>, threshold = 0.15): boolean {
  const [visible, setVisible] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || done.current) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          done.current = true;
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '40px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return visible;
}



interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function Typewriter({ 
  texts, 
  typingSpeed = 80, 
  deletingSpeed = 40, 
  pauseTime = 1500 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timer);
    }

    const currentText = texts[currentIndex];

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        timer = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === currentText.length) {
        setIsWaiting(true);
      } else {
        timer = setTimeout(() => {
          setDisplayText((prev) => currentText.slice(0, prev.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isWaiting, currentIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block min-w-[280px] text-left text-primary font-medium sm:min-w-[340px] md:min-w-[400px]">
      {displayText}
      <span className="inline-block h-5 w-0.5 -mb-0.5 bg-primary animate-pulse" />
    </span>
  );
}







interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

export function Counter({ end, duration = 2, delay = 0 }: CounterProps): JSX.Element {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInViewOnce(ref, 0.2);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const timeoutId = window.setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}+</span>;
}