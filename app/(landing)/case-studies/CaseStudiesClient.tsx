'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';
import { getCategoryName, resolveImageUrl } from '@/lib/utils';
import {
  ArrowRight,
  Building2,
  FileSearch,
  LineChart,
  Search,
  Sparkles,
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
  /** Populated solution; may be missing if the project was removed. */
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
    // Mongoose ObjectId often serializes to string, but guard for edge cases.
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
    case 'live':
      return 'Live product';
    case 'in-progress':
      return 'In delivery';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
}

function statusStyles(status: CaseStudyCard['status']) {
  switch (status) {
    case 'live':
      return 'bg-emerald-600/90 text-white';
    case 'in-progress':
      return 'bg-amber-500/95 text-white';
    case 'completed':
      return 'bg-slate-600/90 text-white';
    default:
      return 'bg-slate-500 text-white';
  }
}

function cardThumbnail(cs: CaseStudyCard): string | null {
  const own = cs.thumbnail?.trim();
  if (own) return resolveImageUrl(own);
  const p = cs.project?.thumbnail;
  if (p) return resolveImageUrl(p);
  return null;
}

type CaseStudiesClientProps = {
  /** From server render so cards appear immediately and for crawlers */
  initialCaseStudies?: CaseStudyCard[];
};

export default function CaseStudiesClient({ initialCaseStudies }: CaseStudiesClientProps) {
  const [query, setQuery] = useState('');

  const { data: caseStudies = [], isLoading } = useQuery<CaseStudyCard[]>({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const res = await apiFetch('/api/case-studies');
      if (!res.ok) throw new Error('Failed to load case studies');
      return res.json();
    },
    ...(initialCaseStudies !== undefined ? { initialData: initialCaseStudies } : {}),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return caseStudies;
    return caseStudies.filter((cs) => {
      const cat = getCategoryName(cs.project?.category).toLowerCase();
      const tech = (cs.technologies || []).join(' ').toLowerCase();
      const body = [cs.challenge, cs.approach, cs.results].filter(Boolean).join(' ').toLowerCase();
      return (
        cs.title.toLowerCase().includes(q) ||
        cs.excerpt.toLowerCase().includes(q) ||
        cat.includes(q) ||
        (cs.client && cs.client.toLowerCase().includes(q)) ||
        tech.includes(q) ||
        body.includes(q)
      );
    });
  }, [caseStudies, query]);

  const verticalCount = useMemo(() => {
    return new Set(caseStudies.map((cs) => getCategoryName(cs.project?.category))).size;
  }, [caseStudies]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900">
      {/* Hero */}
      <section className="relative border-b border-slate-200/80 bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(249,115,22,0.07) 0%, transparent 45%),
              radial-gradient(ellipse 80% 50% at 100% 0%, rgba(249,115,22,0.12), transparent)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Evidence of delivery
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Case studies that show how software moves revenue and operations
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Each engagement below summarizes the product context, stack, and live outcomes. Use
            these as a reference for how we scope, build, and ship with teams in the USA, Europe,
            and the Middle East.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              <Link href="/contact-us">
                Discuss your initiative
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-lg border-slate-300 bg-white">
              <a href="#studies">
                Browse studies
                <FileSearch className="ml-2 h-4 w-4 opacity-70" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="border-b border-slate-200/80 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LineChart className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums text-slate-900">
                {isLoading ? '—' : caseStudies.length}
              </p>
              <p className="text-sm font-medium text-slate-600">Documented engagements</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-3xl font-bold tabular-nums text-slate-900">
                {isLoading ? '—' : verticalCount}
              </p>
              <p className="text-sm font-medium text-slate-600">Industry verticals represented</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <p className="text-lg font-bold leading-snug text-slate-900">End-to-end</p>
              <p className="text-sm font-medium text-slate-600">
                Discovery → build → launch → iteration
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-[#fafafa] py-14 sm:py-16" aria-labelledby="case-studies-methodology">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="case-studies-methodology" className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            How each case study is structured
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Every write-up follows the same narrative so you can compare delivery patterns, stacks, and outcomes
            across industries — from fintech and healthcare to logistics and retail.
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Challenge &amp; context</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Business goals, constraints, and the problem the product needed to solve before engineering began.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Approach &amp; delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Architecture choices, team model, milestones, and how we collaborated with stakeholders through launch.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Results &amp; impact</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Measurable outcomes, live products, and what changed for users and revenue after go-live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studies grid — directly under metrics so cards are visible without scrolling past methodology */}
      <section id="studies" className="scroll-mt-24 border-b border-slate-200/80 bg-[#fafafa] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Selected case studies
              </h2>
              <p className="mt-2 max-w-xl text-slate-600">
                Filter by keyword to find a relevant reference architecture or delivery pattern.
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, sector, client…"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Filter case studies"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-5 w-full rounded bg-slate-200" />
                    <div className="h-16 w-full rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              {caseStudies.length === 0 && !query.trim() ? (
                <>
                  <p className="font-medium text-slate-900">Case studies are on the way.</p>
                  <p className="mt-2 text-sm text-slate-600">
                    New write-ups will appear here as they go live. Reach out and we can share
                    relevant work in the meantime.
                  </p>
                  <Button asChild className="mt-6" variant="default">
                    <Link href="/contact-us">Contact us</Link>
                  </Button>
                </>
              ) : (
                <>
                  <p className="font-medium text-slate-900">No case studies match your search.</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Try a shorter keyword or clear the filter.
                  </p>
                  <Button variant="outline" className="mt-6" type="button" onClick={() => setQuery('')}>
                    Clear search
                  </Button>
                </>
              )}
            </div>
          ) : (
            <ul className="mt-12 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cs) => {
                const id = caseStudyId((cs as any)._id);
                const hrefSlug =
                  typeof (cs as any).slug === 'string' && (cs as any).slug.trim()
                    ? String((cs as any).slug).trim()
                    : '';
                const category = getCategoryName(cs.project?.category);
                const thumb = cardThumbnail(cs);

                return (
                  <li key={id || String((cs as any)._id)}>
                    {id ? (
                      <Link
                        href={`/case-studies/${encodeURIComponent(hrefSlug || id)}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm transition hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={cs.title}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-300">
                            <FileSearch className="h-14 w-14" aria-hidden />
                          </div>
                        )}
                        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="border-0 bg-white/95 text-xs font-medium text-slate-800 shadow-sm backdrop-blur"
                          >
                            {category}
                          </Badge>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles(cs.status)}`}
                          >
                            {statusLabel(cs.status)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-primary">
                          {cs.title}
                        </h3>
                        {cs.client ? (
                          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                            {cs.client}
                          </p>
                        ) : null}
                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                          {cs.excerpt}
                        </p>
                        {cs.technologies && cs.technologies.length > 0 ? (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {cs.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                          Read case study
                          <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm opacity-80">
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={cs.title}
                              className="absolute inset-0 h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-slate-300">
                              <FileSearch className="h-14 w-14" aria-hidden />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-display text-lg font-bold leading-snug text-slate-900">
                            {cs.title}
                          </h3>
                          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                            {cs.excerpt}
                          </p>
                          <p className="mt-5 text-xs font-medium text-slate-500">
                            This case study link is unavailable.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Method strip
      <section className="border-b border-slate-200/80 bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-xl font-bold text-slate-900 sm:text-2xl">
            How we structure every case study
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Business context',
                body: 'Problem, stakeholders, and success metrics agreed before a line of code ships.',
              },
              {
                step: '02',
                title: 'Architecture & delivery',
                body: 'Stack choices, milestones, and QA gates aligned with scale and compliance needs.',
              },
              {
                step: '03',
                title: 'Measured impact',
                body: 'Launch outcomes, adoption signals, and ongoing optimization—not vanity screenshots.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

  

    </div>
  );
}