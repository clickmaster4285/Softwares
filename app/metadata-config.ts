import { Metadata } from 'next';

export const siteConfig = {
  name: 'ClickMasters',
  title: 'ClickMasters - Software Development Company',
  description: 'Custom software development, web applications, mobile apps, and ERP solutions for businesses worldwide.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://clickmasters.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@clickmasters',
};

export const defaultMetadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
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
};

export const metadataConfig = {
  home: (): Metadata => ({
    title: 'ClickMasters - Custom Software Development Company',
    description: 'Expert software development services for web apps, mobile apps, and ERP solutions. Transform your ideas into scalable software with ClickMasters.',
    keywords: 'software development company, custom software, web development, mobile app development, ERP solutions',
    openGraph: {
      title: 'ClickMasters - Custom Software Development Company',
      description: 'Transform your ideas into reliable, scalable software with our expert development team.',
    },
  }),

  about: (): Metadata => ({
    title: 'About ClickMasters | Software Development Company',
    description: 'Learn about ClickMasters - your trusted software development partner. Discover our mission, values, and the expert team behind our custom software solutions.',
    keywords: 'about software company, software development team, ClickMasters team',
    openGraph: {
      title: 'About ClickMasters | Software Development Company',
      description: 'Meet the team behind world-class software solutions.',
    },
  }),

  services: (): Metadata => ({
    title: 'Software Development Services | ClickMasters',
    description: 'Comprehensive software development services including web applications, mobile apps, custom software, and ERP solutions. Get a free consultation today.',
    keywords: 'software development services, web development, mobile app development, custom software development',
    openGraph: {
      title: 'Software Development Services | ClickMasters',
      description: 'Expert software development services tailored to your business needs.',
    },
  }),

  solutions: (): Metadata => ({
    title: 'Software Solutions Portfolio | ClickMasters',
    description: 'Explore our portfolio of custom software solutions. See how we\'ve helped businesses across industries with web apps, mobile apps, and enterprise software.',
    keywords: 'software solutions, portfolio, custom software examples, case studies',
    openGraph: {
      title: 'Software Solutions Portfolio | ClickMasters',
      description: 'Real-world software solutions we\'ve built for our clients.',
    },
  }),

  testimonials: (): Metadata => ({
    title: 'Client Testimonials | ClickMasters Reviews',
    description: 'Read what our clients say about our software development services. Real reviews from businesses who trusted us with their web, mobile, and ERP projects.',
    keywords: 'client reviews, software development reviews, testimonials, client feedback',
    openGraph: {
      title: 'Client Testimonials | ClickMasters Reviews',
      description: 'Hear from our satisfied clients about their experience with ClickMasters.',
    },
  }),

  contact: (): Metadata => ({
    title: 'Contact ClickMasters | Software Development Inquiry',
    description: 'Get in touch with our software development team. Discuss your project requirements and get a free consultation for custom software, web apps, or mobile apps.',
    keywords: 'contact software company, software development inquiry, get a quote',
    openGraph: {
      title: 'Contact ClickMasters | Software Development Inquiry',
      description: 'Start your software development journey with ClickMasters.',
    },
  }),

  solutionsDetail: (title: string, description: string): Metadata => ({
    title: `${title} | Software Solution by ClickMasters`,
    description: description || `Explore our ${title} software solution. Custom-built to meet your business needs.`,
    openGraph: {
      title: `${title} | Software Solution by ClickMasters`,
      description: description || `Custom ${title} solution for your business.`,
    },
  }),

//   admin: {
//     login: (): Metadata => ({
//       title: 'Admin Login | ClickMasters',
//       description: 'Secure admin access for ClickMasters platform.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//     dashboard: (): Metadata => ({
//       title: 'Admin Dashboard | ClickMasters',
//       description: 'Manage your ClickMasters content and settings.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//     categories: (): Metadata => ({
//       title: 'Manage Categories | ClickMasters Admin',
//       description: 'Manage project categories for ClickMasters.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//     solutions: (): Metadata => ({
//       title: 'Manage Solutions | ClickMasters Admin',
//       description: 'Manage software solutions and projects.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//     testimonials: (): Metadata => ({
//       title: 'Manage Testimonials | ClickMasters Admin',
//       description: 'Manage client testimonials.',
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//   },
};