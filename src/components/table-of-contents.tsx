"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
}

export function TableOfContents({ items, title = "On this page" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -40% 0%",
        threshold: [0, 0.1, 0.2],
      }
    );

    const elements = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
          <List className="h-4 w-4 text-orange-600" />
        </div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-primaryto-orange-400 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative">
        <div className="space-y-1">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                  item.level === 2 ? "" : "pl-6",
                  isActive
                    ? "bg-orange-50 font-medium text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {/* Active indicator line (side) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}

                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-medium transition-colors",
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  )}
                >
                  {index + 1}
                </span>
                <span className="truncate">{item.title}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Quick action */}
      <div className="mt-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 p-4">
        <p className="text-xs font-medium text-slate-500">Need help?</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          Talk to an expert
        </p>
        <Link
          href="/contact-us"
          className="mt-2 inline-flex items-center text-sm font-medium text-primaryhover:text-orange-700"
        >
          Book a call
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
