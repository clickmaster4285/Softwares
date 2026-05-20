import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
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
import { TestimonialsSection } from '@/src/components/landingPage/home/TestimonialsSection';
import { CTAComponents } from '@/src/components/landingPage/servicesPage/FooterCTA';
import { CeoVision } from '@/src/components/landingPage/servicesPage/CeoVision';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';
import FaqSection from '@/src/components/landingPage/home/FaqSection';
import DynamicSections from '@/src/components/landingPage/servicesPage/DynamicSections';
import ChecklistCTAHero from '@/src/components/landingPage/checklist/ChecklistCTAHero';

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
  if (!page || page.categorySlug !== slug) return { title: 'Service' };

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
          alt: `${page.title} ClickMasters software services`,
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
  return `/${page.categorySlug}/${page.slug}`;
}

export default async function ServiceByCategoryPage({ params }: Props) {
  const { slug, service } = await params;
  const page = getServicePage(service);

  if (!page) notFound();

  // If the category slug doesn't match, redirect to the correct one (canonical URL)
  if (page.categorySlug !== slug) {
    redirect(`/${page.categorySlug}/${page.slug}`);
  }

  const sections = page.sections || [];
  const faqs = page.faqs || [];
  const canonicalPath = getCanonicalPath(page);
  const url = `${siteConfig.url}${canonicalPath}`;
  const techStack = getServiceTechnologies(service);

  // Helper function to make service name bold in text
  const makeBoldServiceName = (text: string, serviceName: string): string => {
    if (!text || !serviceName) return text || "";
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
              { name: page.category, url: `/${page.categorySlug}` },
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

      <div className="min-h-screen text-slate-900">
        <ServiceHero page={page} />

        {/* Main Content with Table of Contents - FIXED CONTAINER CLASSES */}
        <div className="mx-4 max-w-full px-6 md:px-8 lg:px-10 xl:px-24">
          <div className="relative lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16">
            {/* Main Content */}
            <main className="py-12 lg:py-10 min-w-0">


              {/* Overview anchor */}
              <div id="overview" />
              

              {/* Section Content */}
      <DynamicSections
  sections={sections}
  serviceName={page.serviceName}
/>
              






              {/* Our Services Section */}
              {page.servicesCards && (
                <div id="our-services">
                  <ServicesSection 
                    serviceName={page.serviceName} 
                    servicesCards={page.servicesCards} 
                  />
                </div>
              )}

              {/* Why Choose Us Section */}
              {page.differentiators && (
                <div id="why-choose-us">
                  <WhyChooseUs 
                    slug={page.slug} 
                    differentiators={page.differentiators} 
                  />
                </div>
              )}
             
              {/* Launch Readiness Checklist */}
              {page.checklist && (
                <div id="checklist">
                  <EngineeringBaseline 
                    serviceName={page.serviceName} 
                    checklist={page.checklist} 
                  />
                </div>
              )}
              
              {/* Our Process Section */}
              {page.processPhases && (
                <div id="our-process">
                  <ProcessSection 
                    serviceName={page.serviceName} 
                    processPhases={page.processPhases} 
                  />
                </div>
              )}

              {/* Tech Stack Section */}
              {techStack.length > 0 && (
                <div id="tech-stack">
                  <div style={{ maxWidth: '1460px' }} className="mx-auto">
                    <TechStackSection />
                  </div>
                </div>
              )}
              
              {/* Industries Section */}
              {page.industryUseCases && (
                <div id="industries">
                  <IndustriesSection industryUseCases={page.industryUseCases} />
                </div>
              )}

              {/* Pricing Section */}
              {page.pricingTiers && (
                <div id="pricing">
                  <PricingSection 
                    serviceName={page.serviceName} 
                    pricingTiers={page.pricingTiers} 
                  />
                </div>
              )}
              
              {/* Ceo Vision Section */}
              <CeoVision />

              {/* Generic Tables Section */}
              {page.tables && page.tables.map((table) => (
                <section key={table.title} id={slugify(table.title)} className="scroll-mt-24 pt-16">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-primary" />
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

              {/* Testimonials Section */}
              <div id="testimonials">
                <TestimonialsSection />
              </div>

              

              {/* Case Study Section */}
              <div id="case-study" className="mb-10">
              
               <FeaturedInsights />
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div id="faq">
                <FaqSection faqs={faqs} />
                </div>
              )}
            </main>

            {/* Sticky Table of Contents - Desktop */}
            <aside className="hidden lg:block sticky top-24 self-start z-10 flex-shrink-0">
              <div className="py-12 lg:py-10">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>

        {/* Footer CTA */}
        <div className='-mb-12'>
           <ChecklistCTAHero
       variant="combined"
       title="Explore Related Capabilities"
       description="Discover how we can help transform your business through our comprehensive services, real-world case studies, or our full solutions portfolio."
       buttons={[
         {
           text: "Contact Us",
           href: "/contact-us",
           variant: "primary",
         },
       ]}
     />
      </div>
      </div>
    </>
  );
}