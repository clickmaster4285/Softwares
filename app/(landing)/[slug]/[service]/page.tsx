import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ArrowRight, CheckCircle2, Layers3, Target, TrendingUp, Handshake } from 'lucide-react';
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

  if (!page || slugify(page.category) !== slug) {
    return { title: 'Service' };
  }

  const description = page.metaDescription;
  const canonicalPath =
    page.slug === 'custom-software-development'
      ? '/services/custom-software-development'
      : page.slug === 'generative-ai-solutions'
        ? '/services/generative-ai-solutions'
        : page.slug === 'mobile-app-development'
          ? '/services/mobile-app-development'
          : page.slug === 'saas-product-development'
            ? '/services/saas-product-development'
            : page.slug === 'web-application-development'
              ? '/services/web-application-development'
        : `/${slug}/${service}`;
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

export default async function ServiceByCategoryPage({ params }: Props) {
  const { slug, service } = await params;
  const page = getServicePage(service);
  if (!page || slugify(page.category) !== slug) notFound();

  const canonicalPath =
    page.slug === 'custom-software-development'
      ? '/services/custom-software-development'
      : page.slug === 'generative-ai-solutions'
        ? '/services/generative-ai-solutions'
        : `/${slug}/${service}`;
  const url = `${siteConfig.url}${canonicalPath}`;
  const jsonLd = serviceSchema(page.title, page.metaDescription, url);
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ClickMasters',
    serviceType: page.title,
    url,
    areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'EU'],
    priceRange:
      page.slug === 'custom-software-development'
        ? '$8,000 - $250,000+'
        : page.slug === 'generative-ai-solutions'
          ? '$8,000 - $180,000+'
          : page.slug === 'mobile-app-development'
            ? '$15,000 - $180,000+'
            : page.slug === 'saas-product-development'
              ? '$12,000 - $200,000+'
              : page.slug === 'web-application-development'
                ? '$10,000 - $150,000+'
            : undefined,
  };
  const faqSchema = page.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;
  const howToSchema = page.howToSteps
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How we deliver ${page.title}`,
        step: page.howToSteps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;
  const itemListSchema = page.itemList
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: page.itemList.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
        })),
      }
    : null;
  const definedTermSchema = page.definedTerms
    ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: `${page.title} Glossary`,
        hasDefinedTerm: page.definedTerms.map((term) => ({
          '@type': 'DefinedTerm',
          name: term.name,
          description: term.description,
        })),
      }
    : null;
  const softwareApplicationSchema =
    page.slug === 'mobile-app-development'
      ? {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Mobile App Development Solutions',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'iOS, Android',
          creator: {
            '@type': 'Organization',
            name: 'ClickMasters',
            url: siteConfig.url,
          },
          url,
        }
      : null;
  const parseNumberedBody = (body: string): string[] | null => {
    const matches = body.match(/\d+\)\s[^]+?(?=(?:\s\d+\)\s)|$)/g);
    if (!matches || matches.length < 2) return null;
    return matches.map((item) => item.replace(/^\d+\)\s*/, '').trim());
  };
  const parseBulletBody = (body: string): string[] | null => {
    const matches = body.match(/•\s[^•]+/g);
    if (!matches || matches.length < 2) return null;
    return matches.map((item) => item.replace(/^•\s*/, '').trim());
  };
  const marqueeItems = [
    ...page.highlights,
    ...(page.faqs?.map((faq) => faq.question) ?? []),
  ].slice(0, 12);
  const m1 = marqueeItems.slice(0, Math.ceil(marqueeItems.length / 3));
  const m2 = marqueeItems.slice(
    Math.ceil(marqueeItems.length / 3),
    Math.ceil((marqueeItems.length / 3) * 2),
  );
  const m3 = marqueeItems.slice(Math.ceil((marqueeItems.length / 3) * 2));
  const cardIcons = [Layers3, Target, TrendingUp, Handshake];

  return (
    <>
      <Script
        id={`service-page-schema-${slug}-${service}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id={`service-breadcrumb-${slug}-${service}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: page.title, url: canonicalPath },
            ]),
          ),
        }}
      />
      <Script
        id={`service-professional-schema-${slug}-${service}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      {faqSchema ? (
        <Script
          id={`service-faq-schema-${slug}-${service}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      {howToSchema ? (
        <Script
          id={`service-howto-schema-${slug}-${service}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
      {itemListSchema ? (
        <Script
          id={`service-itemlist-schema-${slug}-${service}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      ) : null}
      {definedTermSchema ? (
        <Script
          id={`service-definedterm-schema-${slug}-${service}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
        />
      ) : null}
      {softwareApplicationSchema ? (
        <Script
          id={`service-softwareapplication-schema-${slug}-${service}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      ) : null}

      <div className="min-h-screen bg-white text-slate-900">
        <section className="relative border-b border-slate-200 bg-orange-50/40 pb-14 pt-20 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{page.category}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-medium text-slate-900 sm:text-5xl lg:max-w-none lg:whitespace-nowrap lg:text-5xl xl:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-700 md:text-lg">
              {page.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-md bg-primary px-6 text-white hover:bg-primary/90">
                <Link href="/contact-us">
                  Get your free strategy call
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-md border-slate-300 bg-white">
                <Link href={`/services#${page.sectionId}`}>View on services overview</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-6xl overflow-hidden bg-white/55 px-3 py-3 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="pointer-events-none absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-white/95 via-orange-50/55 to-transparent sm:w-20" />
              <div className="pointer-events-none absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-white/95 via-orange-50/55 to-transparent sm:w-20" />
              <div className="flex w-full flex-col gap-2">
                <Marquee className="[--duration:120s] [--gap:0.85rem]" repeat={6}>
                  {m1.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full border-orange-200 bg-orange-100 px-3 py-1 text-slate-700"
                    >
                      {item}
                    </Badge>
                  ))}
                </Marquee>
                <Marquee className="[--duration:130s] [--gap:0.85rem]" repeat={6} reverse>
                  {m2.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full border-orange-200 bg-orange-100 px-3 py-1 text-slate-700"
                    >
                      {item}
                    </Badge>
                  ))}
                </Marquee>
                <Marquee className="[--duration:112s] [--gap:0.85rem]" repeat={6}>
                  {m3.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="rounded-full border-orange-200 bg-orange-100 px-3 py-1 text-slate-700"
                    >
                      {item}
                    </Badge>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-dashed border-slate-300 bg-white py-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 border-t border-dashed border-slate-300 sm:grid-cols-2 sm:divide-x sm:divide-dashed sm:divide-slate-300 lg:grid-cols-4">
            {page.sections.slice(0, 4).map((block: ServicePageContent['sections'][number], idx: number) => {
              const Icon = cardIcons[idx % cardIcons.length];
              return (
                <div key={block.heading} className="flex flex-col gap-5 px-5 py-8 lg:px-6 lg:py-10">
                  <Icon className="size-10 text-primary" />
                  <div className="flex flex-col gap-2 pt-6 lg:pt-12">
                    <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl">
                      {block.heading}
                    </h2>
                    <p className="leading-relaxed text-slate-600">{block.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {page.sections.slice(4).map((block: ServicePageContent['sections'][number], idx: number) => {
              const Icon = cardIcons[idx % cardIcons.length];
              return (
              <div
                key={block.heading}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg border border-orange-100 bg-orange-50 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium tracking-tight text-slate-900 transition-colors group-hover:text-primary">
                      {block.heading}
                    </h2>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-orange-200/70 via-slate-200 to-transparent" />
                {parseNumberedBody(block.body) ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
                    {parseNumberedBody(block.body)!.map((point) => (
                      <li key={point} className="leading-7">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : parseBulletBody(block.body) ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
                    {parseBulletBody(block.body)!.map((point) => (
                      <li key={point} className="leading-7">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 leading-7 text-slate-600">{block.body}</p>
                )}
              </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-4">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-orange-100 bg-orange-50/60 px-5 py-8 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Ready to move forward?
              </p>
              <h3 className="mt-2 text-2xl font-medium text-slate-900 sm:text-3xl">
                Get your free strategy call
              </h3>
              <p className="mt-3 max-w-3xl text-slate-600">
                Share your requirements and our team will help you define scope, architecture
                direction, timeline, and delivery approach.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-md bg-primary px-6 text-white hover:bg-primary/90">
                  <Link href="/contact-us">
                    Book strategy call
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="rounded-md border-slate-300 bg-white">
                  <Link href="/case-studies">View case studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {page.faqs ? (
          <section className="border-t border-slate-200 bg-orange-50/20 py-14 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5">
                    <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white py-2">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8">
              <h3 className="text-xl font-medium text-slate-900 sm:text-2xl">
                Want a fixed-price scope in 48 hours?
              </h3>
              <p className="mt-2 text-slate-600">
                We can review your requirements and return a scoped proposal with delivery phases
                and realistic timelines.
              </p>
              <div className="mt-5">
                <Button asChild className="rounded-md bg-primary px-6 text-white hover:bg-primary/90">
                  <Link href="/contact-us">
                    Get your proposal
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-14">
          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 px-4 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-slate-900 sm:text-3xl">Related capabilities</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Explore our{' '}
              <Link href="/services" className="font-semibold text-primary hover:underline">
                full services overview
              </Link>
              ,{' '}
              <Link href="/case-studies" className="font-semibold text-primary hover:underline">
                case studies
              </Link>
              , or{' '}
              <Link href="/software-solutions" className="font-semibold text-primary hover:underline">
                software solutions portfolio
              </Link>
              .
            </p>
            <div className="mt-7">
              <Button asChild className="rounded-md bg-primary px-6 text-sm font-semibold text-white">
                <Link href="/contact-us">
                  Talk to our team
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
