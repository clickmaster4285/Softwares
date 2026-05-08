import { Metadata } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
//  SITE CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Clickmasters Digital Marketing Agency',
 
  title:
    'ClickMasters – Software Development Company',
 
  description:
  "ClickMasters is a professional custom software development company " +
  "building web apps, mobile apps, SaaS, AI systems, and enterprise software.", 
 
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://software.clickmasters.pk',
 
  ogImage: '/og/logo-white.webp',
 
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
  logo: `${siteConfig.url}/images/logo-white.webp`,
 
  description: siteConfig.description,
 
  sameAs: [
    'https://www.linkedin.com/company/clickmasters-digital-marketing-agency',
    'https://www.instagram.com/clickmasters.pk/',
    'https://www.facebook.com/clickmasterspvtltd',
    'https://www.youtube.com/@clickmastersofficial',
    'https://www.pinterest.com/clickmasters00/',
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
  '@id': `${siteConfig.url}/#website`,

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

/** Additional WebSite schema for blog sitelinks searchbox */
export const webSiteBlogSearchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ClickMasters',
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** Additional homepage Organization schema */
export const homepageOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: 'ClickMasters',
  alternateName: 'ClickMasters Software',
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-white.webp`,
  image: `${siteConfig.url}/og-image.jpg`,
  description:
    'ClickMasters is a professional custom software development company ' +
    'building web apps, mobile apps, SaaS, AI systems, and enterprise software.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main PWD Rd, PWD Housing Society Sector A',
    addressLocality: 'Islamabad',
    addressRegion: 'Punjab',
    postalCode: '45700',
    addressCountry: 'PK',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+92-332-5394285',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/clickmasters',
    'https://twitter.com/clickmasters',
  ],
};

/** Additional homepage service catalog schema */
export const homepageServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/#primary-service`,
  name: 'Custom Software Development Services',
  serviceType: 'Custom Software Development',
  description:
    'Professional custom software development services including web apps, mobile apps, SaaS, AI, and enterprise systems.',
  url: siteConfig.url,
  provider: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: 'ClickMasters',
    url: siteConfig.url,
  },
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Software Development',
          description: 'Tailored software built for your business needs',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Application Development',
          description: 'Modern web apps with React, Next.js and cloud hosting',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform iOS and Android apps',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SaaS Product Development',
          description: 'End-to-end SaaS platform development and scaling',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI & Automation Systems',
          description:
            'AI-powered software and intelligent automation solutions',
        },
      },
    ],
  },
};

/** Additional homepage FAQ schema */
export const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteConfig.url}/#faq`,
  mainEntityOfPage: `${siteConfig.url}/`,
  inLanguage: 'en',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does custom software development cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Custom software development costs vary based on complexity, features, and timeline. A basic web application typically starts from $5,000–$15,000, while enterprise systems range from $30,000–$200,000+. We provide free consultations to give accurate project estimates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a custom software application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Development timelines depend on the project scope. An MVP takes 6–12 weeks, a full web or mobile application takes 3–6 months, and enterprise systems can take 6–18 months. We use agile sprints to deliver working software every 2 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does ClickMasters use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We use modern, proven technologies including React, Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, MongoDB, AWS, Google Cloud, and Azure. We choose the best stack for each project's specific needs.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide post-launch support and maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ClickMasters provides 24/7 post-launch support, security updates, performance monitoring, and feature development. We offer monthly maintenance plans to keep your software running smoothly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can ClickMasters work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with clients across the USA, Europe, Middle East, and worldwide. Our team operates across time zones and uses agile project management tools to ensure seamless collaboration regardless of location.',
      },
    },
  ],
};

/** Additional homepage webpage schema for rich result context */
export const homepageWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.url}/#webpage`,
  url: `${siteConfig.url}/`,
  name: 'Custom Software Development That Scales Your Business Revenue ',
  description:
    'Software development company & software house: custom software solutions, web & mobile apps, SaaS, and ERP. Expert software developers.',
  inLanguage: 'en',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: 'ClickMasters',
  },
  about: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: 'ClickMasters',
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/og-image.jpg`,
    width: 1200,
    height: 630,
  },
};

export type BreadcrumbItem = {
  name: string;
  url: string;
};

function toAbsoluteUrl(url: string) {
  if (!url) return siteConfig.url;
  if (/^https?:\/\//i.test(url)) return url;
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  return `${siteConfig.url}${normalizedPath}`;
}

/** Breadcrumbs – call on every inner page */
export function breadcrumbSchema(crumbs: BreadcrumbItem[]) {
  const cleanedCrumbs = crumbs
    .map((crumb) => ({
      name: crumb.name?.trim(),
      url: toAbsoluteUrl(crumb.url?.trim()),
    }))
    .filter((crumb) => Boolean(crumb.name && crumb.url));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: cleanedCrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

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

/** SoftwareApplication / case study – use on /software-solutions/[slug] */
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

  logo: `${siteConfig.url}/images/logo-white.webp`,
  image: `${siteConfig.url}/og/logo-white.webp`,

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
  icon: '/favicon.svg',
  shortcut: '/favicon.svg',
  apple: '/favicon.svg',
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

    images: [`${siteConfig.url}/og/logo-white.webp`],
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
//  All titles are under 60 characters and descriptions under 160 characters
// ─────────────────────────────────────────────────────────────────────────────

export const metadataConfig = {

  // ── / (Home) ────────────────────────────────────────────────────────────────
home: (): Metadata => ({
  title: 'Best Software Development Company in Pakistan',

  description: 'Leading software development company in Pakistan building web apps, mobile apps, SaaS, AI, and ERP. Hire expert developers for scalable digital products.',

  keywords: [
    'best software development company in Pakistan',
    'software development company in Pakistan',
    'top software house in Pakistan',
    'custom software development company',
    'software development services Pakistan',
    'hire software developers Pakistan',
    'web application development company',
    'mobile app development company',
    'SaaS development company',
    'enterprise software solutions',
    'AI software development company',
    'full stack development agency',
    'software outsourcing company',
    'ERP software development',
    'startup software development partner',
  ],

  alternates: {
    canonical: siteConfig.url,
  },

  openGraph: {
    title: 'Best Software Development Company in Pakistan',

    description: 'Leading software development company in Pakistan building web apps, mobile apps, SaaS, AI, and ERP. Hire expert developers for scalable digital products.',

    url: siteConfig.url,
    siteName: 'ClickMasters',
    type: 'website',

    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Best Software Development Company in Pakistan - ClickMasters',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Best Software Development Company in Pakistan',

    description: 'Leading software development company in Pakistan building web apps, mobile apps, SaaS, AI, and ERP. Hire expert developers for scalable digital products.',

    images: [`${siteConfig.url}/og-image.webp`],
  },
}),

  // ── /about ──────────────────────────────────────────────────────────────────
about: (): Metadata => ({
  title: 'ClickMasters Software Dev Company | The Team Behind 100+ Products',
  description: '50+ engineers. 100+ products shipped. 10+ years building web apps, mobile apps, SaaS & AI solutions for startups and global enterprises.',
  alternates: { canonical: `${siteConfig.url}/about-us` },
  openGraph: {
    title: 'Meet ClickMasters — A Leading Software Development Company',
    description: 'From a small development team to 50+ engineers delivering 100+ software products worldwide — ClickMasters builds web, mobile, SaaS & AI solutions.',
    url: `${siteConfig.url}/about-us`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'ClickMasters engineering team — software development company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClickMasters Software Development Company | AI & Software',
    description: '50+ engineers. 100+ projects. 10+ years. ClickMasters builds scalable digital solutions worldwide.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),

 


// ── /services/[slug] ────────────────────────────────────────────────────────
  serviceDetail: (title: string, description: string, slug: string): Metadata => ({
    title: `${title} Services | ClickMasters`,
    description: description.slice(0, 155),
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
    openGraph: {
      title: `${title} Services | ClickMasters`,
      description: description.slice(0, 155),
      url: `${siteConfig.url}/services/${slug}`,
      images: [
        {
          url: `${siteConfig.url}/og/logo-white.webp`,
          width: 1200,
          height: 630,
          alt: `${title} — ClickMasters software services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} Services | ClickMasters`,
      description: description.slice(0, 155),
      images: [`${siteConfig.url}/og/logo-white.webp`],
    },
  }),

  // ── /services ───────────────────────────────────────────────────────────────
  services: (): Metadata => ({
    title: 'Software Development Services | Web, Mobile & ERP',
    description: 'Full-cycle custom software: web apps, mobile, ERP, APIs, and cloud. Trusted software development company. Book a free consult.',
    alternates: { canonical: `${siteConfig.url}/services` },
    openGraph: {
      title: 'Software Development Services | Web, Mobile & ERP',
      description: 'Full-cycle development for web apps, mobile apps, ERP, APIs, and cloud. Tailored to your business. Free consultation available.',
      url: `${siteConfig.url}/services`,
      images: [
        {
          url: `${siteConfig.url}/og/logo-white.webp`,
          width: 1200,
          height: 630,
          alt: 'ClickMasters software development services',
        },
      ],
    },
    twitter: {
      title: 'Software Development Services | ClickMasters',
      description: 'Web apps, mobile apps, ERP, APIs & cloud. Full-cycle development tailored to your business.',
      images: [`${siteConfig.url}/og/logo-white.webp`],
    },
  }),

 
 
 
 
 
 
 
  // ── /software-solutions ─────────────────────────────────────────────────────
solutions: (): Metadata => ({
  title: 'What We’ve Built | 100+ Scalable Software Systems',
  description: 'Explore how ClickMasters builds software that powers real businesses. From high-performance web platforms to enterprise SaaS and ERP systems — discover 100+ production-grade solutions.',
  alternates: { canonical: `${siteConfig.url}/software-solutions` },
  openGraph: {
    title: '100+ Production-Grade Software Systems Built for Growth',
    description: 'Not prototypes — production systems used by real businesses. See how ClickMasters engineers scalable software for fintech, healthcare, retail, and logistics.',
    url: `${siteConfig.url}/software-solutions`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'ClickMasters AI software portfolio of real scalable systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100+ Scalable Software Systems Built for Real Businesses',
    description: 'Real production software powering fintech, healthcare, retail & logistics companies — built for scale and performance.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),












  // ── /case-studies ────────────────────────────────────────────────────────────
caseStudies: (): Metadata => ({
  title: 'How Businesses Turn Ideas Into High-Performance Software',
  description: 'Explore real transformation stories from ClickMasters — where startups and enterprises turn complex ideas into powerful web apps, mobile apps, and SaaS platforms.',
  alternates: { canonical: `${siteConfig.url}/case-studies` },
  openGraph: {
    title: 'From Idea to Impact — Real Software Transformations',
    description: 'Real engineering stories. See how ClickMasters builds scalable systems that power businesses across the USA, Europe, and the Middle East.',
    url: `${siteConfig.url}/case-studies`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'ClickMasters real software transformation case studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Idea to Impact | Real Software That Scales',
    description: 'See how real businesses build scalable software that performs under pressure — AI, SaaS, and enterprise systems built for growth.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),








  // ── /blog ────────────────────────────────────────────────────────────────────
blog: (): Metadata => ({
  title: 'The Hidden Formula Behind Fast-Growing Software Products',
  description: 'Discover the real engineering principles behind successful systems. Learn how scalable AI platforms, SaaS products, and modern web apps are built to handle millions of users.',
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: 'What Makes Software Scale? The Engineering Truth',
    description: 'Not trends — real engineering. See how production-grade AI systems, SaaS platforms, and scalable applications are designed and built to survive growth and demand.',
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'ClickMasters AI software engineering insights blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Secret Behind Scalable Software',
    description: 'Real engineering behind high-growth SaaS, AI systems, and scalable software built for performance and millions of users.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),

 
 
 
 
 
 
 
 
 
 
  // ── /testimonials ───────────────────────────────────────────────────────────
testimonials: (): Metadata => ({
  title: 'Why 100+ Businesses Trust ClickMasters',
  description: 'See why startups and enterprises rate ClickMasters 4.9/5. Real success stories from fintech, healthcare, retail, and logistics building scalable web apps, mobile apps, and SaaS.',
  alternates: { canonical: `${siteConfig.url}/testimonials` },
  openGraph: {
    title: 'They Chose ClickMasters — And Built Software That Scales',
    description: '100+ real businesses. 4.9/5 rating. Discover why clients trust ClickMasters to turn ideas into powerful, revenue-driving digital products.',
    url: `${siteConfig.url}/testimonials`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'Client success stories at ClickMasters',
      },
    ],
  },
  twitter: {
    title: 'Why 100+ Clients Trust ClickMasters | 4.9/5 Rated',
    description: 'Real businesses. Real results. See why clients choose ClickMasters for scalable software solutions.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),









  // ── /contact ────────────────────────────────────────────────────────────────
contact: (): Metadata => ({
  title: 'Turn Your Idea Into Software | Get a Free Expert Consultation',
  description: 'Have a software idea or project in mind? Talk directly to ClickMasters engineers and get a free, no-obligation consultation. Fast response within 24 hours.',
  alternates: { canonical: `${siteConfig.url}/contact-us` },
  openGraph: {
    title: 'Let’s Build Your Software Idea | Free Consultation with Experts',
    description: 'Speak with experienced software engineers and turn your idea into a scalable product. Get a fast, free consultation within 24 hours.',
    url: `${siteConfig.url}/contact-us`,
    images: [
      {
        url: `${siteConfig.url}/og/logo-white.webp`,
        width: 1200,
        height: 630,
        alt: 'ClickMasters software engineers ready for consultation',
      },
    ],
  },
  twitter: {
    title: 'Turn Your Idea Into Software | Free Expert Consultation',
    description: 'Get a free consultation with software engineers. We help you build web apps, mobile apps, SaaS & AI products — fast response in 24 hours.',
    images: [`${siteConfig.url}/og/logo-white.webp`],
  },
}),

  // ── /software-solutions/[slug] ───────────────────────────────────────────────
  solutionsDetail: (
  title: string,
  description: string,
  slug: string,
  ogImageUrl?: string,
): Metadata => ({
  title: `${title} | Built by ClickMasters That Turns Ideas Into Products`,
  description: (description || `What if your idea could become a high-performing digital product? ClickMasters transforms ${title} into powerful, scalable, and revenue-ready software solutions.`).slice(0, 155),
  alternates: {
    canonical: `${siteConfig.url}/software-solutions/${slug}`,
  },
  openGraph: {
    title: `${title} | From Idea to Impact by ClickMasters`,
    description: (description || `We don't just build software — we build growth engines. See how ClickMasters delivered a high-impact ${title} solution that scales with your business.`).slice(0, 155),
    url: `${siteConfig.url}/software-solutions/${slug}`,
    images: [
      {
        url: ogImageUrl || `${siteConfig.url}/og/solutions.webp`,
        width: 1200,
        height: 630,
        alt: `${title} – built by ClickMasters software development company`,
      },
    ],
  },
  twitter: {
    title: `${title} | Turn Ideas Into Real Software Products`,
    description: (description || `ClickMasters builds scalable ${title} solutions designed for performance, growth, and real-world business impact.`).slice(0, 155),
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