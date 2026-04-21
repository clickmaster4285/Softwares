import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import { apiGet } from '@/lib/api';
import BlogPost from '../../../lib/models/BlogPost';
import dbConnect from '../../../lib/mongoose';
import BlogClient, { type BlogCard } from './BlogClient';
import Script from 'next/script';

export const metadata = metadataConfig.blog();

export default async function BlogPage() {
  let initialPosts: BlogCard[] = [];

  try {
    initialPosts = await apiGet<BlogCard[]>('/api/blog', { cache: 'no-store' });
  } catch (error) {
    console.error('BlogPage SSR API fetch failed, trying DB fallback:', error);
    try {
      await dbConnect();
      const BlogPostModel = BlogPost as any;
      const raw = await BlogPostModel.find({ published: true }).sort({ createdAt: -1 }).lean();
      initialPosts = JSON.parse(JSON.stringify(raw)) as BlogCard[];
    } catch (dbError) {
      console.error('BlogPage DB fallback failed:', dbError);
      // Client will still try /api/blog after hydration.
    }
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
