"use client";

import Link from "next/link";

export function HeroSection() {
   const showContent = true;
   return (
      <div className="border-b border-gray-300">
         {/* subtle animated bg grid */}
         <div
            className="absolute inset-0 pointer-events-none"
            style={{
               backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
               backgroundSize: "32px 32px",
               opacity: 0.04,
            }}
         />

         <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24 relative">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
               {/* Headline */}
               <div
                  className="max-w-2xl transition-all duration-700"
                  style={{ opacity: showContent ? 1 : 0, transform: showContent ? "translateY(0)" : "translateY(32px)" }}
               >
                  <div className="inline-flex items-center gap-2.5 mb-6">
                     <span
                        className="h-[2px] bg-[gold] rounded-full transition-all duration-700 delay-200"
                        style={{ width: showContent ? "36px" : "0px" }}
                     />
                     <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
                        About ClickMasters
                     </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
                     We Don&apos;t Just Build Software —{" "}
                     <span className="text-primary-500 relative inline-block">
                        We Build Revenue Systems
                        <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 6" preserveAspectRatio="none" fill="none">
                           <path
                              d="M0 3 Q75 0 150 3 Q225 6 300 3"
                              stroke="#fed7aa"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              className="transition-all duration-1000 delay-500"
                              style={{
                                 strokeDasharray: 320,
                                 strokeDashoffset: showContent ? 0 : 320,
                              }}
                           />
                        </svg>
                     </span>
                  </h2>
               </div>

               {/* Sub-tagline */}
               <div
                  className="relative pl-5 lg:pl-0 transition-all duration-700 delay-200"
                  style={{ opacity: showContent ? 1 : 0, transform: showContent ? "translateX(0)" : "translateX(24px)" }}
               >
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-primary-200 lg:hidden" />
                  <p className="text-base text-gray-700 leading-relaxed max-w-sm lg:text-right lg:border-l-2 lg:border-primary-200 lg:pl-6">
                     A results-driven{" "}
                     <strong className="text-gray-800 font-semibold">software house</strong>{" "}
                     building custom web apps, mobile apps, and enterprise software that powers real business growth.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}