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
  DatabaseZap,
  TestTube,
  Headphones,
  Link2,
  Glasses,
  Workflow,
  Bot,
  BarChart3,
  Cpu,
  Palette,
  Brain,
  Eye,
  CpuIcon,
} from 'lucide-react';

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
import IndustriesSection from '@/src/components/landingPage/home/industries-section';

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

// const homeExploreLinks: HomeExploreLink[] = [
 
//   {
//     href: '/software-development/custom-software-development',
//     title: 'Custom Software Development',
//     desc: 'End-to-end product delivery.',
//     ariaLabel: 'Learn about custom software development and end-to-end product delivery.',
//     icon: Code2,
//     color: 'text-blue-500',
//   },
//   {
//     href: '/web-development/web-application-development',
//     title: 'Web Application Development',
//     desc: 'SPAs, dashboards, portals.',
//     ariaLabel: 'Explore web application development for SPAs, dashboards, and portals.',
//     icon: Globe,
//     color: 'text-cyan-500',
//   },
//   {
//     href: '/mobile-development/mobile-app-development',
//     title: 'Mobile App Development',
//     desc: 'Native + cross-platform builds.',
//     ariaLabel: 'Read about native and cross-platform mobile app development.',
//     icon: Smartphone,
//     color: 'text-pink-500',
//   },

 
//   {
//     href: '/design-ui-ux',
//     title: 'UI/UX Design',
//     desc: 'User-centered product design.',
//     ariaLabel: 'Explore UI/UX design services focused on user experience and interfaces.',
//     icon: Palette,
//     color: 'text-purple-500',
//   },

  
//   {
//     href: '/artificial-intelligence',
//     title: 'Artificial Intelligence (AI)',
//     desc: 'AI-powered solutions & automation.',
//     ariaLabel: 'Explore artificial intelligence solutions and automation systems.',
//     icon: Brain,
//     color: 'text-indigo-500',
//   },
//   {
//     href: '/machine-learning',
//     title: 'Machine Learning (ML)',
//     desc: 'Predictive models & training systems.',
//     ariaLabel: 'Learn about machine learning models and predictive systems.',
//     icon: Cpu,
//     color: 'text-sky-500',
//   },
//   {
//     href: '/nlp-computer-vision',
//     title: 'NLP & Computer Vision',
//     desc: 'Text + image intelligence systems.',
//     ariaLabel: 'Explore NLP and computer vision solutions.',
//     icon: Eye,
//     color: 'text-emerald-500',
//   },
//   {
//     href: '/data-services',
//     title: 'Data Services',
//     desc: 'Data engineering & pipelines.',
//     ariaLabel: 'Explore data engineering and data pipeline services.',
//     icon: Database,
//     color: 'text-primary',
//   },
//   {
//     href: '/data-intelligence',
//     title: 'Data & Intelligence',
//     desc: 'Analytics & business insights.',
//     ariaLabel: 'Discover data analytics and business intelligence services.',
//     icon: BarChart3,
//     color: 'text-yellow-500',
//   },


//   {
//     href: '/automation-chatbot',
//     title: 'Automation & Chatbots',
//     desc: 'AI chatbots & workflows.',
//     ariaLabel: 'Explore automation and chatbot development services.',
//     icon: Bot,
//     color: 'text-teal-500',
//   },
//   {
//     href: '/automation-integration',
//     title: 'Automation & Integration',
//     desc: 'System integrations & workflows.',
//     ariaLabel: 'Learn about automation and system integration services.',
//     icon: Workflow,
//     color: 'text-cyan-600',
//   },

//   {
//     href: '/cloud-devops/cloud-solutions',
//     title: 'Cloud & DevOps',
//     desc: 'CI/CD, containers, observability.',
//     ariaLabel: 'Discover cloud and DevOps services.',
//     icon: Cloud,
//     color: 'text-sky-500',
//   },
//   {
//     href: '/database-services',
//     title: 'Database Services',
//     desc: 'Database design, scaling & optimization.',
//     ariaLabel: 'Explore database services including scaling and optimization.',
//     icon: DatabaseZap,
//     color: 'text-primary',
//   },


//   {
//     href: '/cybersecurity-compliance',
//     title: 'Cybersecurity',
//     desc: 'Secure systems & compliance.',
//     ariaLabel: 'Learn about cybersecurity and compliance services.',
//     icon: ShieldCheck,
//     color: 'text-emerald-500',
//   },
//   {
//     href: '/testing-qa',
//     title: 'Testing & QA',
//     desc: 'Automated + manual testing.',
//     ariaLabel: 'Explore software testing and QA services.',
//     icon: TestTube,
//     color: 'text-primary',
//   },

//   {
//     href: '/support-outsourcing',
//     title: 'Support & Outsourcing',
//     desc: 'Dedicated engineering teams.',
//     ariaLabel: 'Learn about support and outsourcing services.',
//     icon: Headphones,
//     color: 'text-rose-500',
//   },

//   // ─────────────────────────────────────
//   // Emerging Tech
//   // ─────────────────────────────────────
//   {
//     href: '/blockchain-web3',
//     title: 'Blockchain & Web3',
//     desc: 'Decentralized applications.',
//     ariaLabel: 'Explore blockchain and Web3 development services.',
//     icon: Link2,
//     color: 'text-purple-600',
//   },
//   {
//     href: '/iot-emerging-tech',
//     title: 'IoT & Emerging Tech',
//     desc: 'Smart devices & systems.',
//     ariaLabel: 'Learn about IoT and emerging technologies.',
//     icon: CpuIcon,
//     color: 'text-lime-500',
//   },
//   {
//     href: '/immersive-tech',
//     title: 'Immersive Tech',
//     desc: 'AR / VR / XR experiences.',
//     ariaLabel: 'Explore immersive technologies like AR, VR, and XR.',
//     icon: Glasses,
//     color: 'text-fuchsia-500',
//   },

  
// ];



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
      className="min-h-screen "
      role="main"
      aria-label="ClickMasters software development company homepage"
    >
      <SchemaMarkup data={organizationSchema} />
      <SchemaMarkup data={homepageServiceSchema} />
      <SchemaMarkup data={homepageFaqSchema} />
      <SchemaMarkup data={webSiteSchema} />

      <HeroSection />

     
       
       <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100 lg:mx-10" />
        }
      >
        <TrustedBySection />
      </Suspense>

      

     <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100 " />
        }
      >
        <AboutSection />
         <CTASectionImage/>
      </Suspense>


   <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100  " />
        }
      >
      <PainPointsSolutions />
      </Suspense>
      

    


      <ExploreSection />


<Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
       <ProjectCTAHero/>
      </Suspense>


      
       <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-white lg:px-10" />
        }
      >
      <TrustedClientsSection />
      </Suspense>




      
     
      



         <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gradient-to-b from-white to-gray-50" />
        }
      >   
         <div> <FeaturedInsights  /></div>
      </Suspense>

      





        <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-white" />
        }
      >
         <SolutionsPage />
      </Suspense>
 



         <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-lg bg-gray-100" />
        }
      >
        <ProcessPage />
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
        <AppsSection />
      </Suspense>

<IndustriesSection/>

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