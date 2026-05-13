'use client';

import { useEffect, useRef, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

type BlogTocProps = {
  items: TocItem[];
  /** Optional: offset from top in pixels for active detection and scroll target */
  scrollOffset?: number;
  /** Optional: additional CSS classes for the wrapper */
  className?: string;
};

export default function BlogToc({ items, scrollOffset = 112, className = '' }: BlogTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Update active ID from URL hash on mount and hash changes
  useEffect(() => {
    const setFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', '').trim());
      if (hash && items.some(item => item.id === hash)) {
        setActiveId(hash);
      } else if (items[0]?.id) {
        setActiveId(items[0].id);
      }
    };
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, [items]);

  // Improved scroll spy: find the heading that is currently most visible
  useEffect(() => {
    if (!items.length) return;

    const getHeadingsWithPositions = () => {
      return items
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            element,
            top: rect.top,
            bottom: rect.bottom,
            offsetTop: element.offsetTop,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    };

    const findActiveHeading = () => {
      const headings = getHeadingsWithPositions();
      if (!headings.length) return items[0]?.id;

      let activeHeading = headings[0];
      let minDistance = Infinity;

      for (const heading of headings) {
        const headingPosition = heading.offsetTop;
        const scrollPosition = window.scrollY + scrollOffset;
        const distance = Math.abs(headingPosition - scrollPosition);
        
        const isInViewport = heading.top < window.innerHeight - 100 && heading.bottom > 100;
        
        if (distance < minDistance || (isInViewport && distance < minDistance + 200)) {
          minDistance = distance;
          activeHeading = heading;
        }
      }

      return activeHeading?.id || items[0]?.id;
    };

    const onScroll = () => {
      if (isScrollingRef.current) return;
      
      const current = findActiveHeading();
      if (current && current !== activeId) {
        setActiveId(current);
      }
    };

    const debouncedScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(onScroll, 100);
    };

    onScroll();
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', debouncedScroll);
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', debouncedScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [items, scrollOffset, activeId]);

  // Apply active class to actual heading elements in the content
  useEffect(() => {
    if (!items.length) return;
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (item.id === activeId) {
        el.classList.add('toc-active-heading');
        el.setAttribute('data-toc-active', 'true');
      } else {
        el.classList.remove('toc-active-heading');
        el.removeAttribute('data-toc-active');
      }
    }
  }, [activeId, items]);

  // Auto-scroll the active TOC link into view
  useEffect(() => {
    if (!activeId || !navRef.current || isScrollingRef.current) return;
    
    const safeId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' 
      ? CSS.escape(activeId) 
      : activeId.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(`a[href="#${safeId}"]`);
    if (!activeLink) return;
    
    const container = navRef.current;
    const linkRect = activeLink.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const isLinkVisible = (
      linkRect.top >= containerRect.top &&
      linkRect.bottom <= containerRect.bottom
    );
    
    if (!isLinkVisible) {
      activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const decodedId = decodeURIComponent(id);
    const target = document.getElementById(decodedId);
    if (!target) return;
    
    isScrollingRef.current = true;
    setActiveId(decodedId);

    const targetRect = target.getBoundingClientRect();
    const absoluteTargetTop = window.scrollY + targetRect.top;
    const targetTop = Math.max(0, absoluteTargetTop - scrollOffset);
    
    window.scrollTo({ 
      top: targetTop, 
      behavior: 'smooth' 
    });
    
    window.history.pushState(null, '', `#${encodeURIComponent(decodedId)}`);
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);

    target.classList.add('toc-active-heading-pulse');
    setTimeout(() => target.classList.remove('toc-active-heading-pulse'), 900);
  };

  if (items.length === 0) {
    return <p className="mt-3 text-sm text-slate-500">Add headings in content to build TOC.</p>;
  }

  return (
    <div className={className}>
      <div className="side-title text-base font-semibold text-slate-800 mb-2">In this article</div>
      <div className="line-wrapper-side h-px bg-orange-200 mb-3"></div>
      <nav ref={navRef} className="toc-nav max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
        <ul className="space-y-1 border-l border-orange-200 pl-0">
          {items.map((item, idx) => {
            const isActive = activeId === item.id || (!activeId && idx === 0);
            const isHovered = hoveredId === item.id;
            
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-r-md px-3 py-2 text-sm leading-snug transition-all duration-200 ${
                    isActive
                      ? 'border-l-2 border-l-primarybg-orange-50 text-secondaryshadow-sm font-medium'
                      : isHovered
                      ? 'border-l-2 border-l-orange-300 bg-orange-50/50 text-primary translate-x-0.5'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:translate-x-0.5'
                  } ${item.level === 2 ? 'ml-3' : item.level === 3 ? 'ml-6' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    )}
                    <span className="flex-1">{item.text}</span>
                    {isHovered && (
                      <svg 
                        className="w-3.5 h-3.5 text-primary transition-all duration-200 transform translate-x-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}