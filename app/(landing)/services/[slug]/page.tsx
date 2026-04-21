import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/app/metadata-config';
import { getAllServiceSlugs, getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return getAllServiceSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: 'Service' };
  const canonical = `${siteConfig.url}/${page.categorySlug}/${page.slug}`;
  return {
    title: `${page.title} Services | ClickMasters`,
    description: page.metaDescription,
    alternates: { canonical },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  redirect(`/${page.categorySlug}/${page.slug}`);
}
