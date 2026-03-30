'use client';

import { useEffect, useState } from 'react';

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
      // Account for fixed navbar and provide a small buffer.
      const y = window.scrollY + 140;
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

  if (items.length === 0) {
    return <p className="mt-3 text-sm text-slate-500">Add H1/H2/H3 headings in content to build TOC.</p>;
  }

  return (
    <nav className="mt-5">
      <ul className="space-y-1 border-l border-orange-200 pl-0">
        {items.map((item, idx) => {
          const isActive = activeId === item.id || (!activeId && idx === 0);
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`block rounded-r-md px-3 py-2 text-sm leading-snug transition ${
                  isActive
                    ? 'border-l-2 border-l-orange-500 bg-orange-50 text-orange-600'
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
  );
}
