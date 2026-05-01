import Link from 'next/link';
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
import { TableOfContents } from '@/components/table-of-contents';
import { breadcrumbSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import {
  getAllServicePages,
  getServicePage,
  slugify,
  type ServicePageContent,
} from '@/lib/service-pages';

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
  if (slug === 'mobile-app-development') return '/services/mobile-app-development';
  if (slug === 'saas-product-development') return '/services/saas-product-development';
  if (slug === 'web-application-development') return '/services/web-application-development';
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

  // Build TOC items from sections
  const tocItems = sections.map((section, idx) => ({
    id: slugify(section.heading),
    title: section.heading,
    level: 2 as const,
  }));

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
              { name: page.title, url: canonicalPath },
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

      <div className="min-h-screen bg-white text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-orange-50 via-white to-slate-50">
          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-200 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-100 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-8xl px-12 pb-16 pt-20 md:px-8 lg:px-16 lg:pb-3 lg:pt-28">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
              <div className="flex-1">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                  <Link href="/" className="hover:text-orange-600">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/services" className="hover:text-orange-600">
                    Services
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-slate-900">{page.title}</span>
                </nav>

                <Badge className="mb-4 rounded-full border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700">
                  {page.category}
                </Badge>

                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  {page.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">{page.lead}</p>

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
          <div className="relative lg:grid lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* Sticky Table of Contents - Desktop */}
        <aside className="hidden lg:block sticky top-12 self-start">
            <div className="py-12">
              <TableOfContents items={tocItems} />
            </div>
          </aside>

            {/* Main Content */}
            <main className="py-12 lg:py-16">
              {/* Section Content */}
              {sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={slugify(section.heading)}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                    <p className="text-lg">{section.body}</p>
                  </div>

                  {index < sections.length - 1 && (
                    <div className="my-16 flex items-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                  )}
                </section>
              ))}

              {/* Divider before FAQ */}
              {faqs.length > 0 && sections.length > 0 && (
                <div className="my-16 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                </div>
              )}

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

              {/* Divider before CTA */}
              {(faqs.length > 0 || sections.length > 0) && (
                <div className="my-16 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                </div>
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
