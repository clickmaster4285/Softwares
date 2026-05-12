"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardStack } from "@/components/ui/card-stack";
import { apiFetch } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

interface Project {
  _id: string;
  title: string;
  description: string;
  url?: string;
  thumbnail?: string;
}

function useResponsiveCardConfig() {
  const [config, setConfig] = useState({
    spreadDeg: 32,
    cardWidth: 440,
    cardHeight: 270,
    overlap: 0.48,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setConfig({ spreadDeg: 10, cardWidth: 260, cardHeight: 210, overlap: 0.42 });
      } else if (width < 768) {
        setConfig({ spreadDeg: 16, cardWidth: 310, cardHeight: 230, overlap: 0.45 });
      } else if (width < 1024) {
        setConfig({ spreadDeg: 24, cardWidth: 380, cardHeight: 250, overlap: 0.47 });
      } else {
        setConfig({ spreadDeg: 32, cardWidth: 440, cardHeight: 270, overlap: 0.48 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return config;
}

export default function SolutionsPage() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const responsiveConfig = useResponsiveCardConfig();

  const cardStackItems = projects.slice(0, 7).map((project) => ({
    id: project._id,
    title: project.title || "Untitled Project",
    description: project.description?.length > 85
      ? `${project.description.substring(0, 85)}...`
      : project.description || "No description available",
    imageSrc: project.thumbnail
      ? resolveImageUrl(project.thumbnail)
      : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    href: project.url || "#",
  }));

  if (isLoading) {
    return <div className="py-24 text-center">Loading...</div>;
  }

  return (
    <main className="bg-white overflow-x-hidden">
      <section className="py-12 sm:py-16 md:py-24 px-5 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 rounded-full bg-orange-400" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-800">
                OUR SOLUTIONS
              </p>
              <span className="h-[2px] w-8 rounded-full bg-orange-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Our Work in Action
            </h2>

            <p className="mt-5 text-slate-600 text-lg">
              See how we&apos;ve helped businesses transform their ideas into successful digital products.
            </p>
          </div>

          {/* CONTAINER CARD WRAPPER */}
          <div className="mx-auto max-w-[520px] lg:max-w-[1500px]">
            <div className=" p-6 md:p-8 pb-10">
              {cardStackItems.length > 0 ? (
                <CardStack
                  items={cardStackItems}
                  initialIndex={Math.min(2, cardStackItems.length - 1)}
                  autoAdvance
                  intervalMs={3000}
                  pauseOnHover
                  showDots
                  {...responsiveConfig}
                />
              ) : (
                <p className="text-center py-20 text-gray-500">No projects available yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}