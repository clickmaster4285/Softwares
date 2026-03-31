import Testimonials from "@/src/components/landingPage/Testimonials/page";
import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import Script from 'next/script';

export const metadata = metadataConfig.testimonials();
export default function TestimonialsPage() {
  return (
    <>
      <Script
        id="testimonials-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Testimonials', url: '/testimonials' },
            ]),
          ),
        }}
      />
      <Testimonials />
    </>
  );
}
