'use client';

import React from 'react';

interface StatsCardProps {
  country?: {
    name?: string;
    businessLandscape?: string;
    digitalTransformationDemand?: string;
    marketChallenges?: string[];
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ country }) => {
  return (
    <div className="relative z-30 w-full bg-foreground ">

       <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#a7f3d0] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#fdba74] opacity-25 blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="text-white">
          <h2 className="text-2xl md:text-4xl mb-6 text-center font-medium leading-tight">
            Understanding {country?.name}'s Business Landscape
          </h2>

          {/* 3-item row */}
          <div className="mx-auto flex flex-col lg:flex-row items-stretch text-white/90">
            {/* Business Environment */}
            <div className="flex-1 text-left lg:pr-8">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Business Environment
              </h3>
              <p className="text-md md:text-lg leading-relaxed">
                {country?.businessLandscape}
              </p>
            </div>

            {/* divider */}
            <div className="hidden lg:block w-px bg-white/20 mx-6" />

            {/* Digital Transformation */}
            <div className="flex-1 text-left lg:pl-8 mt-6 lg:mt-0">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Digital Transformation
              </h3>
              <p className="text-md md:text-lg leading-relaxed">
                {country?.digitalTransformationDemand}
              </p>
            </div>

            {/* divider */}
            <div className="hidden lg:block w-px bg-white/20 mx-6" />

            {/* Market Challenges */}
            <div className="flex-1 text-left lg:pl-8 mt-6 lg:mt-0">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Market Challenges
              </h3>
              <ul className="space-y-2">
                {country?.marketChallenges?.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span>-</span>
                    <span className="text-slate-100">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};