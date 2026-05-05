"use client";

import Link from "next/link";

interface CTASectionProps {
   visible: boolean;
}

export function CTASection() {
   const visible = true;
   return (
      <div className="bg-accent-500 relative overflow-hidden">
         {/* animated floating circles */}
         <div
            className="absolute -right-16 -top-16 w-64 h-64 bg-accent-400 rounded-full opacity-30 transition-all duration-1000"
            style={{ transform: visible ? "scale(1)" : "scale(0.4)" }}
         />
         <div
            className="absolute -left-16 -bottom-16 w-64 h-64 bg-accent-600 rounded-full opacity-30 transition-all duration-1000 delay-200"
            style={{ transform: visible ? "scale(1)" : "scale(0.4)" }}
         />

         <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-16 relative z-10">
            <div
               className="flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700"
               style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
            >
               <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                     <span className="w-6 h-[2px] bg-accent-200/80 rounded-full" />
                     <p className="text-white/95 text-[11px] font-bold uppercase tracking-[0.15em]">
                        Ready to accelerate your business?
                     </p>
                  </div>
                  <p className="text-white text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight max-w-xl">
                     Let&apos;s Build Your Next{" "}
                     <span className="underline underline-offset-4 decoration-white/80">Software Product</span>{" "}
                     Together
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto">
                  <Link
                     href="/contact-us"
                     aria-label="Contact ClickMasters to book a free business consultation"
                     className="group relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center overflow-hidden bg-white px-8 py-3.5 text-sm font-bold text-accent-700 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95"
                  >
                     <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent-50 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                     <span className="relative z-10">Get Free Consultation</span>
                     <svg className="relative z-10 ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </Link>
                  <Link
                     href="/about-us"
                     aria-label="About ClickMasters — team, values, and how we build software"
                     className="group inline-flex min-h-[48px] min-w-[48px] items-center justify-center border border-white/60 px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
                  >
                     About our company &amp; team
                     <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                     </svg>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}