"use client";

import { useState, useMemo } from "react";
import { techStackImages, techStackNames } from "@/src/data/aboutData";

interface TechStackSectionProps {
   visible: boolean;
}

// Generate truly random independent positions
const getRandomPosition = (index: number) => {
   // Use different seeds for top and left to ensure independence
   const topSeed = index * 131.33;
   const leftSeed = index * 247.89;
   const delaySeed = index * 359.17;
   const durationSeed = index * 421.63;

   // Completely independent random calculations
   const top = 5 + (Math.sin(topSeed) * 0.5 + 0.5) * 95; // 5% to 90%
   const left = 2 + (Math.cos(leftSeed) * 0.5 + 0.5) * 92; // 2% to 94%
   const delay = (delaySeed % 5); // 0 to 5 seconds
   const duration = 12 + (Math.abs(Math.sin(durationSeed)) * 13); // 12 to 25 seconds

   return {
      top: `${Math.min(90, Math.max(5, top))}%`,
      left: `${Math.min(94, Math.max(2, left))}%`,
      delay: `${delay}s`,
      duration: `${duration.toFixed(1)}s`,
   };
};

export function TechStackSection({ visible }: TechStackSectionProps) {
   const [hoveredTech, setHoveredTech] = useState<string | null>(null);
   const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

   // Combine all tech items with their images
   const allTechItems = useMemo(() => [
      ...techStackNames.frontend.map((name, idx) => ({
         name,
         image: techStackImages.frontend[idx % techStackImages.frontend.length],
         category: "Frontend",
      })),
      ...techStackNames.backend.map((name, idx) => ({
         name,
         image: techStackImages.backend[idx % techStackImages.backend.length],
         category: "Backend",
      })),
      ...techStackNames.mobile.map((name, idx) => ({
         name,
         image: techStackImages.mobile[idx % techStackImages.mobile.length],
         category: "Mobile",
      })),
      ...techStackNames.database.map((name, idx) => ({
         name,
         image: techStackImages.database[idx % techStackImages.database.length],
         category: "Database",
      })),
      ...techStackNames.cloud.map((name, idx) => ({
         name,
         image: techStackImages.cloud[idx % techStackImages.cloud.length],
         category: "Cloud",
      })),
      ...techStackNames.devops.map((name, idx) => ({
         name,
         image: techStackImages.devops[idx % techStackImages.devops.length],
         category: "DevOps",
      })),
   ], []);

   // Generate stable positions for all tech items
   const positions = useMemo(() =>
      allTechItems.map((_, idx) => getRandomPosition(idx)),
      [allTechItems]
   );

   const handleMouseEnter = (e: React.MouseEvent, techName: string) => {
      setHoveredTech(techName);
      setHoveredPosition({ x: e.clientX, y: e.clientY });
   };

   const handleMouseLeave = () => {
      setHoveredTech(null);
   };

   const handleMouseMove = (e: React.MouseEvent) => {
      if (hoveredTech) {
         setHoveredPosition({ x: e.clientX, y: e.clientY });
      }
   };

   return (
      <div style={{ borderColor: '#f5bc53' }} className="border-b overflow-hidden bg-gold/50">
         <div className="px-6 lg:px-8 py-16 lg:py-20">
            <div className="mx-auto max-w-7xl">
               <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 mb-3">
                     <span className="w-8 h-[2px] bg-gold rounded-full" />
                     <p className="text-gold text-base font-bold tracking-[0.175em] uppercase">Our Technology Stack</p>
                     <span className="w-8 h-[2px] bg-gold rounded-full" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-accent-800 mb-3">
                     Modern Tech Stack for Future-Ready Solutions
                  </h3>
                  <p className="text-gray-700 max-w-2xl mx-auto text-sm">
                     We leverage cutting-edge technologies to build scalable, secure, and high-performance applications
                  </p>
               </div>
            </div>
            {/* Floating Tech Icons Grid */}
            <div
               className="relative min-h-[600px] w-full"
               onMouseMove={handleMouseMove}
            >
               {allTechItems.map((tech, idx) => {
                  const pos = positions[idx];
                  return (
                     <div
                        key={tech.name}
                        className="absolute transition-transform duration-300 hover:scale-110 cursor-pointer will-change-transform"
                        style={{
                           top: pos.top,
                           left: pos.left,
                           animation: `gentleFloat ${pos.duration} infinite ease-in-out`,
                           animationDelay: pos.delay,
                           zIndex: hoveredTech === tech.name ? 50 : 10,
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, tech.name)}
                        onMouseLeave={handleMouseLeave}
                     >
                        <div className="relative">
                           {/* Image Circle */}
                           <div className="w-16 h-16 md:w-20 md:h-20 rounded-full ">
                              <img
                                 src={tech.image}
                                 alt={tech.name}
                                 className="w-full h-full object-cover"
                                 loading="lazy"
                              />
                           </div>

                           {/* Category Badge */}
                           {/* <div className="absolute -bottom-2 -right-2 bg-accent-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                              {tech.name}
                           </div> */}
                        </div>
                     </div>
                  );
               })}
            </div>

            {/* Hover Tooltip */}
            {hoveredTech && (
               <div
                  className="fixed z-[100] pointer-events-none transition-all duration-150"
                  style={{
                     left: hoveredPosition.x + 16,
                     top: hoveredPosition.y - 40,
                     transform: "translateX(-50%)",
                  }}
               >
                  <div className="bg-gray-900 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                     {hoveredTech}
                     <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
               </div>
            )}
         </div>

         <style jsx>{`
            @keyframes gentleFloat {
               0% {
                  transform: translate(0px, 0px) rotate(0deg);
               }
               25% {
                  transform: translate(19px, -27px) rotate(6deg);
               }
               50% {
                  transform: translate(-15px, 19px) rotate(-6deg);
               }
               75% {
                  transform: translate(19px, 15px) rotate(5deg);
               }
               100% {
                  transform: translate(0px, 0px) rotate(0deg);
               }
            }
         `}</style>
      </div>
   );
}