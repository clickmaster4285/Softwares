'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const GuideHero = ({ guide, subpageOuterPadding, subpageInnerPadding }: any) => {
  const router = useRouter();

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className={`${subpageOuterPadding} py-20`}>
        <div className={`${subpageInnerPadding} grid gap-16 lg:grid-cols-[1fr_360px] items-start`}>
          
          <div>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              {guide.title.replace(' | ClickMasters', '')}
            </h1>
            
            <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600" style={{ textAlign: 'justify' }}>
              {guide.steps[0]?.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/contact-us')}
                className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all active:scale-[0.97] flex items-center gap-2"
              >
                Get Started
           
              </button>

              <button
                onClick={() => router.push('/about-us')}
                className="px-7 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all active:scale-[0.97] flex items-center gap-2"
              >
                About Us
              
              </button>
            </div>
          </div>

         {/* Sidebar - Process Overview */}
<aside className="bg-[#F8F9FC] border border-[#E4E6EF] rounded-2xl p-5 h-fit">
  <div className="font-bold text-lg mb-5 text-[#1A1A2E] flex items-center gap-2">
    Process Overview
  </div>
  
  <div className="flex flex-col gap-1">
    {guide.steps.map((s: any) => (
      <a
        key={s.num}
        href={`#step-${s.num}`}
        className="group flex items-center gap-3 px-4 py-1  rounded-xl hover:bg-white transition-all duration-200 text-[#5A5A72] hover:text-slate-800"
      >
        {/* Consistent Step Number */}
        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 bg-white border border-slate-200 text-primary shadow-sm group-hover:border-primary transition-colors">
          {s.num}
        </div>

        <div className="font-medium text-[15px] leading-tight pr-2">
          {s.title}
        </div>
      </a>
    ))}
  </div>
</aside>
        </div>
      </div>
    </section>
  );
};

export default GuideHero;