import type { Metadata } from 'next';
import { siteConfig } from '@/app/metadata-config';
import { StaticContentPage } from '@/components/landingPage/StaticContentPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | ClickMasters',
  description: 'How ClickMasters collects, uses, and protects your personal information.',
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticContentPage title="Privacy Policy">
      <p>
        ClickMasters respects your privacy. We collect information you provide through contact forms, consultation
        requests, and project inquiries to respond to your requests and deliver our services.
      </p>
      <p>
        We do not sell your personal data. We may use analytics tools to understand website usage and improve our
        services. You may request access, correction, or deletion of your personal data by contacting us.
      </p>
      <p>
        For privacy-related questions, email{' '}
        <a href="mailto:privacy@clickmasters.pk" className="text-primary hover:underline">
          privacy@clickmasters.pk
        </a>
        .
      </p>
    </StaticContentPage>
  );
}
