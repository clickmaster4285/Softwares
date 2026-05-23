import { getServicePage } from '@/lib/service-pages';
import {
  servicePages,
  type ServicePageData,
  type PricingTier,
  type ServiceSection,
} from '@/src/lib/persona-based';

export type { ServicePageData, PricingTier, ServiceSection };

export const PERSONA_SUFFIXES = [
  '-for-enterprise-it-directors',
  '-for-non-technical-ceos',
  '-for-product-managers',
  '-for-startup-founders',
  '-for-ctos',
] as const;

export type PersonaRouteParams = {
  slug: string;
  service: string;
  'goal-based': string;
};

export type ResolvedPersonaRoute = {
  personaPage: ServicePageData;
  serviceSlug: string;
  servicePage: NonNullable<ReturnType<typeof getServicePage>>;
  canonicalPath: string;
};

export function baseServiceSlugFromPersona(personaSlug: string): string {
  for (const suffix of PERSONA_SUFFIXES) {
    if (personaSlug.endsWith(suffix)) {
      return personaSlug.slice(0, -suffix.length);
    }
  }
  return personaSlug;
}

export function getPersonaPage(slug: string): ServicePageData | undefined {
  return servicePages.find((p) => p.slug === slug);
}

export function getAllPersonaSlugs(): string[] {
  return servicePages
    .map((p) => p.slug)
    .filter((s) => s.includes('-for-'));
}

export function isPersonaSlug(slug: string): boolean {
  return PERSONA_SUFFIXES.some((suffix) => slug.endsWith(suffix));
}

export function getPersonaCanonicalPath(
  personaSlug: string,
  servicePage: NonNullable<ReturnType<typeof getServicePage>>
): string {
  return `/${servicePage.categorySlug}/${servicePage.slug}/${personaSlug}`;
}

export function resolvePersonaRoute(
  personaSlug: string,
  serviceParam: string
): ResolvedPersonaRoute | undefined {
  const personaPage = getPersonaPage(personaSlug);
  if (!personaPage) return undefined;

  const serviceSlug = baseServiceSlugFromPersona(personaSlug);
  if (serviceParam !== serviceSlug) return undefined;

  const servicePage = getServicePage(serviceSlug);
  if (!servicePage) return undefined;

  return {
    personaPage,
    serviceSlug,
    servicePage,
    canonicalPath: getPersonaCanonicalPath(personaSlug, servicePage),
  };
}

export function getAllPersonaStaticParams(): PersonaRouteParams[] {
  return getAllPersonaSlugs()
    .map((personaSlug) => {
      const serviceSlug = baseServiceSlugFromPersona(personaSlug);
      const servicePage = getServicePage(serviceSlug);
      if (!servicePage) return null;
      return {
        slug: servicePage.categorySlug,
        service: serviceSlug,
        'goal-based': personaSlug,
      };
    })
    .filter((p): p is PersonaRouteParams => p !== null);
}

export function getAllPersonaSitemapPaths(): string[] {
  return getAllPersonaStaticParams().map(
    (p) => `/${p.slug}/${p.service}/${p['goal-based']}`
  );
}

/** Strip emojis, dingbats, and decorative symbols from generated copy. */
export function stripEmojis(text: string): string {
  return text
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .replace(/[\u2600-\u27BF]/g, '')
    .replace(/[✓✔☑►▸•◦]/g, '')
    .replace(/\uFE0F/g, '');
}

export function cleanText(text: string): string {
  return stripEmojis(text)
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s*–\s*/g, ', ')
    .replace(/\s*→\s*/g, ': ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function splitBullets(bullets?: string[]): string[] {
  if (!bullets?.length) return [];
  return bullets
    .flatMap((line) => line.split(/\s*✓\s*/))
    .map((s) => cleanText(s))
    .filter(Boolean);
}

export function toPricingTiers(pricing: PricingTier[]) {
  return pricing
    .filter((t) => /\$\d/.test(t.investment))
    .filter((t) => !/^all clickmasters/i.test(t.engagement))
    .map((t) => ({
      type: t.engagement,
      investment: t.investment,
      timeline: t.timeline,
      bestFor: t.scope,
    }));
}

export function getRealPricingRows(pricing: PricingTier[]) {
  return pricing.filter(
    (t) =>
      /\$\d/.test(t.investment) &&
      !/^all clickmasters/i.test(t.engagement)
  );
}

export function getPricingCtaRow(pricing: PricingTier[]) {
  return pricing.find(
    (t) =>
      /^all clickmasters/i.test(t.engagement) ||
      /book|request|consultation/i.test(t.investment)
  );
}

export function getFeatureSection(page: ServicePageData) {
  return page.sections.find((s) => s.title === 'Features');
}

export function getPillarSections(page: ServicePageData) {
  return page.sections.filter(
    (s) =>
      s.title !== 'Features' &&
      s.title !== 'Knowledge Transfer' &&
      s.body.length > 0 &&
      s.body.length < 900
  );
}

export function getLongFormSection(page: ServicePageData) {
  const knowledge = page.sections.find((s) => s.title === 'Knowledge Transfer');
  if (knowledge?.body && knowledge.body.length > 200) return knowledge;
  return (
    page.sections.find((s) => s.body.length >= 900) ??
    page.sections.filter((s) => s.title !== 'Features').at(-1)
  );
}

export function serviceDisplayName(page: ServicePageData): string {
  const t = page.title.replace(/\s+FOR\s+.+$/i, '').trim();
  return t || page.title;
}
