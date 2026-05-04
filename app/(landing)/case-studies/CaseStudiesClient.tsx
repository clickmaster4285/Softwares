'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';
import { getCategoryName, resolveImageUrl } from '@/lib/utils';
import { ArrowRight, Building2, FileSearch, LineChart, Search, Sparkles } from 'lucide-react';

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
    case 'in-progress': return 'In delivery';
    case 'completed': return 'Completed';
    default: return status;
  }
}

function statusClasses(status: CaseStudyCard['status']) {
  switch (status) {
    case 'live': return 'bg-emerald-600 text-white';
    case 'in-progress': return 'bg-accent-500 text-white';
    case 'completed': return 'bg-slate-500 text-white';
    default: return 'bg-slate-400 text-white';
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

  const verticalCount = useMemo(
    () => new Set(caseStudies.map((cs) => getCategoryName(cs.project?.category))).size,
    [caseStudies],
  );

  return (
    <div className="min-h-screen  text-slate-900">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-16 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,83,26,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-8xl px-6 pb-14 pt-12 lg:px-16">
          {/* Eyebrow */}
          <p className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Evidence of delivery
          </p>

          <h1 className="max-w-8xl font-display text-4xl font-normal leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.2rem]">
            Case studies showing how software{' '}
            <em className="italic text-primary not-italic" style={{ fontStyle: 'italic' }}>moves</em>{' '}
            revenue and operations
          </h1>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-500">
            Each engagement below summarizes the product context, stack, and live outcomes. Use
            these as a reference for how we scope, build, and ship with teams in the USA, Europe,
            and the Middle East.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-lg bg-primary px-6 text-sm font-semibold text-white hover:bg-primary/90"
            >
              <Link href="/contact-us">
                Discuss your initiative
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-lg border-slate-300 bg-white text-sm">
              <a href="#studies">
                Browse studies
                <FileSearch className="ml-2 h-4 w-4 opacity-60" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Metrics strip ────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-8xl grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 px-6 lg:px-16">
          {[
            {
              icon: <LineChart className="h-5 w-5" aria-hidden />,
              value: isLoading ? '—' : String(caseStudies.length),
              label: 'Documented engagements',
            },
            {
              icon: <Building2 className="h-5 w-5" aria-hidden />,
              value: isLoading ? '—' : String(verticalCount),
              label: 'Industry verticals represented',
            },
            {
              icon: <Sparkles className="h-5 w-5" aria-hidden />,
              value: 'End-to-end',
              label: 'Discovery → build → launch → iteration',
              smallValue: true,
            },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-4 py-6 sm:px-8 first:sm:pl-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {m.icon}
              </div>
              <div>
                <p
                  className={
                    m.smallValue
                      ? 'font-display text-lg font-normal text-slate-950'
                      : 'font-display text-3xl font-normal tabular-nums text-slate-950'
                  }
                >
                  {m.value}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodology ──────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50 px-6 py-12 lg:px-16" aria-labelledby="methodology-heading">
        <div className="mx-auto max-w-8xl">
          <h2 id="methodology-heading" className="font-display text-2xl font-normal text-slate-950 sm:text-3xl">
            How each case study is structured
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-500">
            Every write-up follows the same narrative so you can compare delivery patterns, stacks,
            and outcomes across industries — from fintech and healthcare to logistics and retail.
          </p>

          {/* 3-panel methodology strip */}
          <div className="mt-8 grid grid-cols-1 gap-px bg-slate-200 overflow-hidden rounded-2xl sm:grid-cols-3">
            {[
              {
                num: '01 — Challenge',
                title: 'Business context',
                body: 'Goals, constraints, and the problem the product needed to solve before engineering began.',
              },
              {
                num: '02 — Approach',
                title: 'Architecture & delivery',
                body: 'Stack choices, milestones, and how we collaborated with stakeholders through launch.',
              },
              {
                num: '03 — Impact',
                title: 'Results & outcomes',
                body: 'Measurable outcomes, live products, and what changed for users and revenue after go-live.',
              },
            ].map((col) => (
              <div key={col.num} className="bg-white px-6 py-7">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-primary">
                  {col.num}
                </p>
                <h3 className="mt-3 text-[15px] font-semibold text-slate-900">{col.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-500">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Studies grid ─────────────────────────────────────────────────── */}
      <section id="studies" className="scroll-mt-20 border-b border-slate-200 bg-slate-50 px-6 py-12 lg:px-16">
        <div className="mx-auto max-w-8xl">

          {/* Section header + search */}
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-normal text-slate-950 sm:text-3xl">
                Selected case studies
              </h2>
              <p className="mt-1.5 text-[14px] text-slate-500">
                Filter by keyword — title, sector, technology, or client.
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
                aria-label="Filter case studies"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
          </div>

          {/* Loading skeletons */}
          {isLoading ? (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="space-y-3 p-6">
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="h-5 w-full rounded bg-slate-200" />
                    <div className="h-14 w-full rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>

          ) : filtered.length === 0 ? (
            /* Empty state */
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
              {caseStudies.length === 0 && !query.trim() ? (
                <>
                  <p className="font-medium text-slate-900">Case studies are on the way.</p>
                  <p className="mt-2 text-sm text-slate-500">
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
                  <p className="mt-2 text-sm text-slate-500">
                    Try a shorter keyword or clear the filter.
                  </p>
                  <Button variant="outline" className="mt-6" type="button" onClick={() => setQuery('')}>
                    Clear search
                  </Button>
                </>
              )}
            </div>

          ) : (
            /* Cards grid */
            <ul className="mt-10 grid list-none gap-7 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cs) => {
                const id = caseStudyId((cs as any)._id);
                const hrefSlug =
                  typeof (cs as any).slug === 'string' && (cs as any).slug.trim()
                    ? String((cs as any).slug).trim()
                    : '';
                const category = getCategoryName(cs.project?.category);
                const thumb = cardThumbnail(cs);

                const cardContent = (
                  <>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={cs.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FileSearch className="h-12 w-12 text-slate-300" aria-hidden />
                        </div>
                      )}
                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
                          {category}
                        </span>
                        <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${statusClasses(cs.status)}`}>
                          {statusLabel(cs.status)}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-[19px] font-normal leading-snug text-slate-950 transition group-hover:text-primary">
                        {cs.title}
                      </h3>
                      {cs.client && (
                        <p className="mt-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                          {cs.client}
                        </p>
                      )}
                      <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500">
                        {cs.excerpt}
                      </p>

                      {cs.technologies && cs.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cs.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary transition-all group-hover:gap-2.5">
                        Read case study
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                  </>
                );

                return (
                  <li key={id || String((cs as any)._id)}>
                    {id ? (
                      <Link
                        href={`/case-studies/${encodeURIComponent(hrefSlug || id)}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(232,83,26,0.10)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white opacity-70 shadow-sm">
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {thumb ? (
                            <img src={thumb} alt={cs.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <FileSearch className="h-12 w-12 text-slate-300" aria-hidden />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-display text-[19px] font-normal leading-snug text-slate-950">{cs.title}</h3>
                          <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500">{cs.excerpt}</p>
                          <p className="mt-5 text-[11px] font-medium text-slate-400">This case study link is unavailable.</p>
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

      {/* ── Footer CTA ───────────────────────────────────────────────────── */}
      <section className="bg-slate-950 px-6 py-14 lg:px-16">
        <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-normal leading-snug text-white sm:text-3xl">
              Ready to discuss your{' '}
              <em className="italic text-primary/80">initiative?</em>
            </h3>
            <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-slate-400">
              We scope, build, and ship — tell us what you&apos;re working on and we&apos;ll share
              relevant references.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-slate-950 hover:bg-primary-50 transition"
          >
            <Link href="/contact-us">
              Start the conversation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}