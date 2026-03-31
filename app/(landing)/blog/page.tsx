import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import BlogPost from '../../../lib/models/BlogPost';
import dbConnect from '../../../lib/mongoose';
import BlogClient, { type BlogCard } from './BlogClient';
import Script from 'next/script';

export const metadata = metadataConfig.blog();

export default async function BlogPage() {
  let initialPosts: BlogCard[] = [];

  try {
    await dbConnect();
    const raw = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
    initialPosts = JSON.parse(JSON.stringify(raw)) as BlogCard[];
  } catch {
    // DB unavailable during build or at runtime — client will refetch from /api/blog
  }

  return (
    <>
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
            ]),
          ),
        }}
      />
      <BlogClient initialPosts={initialPosts} />
    </>
  );
}
