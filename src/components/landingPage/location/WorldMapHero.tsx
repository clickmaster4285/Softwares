'use client';

import { useEffect, useState } from 'react';

interface Pin {
  id: number;
  x: number;
  y: number;
}

// Generate random pin positions across the screen
const generateRandomPins = (count: number): Pin[] => {
  const pins: Pin[] = [];
  for (let i = 0; i < count; i++) {
    pins.push({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
    });
  }
  return pins;
};

const AnimatedPins: React.FC = () => {
  const [visiblePins, setVisiblePins] = useState<Pin[]>([]);
  const [allPins] = useState<Pin[]>(() => generateRandomPins(20));

  useEffect(() => {
    // Animate pins appearing one by one
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
        }, 3000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [allPins]);

  return (
    <div className="relative w-full h-full">
      {visiblePins.map((pin, idx) => (
        <div
          key={`${pin.id}-${idx}`}
          className="absolute animate-pin-drop"
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#ef4444"
              stroke="#b91c1c"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9" r="4" fill="white" />
            <circle cx="12" cy="8" r="1.5" fill="#ef4444" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes pinDrop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-30px) scale(0.3);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(5px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0) scale(1);
          }
        }
        
        @keyframes pinPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        .animate-pin-drop {
          animation: pinDrop 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
        
        .animate-pin-drop:hover {
          animation: pinPulse 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedPins;