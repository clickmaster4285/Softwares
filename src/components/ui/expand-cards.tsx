"use client";

import { useState } from "react";

interface PhaseContent {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  color: string;
  bgLight: string;
}

interface ExpandOnHoverProps {
  images?: string[];
  phases?: PhaseContent[];
  defaultExpandedIndex?: number;
  containerHeight?: string;
  onImageChange?: (index: number, phase?: PhaseContent) => void;
}

const ExpandOnHover = ({
  images: customImages,
  phases = [],
  defaultExpandedIndex = 3,
  containerHeight = "28rem",
  onImageChange,
}: ExpandOnHoverProps) => {
  const [expandedImage, setExpandedImage] = useState(defaultExpandedIndex);

  const [hoveredPhase, setHoveredPhase] = useState<PhaseContent | null>(
    phases[defaultExpandedIndex - 1] || null
  );

  // Default Images
  const defaultImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
  ];

  const imageArray = customImages || defaultImages;

  const hasPhases = phases.length > 0;

  // PERFECT WIDTHS FOR 6 IMAGES
  // 1 expanded = 50%
  // 5 collapsed = 10% each
  // Total = 100%
  const getImageWidth = (index: number) => {
    return index === expandedImage ? "50%" : "10%";
  };

  const handleImageHover = (index: number) => {
    setExpandedImage(index);

    const phase = hasPhases ? phases[index - 1] : undefined;

    setHoveredPhase(phase || null);

    onImageChange?.(index, phase);
  };

  return (
    <div className="w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full p-4 md:p-8">
        {/* IMAGE ROW */}
        <div className="flex w-full gap-3">
          {imageArray.map((src, idx) => {
            const phaseContent = hasPhases ? phases[idx] : null;

            const isExpanded = idx + 1 === expandedImage;

            return (
              <div
                key={idx}
                onMouseEnter={() => handleImageHover(idx + 1)}
                className="group relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-500 ease-in-out"
                style={{
                  width: getImageWidth(idx + 1),
                  height: containerHeight,
                  flexShrink: 0,
                }}
              >
                {/* IMAGE */}
                <img
                  src={src}
                  alt={`Process ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* STEP BADGE */}
                {phaseContent && (
                  <div
                    className={`absolute left-4 top-4 z-20 rounded-full bg-black/50 px-3 py-2 backdrop-blur-md transition-all duration-500 ${
                      isExpanded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    <span className="text-xs font-bold text-white">
                      {phaseContent.step}
                    </span>
                  </div>
                )}

                {/* CONTENT */}
                {phaseContent && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 z-10 p-5 text-white transition-all duration-500 ${
                      isExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="mb-2 text-sm font-semibold text-orange-400">
                      {phaseContent.step}
                    </div>

                    <h3 className="text-2xl font-bold leading-tight">
                      {phaseContent.title}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-200 line-clamp-3">
                      {phaseContent.description}
                    </p>

                    <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {phaseContent.duration}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CONTENT PANEL */}
        {hasPhases && hoveredPhase && (
          <div className="mt-10 animate-fadeInUp rounded-[28px] bg-white p-6 md:p-8 shadow-xl">
            {/* TOP */}
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${hoveredPhase.bgLight}`}
                >
                  <span className="text-2xl font-bold text-orange-600">
                    {hoveredPhase.step}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {hoveredPhase.title}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-orange-600">
                    Duration: {hoveredPhase.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
              {hoveredPhase.description}
            </p>

            {/* DELIVERABLES */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {hoveredPhase.deliverables.map((deliverable, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:border-orange-200 hover:shadow-md"
                >
                  <div className="mt-0.5">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    {deliverable}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE TEXT */}
        <div className="mt-5 text-center text-sm text-gray-500 md:hidden">
          👆 Tap images to explore stages
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ExpandOnHover;