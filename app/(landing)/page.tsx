import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  homepageFaqSchema,
  homepageOrganizationSchema,
  homepageServiceSchema,
  homepageWebPageSchema,
  metadataConfig,
} from '@/app/metadata-config';

export const metadata = metadataConfig.home();

type HomeExploreLink = {
  href: string;
  title: string;
  desc: string;
  ariaLabel: string;
  highlight?: boolean;
};

const homeExploreLinks: HomeExploreLink[] = [
  {
    href: '/services',
    title: 'Services overview',
    desc: 'Full list of development capabilities.',
    ariaLabel: 'Open the services overview page listing all development capabilities.',
  },
  {
    href: '/services/custom-software-development',
    title: 'Custom Software Development',
    desc: 'End-to-end product delivery.',
    ariaLabel: 'Learn about custom software development and end-to-end product delivery.',
  },
  {
    href: '/services/web-application-development',
    title: 'Web Application Development',
    desc: 'SPAs, dashboards, portals.',
    ariaLabel: 'Explore web application development for SPAs, dashboards, and portals.',
  },
  {
    href: '/services/mobile-app-development',
    title: 'Mobile App Development',
    desc: 'Native + cross-platform builds.',
    ariaLabel: 'Read about native and cross-platform mobile app development.',
  },
  {
    href: '/services/database-design-management',
    title: 'Database Design & Management',
    desc: 'Modeling, migrations, tuning.',
    ariaLabel: 'See database design and management services including modeling and tuning.',
  },
  {
    href: '/services/cloud-solutions-devops',
    title: 'Cloud Solutions & DevOps',
    desc: 'CI/CD, containers, observability.',
    ariaLabel: 'Discover cloud solutions and DevOps services including CI/CD and observability.',
  },
  {
    href: '/services/cybersecurity-compliance',
    title: 'Cybersecurity & Compliance',
    desc: 'Secure SDLC + audit readiness.',
    ariaLabel: 'Review cybersecurity and compliance offerings and secure SDLC practices.',
  },
  {
    href: '/case-studies',
    title: 'Case studies',
    desc: 'Proof of delivery & outcomes.',
    ariaLabel: 'Browse case studies with proof of delivery and client outcomes.',
  },
  {
    href: '/software-solutions',
    title: 'Software solutions',
    desc: 'Portfolio by industry.',
    ariaLabel: 'View software solutions portfolio organized by industry.',
  },
  {
    href: '/testimonials',
    title: 'Client testimonials',
    desc: 'What businesses say after launch.',
    ariaLabel: 'Read client testimonials from businesses after product launch.',
  },
  {
    href: '/blog',
    title: 'Blog insights',
    desc: 'Engineering best practices.',
    ariaLabel: 'Open the engineering blog for best practices and technical insights.',
  },
  {
    href: '/about-us',
    title: 'About ClickMasters',
    desc: 'Team, values, and approach.',
    ariaLabel: 'Learn about the ClickMasters team, values, and delivery approach.',
  },
  {
    href: '/contact-us',
    title: 'Contact us',
    desc: 'Get a free consultation.',
    ariaLabel: 'Go to the contact page to request a free consultation.',
    highlight: true,
  },
];

const HeroSection = dynamic(
  () =>
    import('@/components/landingPage/home/hero-section').then((m) => m.HeroSection),
  {
    loading: () => (
      <div
        className="relative min-h-[100svh] flex items-center justify-center bg-slate-900"
        aria-hidden
      >
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  },
);

const AboutSection = dynamic(
  () => import('@/components/landingPage/home/AboutSection'),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const AppsSection = dynamic(
  () => import('@/components/landingPage/home/AppsSection').then((m) => m.AppsSection),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const IndustriesSection = dynamic(
  () => import('@/components/landingPage/home/industries-section').then((m) => m.IndustriesSection),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const CommunitySection = dynamic(
  () => import('@/components/landingPage/home/CommunitySection').then((m) => m.CommunitySection),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const TestimonialsSection = dynamic(
  () => import('@/components/landingPage/home/TestimonialsSection').then((m) => m.TestimonialsSection),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const FaqSection = dynamic(
  () => import('@/components/landingPage/home/FaqSection').then((m) => m.FaqSection),
  { loading: () => <div className="h-80 animate-pulse bg-gray-100 rounded-lg" /> }
);
const HelpSection = dynamic(
  () => import('@/components/landingPage/home/help-section').then((m) => m.HelpSection),
  { loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" /> }
);

export default function LandingPage() {
  return (
    <main className="min-h-screen" role="main" aria-label="ClickMasters software development company homepage">
      <SchemaMarkup data={homepageOrganizationSchema} />
      <SchemaMarkup data={homepageServiceSchema} />
      <SchemaMarkup data={homepageFaqSchema} />
      <SchemaMarkup data={homepageWebPageSchema} />
      <HeroSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <AppsSection />
      </Suspense>

      {/* Hub internal links (SEO + crawler-friendly) */}
      <section className="border-y border-slate-200/80 bg-white py-16 sm:py-20" aria-labelledby="home-explore-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="home-explore-heading" className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore ClickMasters
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Start with our service offerings, review proof, and read insights — everything you need to choose the right solution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeExploreLinks.map((item) => {
              const isHighlight = Boolean(item.highlight);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className={
                    isHighlight
                      ? 'group flex min-h-[48px] flex-col rounded-2xl border border-primary/30 bg-white p-6 shadow-sm transition-all hover:shadow-md'
                      : 'group flex min-h-[48px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md'
                  }
                >
                  <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <IndustriesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <CommunitySection />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div className="h-80 animate-pulse bg-gray-100 rounded-lg" />}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-lg" />}>
        <HelpSection />
      </Suspense>
    </main>
  );
}
