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
  Sparkles,
  Rocket,
  ShieldCheck,
  Clock,
  Server,
  Database,
  Layout,
  Cloud,
  Smartphone,
  Braces,
  Zap,
  Cpu,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Marquee } from '@/components/ui/marquee';
import { breadcrumbSchema, serviceSchema, siteConfig } from '@/app/metadata-config';
import { getAllServicePages, getServicePage, slugify, type ServicePageContent } from '@/lib/service-pages';

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
      images: [{ url: `${siteConfig.url}/og/services.webp`, width: 1200, height: 630, alt: `${page.title} — ClickMasters software services` }],
    },
    twitter: { card: 'summary_large_image', title: `${page.title} | ClickMasters`, description, images: [`${siteConfig.url}/og/services.webp`] },
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

function parseNumberedBody(body: string): string[] | null {
  const matches = body.match(/\d+\)\s[^]+?(?=(?:\s\d+\)\s)|$)/g);
  if (!matches || matches.length < 2) return null;
  return matches.map((item) => item.replace(/^\d+\)\s*/, '').trim());
}

function parseBulletBody(body: string): string[] | null {
  const matches = body.match(/[•\-]\s[^•\-]+/g);
  if (!matches || matches.length < 2) return null;
  return matches.map((item) => item.replace(/^[•\-]\s*/, '').trim());
}

function extractTechStack(sections: ServicePageContent['sections']): string[] {
  const techSection = sections.find(
    (s) =>
      s.heading.toLowerCase().includes('technology stack') ||
      s.heading.toLowerCase().includes('tech stack') ||
      s.heading.toLowerCase().includes('technology')
  );
  if (!techSection) return [];

  const body = techSection.body;
  const numbered = parseNumberedBody(body);
  const bulleted = parseBulletBody(body);
  const items = numbered || bulleted || [body];

  const techNames: string[] = [];
  items.forEach((item) => {
    const matches = item.match(/([A-Z][a-zA-Z0-9+.#]+(?:\s[A-Z][a-zA-Z0-9+.#]+)?(?:\.js|\.py|\.rb)?)/g);
    if (matches) techNames.push(...matches);
  });
  return [...new Set(techNames)].slice(0, 24);
}

// Helper to render numbered or bullet lists without extra top margin when it's the first child
const renderBlockContent = (body: string, isFirstChild = false) => {
  const numbered = parseNumberedBody(body);
  const bulleted = parseBulletBody(body);
  const items = numbered || bulleted;
  if (items) {
    return (
      <ul className={`${!isFirstChild ? 'mt-3' : ''} space-y-2`}>
        {items.map((point, idx) => (
          <li key={`${point}-${idx}`} className="flex items-start gap-2 text-slate-600 leading-relaxed">
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{point}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className={`${!isFirstChild ? 'mt-3' : ''} text-slate-600 text-sm leading-relaxed`}>{body}</p>;
};

export default async function ServiceByCategoryPage({ params }: Props) {
  const { slug, service } = await params;
  const page = getServicePage(service);
  if (!page || slugify(page.category) !== slug) notFound();

  const sections = page.sections || [];
  const highlights = page.highlights || [];
  const faqs = page.faqs || [];
  const canonicalPath = getCanonicalPath(page);
  const url = `${siteConfig.url}${canonicalPath}`;

  const techStackItems = extractTechStack(sections);
  const techChunk1 = techStackItems.slice(0, Math.ceil(techStackItems.length / 2));
  const techChunk2 = techStackItems.slice(Math.ceil(techStackItems.length / 2));

  const jsonLd = serviceSchema(page.title, page.metaDescription, url);
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ClickMasters',
    serviceType: page.title,
    url,
    areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'EU'],
    priceRange: getPriceRange(page.slug),
  };
  const faqSchema = faqs.length
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
    : null;
  const softwareAppSchema = page.slug === 'mobile-app-development' ? { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Mobile App Development Solutions', applicationCategory: 'BusinessApplication', operatingSystem: 'iOS, Android', creator: { '@type': 'Organization', name: 'ClickMasters', url: siteConfig.url }, url } : null;

  function getPriceRange(slug: string): string | undefined {
    const map: Record<string, string> = {
      'custom-software-development': '$8,000 - $250,000+',
      'generative-ai-solutions': '$8,000 - $180,000+',
      'mobile-app-development': '$15,000 - $180,000+',
      'saas-product-development': '$12,000 - $200,000+',
      'web-application-development': '$10,000 - $150,000+',
    };
    return map[slug];
  }

  const marqueeItems = [...highlights, ...faqs.map((f) => f.question)].slice(0, 18);
  const m1 = marqueeItems.slice(0, Math.ceil(marqueeItems.length / 3));
  const m2 = marqueeItems.slice(Math.ceil(marqueeItems.length / 3), Math.ceil((marqueeItems.length / 3) * 2));
  const m3 = marqueeItems.slice(Math.ceil((marqueeItems.length / 3) * 2));

  const cardIcons = [Layers3, Target, TrendingUp, Handshake, Rocket, ShieldCheck, Sparkles, Clock, Server, Database, Layout, Cloud, Smartphone, Braces, Zap, Cpu, LineChart];

  return (
    <>
      <Script id={`schema-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id={`breadcrumb-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: page.title, url: canonicalPath }])) }} />
      <Script id={`professional-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      {faqSchema && <Script id={`faq-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {softwareAppSchema && <Script id={`software-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />}

      <div className="min-h-screen bg-white text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
            <Badge variant="secondary" className="mb-4 border-orange-200 bg-orange-100 text-orange-800">{page.category}</Badge>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">{page.lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-lg bg-primary px-8 shadow-md hover:shadow-lg">
                <Link href="/contact-us">Get your free strategy call <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="rounded-lg border-slate-300 bg-white/80 backdrop-blur-sm">
                <Link href="/services">View all services</Link>
              </Button>
            </div>
          </div>

          {/* Highlights Marquee */}
          {marqueeItems.length > 0 && (
            <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden px-3 sm:px-6 lg:px-8">
              <div className="pointer-events-none absolute left-0 z-10 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-24" />
              <div className="pointer-events-none absolute right-0 z-10 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-24" />
              <div className="flex w-full flex-col gap-3">
                <Marquee className="[--duration:120s] [--gap:1rem]" repeat={5}>
                  {m1.map((item) => <Badge key={item} variant="outline" className="rounded-full border-orange-200 bg-orange-100/80 px-4 py-1.5 text-sm font-medium text-slate-700">{item}</Badge>)}
                </Marquee>
                <Marquee className="[--duration:130s] [--gap:1rem]" repeat={5} reverse>
                  {m2.map((item) => <Badge key={item} variant="outline" className="rounded-full border-orange-200 bg-orange-100/80 px-4 py-1.5 text-sm font-medium text-slate-700">{item}</Badge>)}
                </Marquee>
                <Marquee className="[--duration:112s] [--gap:1rem]" repeat={5}>
                  {m3.map((item) => <Badge key={item} variant="outline" className="rounded-full border-orange-200 bg-orange-100/80 px-4 py-1.5 text-sm font-medium text-slate-700">{item}</Badge>)}
                </Marquee>
              </div>
            </div>
          )}
        </section>

        {/* Tech Stack Slider */}
        {techStackItems.length > 0 && (
          <section className="border-y border-slate-100 bg-slate-50/40 py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Technology Stack</p>
                <h2 className="text-2xl font-semibold text-slate-800 mt-1">Modern tools we use to build your solution</h2>
              </div>
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-slate-50/90 to-transparent" />
                <div className="pointer-events-none absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-slate-50/90 to-transparent" />
                <div className="flex flex-col gap-4">
                  {techChunk1.length > 0 && (
                    <Marquee className="[--duration:80s] [--gap:1.2rem]" repeat={4}>
                      {techChunk1.map((tech) => <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">{tech}</Badge>)}
                    </Marquee>
                  )}
                  {techChunk2.length > 0 && (
                    <Marquee className="[--duration:90s] [--gap:1.2rem]" repeat={4} reverse>
                      {techChunk2.map((tech) => <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">{tech}</Badge>)}
                    </Marquee>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Features Grid - First 4 sections (full width cards with equal height) */}
        {sections.slice(0, 4).length > 0 && (
          <section className="border-b border-slate-200 bg-white py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {sections.slice(0, 4).map((block, idx) => {
                  const Icon = cardIcons[idx % cardIcons.length];
                  return (
                    <div key={block.heading} className="group flex flex-col h-full rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md">
                      <div className="rounded-lg bg-orange-100/50 p-2 w-fit group-hover:bg-orange-100 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{block.heading}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 flex-1">{block.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Detailed Capabilities Grid - Remaining sections (2-col grid with equal height cards) */}
        {sections.slice(4).length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <Badge variant="secondary" className="mb-3 bg-orange-100 text-orange-800">What We Offer</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Deep expertise in {page.title.split(' ').slice(0, 2).join(' ')}
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-slate-600">Comprehensive solutions tailored to your business needs</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {sections.slice(4).map((block, idx) => {
                  const Icon = cardIcons[(idx + 4) % cardIcons.length];
                  return (
                    <div key={block.heading} className="group flex flex-col h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-orange-100/60 p-2 group-hover:bg-orange-100 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                          {block.heading}
                        </h3>
                      </div>
                      {/* No divider line to save vertical space */}
                      <div className="flex-1">
                        {renderBlockContent(block.body, true)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Strategy Call CTA */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 px-6 py-10 sm:px-10">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-200/40 blur-2xl" />
              <div className="relative">
                <Badge variant="secondary" className="mb-3 bg-white/80 text-orange-800 border-orange-200">Ready to move forward?</Badge>
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">Get your free strategy call</h3>
                <p className="mt-3 max-w-2xl text-slate-600">Share your requirements and our team will help you define scope, architecture direction, timeline, and delivery approach.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="rounded-lg bg-primary px-7 shadow-md hover:shadow-lg"><Link href="/contact-us">Book strategy call <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                  <Button variant="outline" asChild className="rounded-lg border-slate-300 bg-white/80"><Link href="/case-studies">View case studies</Link></Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="border-t border-slate-100 bg-gradient-to-b from-white to-orange-50/20 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <Badge variant="secondary" className="mb-3 bg-orange-100 text-orange-800">FAQ</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto mt-3 max-w-2xl text-slate-600">Everything you need to know about our {page.title.toLowerCase()} services</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {faqs.map((faq) => (
                  <div key={faq.question} className="group flex flex-col h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-orange-200">
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-primary transition-colors">{faq.question}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600 text-sm flex-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Fixed-price Proposal CTA */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Want a fixed-price scope in 48 hours?</h3>
                  <p className="mt-1 text-slate-600">We'll review your requirements and return a scoped proposal with delivery phases.</p>
                </div>
                <Button asChild className="rounded-lg bg-primary px-7 shadow-sm hover:shadow-md whitespace-nowrap"><Link href="/contact-us">Get your proposal <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Capabilities Footer */}
        <section className="border-t border-slate-100 bg-white py-16">
          <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-slate-50 to-white px-6 py-12 text-center shadow-sm sm:px-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Explore Related Capabilities</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Discover how we can help transform your business through our comprehensive{' '}
              <Link href="/services" className="font-semibold text-primary hover:underline">services</Link>, real-world{' '}
              <Link href="/case-studies" className="font-semibold text-primary hover:underline">case studies</Link>, or our full{' '}
              <Link href="/software-solutions" className="font-semibold text-primary hover:underline">solutions portfolio</Link>.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-lg bg-primary px-8 shadow-md hover:shadow-lg"><Link href="/contact-us">Talk to our team <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}