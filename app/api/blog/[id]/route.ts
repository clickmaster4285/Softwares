import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '../../../../lib/models/BlogPost';
import dbConnect from '../../../../lib/mongoose';
import { calculateReadTime } from '../../../../src/lib/readTime';

const BlogPostModel = BlogPost as any;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeFaqs(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const candidate = item as { question?: unknown; answer?: unknown };
      const question = typeof candidate.question === 'string' ? candidate.question.trim() : '';
      const answer = typeof candidate.answer === 'string' ? candidate.answer.trim() : '';
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

// GET single: public if published; ?drafts=1 allows draft (admin)
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const drafts = searchParams.get('drafts') === '1';

    const doc = await BlogPostModel.findById(id).lean();
    if (!doc) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    if (!doc.published && !drafts) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (err: unknown) {
    console.error('GET /blog/[id] error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const body = await req.json();

    const updates: Record<string, unknown> = {};
    const keys = [
      'published',
      'slug',
      'title',
      'excerpt',
      'content',
      'author',
      'authorLinkedin',
      'authorImage',
      'thumbnail',
      'category',
      'tags',
      'faqs',
    ] as const;

    for (const k of keys) {
      if (k in body) {
        if (k === 'tags' && Array.isArray(body[k])) updates[k] = body[k].map(String);
        else if (k === 'faqs') updates[k] = normalizeFaqs(body[k]);
        else if (k === 'published') updates[k] = Boolean(body[k]);
        else if (k === 'slug' && typeof body[k] === 'string') updates[k] = slugify(body[k].trim());
        else if (typeof body[k] === 'string') updates[k] = body[k].trim();
        else updates[k] = body[k];
      }
    }

    const nextTitle =
      typeof updates.title === 'string' ? updates.title : typeof body.title === 'string' ? body.title.trim() : '';
    const nextExcerpt =
      typeof updates.excerpt === 'string'
        ? updates.excerpt
        : typeof body.excerpt === 'string'
          ? body.excerpt.trim()
          : '';
    if (typeof updates.content === 'string') {
      const { minutes } = calculateReadTime({
        html: updates.content,
        fallbackParts: [nextTitle, nextExcerpt],
      });
      updates.readTimeMinutes = minutes;
    } else if ('title' in updates || 'excerpt' in updates) {
      const existing = await BlogPostModel.findById(id).select('content').lean();
      const existingContent = typeof existing?.content === 'string' ? existing.content : '';
      const { minutes } = calculateReadTime({
        html: existingContent,
        fallbackParts: [nextTitle, nextExcerpt],
      });
      updates.readTimeMinutes = minutes;
    }

    if (typeof updates.slug === 'string' && updates.slug) {
      const existing = await BlogPostModel.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      })
        .select('_id')
        .lean();
      if (existing) return NextResponse.json({ message: 'Slug already in use' }, { status: 400 });
    }

    const doc = await BlogPostModel.findByIdAndUpdate(id, updates, {
      returnDocument: 'after',
      runValidators: true,
    }).lean();

    if (!doc) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err: unknown) {
    console.error('PUT /blog/[id] error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const deleted = await BlogPostModel.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err: unknown) {
    console.error('DELETE /blog/[id] error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
