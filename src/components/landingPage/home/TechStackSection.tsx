"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface TechItem {
  name: string;
  icon: string;
}

// Comprehensive technology stack with icons (using placeholder emoji icons - replace with actual image paths)
const techStackData = {
  frontend: {
    category: "Frontend Development",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  backend: {
    category: "Backend Development",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python/Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "Ruby on Rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "Java/Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    ],
  },
  mobile: {
    category: "Mobile Development",
    items: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Swift/iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
      { name: "Kotlin/Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
    ],
  },
  database: {
    category: "Database & Storage",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      { name: "Elasticsearch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
    ],
  },
  cloud: {
    category: "Cloud & Infrastructure",
    items: [
  { 
      name: "AWS", 
     
icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
    },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg" },
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    ],
  },
  devops: {
    category: "DevOps & Monitoring",
    items: [
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
      { name: "New Relic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/newrelic/newrelic-original.svg" },
    ],
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TechCard({ item }: { item: { name: string; icon: string } }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 sm:w-24 md:w-28 group cursor-default">
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
        <Image
          src={item.icon}
          alt={item.name}
          fill
          className="object-contain transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback for broken images - you can replace with a local placeholder
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <span className="text-[11px] sm:text-xs text-slate-500 group-hover:text-slate-800 transition-colors duration-300 text-center leading-tight">
        {item.name}
      </span>
    </div>
  );
}

export function TechStackSection() {
  const tech = useInView(0.15);
  const categoryItems = [
    { category: techStackData.frontend.category, items: techStackData.frontend.items },
    { category: techStackData.backend.category, items: techStackData.backend.items },
    { category: techStackData.mobile.category, items: techStackData.mobile.items },
    { category: techStackData.database.category, items: techStackData.database.items },
    { category: techStackData.cloud.category, items: techStackData.cloud.items },
    { category: techStackData.devops.category, items: techStackData.devops.items },
  ];

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left, 
        .marquee-right { 
          animation-duration: 60s; 
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .marquee-left { animation-name: marquee-left; }
        .marquee-right { animation-name: marquee-right; }
        .marquee-left:hover,
        .marquee-right:hover { animation-play-state: paused; }
        body { overflow-x: hidden; }
      `}</style>

      <div className="bg-white" ref={tech.ref}>
        <div className="mx-auto px-6 lg:px-12 py-6 lg:py-20">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14 md:mb-16">
  <div className="inline-flex items-center gap-2 mb-3">
    <span className="h-[2px] w-8 rounded-full bg-orange-400" />
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
      Technology Stack
    </p>
    <span className="h-[2px] w-8 rounded-full bg-orange-400" />
  </div>

  <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-4xl">
    Modern tools powering scalable applications
 
  </h2>

  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
    Modern technologies and frameworks we use to build secure,
    high-performance digital experiences.
  </p>
</div>

          <div className="space-y-8 sm:space-y-10">
            {categoryItems.map(({ category, items }, rowIndex) => {
              const repeated = Array.from(
                { length: Math.ceil(20 / items.length) },
                () => items
              ).flat();

              const goLeft = rowIndex % 2 === 0;

              return (
                <div key={category}>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 sm:mb-5 pl-1">
                    {category}
                  </p>

                  <div className="relative overflow-hidden">
                    {/* Gradient masks - smaller on mobile */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white to-transparent" />

                    <div 
                      className={`flex gap-4 sm:gap-6 md:gap-8 w-max ${goLeft ? "marquee-left" : "marquee-right"}`}
                      style={{
                        opacity: tech.visible ? 1 : 0,
                        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${rowIndex * 100}ms`,
                      }}
                    >
                      {[...repeated, ...repeated].map((item, i) => (
                        <TechCard key={`${category}-${i}`} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Divider - responsive spacing */}
          <div className="my-12 sm:my-14 md:my-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TechStackSection;