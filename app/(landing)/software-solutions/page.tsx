import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import SolutionsClient from './SolutionsClient';
import Script from 'next/script';

export const metadata = metadataConfig.solutions();

export default function SolutionsPage() {
  return (
    <>
      <Script
        id="solutions-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Software Solutions', url: '/software-solutions' },
            ]),
          ),
        }}
      />
      <SolutionsClient />
    </>
  );
}