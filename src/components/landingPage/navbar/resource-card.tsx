import React from 'react';
import Link from 'next/link';
import { Star, Clock, ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResourceItem, ResourceType } from './types';

interface ResourceCardProps {
  type: ResourceType;
  item: ResourceItem;
  onClick?: () => void;
}

export function ResourceCard({ type, item, onClick }: ResourceCardProps) {
  if (type === 'Blog' || type === 'Case Studies') {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-accent/25 hover:shadow-md h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={item.image || '/placeholder.svg'}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-accent">
            {type === 'Blog' ? (item.tags?.[0] || 'Article') : 'Case Study'}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs text-slate-600">{item.description}</p>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="inline-flex items-center text-xs font-semibold text-accent">
              Read more
              <ArrowRight className="ml-1 h-3 w-3 transition group-hover:translate-x-0.5" />
            </span>
            {item.date && (
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {item.date}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (type === 'Testimonials') {
    return (
      <div className="relative bg-white rounded-xl p-5 shadow-sm border border-slate-100 h-full flex flex-col">
        <Quote className="absolute top-4 right-4 w-8 h-8 text-accent/5" />
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3",
                i < (item.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed italic mb-4 line-clamp-4 flex-1">
          "{item.description}"
        </p>
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-50">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
            {item.author?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{item.author}</h4>
            <p className="text-[10px] text-slate-500">Verified Client</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'FAQs') {
    return (
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 h-full flex flex-col group hover:bg-white hover:shadow-md transition-all">
        <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-3 mb-4">
          {item.description}
        </p>
        <Link
          href="/faqs"
          onClick={onClick}
          className="mt-auto inline-flex items-center text-xs font-medium text-accent hover:underline"
        >
          View FAQ
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    );
  }

  return null;
}
