import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  baseServiceSlugFromPersona,
  getAllPersonaSlugs,
  getPersonaPage,
} from '@/src/lib/persona-utils';
import { getServicePage } from '@/lib/service-pages';
import { siteConfig } from '@/app/metadata-config';
import PersonaPageClient from './PersonaPageClient';

type Props = {
  params: Promise<{
    slug: string;
    service: string;
    'persona-based': string;
  }>;
};

export function generateStaticParams() {
  return getAllPersonaSlugs().map((personaSlug) => {
    const base = baseServiceSlugFromPersona(personaSlug);
    const svc = getServicePage(base);
    return {
      slug: svc?.categorySlug ?? 'services',
      service: base,
      'persona-based': personaSlug,
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
      canonical: `${siteConfig.url}/${slug}/${service}/${personaSlug}`,
    },
  };
}

export default async function PersonaBasedPage({ params }: Props) {
  const resolved = await params;
  const personaSlug = resolved['persona-based'];
  const page = getPersonaPage(personaSlug);

  if (!page) notFound();

  const baseService = getServicePage(resolved.service);

  return (
    <PersonaPageClient
      page={page}
      categorySlug={resolved.slug}
      serviceSlug={resolved.service}
      serviceTitle={baseService?.title}
      categoryName={baseService?.category}
      serviceName={baseService?.serviceName}
    />
  );
}
