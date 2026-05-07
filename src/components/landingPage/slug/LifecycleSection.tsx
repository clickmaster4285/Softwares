// components/landingPage/servicesPage/LifecycleSection.tsx
'use client';

import { LifecycleStep } from '@/src/lib/services';
import { CheckCircle2, Calendar, Code, FileText, Rocket, Settings, Zap } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';

interface LifecycleSectionProps {
  lifecycle: LifecycleStep[];
  title?: string;
  subtitle?: string;
}

export default function LifecycleSection({ 
  lifecycle, 
  title = "Our Development Lifecycle",
  subtitle = "A proven process that delivers results, every time"
}: LifecycleSectionProps) {
  
  // Convert lifecycle steps to timeline format
  const getIconForStep = (stepNumber: number) => {
    const icons: Record<number, React.ElementType> = {
      1: Calendar,
      2: FileText,
      3: Code,
      4: Settings,
      5: Rocket,
    };
    return icons[stepNumber] || Zap;
  };

  const getStatusForStep = (stepNumber: number, totalSteps: number) => {
    if (stepNumber === totalSteps) return "pending";
    if (stepNumber === 1) return "completed";
    if (stepNumber === 2) return "in-progress";
    return "pending";
  };

  // FIXED: Reverse the energy calculation
  const getEnergyForStep = (stepNumber: number, totalSteps: number) => {
    // Step 1 gets 10%, Step 5 gets 100% (or whatever totalSteps is)
    return Math.max(10, ((stepNumber - 1) * (90 / (totalSteps - 1))) + 10);
  };

  const timelineData = lifecycle.map((step, index) => ({
    id: step.step,
    title: step.title,
    date: step.duration,
    content: step.description,
    category: `Phase ${step.step}`,
    icon: getIconForStep(step.step),
    relatedIds: step.step > 1 ? [step.step - 1] : step.step < lifecycle.length ? [step.step + 1] : [],
    status: getStatusForStep(step.step, lifecycle.length) as "completed" | "in-progress" | "pending",
    energy: getEnergyForStep(step.step, lifecycle.length),
  }));

  // If lifecycle has less than 3 steps, show regular timeline instead
  if (lifecycle.length < 3) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 via-orange-600 to-transparent h-[calc(100%-3rem)] top-12" />
            
            <div className="space-y-12">
              {lifecycle.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className={`lg:flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                    </div>

                    <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="lg:hidden flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                          <span className="text-xl font-bold text-white">{step.step}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          <span className="text-sm text-orange-600">{step.duration}</span>
                        </div>
                      </div>

                      <div className={`hidden lg:block ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{step.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-orange-600">⏱️</span>
                            <span className="text-gray-500">Estimated: {step.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:block lg:w-5/12" />
                  </div>

                  <div className="lg:hidden mt-4">
                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-500/50 transition-all duration-300 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-orange-600">⏱️</span>
                        <span className="text-gray-500">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  {index < lifecycle.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-md transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/25">
              <span>Start Your Journey</span>
              <CheckCircle2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Show orbital timeline for 3+ steps
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Orbital Timeline */}
        <div className="mt-8">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

      
      </div>
    </section>
  );
}