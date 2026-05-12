"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, X, ChevronRight, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
      setSelectedStep(null);
      if (isMobile) setMobileMenuOpen(false);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setSelectedStep(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setSelectedStep(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const selectStepFromSidebar = (id: number) => {
    if (selectedStep === id) {
      setSelectedStep(null);
      setActiveNodeId(null);
      setExpandedItems({});
      setAutoRotate(true);
      setPulseEffect({});
      if (isMobile) setMobileMenuOpen(false);
    } else {
      setSelectedStep(id);
      setActiveNodeId(id);
      setAutoRotate(false);
      setExpandedItems({ [id]: true });
      
      const relatedItems = getRelatedItems(id);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);
      
      centerViewOnNode(id);
      if (isMobile) setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeElement = nodeRefs.current[nodeId];
    if (!nodeElement) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    // Adjust radius based on screen size
    const radius = isMobile ? 120 : isTablet ? 150 : 180;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-gray-800";
      case "in-progress":
        return "text-black bg-orange-100 border-orange-300";
      case "pending":
        return "text-gray-500 bg-gray-100 border-gray-200";
      default:
        return "text-gray-500 bg-gray-100 border-gray-200";
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCenterOffset({ x: 0, y: 0 });
    }
  }, []);

  // Sort timeline data by ID to ensure correct order
  const sortedTimelineData = [...timelineData].sort((a, b) => a.id - b.id);
  
  // Get selected step details
  const selectedStepDetails = selectedStep 
    ? sortedTimelineData.find(item => item.id === selectedStep)
    : null;

  // Mobile: Show bottom sheet instead of sidebar
  return (
    <div className="w-full min-h-[500px] md:h-[550px] flex flex-col md:flex-row gap-4 p-2 md:p-0" ref={containerRef}>
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="flex justify-between items-center mb-3">
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="outline"
            className="bg-white border-orange-200 text-orange-600"
          >
            <Menu size={16} className="mr-2" />
            Process Steps ({sortedTimelineData.length})
          </Button>
          {selectedStepDetails && (
            <Badge className="bg-orange-100 text-orange-600">
              Step {selectedStep} Selected
            </Badge>
          )}
        </div>
      )}

      {/* LEFT SIDEBAR - Step Cards (Desktop) / Modal (Mobile) */}
      {!isMobile && (
        <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex-shrink-0">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primaryto-orange-700">
            <h3 className="text-white font-semibold text-sm">Process Steps</h3>
            <p className="text-orange-100 text-xs mt-1">Click any step to explore</p>
          </div>
          <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
            {sortedTimelineData.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedStep === item.id;
              
              return (
                <div
                  key={item.id}
                  onClick={() => selectStepFromSidebar(item.id)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected 
                      ? "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-primaryshadow-sm" 
                      : "bg-gray-50 hover:bg-gray-100 border-l-4 border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isSelected 
                        ? "bg-gradient-to-r from-primaryto-primarytext-white" 
                        : "bg-white text-primaryborder-2 border-orange-200"
                      }
                    `}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-mono">Step {item.id}</span>
                        <ChevronRight size={12} className={`text-orange-400 transition-transform ${isSelected ? "translate-x-0.5" : ""}`} />
                      </div>
                      <h4 className={`font-semibold text-sm ${isSelected ? "text-orange-600" : "text-gray-700"}`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-xl z-50 overflow-y-auto rounded-r-xl">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primaryto-secondaryflex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold text-sm">Process Steps</h3>
                <p className="text-orange-100 text-xs mt-1">Click any step to explore</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-3 space-y-2">
              {sortedTimelineData.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedStep === item.id;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => selectStepFromSidebar(item.id)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-primaryshadow-sm" 
                        : "bg-gray-50 hover:bg-gray-100 border-l-4 border-transparent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isSelected 
                          ? "bg-gradient-to-r from-primaryto-primarytext-white" 
                          : "bg-white text-primaryborder-2 border-orange-200"
                        }
                      `}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-mono">Step {item.id}</span>
                          <ChevronRight size={12} className={`text-orange-400 ${isSelected ? "translate-x-0.5" : ""}`} />
                        </div>
                        <h4 className={`font-semibold text-sm ${isSelected ? "text-orange-600" : "text-gray-700"}`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* CENTER - Orbital Timeline */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-h-[400px] md:min-h-[500px]">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
          onClick={handleContainerClick}
        >
          {/* Center Node - Responsive sizing */}
          <div className={`absolute rounded-full bg-gradient-to-br from-primaryvia-primaryto-primary animate-pulse flex items-center justify-center z-10 shadow-lg shadow-orange-200 ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}>
            <div className={`absolute rounded-full border border-orange-300 animate-ping opacity-70 ${isMobile ? 'w-14 h-14' : 'w-20 h-20'}`}></div>
            <div
              className={`absolute rounded-full border border-orange-200 animate-ping opacity-50 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'}`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`rounded-full bg-white flex items-center justify-center font-bold text-primaryshadow-sm ${isMobile ? 'w-6 h-6 text-sm' : 'w-8 h-8'}`}>
              {sortedTimelineData.length}
            </div>
          </div>

          {/* Orbit Ring - Responsive */}
          <div className={`absolute rounded-full border border-orange-200 ${isMobile ? 'w-64 h-64' : isTablet ? 'w-80 h-80' : 'w-96 h-96'}`}></div>
          
          {/* Orbiting Nodes */}
          {sortedTimelineData.map((item, index) => {
            const position = calculateNodePosition(index, sortedTimelineData.length);
            const isExpanded = expandedItems[item.id];
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer group"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0) 70%)`,
                    width: `${Math.min(80, item.energy * 0.5 + 40)}px`,
                    height: `${Math.min(80, item.energy * 0.5 + 40)}px`,
                    left: `-${(Math.min(80, item.energy * 0.5 + 40) - 40) / 2}px`,
                    top: `-${(Math.min(80, item.energy * 0.5 + 40) - 40) / 2}px`,
                  }}
                ></div>

                {/* Node with step number - Responsive */}
                <div
                  className={`
                  ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex flex-col items-center justify-center
                  ${
                    isExpanded
                      ? "bg-gradient-to-r from-primaryto-primarytext-white shadow-md"
                      : "bg-white text-primaryborder-2 border-orange-300 shadow-sm"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : "hover:scale-110 hover:border-primaryhover:shadow-md"}
                `}
                >
                  <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>{item.id}</span>
                  <Icon size={isMobile ? 8 : 10} className="mt-0.5" />
                </div>

                {/* Title - Hide on very small screens if not expanded */}
                {(isExpanded || !isMobile) && (
                  <div
                    className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider
                    transition-all duration-300
                    ${isExpanded ? "text-primaryscale-110 font-bold" : "text-gray-500 group-hover:text-orange-600"}
                    ${isMobile && !isExpanded ? 'hidden' : ''}
                  `}
                  >
                    {item.title.length > 15 ? item.title.substring(0, 12) + '...' : item.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT DETAIL PANEL - Shows selected step details (Desktop) / Bottom Sheet (Mobile) */}
      {!isMobile && (
        <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex-shrink-0">
          {selectedStepDetails ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-primaryto-secondaryflex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold">
                      {selectedStepDetails.id}
                    </div>
                    <h3 className="text-white font-semibold text-sm">{selectedStepDetails.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedStep(null);
                    setActiveNodeId(null);
                    setExpandedItems({});
                    setAutoRotate(true);
                    setPulseEffect({});
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-4 max-h-[500px] overflow-y-auto">
                <DetailContent 
                  step={selectedStepDetails} 
                  sortedData={sortedTimelineData}
                  onSelectStep={selectStepFromSidebar}
                />
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      )}

      {/* Mobile Bottom Sheet for Details */}
      {isMobile && selectedStepDetails && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => {
              setSelectedStep(null);
              setActiveNodeId(null);
              setExpandedItems({});
              setAutoRotate(true);
            }}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 max-h-[70vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 p-4 border-b border-gray-200 bg-gradient-to-r from-primaryto-secondaryflex justify-between items-center rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold">
                    {selectedStepDetails.id}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{selectedStepDetails.title}</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedStep(null);
                  setActiveNodeId(null);
                  setExpandedItems({});
                  setAutoRotate(true);
                  setPulseEffect({});
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 pb-8">
              <DetailContent 
                step={selectedStepDetails} 
                sortedData={sortedTimelineData}
                onSelectStep={selectStepFromSidebar}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Helper Components
function DetailContent({ step, sortedData, onSelectStep }: { 
  step: TimelineItem; 
  sortedData: TimelineItem[];
  onSelectStep: (id: number) => void;
}) {
  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-gray-800";
      case "in-progress":
        return "text-black bg-orange-100 border-orange-300";
      case "pending":
        return "text-gray-500 bg-gray-100 border-gray-200";
      default:
        return "text-gray-500 bg-gray-100 border-gray-200";
    }
  };

  return (
    <>
      <div className="mb-4">
        <Badge className={`px-2 py-1 text-xs font-medium ${getStatusStyles(step.status)}`}>
          {step.status === "completed"
            ? "✓ COMPLETED"
            : step.status === "in-progress"
            ? "⚡ IN PROGRESS"
            : "⏳ PENDING"}
        </Badge>
      </div>

      <div className="mb-4">
        <span className="text-xs text-gray-400 font-mono">{step.date}</span>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {step.content}
      </p>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs mb-1">
          <span className="flex items-center text-gray-500">
            <Zap size={10} className="mr-1 text-primary" />
            Progress
          </span>
          <span className="font-mono text-primaryfont-semibold">{step.energy}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primaryto-primaryrounded-full"
            style={{ width: `${step.energy}%` }}
          ></div>
        </div>
      </div>

      {step.relatedIds.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center mb-2">
            <Link size={10} className="text-gray-400 mr-1" />
            <h4 className="text-xs uppercase tracking-wider font-medium text-gray-400">
              Connected Steps
            </h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {step.relatedIds.map((relatedId) => {
              const relatedItem = sortedData.find((i) => i.id === relatedId);
              return (
                <Button
                  key={relatedId}
                  variant="outline"
                  size="sm"
                  className="flex items-center h-6 px-2 py-0 text-xs rounded-md border-orange-200 bg-white hover:bg-orange-50 text-gray-600 hover:text-primarytransition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStep(relatedId);
                  }}
                >
                  Step {relatedId}: {relatedItem?.title}
                  <ArrowRight size={8} className="ml-1 text-orange-400" />
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Zap size={24} className="text-gray-400" />
      </div>
      <h4 className="text-gray-600 font-medium mb-2">No Step Selected</h4>
      <p className="text-gray-400 text-sm">
        Click on any step from the left sidebar or orbit to view details
      </p>
    </div>
  );
}