import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Target,
  TrendingUp,
  Handshake,
  Code2,
  Smartphone,
  Database,
  Cloud,
  Zap,
  Users,
  Shield,
  BarChart3,
  Globe,
  HelpCircle,
  Star,
  Quote,
  Play,
  ChevronRight,
  Award,
  Clock,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TableOfContents } from '@/components/table-of-contents';
import { breadcrumbSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import {
  getAllServicePages,
  getServicePage,
  getServiceTechnologies,
  slugify,
  type ServicePageContent,
} from '@/lib/service-pages';
import { IndustryCard3D } from '@/src/components/IndustryCard3D';
import { ServiceHero } from '@/components/landingPage/servicesPage/service-hero';
import { ServicesSection } from '@/src/components/landingPage/servicesPage/ServicesSection';
import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
import { IndustriesSection } from '@/src/components/landingPage/servicesPage/IndustriesSection';
import { CaseStudySection } from '@/src/components/landingPage/servicesPage/CaseStudySection';
import { FAQSection } from '@/src/components/landingPage/servicesPage/FAQSection';

import { EngineeringBaseline } from '@/src/components/landingPage/servicesPage/EngineeringBaseline';
import { WhyChooseUs } from '@/src/components/landingPage/servicesPage/WhyChooseUs';
import { TechStack } from '@/src/components/landingPage/servicesPage/TechStack';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';
import { TestimonialsSection } from '@/src/components/landingPage/servicesPage/TestimonialsSection';
import { CTAComponents } from '@/src/components/landingPage/servicesPage/FooterCTA';
import { CeoVision } from '@/src/components/landingPage/servicesPage/CeoVision';

type Props = { params: Promise<{ slug: string; service: string }> };

export function generateStaticParams(): { slug: string; service: string }[] {
  return getAllServicePages().map((page) => ({
    slug: page.categorySlug,
    service: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, service } = await params;
  const page = getServicePage(service);
  if (!page || slugify(page.category) !== slug) return { title: 'Service' };

  const description = page.metaDescription;
  const canonicalPath = getCanonicalPath(page);
  const canonical = `${siteConfig.url}${canonicalPath}`;

  return {
    title: page.metaTitle ?? `${page.title} Services | ClickMasters`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${page.title} | ClickMasters`,
      description,
      url: canonical,
      images: [
        {
          url: `${siteConfig.url}/og/services.webp`,
          width: 1200,
          height: 630,
          alt: `${page.title} — ClickMasters software services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | ClickMasters`,
      description,
      images: [`${siteConfig.url}/og/services.webp`],
    },
  };
}

function getCanonicalPath(page: ServicePageContent): string {
  const slug = page.slug;
  if (slug === 'custom-software-development') return '/services/custom-software-development';
  if (slug === 'generative-ai-solutions') return '/services/generative-ai-solutions';
  if (slug === 'ai-chatbot-development') return '/services/ai-chatbot-development';
  if (slug === 'ai-agents-development') return '/services/ai-agents-development';
  if (slug === 'ai-automation-systems') return '/services/ai-automation-systems';
  if (slug === 'ai-model-development') return '/services/ai-model-development';
  if (slug === 'data-engineering') return '/services/data-engineering';
  if (slug === 'ui-ux-design') return '/services/ui-ux-design';
  if (slug === 'mobile-app-development') return '/services/mobile-app-development';
  if (slug === 'ios-app-development') return '/services/ios-app-development';
  if (slug === 'android-app-development') return '/services/android-app-development';
  if (slug === 'cross-platform-app-development') return '/services/cross-platform-app-development';
  if (slug === 'flutter-app-development') return '/services/flutter-app-development';
  if (slug === 'react-native-development') return '/services/react-native-development';
  if (slug === 'saas-product-development') return '/services/saas-product-development';
  if (slug === 'web-application-development') return '/services/web-application-development';
  if (slug === 'website-development') return '/services/website-development';
  if (slug === 'headless-cms-development') return '/services/headless-cms-development';
  if (slug === 'jamstack-development') return '/services/jamstack-development';
  if (slug === 'e-commerce-development') return '/services/e-commerce-development';
  if (slug === 'headless-e-commerce') return '/services/headless-e-commerce';
  if (slug === 'shopify-development') return '/services/shopify-development';
  if (slug === 'woocommerce-development') return '/services/woocommerce-development';
  return `/${page.categorySlug}/${slug}`;
}

export default async function ServiceByCategoryPage({ params }: Props) {
  const { slug, service } = await params;
  const page = getServicePage(service);

  if (!page || slugify(page.category) !== slug) notFound();

  const sections = page.sections || [];
  const faqs = page.faqs || [];
  const canonicalPath = getCanonicalPath(page);
  const url = `${siteConfig.url}${canonicalPath}`;
  const techStack = getServiceTechnologies(service);

  // Helper function to make service name bold in text
  const makeBoldServiceName = (text: string, serviceName: string): string => {
    if (!text || !serviceName) return text;
    const regex = new RegExp(`(${serviceName})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  // Standardized TOC items built dynamically
  const tocItems = [
    { id: 'overview', title: 'Overview', level: 2 as const },
  ];

  // Helper to find and assign IDs to sections
  const getSectionId = (heading: string, index: number) => {
    const h = heading.toLowerCase();
    if (h.includes('what is')) return 'what-is';
    if (h.includes('services we deliver') || h.includes('includes')) return 'our-services';
    if (h.includes('why b2b companies') || h.includes('why choose')) return 'why-choose-us';
    if (h.includes('process')) return 'our-process';
    if (h.includes('technology stack') || h.includes('tech stack')) return 'tech-stack';
    if (h.includes('industry use cases') || h.includes('industries')) return 'industries';
    if (h.includes('pricing')) return 'pricing';
    if (h.includes('testimonials')) return 'testimonials';
    if (h.includes('case study')) return 'case-study';
    return `section-${index}-${slugify(heading)}`;
  };

  
  // Add generic sections to TOC
  sections.forEach((section, index) => {
    const id = getSectionId(section.heading, index);
    if (!tocItems.find(item => item.id === id)) {
      tocItems.push({ id, title: section.heading, level: 2 as const });
    }
  });

  if (page.servicesCards && !tocItems.find(item => item.id === 'our-services')) {
    tocItems.push({ id: 'our-services', title: 'Our Services', level: 2 as const });
  }

  if (page.differentiators && !tocItems.find(item => item.id === 'why-choose-us')) {
    tocItems.push({ id: 'why-choose-us', title: 'Why Choose Us', level: 2 as const });
  }

  if (page.checklist) {
    tocItems.push({ id: 'checklist', title: 'Engineering Baseline', level: 2 as const });
  }

  if (page.processPhases && !tocItems.find(item => item.id === 'our-process')) {
    tocItems.push({ id: 'our-process', title: 'Our Process', level: 2 as const });
  }

  if (techStack.length > 0 && !tocItems.find(item => item.id === 'tech-stack')) {
    tocItems.push({ id: 'tech-stack', title: 'Technology Stack', level: 2 as const });
  }

  if (page.industryUseCases && !tocItems.find(item => item.id === 'industries')) {
    tocItems.push({ id: 'industries', title: 'Industries', level: 2 as const });
  }

  if (page.pricingTiers && !tocItems.find(item => item.id === 'pricing')) {
    tocItems.push({ id: 'pricing', title: 'Pricing', level: 2 as const });
  }

  if (page.tables) {
    page.tables.forEach((table) => {
      const id = slugify(table.title);
      if (!tocItems.find(item => item.id === id)) {
        tocItems.push({ id, title: table.title, level: 2 as const });
      }
    });
  }

  tocItems.push({ id: 'testimonials', title: 'Testimonials', level: 2 as const });
  tocItems.push({ id: 'case-study', title: 'Case Study', level: 2 as const });

  if (faqs.length > 0) {
    tocItems.push({ id: 'faq', title: 'FAQ', level: 2 as const });
  }

  const jsonLd = serviceSchema(page.title, page.metaDescription, url);
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ClickMasters',
    serviceType: page.title,
    url,
    areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'EU'],
  };
  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <Script
        id={`schema-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id={`breadcrumb-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: page.category, url: '/services' },
              { name: page.serviceName, url: canonicalPath },
            ])
          ),
        }}
      />
      <Script
        id={`professional-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      {faqSchema && (
        <Script
          id={`faq-${page.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-white pt-20 text-slate-900">


    <ServiceHero page={page} />


        {/* Main Content with Table of Contents */}
        <div className="mx-auto max-w-8xl px-16 md:px-8 lg:px-16">
          <div className="relative lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
            {/* Main Content */}
            <main className="py-12 lg:py-10">
              {/* Section Content */}
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={getSectionId(section.heading, index)}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 
                      className="text-2xl font-semibold text-slate-900 sm:text-3xl"
                      dangerouslySetInnerHTML={{ __html: makeBoldServiceName(section.heading, page.serviceName) }}
                    />
                  </div>

                  <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                    <p 
                      className="text-lg whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: makeBoldServiceName(section.body, page.serviceName) }}
                    />
                    
                    {/* Render items if present in section */}
                    {section.items && (
                      <ul className="mt-6 space-y-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                              <Star className="h-3 w-3 fill-current" />
                            </div>
                            <span 
                              className="italic"
                              dangerouslySetInnerHTML={{ __html: makeBoldServiceName(item, page.serviceName) }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="my-6 flex items-center">
  <div className="h-px w-full bg-gray-300" />
</div>
                </section>
              ))}

                 {/* Our Services Section */}
{page.servicesCards && (
  <ServicesSection 
    serviceName={page.serviceName} 
    servicesCards={page.servicesCards} 
  />
)}

{/* Why Choose Us Section */}
{page.differentiators && (
  <WhyChooseUs 
    slug={page.slug} 
    differentiators={page.differentiators} 
  />
)}

             
{/* Launch Readiness Checklist */}
{page.checklist && (
  <EngineeringBaseline 
    serviceName={page.serviceName} 
    checklist={page.checklist} 
  />
)}
              {/* Our Process Section */}
             {page.processPhases && (
  <ProcessSection 
    serviceName={page.serviceName} 
    processPhases={page.processPhases} 
  />
)}

             {/* Tech Stack Section */}

<div style={{ maxWidth: '1460px' }} className="mx-auto">
  {techStack.length > 0 && <TechStack techStack={techStack as any} />}
</div>
              {/* Industries Section */}
           {page.industryUseCases && (
                <IndustriesSection industryUseCases={page.industryUseCases} />
              )}

            {page.pricingTiers && (
  <PricingSection 
    serviceName={page.serviceName} 
    pricingTiers={page.pricingTiers} 
  />
              )}
              

              <CeoVision />
              {/* Generic Tables Section */}
              {page.tables && page.tables.map((table) => (
                <section key={table.title} id={slugify(table.title)} className="scroll-mt-24 pt-16">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {table.title}
                    </h2>
                  </div>
                  <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            {table.headers.map((header) => (
                              <th key={header} className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 text-sm sm:text-base">
                              {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 text-slate-600 border-b border-slate-100">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              ))}

             {/*  */}
          {/* Testimonials Section */}
<TestimonialsSection  />

              {/* Case Study Section */}
              <div className='mb-10 '><CaseStudySection /></div>

              {/* FAQ Section */}
            {faqs.length > 0 && <FAQSection faqs={faqs} />}

              
           
              
            </main>

            {/* Sticky Table of Contents - Desktop */}
            <aside className="hidden lg:block sticky top-24 self-start z-10">
              <div className="py-12 lg:py-10">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>

      
      
      
        {/* Footer CTA */}
  <CTAComponents />
        
      </div>
    </>
  );
}
