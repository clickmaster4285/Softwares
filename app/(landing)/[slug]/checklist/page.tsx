// app/(landing)/[slug]/checklist/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { checklists, Checklist } from '@/src/lib/service_checklist';

export default function ChecklistPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  // Load checklist data based on slug
  useEffect(() => {
    if (slug) {
      if (checklists[slug]) {
        setChecklist(checklists[slug]);
      }
      setLoading(false);
    }
  }, [slug]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${slug}`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [slug]);

  // Save to localStorage whenever checkedItems changes
  useEffect(() => {
    localStorage.setItem(`checklist-${slug}`, JSON.stringify(checkedItems));
  }, [checkedItems, slug]);

  const toggleItem = useCallback((itemId: string) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const checkAll = useCallback((phaseKey: string) => {
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
  }, [checklist, checkedItems]);

  const getDoneCount = useCallback((phaseKey: string): number => {
    if (!checklist) return 0;
    const phase = checklist.phases.find(p => p.key === phaseKey);
    if (!phase) return 0;
    return phase.items.filter(item => checkedItems[item.id]).length;
  }, [checklist, checkedItems]);

  const getPhasePercentage = useCallback((phaseKey: string): number => {
    if (!checklist) return 0;
    const phase = checklist.phases.find(p => p.key === phaseKey);
    if (!phase) return 0;
    const done = getDoneCount(phaseKey);
    return phase.items.length > 0 ? Math.round((done / phase.items.length) * 100) : 0;
  }, [checklist, getDoneCount]);

  const getTotalDone = useCallback((): number => {
    return Object.values(checkedItems).filter(Boolean).length;
  }, [checkedItems]);

  const overallPercentage = checklist ? Math.round((getTotalDone() / checklist.totalItems) * 100) : 0;

  const phaseIcons: Record<string, { icon: string; color: string; bg: string }> = {
    pre: { icon: 'fa-solid fa-file-signature', color: '#D97706', bg: '#FEF3C7' },
    sprint: { icon: 'fa-solid fa-arrows-rotate', color: '#2563EB', bg: '#DBEAFE' },
    launch: { icon: 'fa-solid fa-rocket', color: '#E8692A', bg: '#FFF3ED' },
    post: { icon: 'fa-solid fa-chart-line', color: '#059669', bg: '#D1FAE5' },
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (!checklist) {
    return (
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4">Checklist Not Found</h1>
        <p className="text-[#5A5A72] mb-6">The checklist you're looking for doesn't exist.</p>
        <Link href="/" className="bg-[#E8692A] text-white font-bold px-6 py-3 rounded-lg inline-block hover:bg-[#F5845A]">Go Home</Link>
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
            <button className="text-xs font-semibold px-4 py-1.5 rounded-md border border-[#E4E6EF] bg-white text-[#5A5A72] hover:border-[#FDDCCC] hover:text-[#E8692A] hover:bg-[#FFF3ED] transition-all" onClick={() => checkAll(phaseKey)}>
              Check All
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {phase.items.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-3.5 p-3.5 border rounded-lg bg-white cursor-pointer transition-all ${checkedItems[item.id] ? 'bg-green-50 border-green-200' : 'border-[#E4E6EF] hover:border-[#FDDCCC] hover:bg-[#FFF3ED]'}`}
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
      <section className="bg-white border-b border-[#E4E6EF] py-16 px-5 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_420px] gap-15 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFF3ED] border border-[#FDDCCC] text-[#E8692A] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wide mb-5">
              <i className="fa-solid fa-circle-check text-[10px]"></i> {checklist.heroBadgeText.split('|')[0].trim()}
            </div>
            <h1 className="font-head text-3xl md:text-5xl font-extrabold text-[#1A1A2E] leading-tight tracking-tight mb-4">
              {checklist.heroTitleMain.split(' ').slice(0, -1).join(' ')} <span className="text-[#E8692A]">{checklist.heroTitleHighlight}</span>
            </h1>
            <p className="text-base text-[#5A5A72] leading-relaxed mb-7 max-w-lg">
              {checklist.heroDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {checklist.heroTags.map((tag, idx) => (
                <span key={idx} className="text-xs font-semibold text-[#5A5A72] bg-[#F2F4F8] border border-[#E4E6EF] px-3.5 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex gap-8">
              {checklist.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="font-head text-3xl font-extrabold text-[#1A1A2E]">{stat.num}</div>
                  <div className="text-xs text-[#8888A0] font-medium mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-[#F8F9FC] border border-[#E4E6EF] rounded-2xl p-7 shadow-sm">
              <div className="font-head font-bold text-base text-[#1A1A2E] mb-4 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-[#E8692A]"></i> Your Progress
              </div>
              <div className="mb-5">
                <div className="flex justify-between text-xs font-semibold text-[#2C2C3E] mb-2">
                  <span>Overall Completion</span>
                  <span className="text-[#E8692A]">{overallPercentage}%</span>
                </div>
                <div className="h-2 bg-[#E4E6EF] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E8692A] to-[#F5845A] rounded-full transition-all duration-300" style={{ width: `${overallPercentage}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {checklist.phases.map((phase) => (
                  <div key={phase.key} className="flex items-center gap-2.5">
                    <span className="w-20 text-xs font-semibold text-[#5A5A72] flex-shrink-0">{phase.key.charAt(0).toUpperCase() + phase.key.slice(1)}</span>
                    <div className="flex-1 h-1.5 bg-[#E4E6EF] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${getPhasePercentage(phase.key)}%`, backgroundColor: phaseIcons[phase.key]?.color || '#ccc' }}></div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8888A0] w-9 text-right">{getDoneCount(phase.key)}/{phase.items.length}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Intro Section */}
      <section className="bg-[#F8F9FC] border-b border-[#E4E6EF] py-12 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-head text-2xl md:text-3xl font-extrabold text-[#1A1A2E] tracking-tight mb-3">
            {checklist.checklistIntro.title}
          </h2>
          <p className="text-base text-[#5A5A72] leading-relaxed max-w-3xl">
            {checklist.checklistIntro.body}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-14">
        {/* Tabs */}
        <div className="flex border border-[#E4E6EF] rounded-lg overflow-hidden bg-[#F8F9FC] mb-10 flex-wrap">
          <button className={`flex-1 min-w-[120px] text-[13px] font-semibold py-3 px-2.5 border-r border-[#E4E6EF] flex items-center justify-center gap-1.5 transition-all ${activeTab === 'all' ? 'bg-[#E8692A] text-white' : 'bg-transparent text-[#8888A0] hover:bg-[#FFF3ED] hover:text-[#E8692A]'}`} onClick={() => setActiveTab('all')}>
            <i className="fa-solid fa-list-check"></i> All <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'all' ? 'bg-white/25 text-white' : 'bg-[#E4E6EF] text-[#8888A0]'}`}>{checklist.totalItems}</span>
          </button>
          {checklist.phases.map((phase) => (
            <button
              key={phase.key}
              className={`flex-1 min-w-[120px] text-[13px] font-semibold py-3 px-2.5 border-r border-[#E4E6EF] flex items-center justify-center gap-1.5 transition-all ${activeTab === phase.key ? 'bg-[#E8692A] text-white' : 'bg-transparent text-[#8888A0] hover:bg-[#FFF3ED] hover:text-[#E8692A]'}`}
              onClick={() => setActiveTab(phase.key)}
            >
              <i className={phaseIcons[phase.key]?.icon || 'fa-solid fa-circle'}></i> <span className="hidden sm:inline">{phase.title.split(' ')[0]}</span> <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === phase.key ? 'bg-white/25 text-white' : 'bg-[#E4E6EF] text-[#8888A0]'}`}>{phase.items.length}</span>
            </button>
          ))}
        </div>

        {/* Phase Sections */}
        {checklist.phases.map((phase) => (
          <div key={phase.key}>
            {renderPhaseSection(phase.key)}
          </div>
        ))}

        {/* How to Use Section */}
        <div className="mt-14 pt-12 border-t border-[#E4E6EF]">
          <div className="text-xs font-bold tracking-wide text-[#E8692A] uppercase mb-2">How to use this checklist</div>
          <div className="font-head text-2xl md:text-3xl font-extrabold text-[#1A1A2E] tracking-tight mb-9">One checklist, {checklist.phases.length} phases, zero surprises</div>
          <div className="grid md:grid-cols-4 gap-5">
            {checklist.howToUse.map((item, idx) => (
              <div key={idx} className="p-6 border border-[#E4E6EF] rounded-2xl bg-white hover:shadow-md hover:border-[#FDDCCC] transition-all">
                <div className="font-head text-[13px] font-extrabold text-[#E8692A] bg-[#FFF3ED] border border-[#FDDCCC] w-8 h-8 rounded-lg flex items-center justify-center mb-3.5">{String(idx + 1).padStart(2, '0')}</div>
                <h4 className="font-head font-bold text-[15px] text-[#1A1A2E] mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#5A5A72] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-14 bg-[#1A1A2E] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-head text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2.5">{checklist.ctaTitle} <span className="text-[#E8692A]">{checklist.ctaHighlight}</span></h2>
            <p className="text-[15px] text-white/55 max-w-lg leading-relaxed">{checklist.ctaDescription}</p>
          </div>
          <div className="text-center">
          
          </div>
        </div>
      </div>
    </>
  );
}
