'use client';

import Link from 'next/link';
import { useState, type CSSProperties, type ReactNode } from 'react';
import type { GoalPageContent } from '@/lib/goal-based';

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

const PARENT_SERVICE_LABEL = 'Wireframing & Prototyping';
const HERO_SUBTITLE = '8-12 Weeks to Production, Not Months';

const REGIONS = ['USA', 'UK', 'Canada', 'Australia', 'Europe'] as const;

type LaunchFasterGoalPageProps = {
  goal: GoalPageContent;
  parentServiceHref: string;
};

const pageWrap: CSSProperties = {
  fontFamily: fontBody,
  color: text,
  background: bg,
  lineHeight: 1.6,
};

const inner: CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 40px',
  boxSizing: 'border-box',
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
        fontSize: 11,
        color: text3,
        marginLeft: 12,
        flexShrink: 0,
      }}
      aria-hidden
    >
      ▼
    </span>
  );
}

export function LaunchFasterGoalPage({ goal, parentServiceHref }: LaunchFasterGoalPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const speedSection = goal.sections[0];
  const disciplineSection = goal.sections[1];
  const workshopPhase = goal.processPhases?.[0];
  const pricingTiers = goal.pricingTiers ?? [];
  const faqs = goal.faqs ?? [];
  const serviceCards = goal.servicesCards ?? [];
  const differentiators = goal.differentiators ?? [];
  const relatedGoals = goal.relatedGoals ?? [];
  const marketStats = goal.marketStats ?? [];
  const highlights = goal.highlights ?? [];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={pageWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .lf-inner { padding-left: 24px !important; padding-right: 24px !important; }
          .lf-hero-grid { grid-template-columns: 1fr !important; }
          .lf-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .lf-cards { grid-template-columns: 1fr !important; }
          .lf-pricing-row { flex-direction: column !important; align-items: flex-start !important; }
          .lf-related { grid-template-columns: 1fr !important; }
          .lf-diff { grid-template-columns: 1fr !important; }
          .lf-workshop { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .lf-stats { grid-template-columns: 1fr !important; }
        }
        a.lf-primary-btn:hover { background: ${orangeLight} !important; }
        a.lf-related-card:hover { border-color: ${orange} !important; }
      `}</style>

      {/* 1. Breadcrumb */}
      <div style={{ background: bg2, borderBottom: `1px solid ${border}`, padding: '16px 0' }}>
        <div className="lf-inner" style={inner}>
          <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: text3 }}>
            <Link href="/" style={{ color: text2, textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px', color: text3 }}>&gt;</span>
            <Link href="/services" style={{ color: text2, textDecoration: 'none' }}>
              Services
            </Link>
            <span style={{ margin: '0 8px', color: text3 }}>&gt;</span>
            <Link href={parentServiceHref} style={{ color: text2, textDecoration: 'none' }}>
              {PARENT_SERVICE_LABEL}
            </Link>
            <span style={{ margin: '0 8px', color: text3 }}>&gt;</span>
            <span style={{ color: orange, fontWeight: 600 }}>{goal.goalLabel}</span>
          </nav>
        </div>
      </div>

      {/* 2. Hero */}
      <div style={{ background: bg, padding: '56px 0 72px' }}>
        <div className="lf-inner" style={inner}>
          <div
            style={{
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
              marginBottom: 20,
            }}
          >
            Goal: Launch Faster
          </div>

          <h1
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: dark,
              lineHeight: 1.15,
              margin: '0 0 12px',
              maxWidth: 820,
            }}
          >
            Wireframing and Prototyping to Launch Faster
          </h1>

          <p
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 600,
              color: orange,
              margin: '0 0 20px',
            }}
          >
            {HERO_SUBTITLE}
          </p>

          <p style={{ fontSize: 17, color: text2, maxWidth: 720, margin: '0 0 28px' }}>{goal.lead}</p>

          <div style={{ marginBottom: 36 }}>
            <PrimaryButton href={CONTACT_HREF}>Book a Launch Scope Workshop</PrimaryButton>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 48,
            }}
          >
            {highlights.map((pill) => (
              <div
                key={pill}
                style={{
                  background: bg2,
                  border: `1px solid ${border}`,
                  borderRadius: 100,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: text,
                }}
              >
                {pill}
              </div>
            ))}
          </div>

          <div
            className="lf-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
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
        </div>
      </div>

      {/* 3. Dark banner */}
      {speedSection && (
        <div style={{ background: dark, padding: '64px 0' }}>
          <div className="lf-inner" style={inner}>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 20px',
                lineHeight: 1.25,
              }}
            >
              {speedSection.heading}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: 900 }}>
              {speedSection.body}
            </p>
          </div>
        </div>
      )}

      {/* 4. Approach intro */}
      <div style={{ background: bg, padding: '64px 0 32px' }}>
        <div className="lf-inner" style={inner}>
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
            The ClickMasters Approach
          </div>
          <h2
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 700,
              color: dark,
              margin: '0 0 24px',
              maxWidth: 700,
            }}
          >
            Wireframing, Prototyping, and Engineering — Built for Launch Speed
          </h2>
          <p style={{ fontSize: 16, color: text2, margin: '0 0 16px', maxWidth: 820 }}>
            ClickMasters combines wireframing, interactive prototyping, and production engineering in a
            fixed-scope sprint model designed to get real software in front of real users in 8–12 weeks —
            not months. Every engagement starts with a Launch Scope Workshop that challenges scope,
            maps dependencies, and sets a launch date before a single line of code is written.
          </p>
          <p style={{ fontSize: 16, color: text2, margin: 0, maxWidth: 820 }}>
            From sprint 1, CI/CD is configured for same-day deployment. Working software is demonstrated
            every two weeks at sprint review. Scope is locked in writing; external dependencies are
            tracked from week 1; and feature flags enable safe post-launch releases without blocking
            the production timeline.
          </p>
        </div>
      </div>

      {/* 5. Three service area cards */}
      <div style={{ background: bg, padding: '32px 0 64px' }}>
        <div className="lf-inner" style={inner}>
          <div
            className="lf-cards"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {serviceCards.map((card, i) => (
              <div
                key={card.title}
                style={{
                  background: i === 1 ? orangePale : bg2,
                  border: `1px solid ${i === 1 ? orangeBorder : border}`,
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
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: text2, margin: 0, lineHeight: 1.65 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Discipline Before Code */}
      {disciplineSection && (
        <div style={{ background: bg2, padding: '64px 0' }}>
          <div className="lf-inner" style={inner}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
                gap: 48,
                alignItems: 'start',
              }}
              className="lf-hero-grid"
            >
              <div>
                <h2
                  style={{
                    fontFamily: fontHead,
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 700,
                    color: dark,
                    margin: '0 0 16px',
                  }}
                >
                  {disciplineSection.heading}
                </h2>
                <p style={{ fontSize: 16, color: text2, margin: 0 }}>{disciplineSection.body}</p>
              </div>
              <div
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {(disciplineSection.items ?? []).map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        gap: 12,
                        alignItems: 'flex-start',
                        padding: '12px 0',
                        borderBottom: `1px solid ${border}`,
                        fontSize: 15,
                        color: text,
                      }}
                    >
                      <span
                        style={{
                          color: orange,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Mid CTA dark strip */}
      <div style={{ background: dark, padding: '56px 0' }}>
        <div
          className="lf-inner"
          style={{
            ...inner,
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
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 8px',
              }}
            >
              Ready to launch in 8–12 weeks?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              Fixed scope. CI/CD from sprint 1. Working software every two weeks.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <PrimaryButton href={CONTACT_HREF}>Get a Fixed-Price Proposal</PrimaryButton>
            <Link
              href={parentServiceHref}
              style={{
                display: 'inline-block',
                color: '#fff',
                fontFamily: fontHead,
                fontWeight: 600,
                fontSize: 14,
                padding: '14px 20px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 8,
              }}
            >
              View Full Service
            </Link>
          </div>
        </div>
      </div>

      {/* 8. Pricing table */}
      <div style={{ background: bg, padding: '64px 0' }}>
        <div className="lf-inner" style={inner}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: orange,
                fontFamily: fontHead,
                marginBottom: 12,
              }}
            >
              Investment
            </div>
            <h2
              style={{
                fontFamily: fontHead,
                fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: 700,
                color: dark,
                margin: 0,
              }}
            >
              Launch-Faster Pricing
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pricingTiers.map((tier, index) => {
              const isPopular = index === 1;
              return (
                <div
                  key={tier.type}
                  className="lf-pricing-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                    padding: '20px 24px',
                    borderRadius: 12,
                    background: isPopular ? orangePale : bg2,
                    border: `1px solid ${isPopular ? orangeBorder : border}`,
                    position: 'relative',
                  }}
                >
                  {isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        left: 24,
                        background: orange,
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: fontHead,
                        padding: '4px 10px',
                        borderRadius: 100,
                        letterSpacing: '0.04em',
                      }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div style={{ flex: '1 1 200px' }}>
                    <div
                      style={{
                        fontFamily: fontHead,
                        fontWeight: 700,
                        fontSize: 16,
                        color: dark,
                        marginBottom: 4,
                      }}
                    >
                      {tier.type}
                    </div>
                    <div style={{ fontSize: 13, color: text2 }}>{tier.bestFor}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: fontHead,
                        fontWeight: 700,
                        fontSize: 18,
                        color: isPopular ? orange : dark,
                      }}
                    >
                      {tier.investment}
                    </div>
                    <div style={{ fontSize: 13, color: text3 }}>{tier.timeline}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 9. Workshop CTA */}
      {workshopPhase && (
        <div style={{ background: bg2, padding: '64px 0' }}>
          <div className="lf-inner" style={inner}>
            <div
              style={{
                background: bg,
                border: `1px solid ${border}`,
                borderRadius: 20,
                padding: '40px 48px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 32,
                alignItems: 'center',
              }}
              className="lf-workshop lf-hero-grid"
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: orange,
                    fontFamily: fontHead,
                    marginBottom: 10,
                  }}
                >
                  {workshopPhase.phase} · {workshopPhase.timeline}
                </div>
                <h2
                  style={{
                    fontFamily: fontHead,
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 700,
                    color: dark,
                    margin: '0 0 12px',
                  }}
                >
                  {workshopPhase.title}
                </h2>
                <p style={{ fontSize: 15, color: text2, margin: 0, maxWidth: 640 }}>{workshopPhase.text}</p>
              </div>
              <PrimaryButton href={CONTACT_HREF}>Book Workshop</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* 10. FAQ accordion */}
      <div style={{ background: bg, padding: '64px 0' }}>
        <div className="lf-inner" style={inner}>
          <h2
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              color: dark,
              margin: '0 0 32px',
              textAlign: 'center',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  style={{
                    borderBottom: `1px solid ${border}`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '20px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: fontHead,
                      fontSize: 16,
                      fontWeight: 600,
                      color: dark,
                    }}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div style={{ paddingBottom: 20 }}>
                      <p style={{ fontSize: 15, color: text2, margin: 0, lineHeight: 1.7 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 11. Related goals + Why ClickMasters */}
      <div style={{ background: bg2, padding: '64px 0' }}>
        <div className="lf-inner" style={inner}>
          <h2
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: dark,
              margin: '0 0 24px',
            }}
          >
            Related Goals
          </h2>
          <div
            className="lf-related"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginBottom: 56,
            }}
          >
            {relatedGoals.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="lf-related-card"
                style={{
                  display: 'block',
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  textDecoration: 'none',
                  color: text,
                  fontFamily: fontHead,
                  fontWeight: 600,
                  fontSize: 15,
                  transition: 'border-color 0.2s',
                }}
              >
                {link.label} →
              </Link>
            ))}
          </div>

          <h2
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: dark,
              margin: '0 0 24px',
            }}
          >
            Why ClickMasters
          </h2>
          <div
            className="lf-diff"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
          >
            {differentiators.map((d) => (
              <div
                key={d.feature}
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: fontHead,
                    fontWeight: 700,
                    fontSize: 16,
                    color: dark,
                    marginBottom: 8,
                  }}
                >
                  {d.feature}
                </div>
                <div style={{ fontSize: 14, color: text2 }}>{d.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 12. Final CTA */}
      <div
        style={{
          background: `linear-gradient(135deg, ${dark} 0%, #2a2a4a 100%)`,
          padding: '72px 0',
        }}
      >
        <div className="lf-inner" style={{ ...inner, textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: fontHead,
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            Launch Your Product in 8–12 Weeks
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            Fixed-price wireframing, prototyping, and engineering — from scope workshop to production
            launch. Serving clients across five regions.
          </p>
          <div style={{ marginBottom: 28 }}>
            <PrimaryButton href={CONTACT_HREF}>Start Your Launch Scope Workshop</PrimaryButton>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {REGIONS.map((region) => (
              <Link
                key={region}
                href={CONTACT_HREF}
                style={{
                  display: 'inline-block',
                  padding: '8px 18px',
                  borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: fontHead,
                  textDecoration: 'none',
                }}
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
