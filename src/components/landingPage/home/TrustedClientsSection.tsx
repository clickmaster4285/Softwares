"use client";

import { trustedClients } from "@/src/data/aboutData";

interface TrustedClientsSectionProps {
   visible: boolean;
}

export function TrustedClientsSection({ visible }: TrustedClientsSectionProps) {
   // Duplicate the array for seamless looping
   const duplicatedClients = [...trustedClients, ...trustedClients, ...trustedClients];

   return (
      <div className="border bg-section border-gray-300 overflow-hidden">
         <div className="px-6 lg:px-8 py-16 lg:py-20">
            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-8 h-[2px] bg-accent-400 rounded-full" />
                  <p className="text-accent-800 text-[11px] font-bold tracking-[0.2em] uppercase">Trusted By Industry Leaders</p>
                  <span className="w-8 h-[2px] bg-accent-400 rounded-full" />
               </div>
               <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                  Our Strategic Partners
               </h3>
               <p className="text-gray-700 max-w-2xl mx-auto text-sm">
                  Collaborating with world-class technology leaders to deliver state-of-the-art software solutions
               </p>
            </div>

            {/* Left to Right Marquee */}
            <div className="relative mb-8 group">
               <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

               <div className="overflow-hidden">
                  <div
                     className="flex gap-4 animate-marquee-left group-hover:pause-animation"
                     style={{ animationDuration: "30s" }}
                  >
                     {duplicatedClients.map((client, idx) => (
                        <div
                           key={`${client.name}-${idx}`}
                           className="flex-shrink-0 px-6 py-3 bg-white rounded-full border border-gray-200 hover:border-accent-300 hover:bg-accent-50 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default"
                        >
                           <p className="text-sm font-semibold text-gray-700 hover:text-accent-600 whitespace-nowrap">
                              {client.name}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right to Left Marquee */}
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

               <div className="overflow-hidden">
                  <div
                     className="flex gap-4 animate-marquee-right group-hover:pause-animation"
                     style={{ animationDuration: "35s" }}
                  >
                     {[...duplicatedClients].reverse().map((client, idx) => (
                        <div
                           key={`${client.name}-reverse-${idx}`}
                           className="flex-shrink-0 px-6 py-3 bg-white rounded-full border border-gray-200 hover:border-accent-300 hover:bg-accent-50 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default"
                        >
                           <p className="text-sm font-semibold text-gray-700 hover:text-accent-600 whitespace-nowrap">
                              {client.name}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <style jsx>{`
            @keyframes marquee-left {
               0% { transform: translateX(0); }
               100% { transform: translateX(-33.33%); }
            }
            
            @keyframes marquee-right {
               0% { transform: translateX(-33.33%); }
               100% { transform: translateX(0); }
            }
            
            .animate-marquee-left {
               animation: marquee-left linear infinite;
            }
            
            .animate-marquee-right {
               animation: marquee-right linear infinite;
            }
            
            .group:hover .pause-animation {
               animation-play-state: paused;
            }
         `}</style>
      </div>
   );
}