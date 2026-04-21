import { breadcrumbSchema, metadataConfig, serviceSchema, siteConfig } from '@/app/metadata-config';
import Script from 'next/script';
import ServicesClient from './ServicesClient';
import { getAllServicePages } from '@/lib/service-pages';

export const metadata = metadataConfig.services();

const servicesForJsonLd = getAllServicePages().map((service) => ({
  name: service.title,
  description: service.metaDescription,
  slug: service.slug,
  categorySlug: service.categorySlug,
}));

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
            ]),
          ),
        }}
      />
      {servicesForJsonLd.map((s, i) => (
        <Script
          key={`${s.categorySlug}-${s.slug}`}
          id={`service-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema(s.name, s.description, `${siteConfig.url}/${s.categorySlug}/${s.slug}`),
            ),
          }}
        />
      ))}
      <ServicesClient />
    </>
  );
}