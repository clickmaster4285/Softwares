import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Link from 'next/link';
import { HeroSection } from "@/components/landingPage/home/hero-section";
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  homepageFaqSchema,
  homepageOrganizationSchema,
  homepageServiceSchema,
  homepageWebPageSchema,
  metadataConfig,
} from '@/app/metadata-config';

export const metadata = metadataConfig.home();

const AboutSection = dynamic(
  () => import('@/components/landingPage/home/AboutSection'),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const AppsSection = dynamic(
  () => import('@/components/landingPage/home/AppsSection').then((m) => m.AppsSection),
  { loading: () => <div className="h-96 animate-pulse bg-gray-100 rounded-lg" /> }
);
const GlobalNetworkSection = dynamic(
  () =>
    import('@/components/landingPage/home/GlobalNetworkSection').then(
      (m) => m.GlobalNetworkSection
    ),
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
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg" />}>
        <GlobalNetworkSection />
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
            <Link href="/services" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Services overview</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Full list of development capabilities.</p>
            </Link>

            <Link href="/services/custom-software-development" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Custom Software Development</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">End-to-end product delivery.</p>
            </Link>

            <Link href="/services/web-application-development" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Web Application Development</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">SPAs, dashboards, portals.</p>
            </Link>

            <Link href="/services/mobile-app-development" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Mobile App Development</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Native + cross-platform builds.</p>
            </Link>

            <Link href="/services/database-design-management" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Database Design & Management</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Modeling, migrations, tuning.</p>
            </Link>

            <Link href="/services/cloud-solutions-devops" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Cloud Solutions & DevOps</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">CI/CD, containers, observability.</p>
            </Link>

            <Link href="/services/cybersecurity-compliance" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Cybersecurity & Compliance</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Secure SDLC + audit readiness.</p>
            </Link>

            <Link href="/case-studies" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Case studies</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Proof of delivery & outcomes.</p>
            </Link>

            <Link href="/software-solutions" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Software solutions</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Portfolio by industry.</p>
            </Link>

            <Link href="/testimonials" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Client testimonials</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">What businesses say after launch.</p>
            </Link>

            <Link href="/blog" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Blog insights</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Engineering best practices.</p>
            </Link>

            <Link href="/about-us" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">About ClickMasters</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Team, values, and approach.</p>
            </Link>

            <Link href="/contact-us" className="group rounded-2xl border border-primary/30 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary">Contact us</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Get a free consultation.</p>
            </Link>
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
