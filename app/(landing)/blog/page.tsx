import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import { apiGet } from '@/lib/api';
import BlogClient, { type BlogCard } from './BlogClient';
import Script from 'next/script';

export const metadata = metadataConfig.blog();

export default async function BlogPage() {
  let initialPosts: BlogCard[] = [];

  try {
    initialPosts = await apiGet<BlogCard[]>('/api/blog', { cache: 'no-store' });
  } catch (error) {
    console.error('BlogPage SSR fetch failed:', error);
    // API unavailable during build or at runtime — client will refetch from /api/blog
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
