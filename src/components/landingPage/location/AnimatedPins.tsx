'use client';

import { useEffect, useState } from 'react';

interface Pin {
  id: number;
  x: number;
  y: number;
  delay: number;
  animationType: 'drop' | 'bounce' | 'fade' | 'rotate' | 'wave';
}

// Generate random pin positions across the screen
const generateRandomPins = (count: number): Pin[] => {
  const pins: Pin[] = [];
  const animationTypes: Pin['animationType'][] = ['drop', 'bounce', 'fade', 'rotate', 'wave'];
  
  for (let i = 0; i < count; i++) {
    pins.push({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      delay: Math.random() * 0.5,
      animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
    });
  }
  return pins;
};

const AnimatedPins: React.FC = () => {
  const [visiblePins, setVisiblePins] = useState<Pin[]>([]);
  const [allPins] = useState<Pin[]>(() => generateRandomPins(25));
  const [glowPins, setGlowPins] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Animate pins appearing one by one with different delays
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < allPins.length) {
        setVisiblePins(prev => [...prev, allPins[currentIndex]]);
        currentIndex++;
      } else {
        // Reset animation after a delay
        setTimeout(() => {
          setVisiblePins([]);
          currentIndex = 0;
        }, 5000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [allPins]);

  // Random glowing effect on existing pins
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setVisiblePins(currentPins => {
        if (currentPins.length === 0) return currentPins;
        const randomPin = Math.floor(Math.random() * currentPins.length);
        const pin = currentPins[randomPin];
        if (pin) {
          setGlowPins(prev => {
            const newSet = new Set(prev);
            newSet.add(pin.id);
            setTimeout(() => {
              setGlowPins(prev => {
                const updated = new Set(prev);
                updated.delete(pin.id);
                return updated;
              });
            }, 800);
            return newSet;
          });
        }
        return currentPins;
      });
    }, 1200);

    return () => clearInterval(glowInterval);
  }, []);

  const getAnimationClass = (type: Pin['animationType']) => {
    switch(type) {
      case 'drop':
        return 'animate-pin-drop';
      case 'bounce':
        return 'animate-pin-bounce';
      case 'fade':
        return 'animate-pin-fade';
      case 'rotate':
        return 'animate-pin-rotate';
      case 'wave':
        return 'animate-pin-wave';
      default:
        return 'animate-pin-drop';
    }
  };

  return (
    <div className="relative w-full h-full">
      {visiblePins.map((pin, idx) => (
        <div
          key={`${pin.id}-${idx}`}
          className={`absolute ${getAnimationClass(pin.animationType)} ${glowPins.has(pin.id) ? 'pin-glow' : ''}`}
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${pin.delay}s`,
          }}
        >
          {/* Pin Shadow */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-black/20 rounded-full blur-sm" />
          
          {/* Main Pin */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg relative z-10"
          >
            <defs>
              <linearGradient id={`pinGradient-${pin.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <filter id={`glow-${pin.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill={`url(#pinGradient-${pin.id})`}
              stroke="#991b1b"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9" r="4" fill="white" />
            <circle cx="12" cy="8" r="1.8" fill="#ef4444" />
            {/* Sparkle on pin */}
            <path
              d="M12 3 L12.5 4.5 L14 5 L12.5 5.5 L12 7 L11.5 5.5 L10 5 L11.5 4.5 Z"
              fill="#fbbf24"
              opacity="0.8"
            />
          </svg>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 -z-10">
            <div className="pin-ripple" />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes pinDrop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-40px) scale(0.2) rotate(-10deg);
          }
          40% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(5px) scale(1.1) rotate(2deg);
          }
          70% {
            transform: translate(-50%, -50%) translateY(-2px) scale(0.98) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0) scale(1) rotate(0);
          }
        }
        
        @keyframes pinBounce {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          }
          60% {
            transform: translate(-50%, -50%) scale(0.9) rotate(360deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
          }
        }
        
        @keyframes pinFade {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes pinRotate {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(-360deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        
        @keyframes pinWave {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateX(-20px) scale(0.5);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(5px) scale(1.1);
          }
          70% {
            transform: translate(-50%, -50%) translateX(-2px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translateX(0) scale(1);
          }
        }
        
        @keyframes pinRipple {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-5px);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) rotate(5deg);
          }
          75% {
            transform: translate(-50%, -50%) rotate(-5deg);
          }
        }
        
        .animate-pin-drop {
          animation: pinDrop 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
        
        .animate-pin-bounce {
          animation: pinBounce 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-pin-fade {
          animation: pinFade 0.8s ease-out forwards;
        }
        
        .animate-pin-rotate {
          animation: pinRotate 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-pin-wave {
          animation: pinWave 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
        
        .pin-glow {
          animation: float 2s ease-in-out infinite, shake 0.5s ease-in-out;
        }
        
        .pin-glow svg {
          filter: url(#glow);
        }
        
        .pin-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0) 70%);
          transform: translate(-50%, -50%);
          animation: pinRipple 1s ease-out infinite;
        }
        
        /* Hover effects for all pins */
        .animate-pin-drop:hover,
        .animate-pin-bounce:hover,
        .animate-pin-fade:hover,
        .animate-pin-rotate:hover,
        .animate-pin-wave:hover {
          animation: shake 0.3s ease-in-out;
          cursor: pointer;
          filter: brightness(1.1);
          transition: filter 0.2s;
        }
        
        /* Floating animation for all pins after they appear */
        .animate-pin-drop,
        .animate-pin-bounce,
        .animate-pin-fade,
        .animate-pin-rotate,
        .animate-pin-wave {
          animation-fill-mode: forwards;
        }
        
        .animate-pin-drop[style*="animation-delay"]:not(:hover),
        .animate-pin-bounce[style*="animation-delay"]:not(:hover),
        .animate-pin-wave[style*="animation-delay"]:not(:hover) {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedPins;