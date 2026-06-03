"use client";

import { useEffect, useRef, useState } from "react";
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
  scrollOffset?: number;
}

export function TableOfContents({
  items,
  title = "On this page",
  scrollOffset = 96,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "overview");
  const navRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!items.length) return;

    const getHeadings = () =>
      items
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            top: rect.top,
            bottom: rect.bottom,
            offsetTop: element.offsetTop,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    const findActiveHeading = () => {
      const headings = getHeadings();
      if (!headings.length) return items[0]?.id;

      const scrollPosition = window.scrollY + scrollOffset;
      let active = headings[0];
      let bestDistance = Infinity;

      for (const heading of headings) {
        const distance = scrollPosition - heading.offsetTop;
        const isPast = distance >= -80;
        const distAbs = Math.abs(distance);

        if (isPast && distAbs < bestDistance) {
          bestDistance = distAbs;
          active = heading;
        }
      }

      return active?.id ?? items[items.length - 1]?.id;
    };

    const onScroll = () => {
      if (isScrollingRef.current) return;
      const current = findActiveHeading();
      if (current) setActiveId(current);
    };

    const debouncedScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(onScroll, 50);
    };

    onScroll();
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    window.addEventListener("resize", debouncedScroll);

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      window.removeEventListener("resize", debouncedScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [items, scrollOffset]);

  useEffect(() => {
    if (!activeId || !navRef.current || isScrollingRef.current) return;

    const safeId =
      typeof CSS !== "undefined" && typeof CSS.escape === "function"
        ? CSS.escape(activeId)
        : activeId.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&");

    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
      `a[href="#${safeId}"]`
    );
    if (!activeLink) return;

    const container = navRef.current;
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const isVisible =
      linkRect.top >= containerRect.top &&
      linkRect.bottom <= containerRect.bottom;

    if (!isVisible) {
      activeLink.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    isScrollingRef.current = true;
    setActiveId(id);

    const targetTop = Math.max(
      0,
      window.scrollY + target.getBoundingClientRect().top - scrollOffset
    );

    window.scrollTo({ top: targetTop, behavior: "smooth" });
    window.history.pushState(null, "", `#${encodeURIComponent(id)}`);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 900);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <List className="h-4 w-4 text-primary" />
        </div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
      </div>

      <nav
        ref={navRef}
        className="toc-nav max-h-[calc(100vh-11rem)] overflow-y-auto overscroll-contain pr-1 scrollbar-thin"
      >
        <div className="space-y-1">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "group relative flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                  item.level === 2 ? "" : "pl-6",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-slate-900 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}

                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 text-slate-800 group-hover:bg-slate-200"
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

      <div className="mt-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/10 p-4">
        <p className="text-xs font-medium text-slate-800">Need help?</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">Talk to an expert</p>
        <Link
          href="/contact-us"
          className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:text-primary"
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
