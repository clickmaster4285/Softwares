// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getServiceData, getAllServiceSlugs } from '@/src/lib/services';
import { metadataConfig, faqSchema, homepageFaqSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import ServiceClient from './ServiceClient';
import Script from 'next/script';

type Props = { params: Promise<{ slug: string }> };

const categoryFaqs = homepageFaqSchema.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

// Generate static paths for all services at build time
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
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