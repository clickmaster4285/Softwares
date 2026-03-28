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
  ExternalLink,
  FileSearch,
  LineChart,
  Search,
  Sparkles,
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  category: string | { _id: string; name: string };
  status: 'live' | 'in-progress' | 'completed';
  technologies?: string[];
  client?: string;
}

function statusLabel(status: Project['status']) {
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

function statusStyles(status: Project['status']) {
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

export default function CaseStudiesClient() {
  const [query, setQuery] = useState('');

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['case-studies-projects'],
    queryFn: async () => {
      const res = await apiFetch('/api/projects');
      if (!res.ok) throw new Error('Failed to load case studies');
      return res.json();
    },
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const cat = getCategoryName(p.category).toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        cat.includes(q) ||
        (p.client && p.client.toLowerCase().includes(q))
      );
    });
  }, [projects, query]);

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
                {isLoading ? '—' : projects.length}
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
                {isLoading
                  ? '—'
                  : new Set(projects.map((p) => getCategoryName(p.category))).size}
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

      {/* Method strip */}
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
      </section>

      {/* Studies grid */}
      <section id="studies" className="scroll-mt-24 py-16 sm:py-20">
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
              <p className="font-medium text-slate-900">No case studies match your search.</p>
              <p className="mt-2 text-sm text-slate-600">Try a shorter keyword or clear the filter.</p>
              <Button variant="outline" className="mt-6" type="button" onClick={() => setQuery('')}>
                Clear search
              </Button>
            </div>
          ) : (
            <ul className="mt-12 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => {
                const category = getCategoryName(project.category);
                const thumb = project.thumbnail ? resolveImageUrl(project.thumbnail) : null;
                const external = project.url?.startsWith('http');

                const cardInner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element -- dynamic CMS / upload URLs
                        <img
                          src={thumb}
                          alt={project.title}
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
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles(project.status)}`}
                        >
                          {statusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-primary">
                        {project.title}
                      </h3>
                      {project.client ? (
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                          {project.client}
                        </p>
                      ) : null}
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {project.description}
                      </p>
                      {project.technologies && project.technologies.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
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
                        {external ? (
                          <>
                            View live product
                            <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden />
                          </>
                        ) : (
                          <>
                            Read case study
                            <ArrowRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                          </>
                        )}
                      </span>
                    </div>
                  </>
                );

                const className =
                  'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm transition hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

                if (external && project.url) {
                  return (
                    <li key={project._id}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={className}>
                        {cardInner}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={project._id}>
                    <Link href={`/software-solutions/${project._id}`} className={className}>
                      {cardInner}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-slate-200 bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Want a case study written around your roadmap?
          </h2>
          <p className="mt-4 text-slate-300">
            Share scope, timeline, and constraints—we&apos;ll respond with a clear plan, not a generic
            pitch deck.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-lg bg-primary px-8 font-semibold text-white hover:bg-primary/90"
          >
            <Link href="/contact-us">
              Book a strategy session
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
