'use client';

import { useEffect, useRef, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

type BlogTocProps = {
  items: TocItem[];
};

export default function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const setFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', '').trim());
      if (hash) setActiveId(hash);
      else if (items[0]?.id) setActiveId(items[0].id);
    };
    setFromHash();
    window.addEventListener('hashchange', setFromHash);
    return () => window.removeEventListener('hashchange', setFromHash);
  }, [items]);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = items[0].id;
      for (const heading of headings) {
        if (heading.offsetTop <= y) current = heading.id;
        else break;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

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

  useEffect(() => {
    if (!activeId || !navRef.current) return;
    const safeId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(activeId) : activeId;
    const activeLink = navRef.current.querySelector<HTMLAnchorElement>(`a[href="#${safeId}"]`);
    if (!activeLink) return;
    activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);

    // Add a short pulse effect so section highlight is obvious.
    target.classList.add('toc-active-heading-pulse');
    window.setTimeout(() => target.classList.remove('toc-active-heading-pulse'), 900);
  };

  if (items.length === 0) {
    return <p className="mt-3 text-sm text-slate-500">Add an H1 heading in content to build TOC.</p>;
  }

  return (
    <>
      <nav ref={navRef} className="mt-5 max-h-[45vh] overflow-y-auto pr-1 lg:max-h-[calc(100vh-14rem)]">
        <ul className="space-y-1 border-l border-orange-200 pl-0">
          {items.map((item, idx) => {
            const isActive = activeId === item.id || (!activeId && idx === 0);
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-r-md px-3 py-2 text-sm leading-snug transition ${
                    isActive
                      ? 'border-l-2 border-l-orange-500 bg-orange-100 text-orange-700 shadow-sm ring-1 ring-orange-200/80'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  } ${item.level === 1 ? 'font-medium' : item.level === 2 ? 'ml-3' : 'ml-6'}`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <style jsx global>{`
        .blog-content .toc-active-heading {
          position: relative;
          border-left: 4px solid rgb(249 115 22) !important;
          padding-left: 10px !important;
          background: rgb(255 247 237) !important;
          border-radius: 4px !important;
          transition: all 160ms ease !important;
        }
        .blog-content [data-toc-active='true'] {
          box-shadow: inset 0 0 0 1px rgba(249, 115, 22, 0.35);
          background: linear-gradient(90deg, rgba(255, 237, 213, 0.9), rgba(255, 247, 237, 0.5)) !important;
          color: rgb(154, 52, 18) !important;
        }
        .blog-content .toc-active-heading-pulse {
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.18);
          animation: tocPulse 0.9s ease;
        }
        @keyframes tocPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.35);
          }
          100% {
            box-shadow: 0 0 0 8px rgba(249, 115, 22, 0);
          }
        }
      `}</style>
    </>
  );
}
