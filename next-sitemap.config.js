/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:  "https://software.clickmasters.pk",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
  },
};
