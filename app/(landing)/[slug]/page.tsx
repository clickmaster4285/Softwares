// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getServiceData, getAllServiceSlugs } from '@/src/lib/services';
import { metadataConfig, siteConfig } from '@/app/metadata-config';
import ServiceClient from './ServiceClient';
import {
  getCategoryServiceFaqs,
  ServiceStructuredData,
} from '@/src/components/landingPage/servicesPage/ServiceStructuredData';

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <>
      <ServiceStructuredData
        idSlug={slug}
        name={serviceData.title}
        description={serviceData.description}
        url={`${siteConfig.url}/${slug}`}
        faqs={getCategoryServiceFaqs(serviceData.title)}
      />
      <ServiceClient serviceData={serviceData} />
    </>
  );
}