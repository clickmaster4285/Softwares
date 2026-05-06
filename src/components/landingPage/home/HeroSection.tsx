"use client";

import { motion } from "framer-motion";

export function HeroSection() {
   return (
      <div className="border-b border-gray-300 relative">
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
               <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, x: -50, rotateX: 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               >
                  <div className="inline-flex items-center gap-2.5 mb-6">
                     <motion.span
                        className="h-[2px] bg-gold rounded-full w-20"
                     />
                     <span className="text-accent-800 text-sm font-bold tracking-[0.175em] uppercase">
                        About ClickMasters
                     </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.12] tracking-tight text-gray-900">
                     We Don&apos;t Just Build Software —{" "}
                     <span className="text-accent-800 relative inline-block">
                        We Build Revenue Systems
                        <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 6" preserveAspectRatio="none" fill="none">
                           <motion.path
                              d="M0 3 Q75 0 150 3 Q225 6 300 3"
                              stroke="#fed7aa"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 1, delay: 0.4 }}
                              animate={{ opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 3, repeat: Infinity }}
                           />
                        </svg>
                     </span>
                  </h2>
               </motion.div>

               {/* Sub-tagline */}
               <motion.div
                  className="relative pl-5 lg:pl-0"
                  initial={{ opacity: 0, x: 50, skewY: 2 }}
                  whileInView={{ opacity: 1, x: 0, skewY: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
               >
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-accent-200 lg:hidden" />
                  <p className="text-base text-gray-700 leading-relaxed max-w-sm lg:text-right lg:border-l-2 lg:border-accent-200 lg:pl-6">
                     A results-driven{" "}
                     <strong className="text-gray-800 font-semibold">software house</strong>{" "}
                     building custom web apps, mobile apps, and enterprise software that powers real business growth.
                  </p>
               </motion.div>
            </div>
         </div>
      </div>
   );
}