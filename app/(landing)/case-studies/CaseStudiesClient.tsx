'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';
import { getCategoryName, resolveImageUrl } from '@/lib/utils';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileSearch,
  LineChart,
  Search,
  Sparkles,
  ChevronRight,
  Globe,
  Layers,
  Zap,
} from 'lucide-react';

export type CaseStudyCard = {
  _id: string;
  slug?: string;
  title: string;
  excerpt: string;
  client?: string;
  technologies?: string[];
  thumbnail?: string;
  status: 'live' | 'in-progress' | 'completed';
  challenge?: string;
  approach?: string;
  results?: string;
  project?: {
    _id: string;
    title: string;
    thumbnail?: string;
    url?: string;
    category?: string | { _id: string; name: string };
    status?: string;
  } | null;
};

function caseStudyId(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const anyVal = value as any;
    if (typeof anyVal.toString === 'function') {
      const s = anyVal.toString();
      if (s && s !== '[object Object]') return s;
    }
    if (typeof anyVal.$oid === 'string') return anyVal.$oid;
  }
  return '';
}

function statusLabel(status: CaseStudyCard['status']) {
  switch (status) {
    case 'live': return 'Live';
    case 'in-progress': return 'In Progress';
    case 'completed': return 'Completed';
    default: return status;
  }
}

function cardThumbnail(cs: CaseStudyCard): string | null {
  const own = cs.thumbnail?.trim();
  if (own) return resolveImageUrl(own);
  const p = cs.project?.thumbnail;
  if (p) return resolveImageUrl(p);
  return null;
}

// ─── Animated counter ────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>();
  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current!);
  }, [value]);
  return <>{display}{suffix}</>;
}

// ─── Status pill ─────────────────────────────────────────────────
function StatusPill({ status }: { status: CaseStudyCard['status'] }) {
  const map: Record<string, string> = {
    live: 'bg-emerald-500 text-white',
    'in-progress': 'bg-amber-400 text-amber-950',
    completed: 'bg-slate-500 text-white',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${map[status] ?? 'bg-slate-400 text-white'}`}>
      {status === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      )}
      {statusLabel(status)}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────
function CaseStudyCardItem({ cs, index }: { cs: CaseStudyCard; index: number }) {
  const id = caseStudyId((cs as any)._id);
  const hrefSlug =
    typeof (cs as any).slug === 'string' && (cs as any).slug.trim()
      ? String((cs as any).slug).trim()
      : '';
  const category = getCategoryName(cs.project?.category);
  const thumb = cardThumbnail(cs);
  const href = `/case-studies/${encodeURIComponent(hrefSlug || id)}`;

  const inner = (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {thumb ? (
          <img
            src={thumb}
            alt={cs.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileSearch className="h-12 w-12 text-slate-300" aria-hidden />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-600 shadow-sm backdrop-blur-sm">
            {category}
          </span>
          <StatusPill status={cs.status} />
        </div>

        {/* Arrow on hover */}
        {id && (
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowUpRight className="h-4 w-4 text-slate-800" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {cs.client && (
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">
            {cs.client}
          </p>
        )}
        <h3 className="font-display text-[1.1rem] font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
          {cs.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-[0.875rem] leading-relaxed text-slate-500">
          {cs.excerpt}
        </p>

        {/* Tech tags */}
        {cs.technologies && cs.technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {cs.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200"
              >
                {tech}
              </span>
            ))}
            {cs.technologies.length > 5 && (
              <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-400 ring-1 ring-slate-200">
                +{cs.technologies.length - 5}
              </span>
            )}
          </div>
        )}

        {id && (
          <div className="mt-5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-primary">
            Read case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </article>
  );

  if (!id) return <li className="opacity-60">{inner}</li>;

  return (
    <li>
      <Link
        href={href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-3xl"
      >
        {inner}
      </Link>
    </li>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="aspect-[16/9] bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:400%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-20 rounded-full bg-slate-100" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-100" />
          <div className="h-4 w-3/4 rounded-full bg-slate-100" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-slate-50" />
          <div className="h-3 w-full rounded-full bg-slate-50" />
          <div className="h-3 w-2/3 rounded-full bg-slate-50" />
        </div>
      </div>
    </div>
  );
}

// ─── Featured (first) card ─────────────────────────────────────────
function FeaturedCard({ cs }: { cs: CaseStudyCard }) {
  const id = caseStudyId((cs as any)._id);
  const hrefSlug =
    typeof (cs as any).slug === 'string' && (cs as any).slug.trim()
      ? String((cs as any).slug).trim()
      : '';
  const category = getCategoryName(cs.project?.category);
  const thumb = cardThumbnail(cs);
  const href = `/case-studies/${encodeURIComponent(hrefSlug || id)}`;

  const inner = (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-[0_24px_80px_-16px_rgba(0,0,0,0.14)]">
      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        {/* Text side */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              Featured
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
              {category}
            </span>
            <StatusPill status={cs.status} />
          </div>

          {cs.client && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              {cs.client}
            </p>
          )}

          <h3 className="font-display text-2xl font-bold leading-tight text-slate-900 transition-colors duration-200 group-hover:text-primary sm:text-3xl">
            {cs.title}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {cs.excerpt}
          </p>

          {cs.technologies && cs.technologies.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {id && (
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Read full case study
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          )}
        </div>

        {/* Image side */}
        <div className="relative min-h-[280px] overflow-hidden lg:min-h-0">
          {thumb ? (
            <img
              src={thumb}
              alt={cs.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <FileSearch className="h-16 w-16 text-slate-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </div>
    </article>
  );

  if (!id) return inner;
  return (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-3xl">
      {inner}
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
type CaseStudiesClientProps = {
  initialCaseStudies?: CaseStudyCard[];
};

export default function CaseStudiesClient({ initialCaseStudies }: CaseStudiesClientProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const { data: caseStudies = [], isLoading } = useQuery<CaseStudyCard[]>({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const res = await apiFetch('/api/case-studies');
      if (!res.ok) throw new Error('Failed to load case studies');
      return res.json();
    },
    ...(initialCaseStudies !== undefined ? { initialData: initialCaseStudies } : {}),
  });

  // Collect unique categories for filter chips
  const categories = useMemo(() => {
    const cats = Array.from(new Set(caseStudies.map((cs) => getCategoryName(cs.project?.category)))).filter(Boolean);
    return ['All', ...cats];
  }, [caseStudies]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return caseStudies.filter((cs) => {
      const cat = getCategoryName(cs.project?.category).toLowerCase();
      const tech = (cs.technologies || []).join(' ').toLowerCase();
      const body = [cs.challenge, cs.approach, cs.results].filter(Boolean).join(' ').toLowerCase();

      const matchesQuery = !q || (
        cs.title.toLowerCase().includes(q) ||
        cs.excerpt.toLowerCase().includes(q) ||
        cat.includes(q) ||
        (cs.client && cs.client.toLowerCase().includes(q)) ||
        tech.includes(q) ||
        body.includes(q)
      );

      const matchesFilter = activeFilter === 'All' || cat === activeFilter.toLowerCase();

      return matchesQuery && matchesFilter;
    });
  }, [caseStudies, query, activeFilter]);

  const verticalCount = useMemo(() => {
    return new Set(caseStudies.map((cs) => getCategoryName(cs.project?.category))).size;
  }, [caseStudies]);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[#f8f8f6] font-sans text-slate-900">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Warm glow top-right */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Case Studies</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Evidence of delivery
                </span>
              </div>

              <h1 className="max-w-3xl font-display text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]">
                Software that moves
                <br />
                <span className="text-primary">revenue and operations</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
                Real engagements. Real outcomes. Each case study documents the product context,
                technology stack, and measurable results — built for teams across the USA, Europe,
                and the Middle East.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="rounded-xl bg-slate-950 px-7 py-3 text-sm font-bold text-white shadow-none transition-all duration-200 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/20"
                >
                  <Link href="/contact-us">
                    Discuss your initiative
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-xl border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-none transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  <a href="#studies">
                    Browse studies
                    <FileSearch className="ml-2 h-4 w-4 opacity-60" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero stat cluster */}
            <div className="flex gap-4 lg:flex-col lg:gap-4">
              {[
                {
                  icon: <LineChart className="h-5 w-5" />,
                  label: 'Documented engagements',
                  value: isLoading ? 0 : caseStudies.length,
                  suffix: '+',
                },
                {
                  icon: <Globe className="h-5 w-5" />,
                  label: 'Industry verticals',
                  value: isLoading ? 0 : verticalCount,
                  suffix: '',
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  label: 'End-to-end delivery',
                  value: 100,
                  suffix: '%',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold tabular-nums text-slate-950">
                    {isLoading ? '—' : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process strip ─────────────────────────────────────── */}
      <section className="border-y border-slate-200/80 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {['Discovery', 'Architecture', 'Build', 'QA & Launch', 'Iteration'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-slate-300" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Studies ───────────────────────────────────────────── */}
      <section id="studies" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section header + search/filter */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Selected case studies
              </h2>
              <p className="mt-2 text-[0.9375rem] text-slate-500">
                {filtered.length} {filtered.length === 1 ? 'study' : 'studies'} available
                {activeFilter !== 'All' && ` · ${activeFilter}`}
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, client, tech…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-primary/40 focus:outline-none focus:ring-3 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Category filter chips */}
          {categories.length > 2 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 ${
                    activeFilter === cat
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* ─ Loading ─ */}
          {isLoading ? (
            <div className="space-y-8">
              <CardSkeleton />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              {caseStudies.length === 0 && !query.trim() ? (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <Layers className="h-7 w-7 text-slate-400" />
                  </div>
                  <p className="text-base font-semibold text-slate-800">Case studies are on the way.</p>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    New write-ups will appear here as they go live. Reach out and we can share relevant work in the meantime.
                  </p>
                  <Button asChild className="mt-6 rounded-xl" variant="default">
                    <Link href="/contact-us">Contact us</Link>
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <Search className="h-7 w-7 text-slate-400" />
                  </div>
                  <p className="text-base font-semibold text-slate-800">No results found.</p>
                  <p className="mt-2 text-sm text-slate-500">Try a different keyword or clear the filters.</p>
                  <div className="mt-6 flex gap-3">
                    {query && (
                      <Button variant="outline" className="rounded-xl" onClick={() => setQuery('')}>
                        Clear search
                      </Button>
                    )}
                    {activeFilter !== 'All' && (
                      <Button variant="outline" className="rounded-xl" onClick={() => setActiveFilter('All')}>
                        All categories
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured */}
              {featured && <FeaturedCard cs={featured} />}

              {/* Grid */}
              {rest.length > 0 && (
                <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((cs, i) => (
                    <CaseStudyCardItem key={caseStudyId((cs as any)._id) || i} cs={cs} index={i} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-14 sm:px-12 lg:px-16">
            {/* Background detail */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 60% 80% at 100% 50%, rgba(249,115,22,0.15), transparent),
                  radial-gradient(ellipse 40% 60% at 0% 50%, rgba(249,115,22,0.08), transparent)
                `,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
              }}
            />

            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Ready to build?
                </p>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Tell us about your initiative
                </h2>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-slate-400">
                  We scope, architect, and ship products that deliver measurable business outcomes.
                  Reach out to discuss how we can help your team.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white shadow-none transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Link href="/contact-us">
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-xl border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white shadow-none transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                >
                  <Link href="/services">
                    Our services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
