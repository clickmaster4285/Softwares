import dynamic from 'next/dynamic';
import { Suspense } from "react";
import SchemaMarkup from '@/components/SchemaMarkup';
import { FaqSection } from '@/components/landingPage/home/FaqSection';
import { LandingHomeDeferredHeavy } from '@/components/landingPage/home/LandingHomeDeferredHeavy';
import { RobotMascot } from '@/components/ui/RobotMascot';
import {  LucideIcon,} from 'lucide-react';
import {
  homepageFaqSchema,
  organizationSchema,
  homepageServiceSchema,
  webSiteSchema,
  metadataConfig,
} from '@/app/metadata-config';
import TrustedBySection from '@/src/components/landingPage/home/TrustedBySection';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';
import { CaseStudySection } from '@/src/components/landingPage/servicesPage/CaseStudySection';
import ProcessPage from '@/src/components/landingPage/home/ProcessPage';
import PainPointsSolutions from '@/src/components/landingPage/home/PainPointsSolutions';
import SolutionsPage from '@/src/components/landingPage/home/Solutions';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';
import ExploreSection from '@/src/components/landingPage/home/ExploreSection';
import {ProjectCTAHero} from '@/src/components/landingPage/home/info-cts';
import CTASectionImage from '@/src/components/landingPage/home/CTASectionImage';
import WhyChooseUs from '@/src/components/landingPage/home/whyUs';
import HelpSection from '@/src/components/landingPage/home/help-section';
import { FinalCTA } from '@/src/components/landingPage/home/finalCta';

export const metadata = metadataConfig.home();

type HomeExploreLink = {
  href: string;
  title: string;
  desc: string;
  ariaLabel: string;
  icon: LucideIcon;
  color: string;
  highlight?: boolean;
};

const HeroSection = dynamic(
  () =>
    import('@/components/landingPage/home/hero-section').then((m) => m.HeroSection),
  {
    loading: () => (
      <div
        className="relative flex min-h-[100svh] items-center justify-center bg-slate-900"
        aria-hidden
      >
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  },
);

const AboutSection = dynamic(
  () => import('@/components/landingPage/home/AboutSection'),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
    ),
  }
);

const AppsSection = dynamic(
  () =>
    import('@/components/landingPage/home/AppsSection').then(
      (m) => m.AppsSection
    ),
  {
    loading: () => (
      <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
    ),
  }
);

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <SchemaMarkup data={organizationSchema} />
      <SchemaMarkup data={homepageServiceSchema} />
      <SchemaMarkup data={homepageFaqSchema} />
      <SchemaMarkup data={webSiteSchema} />

       <div className="min-h-screen">  <HeroSection /> </div>
       


      {/* Content - starts TRANSPARENT, becomes white as you scroll */}
      <div className="relative z-20 ">
        
        {/* White background starts building from here */}
        <div className="">
          
          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <AboutSection />
          </Suspense>


          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <PainPointsSolutions />
          </Suspense>

          <ExploreSection />

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-white lg:px-10" />}>
            <TrustedClientsSection />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gradient-to-b from-white to-gray-50" />}>
            <FeaturedInsights />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-white" />}>
            <SolutionsPage />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <ProcessPage />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <TechStackSection />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <WhyChooseUs />
          </Suspense>

          <LandingHomeDeferredHeavy>
            <Suspense fallback={<div className="h-80 animate-pulse rounded-lg bg-gray-100" />}>
              <FaqSection />
            </Suspense>
          </LandingHomeDeferredHeavy>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <HelpSection />
          </Suspense>

          <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-100" />}>
            <div className="-mb-12"> <FinalCTA/></div> 
          </Suspense>
        </div>
      </div>

      {/* Robot Mascot - Fixed position across all sections */}
      <div className="fixed bottom-8 right-8 z-50">
        <RobotMascot />
      </div>
    </main>
  );
}