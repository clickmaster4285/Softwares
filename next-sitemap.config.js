/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://software.clickmasters.pk",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/', '/api/uploads/'],
        disallow: ['/admin', '/api/'],
      },
    ],
  },
  // Generate sitemap index and individual sitemap files
  generateIndexSitemap: true,
  sitemapSize: 50000, // Max URLs per sitemap
  transform: async (config, path) => {
    const canonicalPath = path.replace(/\/services\//g, '/');
    return {
      loc: canonicalPath,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const paths = [];
    
    // Add common static pages that might not be auto-discovered
    paths.push(
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/about-us', changefreq: 'monthly', priority: 0.6 },
      { loc: '/contact-us', changefreq: 'monthly', priority: 0.6 },
      { loc: '/testimonials', changefreq: 'weekly', priority: 0.7 },
      { loc: '/faqs', changefreq: 'weekly', priority: 0.7 },
      { loc: '/software-solutions', changefreq: 'weekly', priority: 0.7 },
      { loc: '/case-studies', changefreq: 'daily', priority: 0.7 }
    );
    
    return paths;
  },
};
