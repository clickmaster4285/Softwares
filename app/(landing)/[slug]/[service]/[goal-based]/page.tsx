import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Script from 'next/script';
import { breadcrumbSchema, faqSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import { getServicePage } from '@/lib/service-pages';
import {
  getAllGoalStaticParams,
  getGoalCanonicalUrl,
  getGoalPage,
  LAUNCH_FASTER_GOAL_SLUG,
} from '@/lib/goal-based';
import {
  baseServiceSlugFromPersona,
  getAllPersonaSlugs,
  getPersonaPage,
} from '@/lib/persona-utils';
import PersonaPageClient from '../[persona-based]/PersonaPageClient';
import { LaunchFasterGoalPage } from '@/components/landingPage/goalBased/LaunchFasterGoalPage';

type Props = {
  params: Promise<{
    slug: string;
    service: string;
    'goal-based': string;
  }>;
};

const FAQS_FOR_SCHEMA = [
  {
    question: 'What is the fastest realistic timeline to launch a software product?',
    answer:
      'Landing page (1-2 weeks), Shopify store (1-2 weeks), web app core workflow (6-8 weeks), mobile app (8-12 weeks), SaaS MVP (10-14 weeks), enterprise (16-24 weeks).',
  },
  {
    question: 'What causes software projects to launch late and how does ClickMasters prevent it?',
    answer:
      'Scope creep, external dependency delays, insufficient CI/CD, and architecture rework — each prevented via written scope, dependency log, CI/CD from sprint 1, and week-1 architecture review.',
  },
  {
    question: 'What is the difference between an MVP and a full product for launch speed?',
    answer:
      'An MVP validates the core hypothesis with real users; ClickMasters MVP scoping typically reduces scope 40-60% and timeline 4-8 weeks.',
  },
  {
    question: 'How does feature flagging accelerate launch timelines?',
    answer:
      'Feature flags decouple deployment from release so completed features ship independently; ClickMasters integrates LaunchDarkly or Growthbook from sprint 1.',
  },
];

export function generateStaticParams() {
  const goalParams = getAllGoalStaticParams();
  const personaParams = getAllPersonaSlugs().map((personaSlug) => {
    const base = baseServiceSlugFromPersona(personaSlug);
    const svc = getServicePage(base);
    return {
      slug: svc?.categorySlug ?? 'services',
      service: base,
      'goal-based': personaSlug,
    };
  });
  return [...goalParams, ...personaParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service, 'goal-based': segmentSlug } = await params;
  const goalPage = getGoalPage(segmentSlug);
  if (!goalPage) return { title: 'Page' };

  const canonical = `${siteConfig.url}${getGoalCanonicalUrl(goalPage)}`;

  return {
    title: goalPage.metaTitle ?? `${goalPage.title} | ClickMasters`,
    description: goalPage.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: goalPage.metaTitle ?? goalPage.title,
      description: goalPage.metaDescription,
      url: canonical,
    },
  };
}

export default async function GoalBasedPage({ params }: Props) {
  const { slug, service, 'goal-based': segmentSlug } = await params;

  const personaPage = getPersonaPage(segmentSlug);
  if (personaPage) {
    const baseService = getServicePage(service);
    return (
      <PersonaPageClient
        page={personaPage}
        categorySlug={slug}
        serviceSlug={service}
        serviceTitle={baseService?.title}
        categoryName={baseService?.category}
        serviceName={baseService?.serviceName}
      />
    );
  }

  const goalPage = getGoalPage(segmentSlug);
  const baseService = getServicePage(service);

  if (!goalPage || !baseService) notFound();
  if (goalPage.serviceSlug !== service) notFound();

  if (baseService.categorySlug !== slug) {
    redirect(`/${baseService.categorySlug}/${service}/${segmentSlug}`);
  }

  if (segmentSlug === LAUNCH_FASTER_GOAL_SLUG || segmentSlug === 'launch-faster') {
    const canonical = getGoalCanonicalUrl(goalPage);
    const parentHref = `/design-ui-ux/${service}`;

    return (
      <>
        <Script
          id="goal-launch-faster-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema(goalPage.title, goalPage.metaDescription ?? '', `${siteConfig.url}${canonical}`),
            ),
          }}
        />
        <Script
          id="goal-launch-faster-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS_FOR_SCHEMA)) }}
        />
        <Script
          id="goal-launch-faster-breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Services', url: '/services' },
                { name: baseService.serviceName, url: parentHref },
                { name: goalPage.goalLabel, url: canonical },
              ]),
            ),
          }}
        />
        <LaunchFasterGoalPage goal={goalPage} parentServiceHref={parentHref} />
      </>
    );
  }

  notFound();
}
