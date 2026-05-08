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
  phases?: PhaseContent[];  // Array of phase content for each image
  defaultExpandedIndex?: number;
  containerHeight?: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  onImageChange?: (index: number, phase?: PhaseContent) => void; // Changed from PhaseContent | null to PhaseContent | undefined
}

const ExpandOnHover = ({ 
  images: customImages, 
  phases = [],
  defaultExpandedIndex = 3,
  containerHeight = "24rem",
  expandedWidth = "24rem",
  collapsedWidth = "5rem",
  onImageChange
}: ExpandOnHoverProps) => {
  const [expandedImage, setExpandedImage] = useState(defaultExpandedIndex);
  const [hoveredPhase, setHoveredPhase] = useState<PhaseContent | null>(null);
  
  // Default images if none provided
  const defaultImages = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
  ];
  
  const imageArray = customImages || defaultImages;
  const hasPhases = phases.length > 0;

  const getImageWidth = (index: number) =>
    index === expandedImage ? expandedWidth : collapsedWidth;

  const handleImageHover = (index: number) => {
    setExpandedImage(index);
    // Fix: Convert null to undefined to match the expected type
    const phase = hasPhases ? phases[index - 1] : undefined;
    setHoveredPhase(phase || null);
    onImageChange?.(index, phase);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative w-full">
        <div className="w-full h-full overflow-hidden">
          <div className="flex h-full w-full items-center justify-center overflow-hidden p-8">
            <div className="relative w-full">
            
              
              {/* Image Gallery */}
              <div className="flex w-full items-center justify-center gap-2">
                {imageArray.map((src, idx) => {
                  const phaseContent = hasPhases ? phases[idx] : null;
                  const isExpanded = idx + 1 === expandedImage;
                  
                  return (
                    <div
                      key={idx}
                      className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out group"
                      style={{
                        width: getImageWidth(idx + 1),
                        height: containerHeight,
                      }}
                      onMouseEnter={() => handleImageHover(idx + 1)}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        src={src}
                        alt={`Process stage ${idx + 1}`}
                      />
                      
                      {/* Overlay with phase information */}
                      {phaseContent && (
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ${
                          isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                            <div className="text-white">
                              <div className="text-xs font-semibold text-orange-400 mb-1">
                                {phaseContent.step}
                              </div>
                              <h4 className="text-lg font-bold mb-1">
                                {phaseContent.title}
                              </h4>
                              <p className="text-xs text-gray-200 line-clamp-2">
                                {phaseContent.description}
                              </p>
                              <div className="mt-2 text-xs text-orange-300">
                                {phaseContent.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Step indicator badge */}
                      {phaseContent && (
                        <div className={`absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm px-2 py-1 transition-all duration-300 ${
                          isExpanded ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <span className="text-xs font-bold text-white">
                            {phaseContent.step}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              

                {/* Expanded Content Panel - Shows when an image is expanded */}
              {hasPhases && hoveredPhase && (
                <div className="mb-8 mt-12 p-6 rounded-2xl bg-white shadow-xl transform transition-all duration-500 animate-fade-in-up">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex rounded-xl ${hoveredPhase.bgLight} p-2`}>
                          <span className="text-2xl font-bold bg-orange-600 bg-clip-text text-transparent">
                            {hoveredPhase.step}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{hoveredPhase.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {hoveredPhase.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Duration: {hoveredPhase.duration}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {hoveredPhase.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile hint */}
              <div className="text-center mt-6 text-sm text-gray-500 md:hidden">
                <span className="inline-flex items-center gap-1">
                  👆 Tap and hold on images to see details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ExpandOnHover;