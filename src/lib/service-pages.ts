export type ServicePageContent = {
  slug: string;
  /** Anchor on /services for deep links */
  sectionId: string;
  title: string;
  /** 150–160 chars for meta description */
  metaDescription: string;
  lead: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
};

const services: ServicePageContent[] = [
  {
    slug: 'custom-software-development',
    sectionId: 'custom-software-development',
    title: 'Custom Software Development',
    metaDescription:
      'Custom software development for enterprises and startups. We build scalable web, mobile, and internal tools with modern stacks. Free consultation.',
    lead:
      'End-to-end custom software tailored to your workflows, integrations, and growth targets — from discovery through launch and long-term support.',
    highlights: [
      'Domain-driven design and clear milestones',
      'APIs, automation, and legacy modernization',
      'Dedicated team aligned with your product goals',
    ],
    sections: [
      {
        heading: 'What we build',
        body:
          'Business portals, internal tools, workflow automation, and customer-facing platforms. We align architecture with your roadmap so you can scale without costly rewrites.',
      },
      {
        heading: 'How we deliver',
        body:
          'Agile sprints, transparent reporting, and continuous demos. You get predictable releases, test coverage, and documentation your team can own.',
      },
    ],
  },
  {
    slug: 'web-application-development',
    sectionId: 'web-application-development',
    title: 'Web Application Development',
    metaDescription:
      'Web application development with React, Next.js, and cloud-ready backends. SPAs, dashboards, and B2B portals built for speed and SEO. Get a quote.',
    lead:
      'High-performance web apps — from marketing sites to complex dashboards — engineered for Core Web Vitals, accessibility, and maintainability.',
    highlights: [
      'React, Next.js, and API-first backends',
      'Auth, roles, and secure data handling',
      'Performance tuning and production monitoring',
    ],
    sections: [
      {
        heading: 'Modern frontends',
        body:
          'We ship responsive, accessible interfaces with a focus on load time and developer experience so your product stays fast as features grow.',
      },
      {
        heading: 'Reliable backends',
        body:
          'REST and GraphQL APIs, background jobs, and integrations with payments, CRMs, and third-party services — designed for uptime and observability.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    sectionId: 'mobile-app-development',
    title: 'Mobile App Development',
    metaDescription:
      'Mobile app development for iOS and Android: native and cross-platform apps with Flutter and React Native. UX, APIs, and store releases handled end-to-end.',
    lead:
      'Native-quality mobile experiences for consumer and enterprise use cases, with a release process that covers testing, analytics, and app store compliance.',
    highlights: [
      'iOS, Android, and cross-platform options',
      'Offline-first and push notification patterns',
      'CI/CD and staged rollouts',
    ],
    sections: [
      {
        heading: 'Product and UX',
        body:
          'We prototype flows, validate with stakeholders, and implement polished UI that matches your brand while staying performant on real devices.',
      },
      {
        heading: 'Integration and scale',
        body:
          'Secure APIs, token refresh, deep links, and analytics hooks so your app fits cleanly into your existing systems and growth stack.',
      },
    ],
  },
  {
    slug: 'database-design-management',
    sectionId: 'database-design-management',
    title: 'Database Design & Management',
    metaDescription:
      'Database design and management: PostgreSQL, MongoDB, migrations, indexing, and performance tuning. Secure schemas and backups for production workloads.',
    lead:
      'Data models that stay fast under load — from greenfield schema design to migrations, replication, and day-two operations.',
    highlights: [
      'SQL and NoSQL expertise',
      'Migrations without risky downtime',
      'Query optimization and monitoring',
    ],
    sections: [
      {
        heading: 'Schema and modeling',
        body:
          'We design normalized or document-oriented schemas around your access patterns, with clear ownership boundaries and audit-friendly structures where needed.',
      },
      {
        heading: 'Operations',
        body:
          'Backups, failover planning, and slow-query reviews — so your team sleeps well as traffic and data volume grow.',
      },
    ],
  },
  {
    slug: 'cloud-solutions-devops',
    sectionId: 'cloud-solutions-devops',
    title: 'Cloud Solutions & DevOps',
    metaDescription:
      'Cloud and DevOps on AWS, GCP, and Azure: CI/CD, containers, IaC, and observability. We automate deploys and harden infrastructure for scale.',
    lead:
      'Infrastructure and pipelines that make releases boring — in a good way — with automated tests, environments, and guardrails.',
    highlights: [
      'Docker, Kubernetes, and serverless where it fits',
      'GitHub Actions and pipeline design',
      'Cost and reliability reviews',
    ],
    sections: [
      {
        heading: 'Platforms',
        body:
          'We help you pick and implement the right mix of compute, storage, and managed services across major clouds, with security baselines from day one.',
      },
      {
        heading: 'Delivery automation',
        body:
          'Branching strategy, preview environments, and progressive delivery so your team ships frequently with confidence.',
      },
    ],
  },
  {
    slug: 'cybersecurity-compliance',
    sectionId: 'cybersecurity-compliance',
    title: 'Cybersecurity & Compliance',
    metaDescription:
      'Cybersecurity and compliance: secure SDLC, audits, penetration testing prep, and hardening for web and mobile apps. Reduce risk before you scale.',
    lead:
      'Security woven into development — not bolted on at the end — with practical controls aligned to your industry and threat model.',
    highlights: [
      'OWASP-aligned reviews and fixes',
      'Encryption, secrets, and IAM patterns',
      'Documentation for audit readiness',
    ],
    sections: [
      {
        heading: 'Application security',
        body:
          'Threat modeling, dependency updates, and code review practices that catch common vulnerabilities before they reach production.',
      },
      {
        heading: 'Compliance support',
        body:
          'We work with your policies and legal requirements to implement logging, data retention, and access controls that auditors expect to see.',
      },
    ],
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function getServicePage(slug: string): ServicePageContent | undefined {
  return bySlug.get(slug);
}

export function getAllServicePages(): ServicePageContent[] {
  return services;
}
