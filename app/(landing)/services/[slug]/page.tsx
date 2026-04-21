import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/app/metadata-config';
import { getAllServiceSlugs, getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

function resolveLegacyServiceSlug(slug: string): string {
  // Support legacy marketing suffixes such as "...-company".
  if (getServicePage(slug)) return slug;
  if (slug.endsWith('-company')) {
    const withoutCompany = slug.replace(/-company$/, '');
    if (getServicePage(withoutCompany)) return withoutCompany;
  }
  return slug;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllServiceSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = resolveLegacyServiceSlug(slug);
  const page = getServicePage(resolvedSlug);
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
  const resolvedSlug = resolveLegacyServiceSlug(slug);
  const page = getServicePage(resolvedSlug);
  if (!page) notFound();

  redirect(`/${page.categorySlug}/${page.slug}`);
}
