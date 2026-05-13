'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs } from '@ark-ui/react/tabs';
import {
  Layout,
  Smartphone,
  Cloud,
  Shield,
  BarChart3,
  Code,
  Database,
  Globe,
  Cpu,
  Layers,
  Zap,
  Rocket,
  Paintbrush,
  Settings,
  Briefcase,
  Server,
  Lock,
  Workflow,
} from "lucide-react";

type ServiceCategory = {
  category: string;
  services: string[];
};

type ServiceSlugMap = Record<string, string>;

interface Props {
  countryName: string;
  location: string;
  servicesByCategory: ServiceCategory[];
  serviceSlugMap: ServiceSlugMap;
}




const iconPool = [
  Layout,
  Smartphone,
  Cloud,
  Shield,
  BarChart3,
  Code,
  Database,
  Globe,
  Cpu,
  Layers,
  Zap,
  Rocket,
  Paintbrush,
  Settings,
  Briefcase,
  Server,
  Lock,
  Workflow,
];


export default function CountryServicesSection({
  countryName,
  location,
  servicesByCategory,
  serviceSlugMap,
}: Props) {
  const tabs = servicesByCategory.map((category, index) => ({
    value: `tab-${index}`,
    label: category.category,
    icon: iconPool[index % iconPool.length],
    services: category.services,
  }));

  const [activeTab, setActiveTab] = useState(tabs[0]?.value || 'tab-0');
  // Track which tab was previously active so we always re-trigger the animation
  const [animKey, setAnimKey] = useState(0);

  const getServiceSlug = (service: string): string =>
    serviceSlugMap[service] || service.toLowerCase().replace(/\s+/g, '-');

  const handleTabChange = ({ value }: { value: string }) => {
    setActiveTab(value);
    setAnimKey((k) => k + 1); // force re-mount of content → re-runs CSS animations
  };

  return (
    <>
      {/* ── Keyframe styles ─────────────────────────────────────────── */}
      <style>{`
        /* Tab content: fade + slide up */
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tab-content-enter {
          animation: tabFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Service cards: staggered entrance */
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .service-card {
          animation: cardEntrance 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Tab trigger active indicator slide */
        [data-selected].tab-trigger::after {
          transform: scaleX(1);
        }
        .tab-trigger::after {
          content: '';
          display: block;
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary, #E06A4A);
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }
      `}</style>

      <section id="services" className="py-20 bg-white">
        <div className="lg:px-28 mx-auto px-4 sm:px-6">
          {/* Header */}
              <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 rounded-full bg-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
                OUR SERVICES
              </p>
              <span className="h-[2px] w-8 rounded-full bg-primary" />
            </div>

            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
             Services We Provide in Canada
            </h2>

            <p className="mt-5 text-slate-600 text-lg">
              Comprehensive software development solutions tailored for Canada businesses
            </p>
          </div>



          {/* Tabs */}
          <Tabs.Root
            defaultValue={tabs[0]?.value || 'tab-0'}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Tab List */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <Tabs.List className="inline-flex flex-wrap justify-center gap-2 p-1 bg-slate-100 rounded-xl lg:py-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Tabs.Trigger
                      key={tab.value}
                      value={tab.value}
                      className="
                        tab-trigger relative
                        flex items-center gap-2 px-6 py-3 text-sm font-medium
                        text-slate-600 rounded-t-lg whitespace-nowrap
                        transition-all duration-200
                        hover:text-slate-900
                        data-[selected]:bg-white data-[selected]:text-slate-900
                        data-[selected]:shadow-sm data-[selected]:scale-[1.03]
                      "
                    >
                      {/* Icon animates on selection */}
                      <Icon
                        className="
                          w-5 h-5 transition-transform duration-300
                          data-[selected]:rotate-12
                        "
                      />
                      {tab.label}
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>
            </div>

            {/* Tab Contents */}
            {tabs.map((tab) => (
              <Tabs.Content
                key={tab.value}
                value={tab.value}
                className="focus:outline-none"
              >
                {/* animKey forces re-render → re-runs animations when same tab is clicked again too */}
                <div key={animKey} className="tab-content-enter">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tab.services.map((service, idx) => {
                      const slug = getServiceSlug(service);
                      return (
                        <Link
                          key={idx}
                          href={`/${slug}`}
                          style={{
                            animationDelay: `${idx * 60}ms`,   /* stagger */
                          }}
                          className="
                            service-card group relative overflow-hidden
                            rounded-3xl border border-slate-200 bg-white p-8
                            hover:border-primary hover:shadow-2xl
                            transition-[transform,box-shadow,border-color]
                            duration-300 hover:-translate-y-2
                          "
                        >
                          {/* Gradient overlay on hover */}
                          <div className="
                            absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          " />

                          <div className="relative">
                          

                            {/* Title */}
                            <h4 className="
                              text-xl font-semibold text-slate-900 mb-3
                              group-hover:text-primary transition-colors duration-200
                            ">
                              {service}
                            </h4>

                            {/* Description */}
                            <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                              Professional {service.toLowerCase()} solutions designed
                              to scale your business efficiently in {countryName}.
                            </p>

                            {/* CTA */}
                            <div className="
                              inline-flex items-center gap-2 text-primary font-medium text-sm
                              group-hover:gap-3 transition-all duration-200
                            ">
                              Explore Service
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>
    </>
  );
}