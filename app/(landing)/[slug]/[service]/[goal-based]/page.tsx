import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { TableOfContents } from '@/components/table-of-contents';
import {
  breadcrumbSchema,
  faqSchema,
  homepageFaqSchema,
  serviceSchema,
  siteConfig,
} from '@/app/metadata-config';
import { getServicePage, getServiceTechnologies, slugify } from '@/lib/service-pages';
import { getAllGoalStaticParams, getGoalPage } from '@/lib/goal-based';
import {
  baseServiceSlugFromPersona,
  getAllPersonaSlugs,
  getPersonaPage,
} from '@/lib/persona-utils';
import PersonaPageClient from '../[persona-based]/PersonaPageClient';
import { ServiceHero } from '@/components/landingPage/servicesPage/service-hero';
import { ServicesSection } from '@/src/components/landingPage/servicesPage/ServicesSection';
import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
import { IndustriesSection } from '@/src/components/landingPage/servicesPage/IndustriesSection';
import { CaseStudySection } from '@/src/components/landingPage/servicesPage/CaseStudySection';
import { FAQSection } from '@/src/components/landingPage/servicesPage/FAQSection';
import { WhyChooseUs } from '@/src/components/landingPage/servicesPage/WhyChooseUs';
import { TechStack } from '@/src/components/landingPage/servicesPage/TechStack';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';
import { TestimonialsSection } from '@/src/components/landingPage/servicesPage/TestimonialsSection';
import { CeoVision } from '@/src/components/landingPage/servicesPage/CeoVision';

type Props = {
  params: Promise<{
    slug: string;
    service: string;
    'goal-based': string;
  }>;
};

const defaultFaqs = homepageFaqSchema.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

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
  if (goalPage) {
    const canonicalPath = `/${slug}/${service}/${segmentSlug}`;
    const canonical = `${siteConfig.url}${canonicalPath}`;
    return {
      title: goalPage.metaTitle ?? `${goalPage.title} | ClickMasters`,
      description: goalPage.metaDescription,
      alternates: { canonical },
      openGraph: {
        title: `${goalPage.title} | ClickMasters`,
        description: goalPage.metaDescription,
        url: canonical,
        images: [
          {
            url: `${siteConfig.url}/og/services.webp`,
            width: 1200,
            height: 630,
            alt: `${goalPage.title} ClickMasters software services`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${goalPage.title} | ClickMasters`,
        description: goalPage.metaDescription,
        images: [`${siteConfig.url}/og/services.webp`],
      },
    };
  }

  const personaPage = getPersonaPage(segmentSlug);
  if (personaPage) {
    return {
      title: personaPage.metaTitle,
      description: personaPage.metaDescription,
      alternates: {
        canonical: `${siteConfig.url}/${slug}/${service}/${segmentSlug}`,
      },
    };
  }

  return { title: 'Page' };
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

  const page = getGoalPage(segmentSlug);
  const baseService = getServicePage(service);

  if (!page || !baseService) notFound();

  if (page.serviceSlug !== service) notFound();

  const canonicalCategorySlug = baseService.categorySlug;
  if (canonicalCategorySlug !== slug) {
    redirect(`/${canonicalCategorySlug}/${service}/${segmentSlug}`);
  }

  const sections = page.sections || [];
  const faqs = page.faqs || [];
  const canonicalPath = `/${slug}/${service}/${segmentSlug}`;
  const url = `${siteConfig.url}${canonicalPath}`;
  const techStack = getServiceTechnologies(service);
  const displayServiceName = baseService.serviceName;
  const servicesCards = page.servicesCards ?? baseService.servicesCards;
  const differentiators = page.differentiators ?? baseService.differentiators;
  const processPhases = page.processPhases ?? baseService.processPhases;
  const industryUseCases = page.industryUseCases ?? baseService.industryUseCases;
  const pricingTiers = page.pricingTiers ?? baseService.pricingTiers;

  const heroPage = {
    category: baseService.category,
    categorySlug: slug,
    serviceName: displayServiceName,
    title: page.title,
    lead: page.lead,
    highlights: page.highlights,
    marketStats: page.marketStats,
    currentPageLabel: page.goalLabel,
    parentService: {
      label: baseService.serviceName,
      href: `/${slug}/${service}`,
    },
    boldTerms: [displayServiceName, page.goalLabel],
  };

  const makeBoldServiceName = (text: string, serviceName: string): string => {
    if (!text || !serviceName) return text || '';
    const regex = new RegExp(`(${serviceName})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  };

  const tocItems = [{ id: 'overview', title: 'Overview', level: 2 as const }];

  const getSectionId = (heading: string, index: number) => {
    const h = heading.toLowerCase();
    if (h.includes('speed to market') || h.includes('why')) return 'why-speed';
    if (h.includes('approach') || h.includes('discipline')) return 'our-approach';
    if (h.includes('services we deliver') || h.includes('includes') || h.includes('pillars'))
      return 'our-services';
    if (h.includes('why choose')) return 'why-choose-us';
    if (h.includes('process')) return 'our-process';
    if (h.includes('tech stack') || h.includes('technology')) return 'tech-stack';
    if (h.includes('industr')) return 'industries';
    if (h.includes('pricing')) return 'pricing';
    if (h.includes('related')) return 'related-goals';
    return `section-${index}-${slugify(heading)}`;
  };

  sections.forEach((section, index) => {
    const id = getSectionId(section.heading, index);
    if (!tocItems.find((item) => item.id === id)) {
      tocItems.push({ id, title: section.heading, level: 2 as const });
    }
  });

  if (servicesCards && !tocItems.find((item) => item.id === 'our-services')) {
    tocItems.push({ id: 'our-services', title: 'Our Services', level: 2 as const });
  }

  if (differentiators && !tocItems.find((item) => item.id === 'why-choose-us')) {
    tocItems.push({ id: 'why-choose-us', title: 'Why Choose Us', level: 2 as const });
  }

  if (processPhases && !tocItems.find((item) => item.id === 'our-process')) {
    tocItems.push({ id: 'our-process', title: 'Our Process', level: 2 as const });
  }

  if (techStack.length > 0 && !tocItems.find((item) => item.id === 'tech-stack')) {
    tocItems.push({ id: 'tech-stack', title: 'Technology Stack', level: 2 as const });
  }

  if (industryUseCases && !tocItems.find((item) => item.id === 'industries')) {
    tocItems.push({ id: 'industries', title: 'Industries', level: 2 as const });
  }

  if (pricingTiers && !tocItems.find((item) => item.id === 'pricing')) {
    tocItems.push({ id: 'pricing', title: 'Pricing', level: 2 as const });
  }

  tocItems.push({ id: 'testimonials', title: 'Testimonials', level: 2 as const });
  tocItems.push({ id: 'case-study', title: 'Case Study', level: 2 as const });

  if (page.relatedGoals.length > 0) {
    tocItems.push({ id: 'related-goals', title: 'Related Goals', level: 2 as const });
  }

  if (faqs.length > 0) {
    tocItems.push({ id: 'faq', title: 'FAQ', level: 2 as const });
  }

  const serviceJsonLd = serviceSchema(page.serviceName, page.metaDescription, url);
  const faqJsonLd = faqSchema(faqs.length > 0 ? faqs : defaultFaqs);

  return (
    <>
      <Script
        id={`service-schema-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id={`faq-schema-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id={`breadcrumb-${page.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: baseService.category, url: `/${slug}` },
              { name: baseService.serviceName, url: `/${slug}/${service}` },
              { name: page.goalLabel, url: canonicalPath },
            ]),
          ),
        }}
      />

      <div className="min-h-screen text-slate-900">
        <ServiceHero page={heroPage} />

        <div className="mx-auto max-w-8xl px-16 md:px-8 lg:px-16">
          <div className="relative lg:grid lg:grid-cols-[1fr_260px] lg:gap-16">
            <main className="py-12 lg:py-10">
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={getSectionId(section.heading, index)}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-primary" />
                    <h2
                      className="text-2xl font-semibold text-slate-900 sm:text-3xl"
                      dangerouslySetInnerHTML={{
                        __html: makeBoldServiceName(section.heading, displayServiceName),
                      }}
                    />
                  </div>

                  <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                    <p
                      className="text-lg whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: makeBoldServiceName(section.body, displayServiceName),
                      }}
                    />

                    {section.items && (
                      <ul className="mt-6 space-y-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                              <Star className="h-3 w-3 fill-current" />
                            </div>
                            <span
                              className="italic"
                              dangerouslySetInnerHTML={{
                                __html: makeBoldServiceName(item, displayServiceName),
                              }}
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

              {servicesCards && (
                <ServicesSection
                  serviceName={displayServiceName}
                  servicesCards={servicesCards}
                />
              )}

              {differentiators && (
                <WhyChooseUs slug={page.slug} differentiators={differentiators} />
              )}

              {processPhases && (
                <ProcessSection
                  serviceName={displayServiceName}
                  processPhases={processPhases}
                />
              )}

              <div style={{ maxWidth: '1460px' }} className="mx-auto">
                {techStack.length > 0 && <TechStack techStack={techStack as never} />}
              </div>

              {industryUseCases && (
                <IndustriesSection industryUseCases={industryUseCases} />
              )}

              {pricingTiers && (
                <PricingSection
                  serviceName={displayServiceName}
                  pricingTiers={pricingTiers}
                />
              )}

              <CeoVision />

              <TestimonialsSection />

              <div className="mb-10">
                <div className="w-full flex flex-col mt-4 sm:mt-6 py-6 sm:py-8">
                  <div className="flex items-center gap-3 px-4 sm:px-6 md:px-8">
                    <div className="h-8 sm:h-10 w-1 rounded-full bg-primary" />
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900">
                      Success Stories
                    </h2>
                  </div>
                </div>
                <CaseStudySection />
              </div>

              {page.relatedGoals.length > 0 && (
                <section id="related-goals" className="scroll-mt-24 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-primary" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      Other Goal-Based Pages
                    </h2>
                  </div>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {page.relatedGoals.map((goal) => (
                      <Link
                        key={goal.label}
                        href={goal.href}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-primary transition-colors hover:border-primary/30 hover:bg-orange-50"
                      >
                        {goal.label}
                      </Link>
                    ))}
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              )}

              {faqs.length > 0 && <FAQSection faqs={faqs} />}
            </main>

            <aside className="hidden lg:block sticky top-24 self-start z-10">
              <div className="py-12 lg:py-10">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </div>

        <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20">
          <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Explore Related Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Discover how we can help transform your business through our comprehensive services,
              real-world case studies, or our full solutions portfolio.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
