import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import { apiFetch } from '@/lib/api';
import BlogClient, { type BlogCard } from './BlogClient';
import Script from 'next/script';

export const metadata = metadataConfig.blog();

export default async function BlogPage() {
  let initialPosts: BlogCard[] = [];

  try {
    const res = await apiFetch('/api/blog', { method: 'GET', cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
    initialPosts = (await res.json()) as BlogCard[];
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
