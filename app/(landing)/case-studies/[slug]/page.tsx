import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import mongoose from 'mongoose';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import CaseStudy from '../../../../lib/models/CaseStudy';
import '../../../../lib/models/Project';
import '../../../../lib/models/Category';
import dbConnect from '../../../../lib/mongoose';
import { resolveImageUrl, getCategoryName } from '../../../../lib/utils';
import { Button } from '@/components/ui/button';

type LeanProject = {
  _id?: mongoose.Types.ObjectId;
  title?: string;
  thumbnail?: string;
  url?: string;
  category?: { name?: string } | string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function findCaseStudyBySlugOrId(slugOrId: string) {
  const normalized = slugify(slugOrId);

  const bySlug = await CaseStudy.findOne({ slug: slugOrId, published: true })
    .populate({
      path: 'project',
      select: 'title thumbnail url category',
      populate: { path: 'category', select: 'name description' },
    })
    .lean();
  if (bySlug) return bySlug;

  if (normalized && normalized !== slugOrId) {
    const byNormalizedSlug = await CaseStudy.findOne({ slug: normalized, published: true })
      .populate({
        path: 'project',
        select: 'title thumbnail url category',
        populate: { path: 'category', select: 'name description' },
      })
      .lean();
    if (byNormalizedSlug) return byNormalizedSlug;
  }

  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return CaseStudy.findOne({ _id: slugOrId, published: true })
      .populate({
        path: 'project',
        select: 'title thumbnail url category',
        populate: { path: 'category', select: 'name description' },
      })
      .lean();
  }

  const list = await CaseStudy.find({ published: true }).select('title').lean();
  const match = list.find((d: any) => slugify(String(d?.title ?? '')) === slugOrId);
  if (!match?._id) return null;

  return CaseStudy.findOne({ _id: match._id, published: true })
    .populate({
      path: 'project',
      select: 'title thumbnail url category',
      populate: { path: 'category', select: 'name description' },
    })
    .lean();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const normalized = slugify(slug);

  let doc: any = null;
  doc = await CaseStudy.findOne({ slug, published: true }).select('title excerpt').lean();
  if (!doc && normalized && normalized !== slug) {
    doc = await CaseStudy.findOne({ slug: normalized, published: true }).select('title excerpt').lean();
  }
  if (!doc && mongoose.Types.ObjectId.isValid(slug)) {
    doc = await CaseStudy.findOne({ _id: slug, published: true }).select('title excerpt').lean();
  }
  if (!doc) {
    const list = await CaseStudy.find({ published: true }).select('title').lean();
    const match = list.find((d: any) => slugify(String(d?.title ?? '')) === normalized || slugify(String(d?.title ?? '')) === slug);
    if (match?._id) {
      doc = await CaseStudy.findOne({ _id: match._id, published: true }).select('title excerpt').lean();
    }
  }

  if (!doc) return { title: 'Case study' };
  const d = doc as { title?: string; excerpt?: string };
  return {
    title: `${d.title ?? 'Case study'} | ClickMasters`,
    description: d.excerpt,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await dbConnect();
  const { slug } = await params;
  const raw = await findCaseStudyBySlugOrId(slug);

  if (!raw) {
    notFound();
  }

  const cs = raw as {
    title: string;
    excerpt: string;
    client?: string;
    technologies?: string[];
    thumbnail?: string;
    status?: string;
    challenge: string;
    approach: string;
    results: string;
    project?: LeanProject;
  };

  const project = cs.project;
  const fallbackThumb =
    project?.thumbnail && typeof project.thumbnail === 'string' ? project.thumbnail : '';
  const heroImage = cs.thumbnail?.trim() ? cs.thumbnail : fallbackThumb;
  const imageSrc = heroImage ? resolveImageUrl(heroImage) : '/placeholder.svg';
  const categoryName = project?.category
    ? getCategoryName(project.category as string | { _id: string; name: string })
    : '';

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900">
      <article>
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <Button variant="ghost" className="-ml-2 mb-6 gap-2 text-slate-600" asChild>
              <Link href="/case-studies">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All case studies
              </Link>
            </Button>
            {categoryName ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {categoryName}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {cs.title}
            </h1>
            {cs.client ? (
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-500">
                {cs.client}
              </p>
            ) : null}
            <p className="mt-6 text-lg leading-relaxed text-slate-600">{cs.excerpt}</p>
            {project?.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
              >
                View live product
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <img
            src={imageSrc}
            alt=""
            className="mb-12 w-full max-h-[420px] rounded-2xl border border-slate-200/90 object-cover shadow-sm"
          />

          {cs.technologies && cs.technologies.length > 0 ? (
            <div className="mb-12 flex flex-wrap gap-2">
              {cs.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">Challenge</h2>
            <div className="mt-4 max-w-none whitespace-pre-wrap text-base leading-relaxed text-slate-600">
              {cs.challenge}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Approach & delivery
            </h2>
            <div className="mt-4 max-w-none whitespace-pre-wrap text-base leading-relaxed text-slate-600">
              {cs.approach}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Results & impact
            </h2>
            <div className="mt-4 max-w-none whitespace-pre-wrap text-base leading-relaxed text-slate-600">
              {cs.results}
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
