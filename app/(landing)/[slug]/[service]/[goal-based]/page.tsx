import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import Script from 'next/script';
import type { CSSProperties, ReactNode } from 'react';
import { siteConfig, breadcrumbSchema, faqSchema, serviceSchema } from '@/app/metadata-config';
import type { NormalizedGoalPage } from '@/lib/goal-based-utils';
import {
  getAllGoalStaticParams,
  getGoalCanonicalUrl,
  getGoalPage,
  goalPageMatchesService,
} from '@/lib/goal-based-utils';
import { getServicePage } from '@/lib/service-pages';
import PersonaPageClient from '@/app/(landing)/[slug]/[service]/[persona-based]/PersonaPageClient';
import {
  getAllPersonaStaticParams,
  isPersonaSlug,
  resolvePersonaRoute,
} from '@/src/lib/persona-utils';
import { ServiceSubpageBreadcrumb } from '@/src/components/landingPage/servicesPage/ServiceSubpageBreadcrumb';

const orange = '#E8692A';
const orangeLight = '#F5845A';
const orangePale = '#FFF3ED';
const orangeBorder = '#FDDCCC';
const dark = '#1A1A2E';
const text = '#2C2C3E';
const text2 = '#5A5A72';
const text3 = '#8888A0';
const bg = '#FFFFFF';
const bg2 = '#F8F9FC';
const bg3 = '#F2F4F8';
const border = '#E4E6EF';
const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Manrope', sans-serif";
const CONTACT_HREF = '/contact-us';

type GoalPageViewProps = {
  goal: NormalizedGoalPage;
  parentServiceHref: string;
};

const pageWrap: CSSProperties = {
  fontFamily: fontBody,
  color: text,
  background: bg,
  lineHeight: 1.6,
};

const SECTION_INNER = 'lf-inner mx-auto w-full max-w-8xl box-border px-16 md:px-8 lg:px-16';

const pillBase: CSSProperties = {
  display: 'inline-block',
  background: orangePale,
  border: `1px solid ${orangeBorder}`,
  color: orange,
  fontFamily: fontHead,
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '6px 14px',
  borderRadius: 100,
};

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="lf-primary-btn"
      style={{
        display: 'inline-block',
        background: orange,
        color: '#fff',
        fontFamily: fontHead,
        fontWeight: 700,
        fontSize: 14,
        padding: '14px 28px',
        borderRadius: 8,
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
}

function GoalPageView({ goal, parentServiceHref }: GoalPageViewProps) {
  const speedSection = goal.sections?.[0];
  const pricingTiers = goal.pricingTiers ?? [];
  const faqs = goal.faqs ?? [];
  const serviceCards = goal.servicesCards ?? [];
  const marketStats = goal.marketStats ?? [];
  const highlights = goal.highlights ?? [];
  const approachIntro = goal.approachIntro;
  const midCta = goal.midCta;
  const statsColumns = Math.min(Math.max(marketStats.length, 1), 4);
  const cardsColumns = Math.min(Math.max(serviceCards.length, 1), 3);
  const categoryHref = `/${goal.categorySlug}`;

  return (
    <div style={pageWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .lf-hero-grid { grid-template-columns: 1fr !important; }
          .lf-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .lf-cards { grid-template-columns: 1fr !important; }
          .lf-pricing-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        }
        @media (max-width: 480px) {
          .lf-stats { grid-template-columns: 1fr !important; }
        }
        a.lf-primary-btn:hover { background: ${orangeLight} !important; }
        details.lf-faq > summary { list-style: none; }
        details.lf-faq > summary::-webkit-details-marker { display: none; }
        details.lf-faq .lf-faq-chevron {
          display: inline-block;
          transition: transform 0.2s ease;
          font-size: 11px;
          color: ${text3};
          margin-left: 12px;
          flex-shrink: 0;
        }
        details.lf-faq[open] .lf-faq-chevron { transform: rotate(180deg); }
        table.lf-price-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        table.lf-price-table th,
        table.lf-price-table td {
          border: 1px solid ${border};
          padding: 14px 16px;
          vertical-align: top;
        }
        table.lf-price-table th {
          background: ${bg2};
          font-family: ${fontHead};
          font-weight: 700;
          text-align: left;
          color: ${dark};
        }
      `}</style>

      <ServiceSubpageBreadcrumb
        crumbs={[
          { label: 'Home', href: '/' },
          { label: goal.category, href: categoryHref },
          { label: goal.serviceName, href: parentServiceHref },
          { label: goal.goalLabel },
        ]}
      />

      {/* Hero */}
      <div style={{ background: bg, padding: '56px 0 48px' }}>
        <div className={SECTION_INNER}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <span style={pillBase}>Goal: {goal.goalLabel}</span>
            {goal.heroServiceBadge && (
              <>
                <span style={{ color: text3, fontWeight: 600 }} aria-hidden>
                  |
                </span>
                <span style={{ ...pillBase, background: bg2 }}>{goal.heroServiceBadge}</span>
              </>
            )}
          </div>

          <h1
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: dark,
              lineHeight: 1.15,
              margin: '0 0 12px',
              maxWidth: 900,
            }}
          >
            {goal.title}
          </h1>

          {goal.subheadline && (
            <p
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(18px, 2.5vw, 22px)',
                fontWeight: 600,
                color: orange,
                margin: '0 0 20px',
              }}
            >
              {goal.subheadline}
            </p>
          )}

          <p style={{ fontSize: 17, color: text2, maxWidth: 800, margin: '0 0 28px' }}>{goal.lead}</p>

          {goal.heroCtaLabel && (
            <div style={{ marginBottom: 28 }}>
              <PrimaryButton href={CONTACT_HREF}>{goal.heroCtaLabel}</PrimaryButton>
            </div>
          )}

          {highlights.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 40,
              }}
            >
              {highlights.map((pill) => (
                <div
                  key={pill}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    background: bg2,
                    border: `1px solid ${border}`,
                    borderRadius: 100,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: text,
                    maxWidth: '100%',
                  }}
                >
                  <span style={{ color: orange, fontWeight: 700, flexShrink: 0 }} aria-hidden>
                    ✓
                  </span>
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          )}

          {marketStats.length > 0 && (
            <div
              className="lf-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${statsColumns}, 1fr)`,
                gap: 16,
              }}
            >
              {marketStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: dark,
                    borderRadius: 12,
                    padding: '24px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontHead,
                      fontSize: 28,
                      fontWeight: 800,
                      color: orangeLight,
                      lineHeight: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The ClickMasters Approach */}
      {approachIntro && (
        <div style={{ background: bg, padding: '48px 0' }}>
          <div className={SECTION_INNER}>
            {approachIntro.eyebrow && (
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: orange,
                  marginBottom: 16,
                  fontFamily: fontHead,
                }}
              >
                {approachIntro.eyebrow}
              </div>
            )}
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 700,
                color: dark,
                margin: '0 0 24px',
                maxWidth: 900,
                lineHeight: 1.25,
              }}
            >
              {approachIntro.title}
            </h2>
            {approachIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 64)}
                style={{
                  fontSize: 16,
                  color: text2,
                  margin: '0 0 16px',
                  maxWidth: 900,
                  lineHeight: 1.65,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Why speed to market */}
      {speedSection && (
        <div style={{ background: bg2, padding: '48px 0', borderTop: `1px solid ${border}` }}>
          <div className={SECTION_INNER}>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 700,
                color: dark,
                margin: '0 0 20px',
                lineHeight: 1.25,
              }}
            >
              {speedSection.heading}
            </h2>
            <p style={{ fontSize: 16, color: text2, margin: 0, maxWidth: 900, lineHeight: 1.65 }}>
              {speedSection.body}
            </p>
          </div>
        </div>
      )}

      {/* Key service areas */}
      {serviceCards.length > 0 && (
        <div style={{ background: bg, padding: '48px 0 64px' }}>
          <div className={SECTION_INNER}>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 700,
                color: dark,
                margin: '0 0 28px',
              }}
            >
              Key Service Areas for Faster Launch
            </h2>
            <div
              className="lf-cards"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cardsColumns}, 1fr)`,
                gap: 24,
              }}
            >
              {serviceCards.map((card, i) => (
                <div
                  key={card.title}
                  style={{
                    background: bg2,
                    border: `1px solid ${border}`,
                    borderRadius: 16,
                    padding: 28,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: i === 1 ? orange : bg3,
                      color: i === 1 ? '#fff' : orange,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: fontHead,
                      fontWeight: 800,
                      fontSize: 16,
                      marginBottom: 16,
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: fontHead,
                      fontSize: 18,
                      fontWeight: 700,
                      color: dark,
                      margin: '0 0 12px',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14, color: text2, margin: 0, lineHeight: 1.65, textAlign: 'justify' }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mid CTA */}
      {midCta && (
        <div style={{ background: dark, padding: '56px 0' }}>
          <div
            className={`${SECTION_INNER} lf-hero-grid`}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div style={{ flex: '1 1 320px' }}>
              <h2
                style={{
                  fontFamily: fontHead,
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontWeight: 700,
                  color: '#fff',
                  margin: '0 0 8px',
                  lineHeight: 1.25,
                }}
              >
                {midCta.title}
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', margin: 0 }}>{midCta.body}</p>
            </div>
            <PrimaryButton href={CONTACT_HREF}>{midCta.primaryLabel}</PrimaryButton>
          </div>
        </div>
      )}

      {/* Pricing table */}
      {pricingTiers.length > 0 && (
        <div style={{ background: bg, padding: '56px 0' }}>
          <div className={SECTION_INNER}>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 700,
                color: dark,
                margin: '0 0 28px',
                textAlign: 'center',
              }}
            >
              Pricing
            </h2>
            <div className="lf-pricing-table-wrap">
              <table className="lf-price-table">
                <thead>
                  <tr>
                    <th>Engagement</th>
                    <th>Investment</th>
                    <th>Timeline</th>
                    <th>Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTiers.map((tier) => (
                    <tr key={tier.type}>
                      <td style={{ fontWeight: 600, color: dark }}>{tier.type}</td>
                      <td style={{ fontWeight: 700, color: orange }}>{tier.investment}</td>
                      <td>{tier.timeline}</td>
                      <td style={{ color: text2, fontSize: 14 }}>{tier.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {goal.pricingFootnote && (
              <p
                style={{
                  marginTop: 24,
                  fontSize: 14,
                  color: text2,
                  lineHeight: 1.65,
                  maxWidth: 900,
                }}
              >
                {goal.pricingFootnote}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Workshop closing */}
      {goal.workshopClosing && (
        <div style={{ background: bg2, padding: '48px 0', borderTop: `1px solid ${border}` }}>
          <div className={SECTION_INNER}>
            <div
              style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: '32px 36px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <div style={{ flex: '1 1 280px' }}>
                <h2
                  style={{
                    fontFamily: fontHead,
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    fontWeight: 700,
                    color: dark,
                    margin: '0 0 8px',
                    lineHeight: 1.3,
                  }}
                >
                  {goal.workshopClosing.title}
                </h2>
                <p style={{ fontSize: 15, color: text2, margin: 0 }}>{goal.workshopClosing.body}</p>
              </div>
              <PrimaryButton href={CONTACT_HREF}>{goal.workshopClosing.ctaLabel}</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <div style={{ background: bg, padding: '56px 0 72px' }}>
          <div className={SECTION_INNER}>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 700,
                color: dark,
                margin: '0 0 28px',
                textAlign: 'center',
              }}
            >
              FAQ
            </h2>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              {faqs.map((faq) => (
                <details key={faq.question} className="lf-faq" style={{ borderBottom: `1px solid ${border}` }}>
                  <summary
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '20px 0',
                      cursor: 'pointer',
                      listStyle: 'none',
                      fontFamily: fontHead,
                      fontSize: 16,
                      fontWeight: 600,
                      color: dark,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ flex: 1 }}>Q: {faq.question}</span>
                    <span className="lf-faq-chevron" aria-hidden>
                      ▼
                    </span>
                  </summary>
                  <div style={{ paddingBottom: 20 }}>
                    <p style={{ fontSize: 15, color: text2, margin: 0, lineHeight: 1.75, textAlign: 'justify' }}>
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type PageParams = { slug: string; service: string; 'goal-based': string };

type PageProps = {
  params: Promise<PageParams>;
};

export function generateStaticParams(): PageParams[] {
  return [...getAllGoalStaticParams(), ...getAllPersonaStaticParams()];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, service: serviceParam, 'goal-based': segment } = await params;

  if (isPersonaSlug(segment)) {
    const personaRoute = resolvePersonaRoute(segment, serviceParam);
    if (!personaRoute) return { title: 'Service' };

    const { personaPage, servicePage, canonicalPath } = personaRoute;
    const title = personaPage.metaTitle ?? `${personaPage.title} | ClickMasters`;
    const description = personaPage.metaDescription;

    if (servicePage.categorySlug !== slug) {
      return { title, description };
    }

    const canonical = `${siteConfig.url}${canonicalPath}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        images: [
          {
            url: `${siteConfig.url}/og/services.webp`,
            width: 1200,
            height: 630,
            alt: `${personaPage.title} | ClickMasters`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [`${siteConfig.url}/og/services.webp`],
      },
    };
  }

  const goal = getGoalPage(segment, serviceParam);
  if (!goal || !goalPageMatchesService(goal, serviceParam)) {
    return { title: 'Goal' };
  }

  const servicePage = getServicePage(goal.serviceSlug);
  const title = goal.metaTitle ?? `${goal.title} | ClickMasters`;
  const description = goal.metaDescription;

  if (!servicePage || servicePage.categorySlug !== slug) {
    return { title, description };
  }

  const canonical = `${siteConfig.url}${getGoalCanonicalUrl(goal)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [
        {
          url: `${siteConfig.url}/og/services.webp`,
          width: 1200,
          height: 630,
          alt: `${goal.title} | ClickMasters`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/og/services.webp`],
    },
  };
}

export default async function GoalBasedLandingPage({ params }: PageProps) {
  const { slug, service: serviceParam, 'goal-based': segment } = await params;

  if (isPersonaSlug(segment)) {
    const personaRoute = resolvePersonaRoute(segment, serviceParam);
    if (!personaRoute) notFound();

    const { personaPage, servicePage, serviceSlug, canonicalPath } = personaRoute;

    if (servicePage.categorySlug !== slug) {
      permanentRedirect(canonicalPath);
    }

    const pageAbsoluteUrl = `${siteConfig.url}${canonicalPath}`;
    const personaLabel = personaPage.subtitle.replace(/^FOR\s+/i, '');

    const professionalServiceLd = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: personaPage.title,
      description: personaPage.metaDescription,
      url: pageAbsoluteUrl,
      provider: {
        '@type': 'Organization',
        name: 'ClickMasters',
        url: siteConfig.url,
      },
    };

    return (
      <>
        <Script
          id={`persona-service-${segment}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema(
                servicePage.serviceName ?? servicePage.title,
                personaPage.metaDescription,
                pageAbsoluteUrl
              )
            ),
          }}
        />
        <Script
          id={`persona-professional-${segment}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
        />
        <Script
          id={`persona-faq-${segment}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(personaPage.faqs ?? [])) }}
        />
        <Script
          id={`persona-breadcrumb-${segment}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: servicePage.category, url: `/${servicePage.categorySlug}` },
                { name: servicePage.serviceName, url: `/${servicePage.categorySlug}/${serviceSlug}` },
                { name: personaLabel, url: canonicalPath },
              ])
            ),
          }}
        />
        <PersonaPageClient
          page={personaPage}
          categorySlug={servicePage.categorySlug}
          serviceSlug={serviceSlug}
          serviceTitle={servicePage.title}
          categoryName={servicePage.category}
          serviceName={servicePage.serviceName}
        />
      </>
    );
  }

  const goal = getGoalPage(segment, serviceParam);
  if (!goal) notFound();
  if (!goalPageMatchesService(goal, serviceParam)) notFound();

  const servicePage = getServicePage(goal.serviceSlug);
  if (!servicePage) notFound();

  if (servicePage.categorySlug !== slug) {
    redirect(`/${servicePage.categorySlug}/${goal.serviceSlug}/${segment}`);
  }

  if (serviceParam !== goal.serviceSlug && goalPageMatchesService(goal, serviceParam)) {
    redirect(`/${servicePage.categorySlug}/${goal.serviceSlug}/${segment}`);
  }

  const parentServiceHref = `/${servicePage.categorySlug}/${servicePage.slug}`;
  const canonicalPath = getGoalCanonicalUrl(goal);
  const pageAbsoluteUrl = `${siteConfig.url}${canonicalPath}`;

  const professionalServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: goal.title,
    description: goal.metaDescription,
    url: pageAbsoluteUrl,
    provider: {
      '@type': 'Organization',
      name: 'ClickMasters',
      url: siteConfig.url,
    },
  };

  return (
    <>
      <Script
        id={`goal-service-${segment}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              goal.serviceName ?? goal.serviceSlug ?? 'Service',
              goal.metaDescription ?? goal.lead ?? '',
              pageAbsoluteUrl
            )
          ),
        }}
      />
      <Script
        id={`goal-professional-${segment}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
      />
      <Script
        id={`goal-faq-${segment}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(goal.faqs ?? [])) }}
      />
      <Script
        id={`goal-breadcrumb-${segment}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Services', url: '/services' },
              { name: goal.serviceName, url: `/services/${goal.serviceSlug}` },
              { name: goal.goalLabel, url: canonicalPath },
            ])
          ),
        }}
      />
      <GoalPageView goal={goal} parentServiceHref={parentServiceHref} />
    </>
  );
}
