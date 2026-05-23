import type { Metadata } from 'next';
import { siteConfig } from '@/app/metadata-config';
import { StaticContentPage } from '@/components/landingPage/StaticContentPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | ClickMasters',
  description: 'How ClickMasters uses cookies and similar technologies on this website.',
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <StaticContentPage title="Cookie Policy">
      <p>
        ClickMasters uses cookies and similar technologies to keep the site secure, remember preferences, and
        measure traffic through analytics tools such as Google Tag Manager where enabled.
      </p>
      <p>
        You can control cookies through your browser settings. Disabling certain cookies may affect site
        functionality or analytics accuracy.
      </p>
      <p>
        For questions about cookies, contact{' '}
        <a href="mailto:privacy@clickmasters.pk" className="text-primary hover:underline">
          privacy@clickmasters.pk
        </a>
        .
      </p>
    </StaticContentPage>
  );
}
