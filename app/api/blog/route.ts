import { NextRequest, NextResponse } from 'next/server';
import BlogPost from '../../../lib/models/BlogPost';
import dbConnect from '../../../lib/mongoose';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function ensureUniqueSlug(base: string) {
  const clean = slugify(base);
  if (!clean) return '';
  let slug = clean;
  let i = 2;
  while (await BlogPost.findOne({ slug }).select('_id').lean()) {
    slug = `${clean}-${i++}`;
  }
  return slug;
}

// GET: published only by default; ?drafts=1 returns all (admin UI)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const drafts = searchParams.get('drafts') === '1';
    const filter = drafts ? {} : { published: true };

    const list = await BlogPost.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(list);
  } catch (err: unknown) {
    console.error('GET /blog error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { published, slug, title, excerpt, content, author, thumbnail, tags } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const desiredSlug = typeof slug === 'string' ? slug.trim() : '';
    const computedSlug = desiredSlug ? slugify(desiredSlug) : await ensureUniqueSlug(String(title));
    if (computedSlug) {
      const taken = await BlogPost.findOne({ slug: computedSlug }).select('_id').lean();
      if (taken) return NextResponse.json({ message: 'Slug already in use' }, { status: 400 });
    }

    const doc = await BlogPost.create({
      published: Boolean(published),
      slug: computedSlug,
      title: String(title).trim(),
      excerpt: String(excerpt).trim(),
      content: String(content).trim(),
      author: typeof author === 'string' ? author.trim() : '',
      thumbnail: typeof thumbnail === 'string' ? thumbnail.trim() : '',
      tags: Array.isArray(tags) ? tags.map(String) : [],
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('POST /blog error:', msg);
    if (msg.includes('duplicate key')) {
      return NextResponse.json({ message: 'A blog post with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
