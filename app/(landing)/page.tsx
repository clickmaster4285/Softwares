import dynamic from 'next/dynamic';
import { Suspense } from "react";
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
