"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const techStackData = {
  frontend: {
    category: "Frontend Development",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    ],
  },
  backend: {
    category: "Backend Development",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python/Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "Java/Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Ruby on Rails", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original.svg" },
    ],
  },
  mobile: {
    category: "Mobile Development",
    items: [
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "Swift/iOS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
      { name: "Ionic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" },
      { name: "Kotlin/Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    ],
  },
  database: {
    category: "Database & Storage",
    items: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      { name: "Elasticsearch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  cloud: {
    category: "Cloud & Infrastructure",
    items: [
      { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg" },
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },
  devops: {
    category: "DevOps & Monitoring",
    items: [
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" },
      { name: "New Relic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/newrelic/newrelic-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" },
    ],
  },
};

const badgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  // Blues
  "React.js":      { bg: "#E6F6FF", text: "#0072C6", border: "#BAE0FF" },
  "React Native":  { bg: "#E6F6FF", text: "#0072C6", border: "#BAE0FF" },
  "Go":            { bg: "#E6F6FF", text: "#0072C6", border: "#BAE0FF" },
  "Azure":         { bg: "#E6F6FF", text: "#0072C6", border: "#BAE0FF" },
  "Docker":        { bg: "#E6F6FF", text: "#0072C6", border: "#BAE0FF" },
  // Dark
  "Next.js":        { bg: "#e5e7eb ", text: "#1a1a1a", border: "#444444" },
  "GitHub Actions": { bg: "#e5e7eb", text: "#1a1a1a", border: "#444444" },
  // Reds
  "Angular":       { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  "Laravel":       { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  "Ruby on Rails": { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  "Swift/iOS":     { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  "Jenkins":       { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  "Redis":         { bg: "#FDECEA", text: "#C3002F", border: "#FFBDC8" },
  // Indigo blues
  "TypeScript":    { bg: "#EEF4FF", text: "#2563EB", border: "#BFCFFF" },
  "Flutter":       { bg: "#EEF4FF", text: "#2563EB", border: "#BFCFFF" },
  "PostgreSQL":    { bg: "#EEF4FF", text: "#2563EB", border: "#BFCFFF" },
  "Google Cloud":  { bg: "#EEF4FF", text: "#2563EB", border: "#BFCFFF" },
  "Kubernetes":    { bg: "#EEF4FF", text: "#2563EB", border: "#BFCFFF" },
  "Python/Django": { bg: "#EEF4FF", text: "#1E66B0", border: "#BFCFFF" },
  // Cyans
  "Tailwind CSS":  { bg: "#E0F7FA", text: "#0D7490", border: "#A5D8E6" },
  // Greens
  "Vue.js":         { bg: "#F0FBF0", text: "#3C7B3C", border: "#A8D8A8" },
  "Node.js":        { bg: "#F0FBF0", text: "#3C7B3C", border: "#A8D8A8" },
  "MongoDB":        { bg: "#F0FBF0", text: "#3C7B3C", border: "#A8D8A8" },
  "Kotlin/Android": { bg: "#F0FBF0", text: "#3C7B3C", border: "#A8D8A8" },
  "New Relic":      { bg: "#F0FBF0", text: "#3C7B3C", border: "#A8D8A8" },
  // Oranges
  "MySQL":         { bg: "#FFF0EA", text: "#B34300", border: "#FFCAAB" },
  "Elasticsearch": { bg: "#FFF0EA", text: "#B34300", border: "#FFCAAB" },
  "Prometheus":    { bg: "#FFF0EA", text: "#B34300", border: "#FFCAAB" },
  // Ambers
  "Java/Spring":   { bg: "#FFF8E1", text: "#B45309", border: "#FDDFA0" },
  "Firebase":      { bg: "#FFF8E1", text: "#B45309", border: "#FDDFA0" },
  "AWS":           { bg: "#FFF8E1", text: "#B45309", border: "#FDDFA0" },
  "Grafana":       { bg: "#FFF8E1", text: "#B45309", border: "#FDDFA0" },
  // Ionic blue
  "Ionic":         { bg: "#EAF4FF", text: "#2B66CC", border: "#AFC4EE" },
  // Purple
  "Terraform":     { bg: "#F3F0FF", text: "#5B21B6", border: "#D8CAFF" },
};

const DEFAULT_STYLE = { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TechBadge({ item, index }: { item: { name: string; icon: string }; index: number }) {
  const style = badgeStyles[item.name] ?? DEFAULT_STYLE;
  const invertIcon = item.name === "GitHub Actions";

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full transition-all duration-200 cursor-default"
      style={{
        background: style.bg,
        color: style.text,
        border: `1.5px solid ${style.border}`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      <div className="relative w-[18px] h-[18px] flex-shrink-0">
        <Image
          src={item.icon}
          alt={item.name}
          fill
          className="object-contain"
          style={invertIcon ? { filter: "invert(1)" } : undefined}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <span className="text-[13px] font-medium whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

function CategoryBlock({
  category,
  items,
  visible,
  delay,
}: {
  category: string;
  items: { name: string; icon: string }[];
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="p-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
        {category}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <TechBadge key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export function TechStackSection() {
  const { ref, visible } = useInView(0.1);

  const leftCol = [techStackData.frontend, techStackData.mobile, techStackData.cloud];
  const rightCol = [techStackData.backend, techStackData.database, techStackData.devops];

  return (
    <div className="bg-white py-16 lg:py-24 lg:px-12" ref={ref}>
      <div className="mx-auto px-6 lg:px-10">
        {/* Header */}
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

        {/* Grid */}
        <div className="border border-dashed border-slate-300 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {leftCol.map((section, i) => {
              const rightSection = rightCol[i];
              const isLast = i === leftCol.length - 1;
              return (
                <div key={section.category} className="contents">
                  {/* Left cell */}
                  <div
                    className={`${
                      !isLast ? "border-b border-dashed border-slate-300" : ""
                    } lg:border-r lg:border-dashed lg:border-slate-300`}
                  >
                    <CategoryBlock
                      category={section.category}
                      items={section.items}
                      visible={visible}
                      delay={i * 100}
                    />
                  </div>

                  {/* Right cell */}
                  <div
                    className={`${
                      !isLast ? "border-b border-dashed border-slate-300" : ""
                    }`}
                  >
                    <CategoryBlock
                      category={rightSection.category}
                      items={rightSection.items}
                      visible={visible}
                      delay={i * 100 + 50}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection;