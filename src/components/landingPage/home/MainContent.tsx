"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { values } from "@/src/data/aboutData";

export function MainContent() {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -10 },
      visible: {
         opacity: 1,
         y: 0,
         scale: 1,
         rotateX: 0,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6
         },
      },
   };

   // Continuous floating animation for icons
   const floatTransition = {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
   };

   return (
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* LEFT: Body copy */}
            <motion.div
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.2 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            >
               {/* Orange top accent line */}
               <motion.div
                  className="h-[3px] bg-gold rounded-full mb-8"
               />

               <p className="text-lg leading-relaxed text-gray-600 mb-6">
                  ClickMasters is a{" "}
                  <strong className="text-accent-700 font-semibold">professional software development company</strong>{" "}
                  with a proven track record delivering custom software solutions across manufacturing, healthcare,
                  retail, real estate, and education sectors.
               </p>
               <div className="space-y-4 mb-8">
                  <p className="text-[15px] leading-relaxed text-gray-700">
                     Our team of experienced{" "}
                     <strong className="text-gray-700 font-medium">software developers</strong>{" "}
                     works as a seamless extension of your business — translating complex requirements into reliable,
                     scalable digital products that perform under real-world conditions.
                  </p>
                  <p className="text-[15px] leading-relaxed text-gray-700">
                     As a full-service{" "}
                     <strong className="text-gray-700 font-medium">software house</strong>, we handle everything from
                     discovery and UI/UX design to backend development, QA testing, cloud deployment, and long-term
                     maintenance — end to end, under one roof.
                  </p>
                  <p className="text-[15px] leading-relaxed text-gray-700">
                     Explore our{" "}
                     <Link href="/web-development/web-application-development" className="font-medium text-accent-600 hover:underline">
                        web application development
                     </Link>
                     ,{" "}
                     <Link href="/mobile-development/mobile-app-development" className="font-medium text-accent-600 hover:underline">
                        mobile app development
                     </Link>
                     , and{" "}
                     <Link href="/software-development/custom-software-development" className="font-medium text-accent-600 hover:underline">
                        custom software development
                     </Link>{" "}
                     services, or browse the{" "}
                     <Link href="/software-solutions" className="font-medium text-accent-600 hover:underline">
                        software solutions portfolio
                     </Link>{" "}
                     by industry.
                  </p>
               </div>

               {/* CTAs */}
               <div className="flex flex-wrap gap-4 mb-12">
                  <Link
                     href="/contact-us"
                     className="group relative inline-flex items-center bg-gradient-to-r from-btn-blue to-btn-yellow hover:bg-accent-900 active:scale-95 transition-all duration-200 text-white text-sm font-bold px-7 py-3.5 shadow-sm hover:shadow-accent-200 hover:shadow-lg overflow-hidden"
                  >
                     <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                     <span className="relative z-10">Start Your Project</span>
                     <svg className="w-4 h-4 ml-2 relative z-10 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </Link>
                  <Link
                     href="/case-studies"
                     className="group inline-flex items-center border border-gray-300 hover:border-accent-400 hover:text-accent-800 hover:bg-accent-50/40 active:scale-95 transition-all duration-200 text-gray-700 text-sm font-medium px-7 py-3.5"
                  >
                     View Our Work
                     <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>
                  </Link>
               </div>
            </motion.div>

            {/* RIGHT: Value Cards */}
            <motion.div
               className="relative"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: false, amount: 0.1 }}
            >
               {/* glow blob */}
               <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32 bg-accent-100 rounded-full blur-3xl opacity-50 pointer-events-none"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               />

               <div className="border border-gray-200 divide-y divide-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {values.map((v, idx) => (
                     <motion.div
                        key={v.title}
                        variants={itemVariants}
                        className="group flex gap-5 items-start px-6 py-6 bg-white hover:bg-accent-50/50 transition-all duration-300 cursor-default"
                     >
                        {/* Icon */}
                        <motion.div
                           className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent-50 text-accent-500 group-hover:bg-accent-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 rounded-xl shadow-sm"
                           animate={{ y: [0, -4, 0] }}
                           transition={{ ...floatTransition, delay: idx * 0.2 }}
                        >
                           {v.icon}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-accent-600 transition-colors duration-200">{v.title}</p>
                           <p className="text-[13px] leading-relaxed text-gray-700">{v.desc}</p>
                        </div>
                        {/* Arrow indicator */}
                        <svg
                           className="w-4 h-4 text-accent-300 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                     </motion.div>
                  ))}
               </div>
            </motion.div>
         </div>
      </div>
   );
}