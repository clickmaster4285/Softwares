import { notFound } from 'next/navigation';
import { getServiceData, getAllServiceSlugs } from '@/src/lib/services';
import { metadataConfig, faqSchema, homepageFaqSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import ServiceClient from './ServiceClient';
import Script from 'next/script';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

/** Static routes under (landing) — must not be handled by this dynamic segment */
const RESERVED_SLUGS = new Set([
  'software-solutions',
  'blog',
  'case-studies',
  'about-us',
  'contact-us',
  'testimonials',
  'faqs',
  'careers',
  'locations',
  'privacy-policy',
  'terms-of-service',
  'cookie-policy',
  'admin',
  'hire',
]);

const categoryFaqs = homepageFaqSchema.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

// Generate static paths for all services at build time
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs().filter((slug) => !RESERVED_SLUGS.has(slug));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    return { title: 'Page Not Found | ClickMasters', robots: { index: false, follow: false } };
  }

  const serviceData = getServiceData(slug);
  
  if (!serviceData) {
    return { title: 'Service Not Found' };
  }

  return metadataConfig.serviceDetail(
    serviceData.title,
    serviceData.description,
    slug
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  if (RESERVED_SLUGS.has(slug)) {
    notFound();
  }
  
  // Get service data from our data file based on URL slug
  const serviceData = getServiceData(slug);
  
  // If no service data found for this slug, show 404
  if (!serviceData) {
    notFound();
  }

  const url = `${siteConfig.url}/${slug}`;
  const serviceJsonLd = serviceSchema(serviceData.title, serviceData.description, url);
  const faqJsonLd = faqSchema(categoryFaqs);

  return (
    <>
      <Script
        id={`service-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id={`faq-schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServiceClient serviceData={serviceData} />
    </>
  );
}