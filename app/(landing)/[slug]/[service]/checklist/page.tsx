'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { checklists, Checklist } from '@/src/lib/service_checklist';
import ChecklistMainContent from '@/src/components/landingPage/checklist/ChecklistMainContent';
import { ProjectCTAHero } from '@/src/components/landingPage/checklist/ProjectCTAHero';
import { WhyChooseUs } from '@/src/components/landingPage/servicesPage/WhyChooseUs';
import ChecklistHero from '@/src/components/landingPage/checklist/ChecklistHero';
import Link from 'next/link';




export default function ChecklistPage() {


   const params = useParams();

  const slug = params.slug as string;
  const service = params.service as string;



  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  // Load checklist data based on service slug
  useEffect(() => {
    if (!service) return;

    setLoading(true);

    const data = checklists[service];

    if (data) {
      setChecklist(data);
    } else {
      setChecklist(null);
    }

    setLoading(false);
  }, [service]);

  // Load from localStorage on mount
  useEffect(() => {
    if (!service) return;

    const saved = localStorage.getItem(`checklist-${service}`);

    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [service]);

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    if (!service) return;

    localStorage.setItem(
      `checklist-${service}`,
      JSON.stringify(checkedItems)
    );
  }, [checkedItems, service]);

  const toggleItem = useCallback((itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }, []);

  const checkAll = useCallback(
    (phaseKey: string) => {
      if (!checklist) return;

      const phase = checklist.phases.find(p => p.key === phaseKey);
      if (!phase) return;

      const allChecked = phase.items.every(item => checkedItems[item.id]);

      setCheckedItems(prev => {
        const newState = { ...prev };

        phase.items.forEach(item => {
          newState[item.id] = !allChecked;
        });

        return newState;
      });
    },
    [checklist, checkedItems]
  );

  const getDoneCount = useCallback(
    (phaseKey: string): number => {
      if (!checklist) return 0;

      const phase = checklist.phases.find(p => p.key === phaseKey);
      if (!phase) return 0;

      return phase.items.filter(item => checkedItems[item.id]).length;
    },
    [checklist, checkedItems]
  );

  const getPhasePercentage = useCallback(
    (phaseKey: string): number => {
      if (!checklist) return 0;

      const phase = checklist.phases.find(p => p.key === phaseKey);
      if (!phase) return 0;

      const done = getDoneCount(phaseKey);

      return phase.items.length > 0
        ? Math.round((done / phase.items.length) * 100)
        : 0;
    },
    [checklist, getDoneCount]
  );

  const getTotalDone = useCallback((): number => {
    return Object.values(checkedItems).filter(Boolean).length;
  }, [checkedItems]);

  const overallPercentage = checklist
    ? Math.round((getTotalDone() / checklist.totalItems) * 100)
    : 0;

  const phaseIcons: Record<string, { icon: string; color: string; bg: string }> = {
    pre: { icon: 'fa-solid fa-file-signature', color: '#D97706', bg: '#FEF3C7' },
    sprint: { icon: 'fa-solid fa-arrows-rotate', color: '#2563EB', bg: '#DBEAFE' },
    launch: { icon: 'fa-solid fa-rocket', color: '#E8692A', bg: '#FFF3ED' },
    post: { icon: 'fa-solid fa-chart-line', color: '#059669', bg: '#D1FAE5' },
  };




  if (loading || !service) {
    return <div className="text-center py-16">Loading...</div>;
    }
    

  if (!checklist) {
    return (
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Checklist Not Found</h1>
        <p className="text-[#5A5A72] mb-6">The checklist you're looking for doesn't exist.</p>
       <Link
  href="/"
  className="bg-primary text-white font-bold px-6 py-3 rounded-lg inline-block hover:bg-primary/90"
>
  Go Home
</Link>
      </div>
    );
  }

  const renderPhaseSection = (phaseKey: string) => {
    const phase = checklist.phases.find(p => p.key === phaseKey);
    if (!phase) return null;

    const doneCount = getDoneCount(phaseKey);
    const total = phase.items.length;
    const isComplete = doneCount === total;
    const { icon, color, bg } = phaseIcons[phaseKey] || { icon: 'fa-solid fa-circle', color: '#666', bg: '#f0f0f0' };

    return (
      <div className={` ${activeTab === 'all' || activeTab === phaseKey ? 'block' : 'hidden'} animate-fadeIn`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3.5 mb-3 sm:mb-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: bg, color }}>
              <i className={icon}></i>
            </div>
            <div>
              <div className="font-head text-xl md:text-2xl font-extrabold text-[#1A1A2E] tracking-tight">{phase.title}</div>
              <div className="text-xs text-[#8888A0] mt-0.5">{phase.subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${isComplete ? 'bg-green-100 text-green-700' : 'bg-[#F2F4F8] text-[#8888A0]'}`}>
              {doneCount} / {total} done
            </span>
            <button className="text-xs font-semibold px-4 py-1.5 rounded-md border border-[#E4E6EF] bg-white text-[#5A5A72] hover:border-primary/10 hover:text-primary hover:bg-[#FFF3ED] transition-all" onClick={() => checkAll(phaseKey)}>
              Check All
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {phase.items.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-3.5 p-3.5 border rounded-lg bg-white cursor-pointer transition-all ${checkedItems[item.id] ? 'bg-green-50 border-green-200' : 'border-[#E4E6EF] hover:border-primary/10 hover:bg-[#FFF3ED]'}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className={`w-5.5 h-5.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checkedItems[item.id] ? 'bg-emerald-600 border-emerald-600' : 'border-[#E4E6EF] bg-white'}`}>
                {checkedItems[item.id] && <i className="fa-solid fa-check text-white text-[11px]"></i>}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium leading-relaxed transition-all ${checkedItems[item.id] ? 'text-[#8888A0] line-through decoration-green-200' : 'text-[#2C2C3E]'}`}>
                  {item.text}
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${tag.type === 'required' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-[#F2F4F8] text-[#8888A0] border border-[#E4E6EF]'}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
    <ChecklistHero
  checklist={checklist}
  overallPercentage={overallPercentage}
  phaseIcons={phaseIcons}
  getPhasePercentage={getPhasePercentage}
  getDoneCount={getDoneCount}
/>

      

      {/* Main Content */}
    <ChecklistMainContent
  checklist={checklist}
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  renderPhaseSection={renderPhaseSection}
  phaseIcons={phaseIcons}
      />
      

          {/* How to Use Section - White background with increased opacity */}
      <div className='py-16 px-5 md:px-10 lg:px-20 lg:mx-8'>
        <WhyChooseUs
        
  slug={service}
  differentiators={checklist.howToUse.map((item) => ({
    feature: item.title,
    description: item.desc,
  }))}
      />
      </div>


        {/* CTA Section - Semi-transparent with increased transparency */}
      
      
      <div className='-mb-12'>
        <ProjectCTAHero
  variant="combined"
  title={checklist.ctaTitle}
  description={checklist.ctaDescription}
  buttons={[
    {
      text: checklist.ctaButtonText,
      href: checklist.ctaLink ?? "/contact-us",
      variant: "primary",
    },
  ]}
/></div>
    </>
  );
}
