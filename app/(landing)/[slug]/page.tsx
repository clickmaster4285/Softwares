// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getServiceData, getAllServiceSlugs } from '@/src/lib/services';
import ServiceClient from './ServiceClient';

type Props = { params: Promise<{ slug: string }> };

// Generate static paths for all services at build time
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  
  // Get service data from our data file based on URL slug
  const serviceData = getServiceData(slug);
  
  // If no service data found for this slug, show 404
  if (!serviceData) {
    notFound();
  }

  return <ServiceClient serviceData={serviceData} />;
}