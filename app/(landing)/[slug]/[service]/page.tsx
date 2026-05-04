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
        {/* Breadcrumb Strip */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-8xl px-16 py-4 md:px-8 lg:px-16">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-orange-600">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              {/* <Link href="/services" className="hover:text-orange-600">
                Services
              </Link> */}
              {/* <ChevronRight className="h-4 w-4" /> */}
              <span className="text-slate-500">{page.category}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-900 font-medium">{page.serviceName}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section id="overview" className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-orange-50 via-white to-slate-50">
          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-200 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-100 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-8xl px-12 pb-3 pt-3 md:px-8 lg:px-16 lg:pb-3 lg:pt-3">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              <div className="flex-1">
                <Badge className="mb-4 rounded-full border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
                  {page.category}
                </Badge>

                <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                  {page.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{page.lead}</p>

                {/* Trust Badges */}
                {page.highlights && page.highlights.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {page.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-4 py-1.5 text-sm font-medium text-orange-800"
                      >
                        <CheckCircle2 className="h-4 w-4 text-orange-600" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                )}

                {/* Market Stats Bar */}
                {page.marketStats && (
                  <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white/50 p-6 backdrop-blur-sm sm:grid-cols-4 sm:gap-8">
                    {page.marketStats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-orange-600 px-8 text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/30"
                  >
                    <Link href="/contact-us">
                      Get your free strategy call
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="group rounded-full border-slate-300 bg-white/80 backdrop-blur-sm"
                  >
                    <Link href="/services">View all services</Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-slate-200 to-slate-300"
                        />
                      ))}
                    </div>
                    <span>
                      <strong className="text-slate-900">150+</strong> clients worldwide
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                    <span className="ml-1">
                      <strong className="text-slate-900">4.9/5</strong> rating
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-2 gap-6 border-t border-slate-200 pt-3 sm:gap-8 lg:grid-cols-4">
              {[
                { icon: Award, value: '8+', label: 'Years Experience' },
                { icon: Layers3, value: '150+', label: 'Projects Delivered' },
                { icon: Users, value: '98%', label: 'Client Satisfaction' },
                { icon: Headphones, value: '24/7', label: 'Support Available' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                    <stat.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



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
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                    <p className="text-lg whitespace-pre-line">{section.body}</p>
                    
                    {/* Render items if present in section */}
                    {section.items && (
                      <ul className="mt-6 space-y-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                              <Star className="h-3 w-3 fill-current" />
                            </div>
                            <span className="italic">{item}</span>
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
                <section id="our-services" className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {page.serviceName} Services We Deliver
                    </h2>
                  </div>
                  <p className="mt-6 text-lg text-slate-600">
                    ClickMasters operates as a full-stack {page.serviceName.toLowerCase()} partner. Our team handles every layer of the software delivery lifecycle — product strategy, UI/UX design, backend engineering, cloud infrastructure, QA, and ongoing support.
                  </p>
                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    {page.servicesCards.map((service) => (
                      <div key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-lg">
                        <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                        <p className="mt-3 text-slate-600 leading-relaxed">{service.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="my-6 flex items-center">
  <div className="h-px w-full bg-gray-300" />
</div>
                </section>
              )}

              {/* Why Choose Us Section */}
              {page.differentiators && (
                <section id="why-choose-us" className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      Why {page.slug.includes('enterprise') ? 'Enterprise Organizations' : page.slug.includes('saas') ? 'SaaS Founders' : page.slug.includes('mvp') ? 'Founders' : 'B2B Companies'} Choose ClickMasters
                    </h2>
                  </div>
                  <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">
                              {page.slug.includes('enterprise') ? 'Factor' : page.slug.includes('saas') ? 'Consideration' : 'Feature'}
                            </th>
                            {page.slug.includes('enterprise') ? (
                              <>
                                <th className="px-6 py-4 font-semibold text-orange-600 border-b border-slate-200">ClickMasters</th>
                                <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">SAP / Oracle</th>
                                <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Generic SaaS</th>
                              </>
                            ) : page.slug.includes('saas') ? (
                              <>
                                <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">In House Team</th>
                                <th className="px-6 py-4 font-semibold text-orange-600 border-b border-slate-200">ClickMasters</th>
                              </>
                            ) : (
                              <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Description</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {page.differentiators.map((diff) => {
                            const parts = diff.description.split('|').map(s => s.trim());
                            return (
                              <tr key={diff.feature} className="hover:bg-slate-50/50 text-sm sm:text-base">
                                <td className="px-6 py-4 font-medium text-slate-900 border-b border-slate-100">{diff.feature}</td>
                                {parts.length > 1 ? (
                                  parts.map((part, i) => (
                                    <td key={i} className={cn(
                                      "px-6 py-4 border-b border-slate-100",
                                      (page.slug.includes('saas') && i === 1) || (page.slug.includes('enterprise') && i === 0) 
                                        ? "text-orange-700 font-medium bg-orange-50/30" 
                                        : "text-slate-600"
                                    )}>
                                      {part}
                                    </td>
                                  ))
                                ) : (
                                  <td className="px-6 py-4 text-slate-600 border-b border-slate-100">{diff.description}</td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              )}

              {/* Launch Readiness Checklist */}
              {page.checklist && (
                <section id="checklist" className="scroll-mt-24 pt-16">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {page.serviceName} Engineering Baseline
                    </h2>
                  </div>
                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="p-6 bg-slate-50 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">ClickMasters Standard Engineering Baseline</p>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {page.checklist.map((item, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 hover:bg-slate-50/50">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-medium text-slate-900">{item.item}</span>
                          </div>
                          <Badge variant="secondary" className="sm:w-auto w-fit bg-slate-100 text-slate-600 font-normal">
                            {item.standard}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              )}

              {/* Our Process Section */}
              {page.processPhases && (
                <section id="our-process" className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      Our {page.serviceName} Process
                    </h2>
                  </div>
                  <div className="mt-10 space-y-8">
                    {page.processPhases.map((p) => (
                      <div key={p.title} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
                            {p.phase.replace('Phase ', '')}
                          </div>
                          <div className="w-px h-full bg-slate-200 mt-2" />
                        </div>
                        <div className="pb-8">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">{p.timeline}</Badge>
                          </div>
                          <p className="mt-3 text-slate-600 leading-relaxed">{p.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              )}

              {/* Tech Stack Section */}
              {techStack.length > 0 && (
             <section id="tech-stack" className="scroll-mt-24">
             <div className="flex items-center gap-3">
               <div className="h-10 w-1 rounded-full bg-orange-500" />
               <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                 Technology Stack
               </h2>
             </div>
             <p className="mt-4 text-lg text-slate-600 leading-relaxed">
               Modern tools we use to build scalable, secure applications.
             </p>

             <div className="mt-10 space-y-1">
               {techStack.map((stack, stackIndex) => (
                 <div
                   key={stack.category}
                   className={`overflow-hidden ${stackIndex === 0 ? "rounded-t-2xl" : ""} ${stackIndex === techStack.length - 1 ? "rounded-b-2xl" : ""}`}
                 >
                   {/* Category Header */}
                   <div className="bg-orange-100 px-5 py-3">
                     <h3 className="text-base font-semibold text-orange-900">
                       {stack.category}
                     </h3>
                   </div>
                   
                   {/* Subcategories */}
                   <div className="bg-orange-50/50 px-5 py-4">
                     {stack.subcategories.map((sub, subIndex) => (
                       <div key={sub.name || subIndex} className={subIndex > 0 ? "mt-4" : ""}>
                         {/* Subcategory Label */}
                         {sub.name && (
                           <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                             {sub.name}
                           </p>
                         )}
                         
                         {/* Technology Items */}
                         <div className="flex flex-wrap items-center gap-3">
                           {sub.items.map((item) => (
                             <div
                               key={item.name}
                               className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-orange-300 hover:shadow-md"
                             >
                               <Image
                                 src={item.icon}
                                 alt={item.name}
                                 width={24}
                                 height={24}
                                 className="h-6 w-6 object-contain"
                               />
                               <span className="text-sm font-medium text-slate-700 group-hover:text-orange-700">
                                 {item.name}
                               </span>
                             </div>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </section>
              )}

              {/* Industries Section */}
              {page.industryUseCases && (
                <section id="industries" className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    Industry-specific expertise
                  </h2>
                  <div className="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-4">
                    {page.industryUseCases.map((useCase, index) => {
                      // Map industry names to icon names and gradients
                      const industryConfig: Record<string, { iconName: string; gradient: string }> = {
                        'Healthcare': { iconName: 'Heart', gradient: 'from-emerald-400 to-green-500' },
                        'Banking': { iconName: 'Landmark', gradient: 'from-blue-400 to-blue-600' },
                        'Insurance': { iconName: 'Umbrella', gradient: 'from-orange-400 to-orange-500' },
                        'Lending': { iconName: 'Wallet', gradient: 'from-amber-400 to-amber-500' },
                        'Payments': { iconName: 'CreditCard', gradient: 'from-pink-400 to-pink-500' },
                        'Investment': { iconName: 'LineChart', gradient: 'from-red-400 to-red-500' },
                        'Real estate': { iconName: 'Building2', gradient: 'from-teal-400 to-teal-500' },
                        'Retail': { iconName: 'ShoppingCart', gradient: 'from-indigo-400 to-indigo-500' },
                        'Manufacturing': { iconName: 'Factory', gradient: 'from-slate-400 to-slate-500' },
                        'Logistics and Transportation': { iconName: 'Truck', gradient: 'from-cyan-400 to-cyan-500' },
                        'Oil and Gas': { iconName: 'Droplets', gradient: 'from-rose-400 to-rose-500' },
                        'Energy and utilities': { iconName: 'Lightbulb', gradient: 'from-yellow-400 to-yellow-500' },
                        'Professional services': { iconName: 'Briefcase', gradient: 'from-red-400 to-rose-500' },
                        'Telecoms': { iconName: 'Radio', gradient: 'from-green-400 to-emerald-500' },
                        'Engineering and construction': { iconName: 'HardHat', gradient: 'from-sky-400 to-sky-500' },
                        'Travel and hospitality': { iconName: 'Plane', gradient: 'from-blue-400 to-sky-500' },
                      };

                      const config = industryConfig[useCase.name] || { 
                        iconName: 'Globe', 
                        gradient: 'from-slate-400 to-slate-500'
                      };
                      
                      return (
                        <IndustryCard3D
                          key={useCase.name}
                          name={useCase.name}
                          iconName={config.iconName}
                          gradient={config.gradient}
                          index={index}
                        />
                      );
                    })}
                  </div>
                  <div className="my-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </section>
              )}

              {/* Pricing Section */}
              {page.pricingTiers && (
                <section id="pricing" className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {page.serviceName} Development Pricing
                    </h2>
                  </div>
                  <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">
                              Type
                            </th>
                            <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Investment</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">Timeline</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 border-b border-slate-200">
                              Best For
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {page.pricingTiers.map((tier) => (
                            <tr key={tier.type} className="hover:bg-slate-50/50">
                              <td className="px-6 py-4 font-medium text-slate-900 border-b border-slate-100">{tier.type}</td>
                              <td className="px-6 py-4 text-orange-600 font-semibold border-b border-slate-100">{tier.investment}</td>
                              <td className="px-6 py-4 text-slate-600 border-b border-slate-100">{tier.timeline}</td>
                              <td className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">{tier.bestFor}</td>
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
              )}

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

              {/* Testimonials Section */}
              <section id="testimonials" className="scroll-mt-24 pt-16">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1 rounded-full bg-orange-500" />
                  <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    What Founders Say
                  </h2>
                </div>
                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center">
                  <Quote className="mx-auto h-12 w-12 text-orange-200" />
                  <p className="mt-4 text-lg italic text-slate-600">
                    "{page.testimonial?.quote || "ClickMasters delivered our project on time and with exceptional quality. Their architectural approach saved us months of rework."}"
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-slate-900">{page.testimonial?.author || "CTO, Enterprise B2B SaaS"}</p>
                    <p className="text-sm text-slate-500">{page.testimonial?.role}</p>
                    <div className="mt-2 flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Case Study Section */}
              <section id="case-study" className="scroll-mt-24 pt-16">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-1 rounded-full bg-orange-500" />
                  <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {page.caseStudy?.title || "Featured Case Study"}
                  </h2>
                </div>
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    {page.caseStudy?.image ? (
                      <img src={page.caseStudy.image} alt={page.caseStudy.title} className="w-full h-full object-cover" />
                    ) : (
                      <Database className="h-16 w-16 text-slate-200" />
                    )}
                  </div>
                  <div className="p-6">
                    <Badge className="bg-orange-100 text-orange-700">{page.caseStudy?.badge || "Case Study"}</Badge>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">
                      {page.caseStudy?.title || "Scaling a Global Logistics Platform"}
                    </h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {page.caseStudy?.description || "How we re-architected a legacy system to handle 10x growth in transaction volume while reducing latency by 40%."}
                    </p>
                    <Button variant="link" asChild className="mt-4 p-0 text-orange-600">
                      <Link href={page.caseStudy?.slug ? `/case-studies/${page.caseStudy.slug}` : "/case-studies"}>
                        Read full case study <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <section id="faq" className="scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {faqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-orange-200 hover:shadow-lg"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-100">
                            <HelpCircle className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Section */}
              <section id="cta" className="scroll-mt-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12">
                  {/* Background decorations */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

                  <div className="relative">
                    <Badge className="border-orange-500/30 bg-orange-500/20 text-orange-300">
                      Ready to move forward?
                    </Badge>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                      Get your free strategy call
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                      Share your requirements and our team will help you define scope, architecture
                      direction, timeline, and delivery approach.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-orange-500 px-8 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600"
                      >
                        <Link href="/contact-us">
                          Book strategy call
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="rounded-full border-slate-600 bg-transparent text-white hover:bg-white/10"
                      >
                        <Link href="/case-studies">View case studies</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        Want a fixed-price scope in 48 hours?
                      </h3>
                      <p className="mt-2 text-slate-600">
                        We can review your requirements and return a scoped proposal with delivery
                        phases and realistic timelines.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="shrink-0 rounded-full bg-orange-600 px-8 text-white hover:bg-orange-700"
                    >
                      <Link href="/contact-us">
                        Get your proposal
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
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
        <section className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20">
          <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Explore Related Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Discover how we can help transform your business through our comprehensive services,
              real-world case studies, or our full solutions portfolio.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-orange-600 px-10 text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700"
              >
                <Link href="/services">
                  View all services
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
