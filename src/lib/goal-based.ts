import { getServicePage, type ServicePageContent } from '@/lib/service-pages';

export type RelatedGoalLink = {
  label: string;
  href: string;
};

export type GoalPageContent = ServicePageContent & {
  goalLabel: string;
  serviceSlug: string;
  relatedGoals: RelatedGoalLink[];
};

const WIREFRAMING_SERVICE_SLUG = 'wireframing-prototyping';
const UI_UX_DESIGN_SERVICE_SLUG = 'ui-ux-design';
/** Public URL segment used on service pages (e.g. sitemap / inbound links). */
const UI_UX_DESIGN_SERVICE_URL_SLUG = 'ui-ux-design-services';

const GOAL_SERVICE_ALIASES: Record<string, string> = {
  [UI_UX_DESIGN_SERVICE_URL_SLUG]: UI_UX_DESIGN_SERVICE_SLUG,
};

export function resolveGoalServiceSlug(serviceParam: string): string {
  return GOAL_SERVICE_ALIASES[serviceParam] ?? serviceParam;
}

export function goalPageMatchesService(goal: GoalPageContent, serviceParam: string): boolean {
  const resolved = resolveGoalServiceSlug(serviceParam);
  return goal.serviceSlug === resolved || goal.serviceSlug === serviceParam;
}

function goalPath(categorySlug: string, serviceSlug: string, goalSlug: string) {
  return `/${categorySlug}/${serviceSlug}/${goalSlug}`;
}

const launchFasterGoalPage: GoalPageContent = {
  slug: 'launch-faster',
  categorySlug: 'design-ui-ux',
  sectionId: 'launch-faster',
  category: 'Design UI/UX',
  serviceSlug: WIREFRAMING_SERVICE_SLUG,
  title: 'Wireframing and Prototyping to Launch Faster',
  serviceName: 'Launch Faster',
  goalLabel: 'Launch Faster',
  metaTitle: 'Wireframing & Prototyping to Launch Faster | 8–12 Weeks | ClickMasters',
  metaDescription:
    'ClickMasters delivers wireframing and prototyping in 8–12 weeks from scoping to production launch — fixed scope, CI/CD from sprint 1, working software every two weeks.',
  lead: 'ClickMasters delivers wireframing and prototyping in 8–12 weeks from scoping to production launch — fixed scope, CI/CD from sprint 1, working software demonstrated every two weeks. The fastest path to a real product with real users.',
  highlights: [
    '8-12 Week MVP to Production — Not a Staging Environment',
    'CI/CD Configured in Sprint 1 — Same-Day Deployment from Day 1',
    'Working Software Demonstrated Every 2 Weeks',
    'Scope Challenged Before Build — Not During',
    'External Dependencies Managed From Week 1',
    'Feature Flags for Safe Post-Launch Releases',
  ],
  marketStats: [
    { label: 'MVP to Production Launch', value: '8-12 Wks' },
    { label: 'Sprint Cadence', value: '2-Week' },
    { label: 'Budget Model', value: 'Fixed-Price' },
    { label: 'CI/CD Deployment', value: 'Same Day' },
  ],
  sections: [
    {
      heading: 'Why Speed to Market Matters — and What Actually Slows Launches Down',
      body: 'A 3-month delay in launching a SaaS product may mean first-mover advantage belongs to a competitor. A 6-week delay in launching an e-commerce feature during Q4 may mean missing the holiday revenue window. A 2-month overrun on an enterprise project may mean missing the procurement cycle and losing 12 months of contract value. The engineering factors that most commonly cause launch delays: scope not challenged at the start, dependency bottlenecks, inadequate CI/CD, and poor upfront architecture decisions. ClickMasters addresses all four in the discovery phase.',
    },
    {
      heading: 'The ClickMasters Approach — Discipline Before Code',
      body: 'The hardest part of launching software faster is not writing code faster — it is making better decisions earlier. ClickMasters\' launch speed advantage comes from challenging scope before accepting it (smaller scope = faster launch), managing external dependencies from week 1, automating deployment from sprint 1, and defining launch criteria in advance.',
      items: [
        'Challenge scope before accepting it — smaller scope = faster launch',
        'Manage external dependencies from week 1, not when they block you',
        'Automate deployment from sprint 1 — daily deploys from day one',
        'Define launch criteria in advance — not when it feels ready',
      ],
    },
  ],
  servicesCards: [
    {
      title: 'Launch Speed Principles',
      description:
        'Scope minimum (every feature added to the MVP adds time), parallel workstreams (front-end, back-end, design and testing in parallel), automated deployment from day one (CI/CD configured in sprint 1), and external dependency management — a dependency log in week 1 that identifies every external dependency with an owner and a resolution date.',
    },
    {
      title: 'Sprint Velocity Engine',
      description:
        'ClickMasters uses 2-week sprints with working software demonstrated at every sprint review. If the velocity is lower than required, the sprint review is the earliest opportunity to identify the gap and decide whether to reduce scope, add capacity, or adjust the launch date. Sprint reviews catch timeline risk in week 2, not week 14.',
    },
    {
      title: 'Post-Launch Continuous Delivery',
      description:
        'Weekly deployments (new features and bug fixes deployed every week based on user feedback), feature flags for safe post-launch releases (new features deployed behind flags, activated for 1–10% of users for initial validation before full rollout), and a prioritised post-launch backlog — the product improves continuously rather than waiting for a version 2 cycle.',
    },
  ],
  differentiators: [
    {
      feature: 'Fixed-Price Contracts',
      description: 'No budget surprises — scope and investment agreed in writing before build begins.',
    },
    {
      feature: 'CI/CD From Sprint 1',
      description: 'Automated deployment configured in the first sprint of every engagement, not at launch.',
    },
    {
      feature: 'Working Software Every 2 Weeks',
      description: 'Sprint reviews demonstrate real progress — timeline risk surfaced in week 2, not week 14.',
    },
    {
      feature: 'External Dependency Log',
      description: 'Every third-party dependency identified in week 1 with an owner and resolution date.',
    },
    {
      feature: '48-Hour Response',
      description: 'Consultation requests answered within 48 hours with a scoped proposal.',
    },
  ],
  processPhases: [
    {
      phase: 'Phase 1',
      title: 'Launch Scope Workshop',
      timeline: '3–5 days',
      text: 'MVP scope challenge, dependency map, stack selection, launch date, and fixed-price proposal. Know exactly what you are building, when it launches, and what it costs — before signing anything.',
    },
    {
      phase: 'Phase 2',
      title: 'MVP Build',
      timeline: '8–12 weeks',
      text: 'Minimum viable scope, CI/CD from sprint 1, working software demonstrated every 2 weeks. Parallel workstreams across design, engineering, and QA.',
    },
    {
      phase: 'Phase 3',
      title: 'Production Launch',
      timeline: 'Week 8–12',
      text: 'Launch criteria validated, feature flags configured, monitoring and analytics in place. Production deployment — not a staging environment.',
    },
    {
      phase: 'Phase 4',
      title: 'Post-Launch Iteration',
      timeline: 'Ongoing',
      text: 'Weekly deployments, user-feedback-driven backlog, feature flags for safe rollouts. Continuous improvement without a version 2 cycle.',
    },
  ],
  techStackCategories: [
    { layer: 'Wireframing', technologies: 'Figma (all wireframes), Balsamiq (optional low-fi), FigJam (whiteboard flows)' },
    { layer: 'Prototyping', technologies: 'Figma (Smart Animate, overlays, conditionals), Protopie (complex interactions)' },
    { layer: 'CI/CD', technologies: 'GitHub Actions, Vercel, AWS CodePipeline, feature flags (LaunchDarkly, Growthbook)' },
    { layer: 'Testing', technologies: 'Figma prototype links, Maze (unmoderated), UserTesting (moderated)' },
  ],
  pricingTiers: [
    {
      type: 'Launch Scope Workshop',
      investment: '$2,500 - $5,000',
      timeline: '3–5 days',
      bestFor: 'MVP scope challenge, dependency map, stack selection, launch date, fixed-price proposal',
    },
    {
      type: 'Wireframing & Prototyping MVP',
      investment: '$15,000 - $45,000',
      timeline: '8–12 wks',
      bestFor: 'Minimum viable scope, CI/CD from sprint 1, working software every 2 weeks',
    },
    {
      type: 'Wireframing & Prototyping Fast Track',
      investment: '$25,000 - $70,000',
      timeline: '10–16 wks',
      bestFor: 'Full scope with parallel workstreams, managed services, feature flags, launch-ready',
    },
    {
      type: 'Post-Launch Sprint Pack',
      investment: '$8,000 - $18,000',
      timeline: '4 wks',
      bestFor: 'User-feedback iteration sprint — fixed-price, defined scope, 2-week cycles',
    },
    {
      type: 'Launch Retainer',
      investment: '$4,000 - $9,000/mo',
      timeline: 'Ongoing',
      bestFor: 'Continuous delivery post-launch — weekly deployments, feature flags, analytics',
    },
  ],
  industryUseCases: [
    {
      name: 'SaaS MVP Launch',
      description: '8–12 week MVP from scoping to production with CI/CD from sprint 1 and feature flags for safe post-launch iteration.',
    },
    {
      name: 'E-Commerce Feature Launch',
      description: 'Time-boxed feature delivery for seasonal windows — scope locked, launch date set, fixed-price.',
    },
    {
      name: 'Enterprise Product Rollout',
      description: 'Dependency-managed delivery with architecture review in week 1 and sprint reviews every 2 weeks.',
    },
    {
      name: 'Investor Demo to Production',
      description: 'High-fidelity prototype validated with users, then built to production in 10–16 weeks.',
    },
  ],
  faqs: [
    {
      question: 'What is the fastest realistic timeline to launch a software product?',
      answer:
        'The fastest realistic launch timelines by product type: landing page or marketing website (1–2 weeks), Shopify e-commerce with custom theme (1–2 weeks), web app with a single core workflow (6–8 weeks), mobile app with core feature set (8–12 weeks), SaaS MVP with authentication, billing, and core workflow (10–14 weeks), enterprise software with integrations and compliance (16–24 weeks). These timelines assume scope is fixed, external dependencies are resolved before development begins, and a dedicated engineering team works continuously.',
    },
    {
      question: 'What causes software projects to launch late and how does ClickMasters prevent it?',
      answer:
        'The four most common causes: scope creep (prevention: written scope document signed before build begins, formal change request process), external dependency delays (prevention: dependency log in week 1 with owner and resolution date), insufficient CI/CD (prevention: automated CI/CD from sprint 1, not from launch), and architecture rework (prevention: architecture review in week 1 resolves highest-risk design decisions before development begins).',
    },
    {
      question: 'What is the difference between an MVP and a full product for launch speed?',
      answer:
        'An MVP is the minimum set of features required to validate the core hypothesis with real users — not a demo, and not a stripped-down full product, but the minimum that provides enough value for real users to use it and provide meaningful feedback. ClickMasters\' MVP scoping process maps every proposed feature to the hypothesis it validates, separating MVP features from Phase 2. This typically reduces scope by 40–60% — and reduces the timeline by 4–8 weeks.',
    },
    {
      question: 'How does feature flagging accelerate launch timelines?',
      answer:
        'Feature flags decouple deployment from release — the engineering practice that most directly accelerates launch timelines. Without flags: a feature cannot be deployed until 100% complete, and any incomplete feature blocks all others. With flags: features can be deployed to production while disabled, then activated for a percentage of users when ready. Each feature ships independently. ClickMasters integrates LaunchDarkly or Growthbook from sprint 1 of every engagement.',
    },
  ],
  relatedGoals: [
    {
      label: 'Wireframing & Prototyping to Improve Security',
      href: goalPath('design-ui-ux', WIREFRAMING_SERVICE_SLUG, 'improve-security'),
    },
    {
      label: 'Wireframing & Prototyping to Increase Revenue',
      href: goalPath('design-ui-ux', WIREFRAMING_SERVICE_SLUG, 'increase-revenue'),
    },
    {
      label: 'Wireframing & Prototyping to Reduce Costs',
      href: goalPath('design-ui-ux', WIREFRAMING_SERVICE_SLUG, 'reduce-costs'),
    },
    {
      label: 'Core Wireframing & Prototyping Service',
      href: '/design-ui-ux/wireframing-prototyping',
    },
  ],
};

const goalPages: Record<string, GoalPageContent> = {
  'launch-faster': launchFasterGoalPage,
};

export function getGoalPage(slug: string): GoalPageContent | undefined {
  return goalPages[slug];
}

export function getAllGoalSlugs(): string[] {
  return Object.keys(goalPages);
}

export function getAllGoalStaticParams(): {
  slug: string;
  service: string;
  'goal-based': string;
}[] {
  return Object.values(goalPages).map((goal) => {
    const svc = getServicePage(goal.serviceSlug);
    return {
      slug: svc?.categorySlug ?? goal.categorySlug,
      service: goal.serviceSlug,
      'goal-based': goal.slug,
    };
  });
}

export function getDefaultGoalPage(): GoalPageContent {
  return launchFasterGoalPage;
}
