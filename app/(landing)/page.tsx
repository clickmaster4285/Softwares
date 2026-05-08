import dynamic from 'next/dynamic';
import { Suspense } from "react";
import Link from 'next/link';

import SchemaMarkup from '@/components/SchemaMarkup';
import { FaqSection } from '@/components/landingPage/home/FaqSection';
import { LandingHomeDeferredHeavy } from '@/components/landingPage/home/LandingHomeDeferredHeavy';

import {
  Layers3,
  Code2,
  Globe,
  Smartphone,
  Database,
  Cloud,
  ShieldCheck,
  Briefcase,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  Users,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

import {
  homepageFaqSchema,
  homepageOrganizationSchema,
  homepageServiceSchema,
  homepageWebPageSchema,
  metadataConfig,
} from '@/app/metadata-config';
import TrustedBySection from '@/src/components/landingPage/home/TrustedBySection';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';

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
const homeExploreLinks: HomeExploreLink[] = [
  {
    href: '#',
    title: 'Services overview',
    desc: 'Full list of development capabilities.',
    ariaLabel: 'Open the services overview page listing all development capabilities.',
    icon: Layers3,
    color: 'text-violet-500',
  },
  {
    href: '/software-development/custom-software-development',
    title: 'Custom Software Development',
    desc: 'End-to-end product delivery.',
    ariaLabel: 'Learn about custom software development and end-to-end product delivery.',
    icon: Code2,
    color: 'text-blue-500',
  },
  {
    href: '/web-development/web-application-development',
    title: 'Web Application Development',
    desc: 'SPAs, dashboards, portals.',
    ariaLabel: 'Explore web application development for SPAs, dashboards, and portals.',
    icon: Globe,
    color: 'text-cyan-500',
  },
  {
    href: '/mobile-development/mobile-app-development',
    title: 'Mobile App Development',
    desc: 'Native + cross-platform builds.',
    ariaLabel: 'Read about native and cross-platform mobile app development.',
    icon: Smartphone,
    color: 'text-pink-500',
  },
  {
    href: '/database-data-management/database-design',
    title: 'Database Design & Management',
    desc: 'Modeling, migrations, tuning.',
    ariaLabel: 'See database design and management services including modeling and tuning.',
    icon: Database,
    color: 'text-amber-500',
  },
  {
    href: '/cloud-devops/cloud-solutions',
    title: 'Cloud Solutions & DevOps',
    desc: 'CI/CD, containers, observability.',
    ariaLabel: 'Discover cloud solutions and DevOps services including CI/CD and observability.',
    icon: Cloud,
    color: 'text-sky-500',
  },
  {
    href: '/cybersecurity-compliance/compliance-risk-management',
    title: 'Cybersecurity & Compliance',
    desc: 'Secure SDLC + audit readiness.',
    ariaLabel: 'Review cybersecurity and compliance offerings and secure SDLC practices.',
    icon: ShieldCheck,
    color: 'text-emerald-500',
  },
  {
    href: '/case-studies',
    title: 'Case studies',
    desc: 'Proof of delivery & outcomes.',
    ariaLabel: 'Browse case studies with proof of delivery and client outcomes.',
    icon: Briefcase,
    color: 'text-orange-500',
  },
  {
    href: '/software-solutions',
    title: 'Software solutions',
    desc: 'Portfolio by industry.',
    ariaLabel: 'View software solutions portfolio organized by industry.',
    icon: LayoutDashboard,
    color: 'text-indigo-500',
  },
  {
    href: '/testimonials',
    title: 'Client testimonials',
    desc: 'What businesses say after launch.',
    ariaLabel: 'Read client testimonials from businesses after product launch.',
    icon: MessageSquareQuote,
    color: 'text-rose-500',
  },
  {
    href: '/blog',
    title: 'Blog insights',
    desc: 'Engineering best practices.',
    ariaLabel: 'Open the engineering blog for best practices and technical insights.',
    icon: Newspaper,
    color: 'text-lime-500',
  },
  {
    href: '/about-us',
    title: 'About ClickMasters',
    desc: 'Team, values, and approach.',
    ariaLabel: 'Learn about the ClickMasters team, values, and delivery approach.',
    icon: Users,
    color: 'text-fuchsia-500',
  },
  {
    href: '/contact-us',
    title: 'Contact us',
    desc: 'Get a free consultation.',
    ariaLabel: 'Go to the contact page to request a free consultation.',
    icon: ArrowRight,
    color: 'text-primary',
    highlight: true,
  },
];

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
    <main
      className="min-h-screen"
      role="main"
      aria-label="ClickMasters software development company homepage"
    >
      <SchemaMarkup data={homepageOrganizationSchema} />
      <SchemaMarkup data={homepageServiceSchema} />
      <SchemaMarkup data={homepageFaqSchema} />
      <SchemaMarkup data={homepageWebPageSchema} />

      <HeroSection />

     
      
       <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <AboutSection />
      </Suspense>

 <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
      <TrustedClientsSection />
      </Suspense>

       <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
      <TechStackSection />
      </Suspense>
      
      
       <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <TrustedBySection />
      </Suspense>

      


      <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <AppsSection />
      </Suspense>

      {/* Explore Section */}
      <section
        className="border-y border-slate-200/80 bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20"
        aria-labelledby="home-explore-heading"
      >
        <div className="mx-auto  px-4 sm:px-6 lg:px-12">

          {/* Header */}


        
          

          <div className="mx-auto max-w-3xl text-center">
             <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
              <p className="text-orange-800 text-[11px] font-bold tracking-[0.2em] uppercase"> Explore Our Ecosystem</p>
              <span className="w-8 h-[2px] bg-orange-400 rounded-full" />
          </div>

            <h2
              id="home-explore-heading"
              className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl"
            >
              Explore ClickMasters
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover our engineering capabilities, delivery expertise,
              case studies, and strategic technology solutions built
              for modern businesses.
            </p>
          </div>

          {/* Grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {homeExploreLinks.map((item) => {
              const Icon = item.icon;
              const isHighlight = Boolean(item.highlight);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className={`group relative overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    isHighlight
                      ? 'border-primary/30 shadow-lg shadow-primary/10'
                      : 'border-slate-200 hover:border-primary/30'
                  }`}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

               {/* Center Icon */}
<div className="relative flex justify-center">
  <Icon
    className={`h-12 w-12 transition-all duration-300 group-hover:scale-110 ${item.color}`}
    strokeWidth={2}
  />
</div>

                  {/* Content */}
                  <div className="relative mt-7 text-center">
                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="relative mt-8 flex items-center justify-center gap-2">
                    <span className="text-sm font-medium text-primary">
                      Explore now
                    </span>

                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary/20" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <LandingHomeDeferredHeavy>
        <Suspense
          fallback={
            <div className="h-80 animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <FaqSection />
        </Suspense>
      </LandingHomeDeferredHeavy>
    </main>
  );
}