import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checklists } from '@/src/lib/service_checklist';
import { getAllServicePages } from '@/lib/service-pages';
import { siteConfig } from '@/app/metadata-config';
import { ChecklistPageClient } from '@/src/components/landingPage/checklist/ChecklistHero';

type Props = { params: Promise<{ slug: string; service: string }> };

export function generateStaticParams(): { slug: string; service: string }[] {
  return getAllServicePages()
    .filter((page) => !!checklists[page.slug])
    .map((page) => ({ slug: page.categorySlug, service: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service } = await params;
  const checklist = checklists[service];

  if (!checklist) {
    return { title: 'Checklist' };
  }

  return {
    title: checklist.metaTitle,
    description: checklist.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${slug}/${service}/checklist`,
    },
  };
}

export default async function ChecklistPage({ params }: Props) {
  const { slug, service } = await params;

  if (!checklists[service]) {
    notFound();
  }

  return <ChecklistPageClient slug={slug} service={service} />;
}
