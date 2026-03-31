import Contact from "@/src/components/landingPage/contactPage/Contact";
import { breadcrumbSchema, localBusinessSchema, metadataConfig } from '@/app/metadata-config';
import Script from 'next/script';

export const metadata = metadataConfig.contact();
export default function ContactPage() {
  return (
    <>
      <Script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Contact Us', url: '/contact-us' },
            ]),
          ),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Contact />
    </>
  );
}
