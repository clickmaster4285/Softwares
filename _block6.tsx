import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPersonaPage, getAllPersonaPages } from '@/src/lib/persona-based';
import { getServicePage } from '@/lib/service-pages';
import PersonaBasedClient from './PersonaBasedClient';

type Props = {
  params: Promise<{
    slug: string;
    service: string;
    'persona-based': string; // third segment value = persona slug
  }>;
};

export function generateStaticParams() {
  return getAllPersonaPages()
    .filter((p) => p.slug.includes('-for-')) // skip duplicate short slugs until fixed
    .map((p) => {
      const service = p.slug.replace(/-for-[^-]+.*$/, ''); // rough base service
      const categorySlug = getServicePage(service)?.categorySlug ?? 'services';
      return {
        slug: categorySlug,
        service,
        'persona-based': p.slug,
      };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service, 'persona-based': personaSlug } = await params;
  const page = getPersonaPage(personaSlug);
  if (!page) return { title: 'Persona' };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${slug}/${service}/${personaSlug}`,
    },
  };
}

export default async function PersonaBasedPage({ params }: Props) {
  const { slug, service, 'persona-based': personaSlug } = await params;
  const page = getPersonaPage(personaSlug);
  if (!page) notFound();

  const baseService = getServicePage(service);

  return (
    <PersonaBasedClient
      page={page}
      categorySlug={slug}
      serviceSlug={service}
      serviceTitle={baseService?.title}
    />
  );
}