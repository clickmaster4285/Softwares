import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/app/metadata-config';
import { StaticContentPage } from '@/components/landingPage/StaticContentPage';

export const metadata: Metadata = {
  title: 'Careers | ClickMasters',
  description: 'Join ClickMasters and help teams build scalable software products.',
  alternates: { canonical: `${siteConfig.url}/careers` },
};

export default function CareersPage() {
  return (
    <StaticContentPage
      title="Careers at ClickMasters"
      description="We are always interested in meeting talented engineers, designers, and delivery specialists."
    >
      <p>
        ClickMasters builds custom software, web, mobile, and AI solutions for startups and enterprises. If you
        care about quality engineering and clear client communication, we would like to hear from you.
      </p>
      <p>
        Send your CV and portfolio to{' '}
        <a href="mailto:careers@clickmasters.pk" className="text-primary hover:underline">
          careers@clickmasters.pk
        </a>{' '}
        or{' '}
        <Link href="/contact-us" className="text-primary hover:underline">
          contact us
        </Link>{' '}
        through the website.
      </p>
    </StaticContentPage>
  );
}
