import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import mongoose from 'mongoose';
import { ArrowLeft } from 'lucide-react';
import BlogPost from '../../../../lib/models/BlogPost';
import dbConnect from '../../../../lib/mongoose';
import { resolveImageUrl } from '../../../../lib/utils';
import { Button } from '@/components/ui/button';
import BlogToc from '@/components/blog/BlogToc';
import { breadcrumbSchema } from '@/app/metadata-config';
import Script from 'next/script';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripTags(value: string) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function buildContentWithToc(html: string) {
  const headingCounts: Record<string, number> = {};
  const toc: Array<{ id: string; text: string; level: 1 | 2 | 3 }> = [];

  // Use [\s\S]*? so headings containing line breaks or nested blocks are captured.
  const withIds = html.replace(
    /<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_m, tag: string, attrs: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return _m;

    const base = slugify(text) || 'section';
    headingCounts[base] = (headingCounts[base] || 0) + 1;
    const id = headingCounts[base] > 1 ? `${base}-${headingCounts[base]}` : base;
    const level = Number(tag[1]) as 1 | 2 | 3;

    toc.push({ id, text, level });

    if (/id\s*=\s*["'][^"']*["']/i.test(attrs)) {
      return `<${tag}${attrs}>${inner}</${tag}>`;
    }
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    }
  );

  return { html: withIds, toc };
}

async function findPostBySlugOrId(slugOrId: string) {
  const normalized = slugify(slugOrId);

  let bySlug = await BlogPost.findOne({ slug: slugOrId, published: true }).lean();
  if (bySlug) return bySlug;

  if (normalized && normalized !== slugOrId) {
    bySlug = await BlogPost.findOne({ slug: normalized, published: true }).lean();
    if (bySlug) return bySlug;
  }

  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return BlogPost.findOne({ _id: slugOrId, published: true }).lean();
  }

  const list = await BlogPost.find({ published: true }).select('title').lean();
  const match = list.find((d: { title?: string }) => slugify(String(d?.title ?? '')) === slugOrId);
  if (!match?._id) return null;
  return BlogPost.findOne({ _id: match._id, published: true }).lean();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const normalized = slugify(slug);

  let doc = await BlogPost.findOne({ slug, published: true }).select('title excerpt').lean();
  if (!doc && normalized && normalized !== slug) {
    doc = await BlogPost.findOne({ slug: normalized, published: true }).select('title excerpt').lean();
  }
  if (!doc && mongoose.Types.ObjectId.isValid(slug)) {
    doc = await BlogPost.findOne({ _id: slug, published: true }).select('title excerpt').lean();
  }
  if (!doc) return { title: 'Blog post' };

  const d = doc as { title?: string; excerpt?: string };
  return {
    title: `${d.title ?? 'Blog post'} | ClickMasters`,
    description: d.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await dbConnect();
  const { slug } = await params;
  const raw = await findPostBySlugOrId(slug);
  if (!raw) notFound();

  const post = raw as {
    title: string;
    excerpt: string;
    content: string;
    author?: string;
    thumbnail?: string;
    tags?: string[];
    createdAt?: string;
  };
  const imageSrc = post.thumbnail?.trim() ? resolveImageUrl(post.thumbnail) : '/placeholder.svg';
  const htmlContent = post.content?.trim() ? post.content : '<p>No content added yet.</p>';
  const { html: htmlWithIds, toc } = buildContentWithToc(htmlContent);

  return (
    <>
      <Script
        id="blog-detail-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${slug}` },
            ]),
          ),
        }}
      />
      <div className="min-h-screen bg-[#f5f6f8] pt-20 text-slate-900">
        <article>
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <Button variant="ghost" className="-ml-2 mb-6 gap-2 text-slate-600" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                All posts
              </Link>
            </Button>
            <h1 className="max-w-4xl font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.tags && post.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
            <p className="mt-4 text-sm text-slate-500">
              {post.author || 'ClickMasters'}
              {post.createdAt ? ` · ${new Date(post.createdAt).toLocaleDateString()}` : ''}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <img
                src={imageSrc}
                alt={post.title}
                className="mb-10 w-full max-h-[420px] rounded-2xl border border-slate-200/90 object-cover shadow-sm"
              />
              <section
                className="prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-8 prose-li:text-slate-700 prose-a:text-primary prose-blockquote:border-l-primary prose-img:rounded-xl prose-img:border prose-img:border-slate-200 prose-img:shadow-sm"
                dangerouslySetInnerHTML={{ __html: htmlWithIds }}
              />
            </div>

            <aside className="lg:col-span-4 lg:self-start lg:pt-20">
              <div className="lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="text-3xl font-semibold leading-none text-slate-900 sm:text-[32px]">
                  Table of contents:
                </h2>
                <BlogToc items={toc} />
              </div>
            </aside>
          </div>
        </div>
        </article>
      </div>
    </>
  );
}
