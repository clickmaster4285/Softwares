import { Metadata } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
//  SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'ClickMasters',
 
  title:
    'ClickMasters – Software Development Company',
 
  description:
    'ClickMasters is a leading software development company providing custom web development, mobile app development, SaaS platforms, and ERP solutions for startups and enterprises worldwide.',
 
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://clickmasters.pk',
 
  ogImage: '/og/default.webp',
 
  twitterHandle: '@clickmasters',
 
  locale: 'en_US',
 
  keywords: [
    // ─── Core / Brand ───────────────────────────────────────────
    'ClickMasters',
    'ClickMasters software company',
    'ClickMasters Pakistan',
 
    // ─── High-Volume Head Terms ──────────────────────────────────
    'software development company',
    'software development services',
    'custom software development',
    'software development agency',
    'software development firm',
    'top software development company',
    'best software development company',
    'leading software development company',
    'software company',
    'IT company',
    'IT solutions company',
    'technology company',
    'digital solutions company',
 
    // ─── Web Development ────────────────────────────────────────
    'web development company',
    'web development services',
    'custom web development',
    'web application development',
    'web app development company',
    'full stack web development',
    'frontend development services',
    'backend development services',
    'responsive web design',
    'website development company',
    'website design and development',
    'progressive web app development',
    'PWA development company',
 
    // ─── Mobile App Development ─────────────────────────────────
    'mobile app development',
    'mobile app development company',
    'mobile application development services',
    'iOS app development',
    'Android app development',
    'cross-platform app development',
    'React Native development',
    'Flutter app development',
    'hybrid mobile app development',
    'enterprise mobile app development',
 
    // ─── SaaS & Product Development ─────────────────────────────
    'SaaS development',
    'SaaS application development',
    'SaaS product development company',
    'software as a service development',
    'cloud application development',
    'cloud software development',
    'B2B SaaS development',
    'multi-tenant SaaS development',
 
    // ─── ERP & Enterprise ────────────────────────────────────────
    'ERP software development',
    'ERP solutions',
    'custom ERP development',
    'enterprise software solutions',
    'enterprise software development',
    'enterprise application development',
    'business software development',
    'CRM software development',
    'custom CRM development',
    'inventory management software',
    'HRM software development',
 
    // ─── Tech Stack ──────────────────────────────────────────────
    'React development',
    'Next.js development',
    'Node.js development',
    'MERN stack development',
    'MEAN stack development',
    'TypeScript development',
    'JavaScript development company',
    'Python development company',
    'Django development services',
    'Laravel development',
    'PHP development company',
    'REST API development',
    'GraphQL API development',
 
    // ─── Cloud & DevOps ──────────────────────────────────────────
    'cloud-native development',
    'AWS development services',
    'cloud migration services',
    'DevOps services',
    'CI/CD pipeline setup',
    'microservices development',
    'serverless application development',
 
    // ─── AI & Emerging Tech ─────────────────────────────────────
    'AI software development',
    'AI-powered application development',
    'machine learning development',
    'AI integration services',
    'chatbot development services',
    'generative AI development',
 
    // ─── UI/UX ───────────────────────────────────────────────────
    'UI UX design services',
    'product design services',
    'UX research and design',
 
    // ─── Outsourcing & Engagement Models ────────────────────────
    'software outsourcing company',
    'software development outsourcing',
    'offshore software development',
    'offshore development company',
    'dedicated development team',
    'staff augmentation services',
    'hire software developers',
    'remote development team',
    'IT outsourcing services',
 
    // ─── Startup & SMB Focused ───────────────────────────────────
    'startup software solutions',
    'startup app development',
    'MVP development company',
    'minimum viable product development',
    'software development for startups',
    'digital transformation services',
    'digital product development',
 
    // ─── Industry Verticals ──────────────────────────────────────
    'fintech software development',
    'healthcare software development',
    'edtech app development',
    'e-commerce development',
    'logistics software development',
    'real estate software development',
 
    // ─── Pakistan / Local SEO ────────────────────────────────────
    'software house Pakistan',
    'software house Islamabad',
    'software house Karachi',
    'software house Lahore',
    'IT solutions Pakistan',
    'software development company Pakistan',
    'software development company Islamabad',
    'web development company Pakistan',
    'mobile app development Pakistan',
    'best software house in Pakistan',
    'affordable software development Pakistan',
 
    // ─── Long-Tail / High-Intent ─────────────────────────────────
    'custom software development company for startups',
    'hire dedicated software development team',
    'full stack development company for enterprise',
    'affordable custom web app development',
    'best ERP software development company',
    'end-to-end software product development',
    'software development company with free consultation',
    'agile software development company',
    'scalable software solutions for businesses',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  JSON-LD SCHEMA HELPERS
//  Inject these via <script type="application/ld+json"> in your page/layout.
//  Add organizationSchema + webSiteSchema to your root layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

/** Organization – goes in root layout.tsx */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
 
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.webp`,
 
  description: siteConfig.description,
 
  sameAs: [
    'https://www.linkedin.com/company/clickmasters-digital-marketing-agency',
  ],
 
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'English',
    url: `${siteConfig.url}/contact`,
  },
};
 

/** WebSite – enables Google Sitelinks Search Box */
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',

  name: siteConfig.name,
  url: siteConfig.url,

  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** Breadcrumbs – call on every inner page */
// export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: crumbs.map((c, i) => ({
//       '@type': 'ListItem',
//       position: i + 1,
//       name: c.name,
//       item: c.url,
//     })),
//   };
// }

/** FAQ rich results – use on any page that has a FAQ section */
// export function faqSchema(items: { question: string; answer: string }[]) {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'FAQPage',
//     mainEntity: items.map((item) => ({
//       '@type': 'Question',
//       name: item.question,
//       acceptedAnswer: { '@type': 'Answer', text: item.answer },
//     })),
//   };
// }

/** Service – use on /services or individual service pages */
export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',

    serviceType: name,

    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },

    description,
    url,
  };
}

/** SoftwareApplication / case study – use on /solutions/[slug] */
export function softwareAppSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',

    name: opts.name,
    description: opts.description,
    url: opts.url,

    applicationCategory: 'BusinessApplication',

    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}


/**
 * AggregateRating – add to /testimonials page.
 * Unlocks star ratings in Google SERPs.
 * Update ratingValue and reviewCount with real numbers.
 */
// export const aggregateRatingSchema = {
//   '@context': 'https://schema.org',
//   '@type': 'Organization',
//   name: siteConfig.name,
//   url: siteConfig.url,
//   aggregateRating: {
//     '@type': 'AggregateRating',
//     ratingValue: '4.9',
//     reviewCount: '112',   // ← replace with real count
//     bestRating: '5',
//     worstRating: '1',
//   },
// };

/**
 * LocalBusiness – add to /contact page.
 * Replace address, telephone, and hours with real values.
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',

  '@id': `${siteConfig.url}/#business`,

  name: siteConfig.name,
  url: siteConfig.url,

  logo: `${siteConfig.url}/logo.webp`,
  image: `${siteConfig.url}/og/default.webp`,

  description: siteConfig.description,

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'PWD Housing Society',
    addressLocality: 'Islamabad',
    addressRegion: 'Punjab',
    postalCode: '45700',
    addressCountry: 'PK',
  },

  telephone: '+92-332-5394285',

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
//  DEFAULT / FALLBACK METADATA  (used in root layout.tsx)
// ─────────────────────────────────────────────────────────────────────────────

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: '%s | ClickMasters',
  },

  description: siteConfig.description,

  keywords: siteConfig.keywords,

  alternates: {
    canonical: siteConfig.url,
  },

  icons: {
    icon: [{ url: '/logo-white.webp', type: 'image/webp' }],
    apple: '/logo-white.webp',
    shortcut: '/logo-white.webp',
  },

  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,

    title: siteConfig.title,
    description: siteConfig.description,

    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'ClickMasters Software Development Company',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,

    title: siteConfig.title,
    description: siteConfig.description,

    images: [`${siteConfig.url}/og/default.webp`],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'tH8GZm7N2hbAICQfeQEs4YejO057UvY4eJBWLkHHJxU',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  PER-PAGE METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadataConfig = {

  // ── / (Home) ────────────────────────────────────────────────────────────────
 home: (): Metadata => ({
    title: 'Software Development Company',
    description: 'ClickMasters delivers custom web apps, mobile apps, and ERP systems for growing businesses. 10+ years experience · 100+ projects shipped · Free consultation.',
    alternates: { canonical: siteConfig.url },
    openGraph: {
      title: 'ClickMasters – Custom Software Development for Growing Businesses',
      description: 'Web apps, mobile apps, and ERP solutions built by an expert team. 100+ projects delivered worldwide. Book a free consultation.',
      url: siteConfig.url,
      images: [
        {
          url: `${siteConfig.url}/og/home.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters – Custom Software Development Company',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ClickMasters – Custom Software Development',
      description: 'Web apps, mobile apps & ERP. 10+ years of expertise, 100+ projects delivered. Get a free quote.',
      images: [`${siteConfig.url}/og/home.webp`],
    },
  }),

  // ── /about ──────────────────────────────────────────────────────────────────
  about: (): Metadata => ({
    title: 'About Us – Experienced Software Development Team',
    description:
      'Meet the ClickMasters team: 10+ years of experience, 50+ engineers, and 100+ successful projects across fintech, healthcare, retail, and logistics. Learn our story.',
    alternates: { canonical: `${siteConfig.url}/about` },
    openGraph: {
      title: 'About ClickMasters – 10+ Years Building Reliable Software',
      description:
        '50+ engineers. 100+ projects. Industries from fintech to logistics. Discover our mission, values, and what makes us different.',
      url: `${siteConfig.url}/about`,
      images: [
        {
          url: `${siteConfig.url}/og/about.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters team – software development company',
        },
      ],
    },
    twitter: {
      title: 'About ClickMasters – Our Team & Story',
      description:
        '10+ years, 50+ engineers, 100+ projects. Meet the team behind world-class custom software.',
      images: [`${siteConfig.url}/og/about.webp`],
    },
  }),

  // ── /services ───────────────────────────────────────────────────────────────
  services: (): Metadata => ({
    title: 'Software Development Services – Web, Mobile App & ERP',
    description:
      'Full-cycle software development: custom web apps, iOS & Android apps, ERP systems, API integrations, and cloud solutions. Get a free consultation today.',
    alternates: { canonical: `${siteConfig.url}/services` },
    openGraph: {
      title: 'Software Development Services – Web, Mobile & ERP | ClickMasters',
      description:
        'Full-cycle development for web apps, mobile apps, ERP, APIs, and cloud. Tailored to your business. Free consultation available.',
      url: `${siteConfig.url}/services`,
      images: [
        {
          url: `${siteConfig.url}/og/services.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters software development services',
        },
      ],
    },
    twitter: {
      title: 'Software Development Services | ClickMasters',
      description:
        'Web apps, mobile apps, ERP, APIs & cloud. Full-cycle development tailored to your business. Free consultation.',
      images: [`${siteConfig.url}/og/services.webp`],
    },
  }),

  // ── /solutions ──────────────────────────────────────────────────────────────
  solutions: (): Metadata => ({
    title: 'Case Studies & Software Solutions Portfolio',
    description:
      'Browse 100+ custom software projects: web platforms, mobile apps, and enterprise ERP systems across fintech, healthcare, retail, and logistics. See real results.',
    alternates: { canonical: `${siteConfig.url}/solutions` },
    openGraph: {
      title: 'Software Solutions Portfolio – 100+ Projects | ClickMasters',
      description:
        '100+ delivered projects across fintech, healthcare, retail, and logistics. Real results, real clients. Explore our portfolio.',
      url: `${siteConfig.url}/solutions`,
      images: [
        {
          url: `${siteConfig.url}/og/solutions.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters software solutions portfolio',
        },
      ],
    },
    twitter: {
      title: 'Software Portfolio – 100+ Projects | ClickMasters',
      description:
        'Real results across fintech, healthcare, retail & logistics. 100+ custom software projects delivered.',
      images: [`${siteConfig.url}/og/solutions.webp`],
    },
  }),

  // ── /testimonials ───────────────────────────────────────────────────────────
  testimonials: (): Metadata => ({
    title: 'Client Reviews & Testimonials – Rated 4.9/5',
    description:
      'See why 100+ clients rate ClickMasters 4.9/5. Verified reviews from businesses in fintech, healthcare, retail, and logistics who trusted us with their software.',
    alternates: { canonical: `${siteConfig.url}/testimonials` },
    openGraph: {
      title: 'ClickMasters Reviews – Rated 4.9/5 by 100+ Clients',
      description:
        'Verified client reviews from fintech, healthcare, retail, and logistics. 100+ projects, 4.9/5 average rating.',
      url: `${siteConfig.url}/testimonials`,
      images: [
        {
          url: `${siteConfig.url}/og/testimonials.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters client testimonials and reviews',
        },
      ],
    },
    twitter: {
      title: 'Client Reviews – Rated 4.9/5 | ClickMasters',
      description:
        '100+ clients. 4.9/5 average rating. Real reviews from businesses who built their software with ClickMasters.',
      images: [`${siteConfig.url}/og/testimonials.webp`],
    },
  }),

  // ── /contact ────────────────────────────────────────────────────────────────
  contact: (): Metadata => ({
    title: 'Contact Us – Get a Free Software Development Quote',
    description:
      'Start your project with ClickMasters. Share your requirements and get a free, no-obligation quote from our expert team within 24 hours.',
    alternates: { canonical: `${siteConfig.url}/contact` },
    openGraph: {
      title: 'Contact ClickMasters – Free Software Development Consultation',
      description:
        'Share your project requirements and hear back within 24 hours. No-obligation consultation with expert developers.',
      url: `${siteConfig.url}/contact`,
      images: [
        {
          url: `${siteConfig.url}/og/contact.webp`,
          width: 1200,
          height: 630,
          alt: 'Contact ClickMasters – free software development consultation',
        },
      ],
    },
    twitter: {
      title: 'Get a Free Consultation | ClickMasters',
      description:
        'Tell us about your project. Our team responds within 24 hours with a no-obligation quote.',
      images: [`${siteConfig.url}/og/contact.webp`],
    },
  }),

  // ── /solutions/[slug] ───────────────────────────────────────────────────────
  solutionsDetail: (
    title: string,
    description: string,
    slug: string,
    ogImageUrl?: string,
  ): Metadata => ({
    title: `${title} – Custom Software Case Study`,
    description:
      description ||
      `See how ClickMasters built a custom ${title} solution. Explore the tech stack, challenges solved, and measurable results delivered.`,
    alternates: {
      canonical: `${siteConfig.url}/solutions/${slug}`,
    },
    openGraph: {
      title: `${title} | Software Solution by ClickMasters`,
      description:
        description ||
        `How ClickMasters built a custom ${title} solution – tech stack, challenges, and results.`,
      url: `${siteConfig.url}/solutions/${slug}`,
      images: [
        {
          url: ogImageUrl || `${siteConfig.url}/og/solutions.webp`,
          width: 1200,
          height: 630,
          alt: `${title} – software solution by ClickMasters`,
        },
      ],
    },
    twitter: {
      title: `${title} | ClickMasters Case Study`,
      description:
        description ||
        `See how ClickMasters delivered a custom ${title} solution – stack, challenges, and results.`,
      images: [ogImageUrl || `${siteConfig.url}/og/solutions.webp`],
    },
  }),

  // ── Admin pages (no-index – never appear in search results) ─────────────────
  admin: {
    login: (): Metadata => ({
      title: 'Admin Login | ClickMasters',
      description: 'Secure admin access for ClickMasters platform.',
      robots: { index: false, follow: false },
    }),
    dashboard: (): Metadata => ({
      title: 'Admin Dashboard | ClickMasters',
      description: 'Manage your ClickMasters content and settings.',
      robots: { index: false, follow: false },
    }),
    categories: (): Metadata => ({
      title: 'Manage Categories | ClickMasters Admin',
      description: 'Manage project categories for ClickMasters.',
      robots: { index: false, follow: false },
    }),
    solutions: (): Metadata => ({
      title: 'Manage Solutions | ClickMasters Admin',
      description: 'Manage software solutions and projects.',
      robots: { index: false, follow: false },
    }),
    testimonials: (): Metadata => ({
      title: 'Manage Testimonials | ClickMasters Admin',
      description: 'Manage client testimonials.',
      robots: { index: false, follow: false },
    }),
  },
};
