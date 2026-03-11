'use client';

import React, { useRef, useEffect,useState, useMemo, useCallback } from 'react';
import {  motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==================== ANIMATED SECTION COMPONENTS ====================

// Animated Counter Component
const AnimatedCounter = ({ value, label, color, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);

    const animate = useCallback((timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = timestamp - startTimeRef.current;
        const end = parseInt(value.toString().replace(/[^0-9]/g, ''));
        const duration = 2000;

        if (progress < duration) {
            const currentCount = Math.min(Math.floor((progress / duration) * end), end);
            setCount(currentCount);
            animationRef.current = requestAnimationFrame(animate);
        } else {
            setCount(end);
        }
    }, [value]);

    useEffect(() => {
        if (isInView) {
            animationRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isInView, animate]);

    const suffix = useMemo(() => 
        value.includes('+') ? '+' : value.includes('%') ? '%' : '',
    [value]);

    // CSS animation for glow (better performance)
    const glowStyle = useMemo(() => ({
        animation: isInView ? 'glowPulse 3s infinite ease-in-out' : 'none',
        animationDelay: `${delay}s`
    }), [isInView, delay]);

    const counterStyle = useMemo(() => ({
        animation: isInView ? 'textGlow 2s infinite ease-in-out' : 'none',
        animationDelay: `${delay}s`
    }), [isInView, delay]);

    return (
        <div ref={ref} className="text-center relative group">
            <div className="relative">
                {/* Glow effect with CSS animation */}
                <div 
                    className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                    style={glowStyle}
                />

                {/* Counter text */}
                <div 
                    className={`relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color} mb-1`}
                    style={counterStyle}
                >
                    {count}{suffix}
                </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">{label}</div>
        </div>
    );
};


export const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  
  // Typer animation state
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    'Where Marketing Meets Innovation',
    'Your Growth Partners',
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <motion.section
      ref={heroRef}
      className="container mx-auto max-w-6xl px-4 mb-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ y: 50 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-primary mb-6"
          initial={{ scale: 0.9 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>Clickmasters</div>
          <motion.div
            className="text-foreground mt-2"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-[40px] bg-orange-500 ml-1 align-middle"
            />
          </motion.div>
        </motion.h1>
      </motion.div>
    </motion.section>
  );
};

// Stats Section with GSAP
export const StatsSection = () => {
  const statsRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  
  useEffect(() => {
    const elements = gsap.utils.toArray('.stat-item');
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Add CSS animations to document head (same as TrustedPartners)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glowPulse {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.2; transform: scale(1.2); }
      }
      @keyframes textGlow {
        0%, 100% { text-shadow: 0 0 8px rgba(249,115,22,0); }
        50% { text-shadow: 0 0 8px rgba(249, 115, 22, 0.15); }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const stats = [
    { value: '1,860+', label: 'Current Projects' },
    { value: '3,500+', label: 'Happy Clients' },
    { value: '75+', label: 'Awards Winning' },
    { value: '5+', label: 'Years Experience' },
  ];

  const gradients = [
    'from-orange-100 to-orange-100',
    'from-orange-100 to-orange-100',
    'from-orange-100 to-orange-100',
    'from-orange-100 to-orange-100',
  ];

  return (
    <section ref={statsRef} className="container mx-auto max-w-6xl px-4 mb-16">

         <div ref={textRef} className="my-16">
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Leading Digital Marketing Agency in Pakistan
        </motion.p>
        
        <motion.p
          className="text-lg text-gray-600 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Clickmasters – The Leading and Best Digital Marketing Agency in Pakistan, offering a complete range of services to grow your business.
        </motion.p>
      </div>


      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item text-center relative group">
            {/* Glow effect - EXACTLY like TrustedPartners */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full blur-2xl`}
              style={{
                opacity: 0.1,
                animation: 'glowPulse 3s infinite ease-in-out',
                animationDelay: `${index * 0.2}s`,
              }}
            />
            {/* Counter with scroll animation - EXACTLY like TrustedPartners */}
            <div className="relative">
              <AnimatedCounter 
                value={stat.value} 
                label={stat.label} 
                color={"bg-orange-500"}
                delay={index * 0.2}
              />
            </div>
          </div>
        ))}
      </div>


    </section>
  );
};