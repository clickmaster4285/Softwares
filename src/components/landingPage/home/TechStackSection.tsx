"use client";

import { useEffect, useRef, useState } from "react";

// Comprehensive technology stack
const techStack = {
  frontend: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Python/Django", "Laravel", "Ruby on Rails", "Go", "Java/Spring"],
  mobile: ["React Native", "Flutter", "Swift/iOS", "Kotlin/Android", "Ionic"],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Elasticsearch"],
  cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
  devops: ["GitHub Actions", "Jenkins", "Prometheus", "Grafana", "New Relic"],
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

function TechCategory({ title, items, visible, delay }: { title: string; items: string[]; visible: boolean; delay: number }) {
  return (
    <div
      className="mb-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((tech, idx) => (
          <span
            key={tech}
            className="text-[12px] font-medium text-gray-700 bg-gray-100 hover:bg-orange-700 hover:text-white hover:shadow-md transition-all duration-200 px-3 py-1.5 rounded-full cursor-default"
            style={{
              transitionDelay: visible ? `${delay + idx * 20}ms` : "0ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(5px)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStackSection() {
  const tech = useInView(0.15);

  return (
    <div className="bg-white" ref={tech.ref}>
      <div className="mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
            <p className="text-orange-800 text-[11px] font-bold tracking-[0.2em] uppercase">Our Technology Stack</p>
            <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            Modern Tech Stack for Future-Ready Solutions
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm">
            We leverage cutting-edge technologies to build scalable, secure, and high-performance applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TechCategory title="Frontend Development" items={techStack.frontend} visible={tech.visible} delay={0} />
          <TechCategory title="Backend Development" items={techStack.backend} visible={tech.visible} delay={100} />
          <TechCategory title="Mobile Development" items={techStack.mobile} visible={tech.visible} delay={200} />
          <TechCategory title="Database & Storage" items={techStack.database} visible={tech.visible} delay={300} />
          <TechCategory title="Cloud & Infrastructure" items={techStack.cloud} visible={tech.visible} delay={400} />
          <TechCategory title="DevOps & Monitoring" items={techStack.devops} visible={tech.visible} delay={500} />
        </div>
      </div>
    </div>
  );
}

export default TechStackSection;