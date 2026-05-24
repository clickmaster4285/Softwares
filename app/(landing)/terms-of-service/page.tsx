import type { Metadata } from 'next';
import { siteConfig, withSeoMetadata } from '@/app/metadata-config';
import { StaticContentPage } from '@/components/landingPage/StaticContentPage';

export const metadata: Metadata = withSeoMetadata({
  title: 'Terms of Service',
  description:
    'Terms and conditions for using the ClickMasters website and custom software development services.',
  alternates: { canonical: `${siteConfig.url}/terms-of-service` },
});

export default function TermsOfServicePage() {
  return (
    <StaticContentPage title="Terms of Service">
      <p>
        By using the ClickMasters website, you agree to these terms. Website content is provided for general
        information and does not constitute a binding offer until a formal agreement is signed.
      </p>
      <p>
        Project scope, timelines, deliverables, and payment terms are defined in individual statements of work or
        contracts. ClickMasters is not liable for indirect or consequential damages arising from use of this site.
      </p>
      <p>
        These terms may be updated periodically. Continued use of the site after updates constitutes acceptance of
        the revised terms.
      </p>
    </StaticContentPage>
  );
}
