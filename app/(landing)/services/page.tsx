import { breadcrumbSchema, metadataConfig, serviceSchema, siteConfig } from '@/app/metadata-config';
import Script from 'next/script';
import ServicesClient from './ServicesClient';
import { getAllServicePages } from '@/lib/service-pages';

export const metadata = metadataConfig.services();

const servicesForJsonLd = getAllServicePages().map((service) => ({
  name: service.title,
  description: service.metaDescription,
  hash: service.sectionId,
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
          key={s.hash}
          id={`service-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema(s.name, s.description, `${siteConfig.url}/services#${s.hash}`),
            ),
          }}
        />
      ))}
      <ServicesClient />
    </>
  );
}