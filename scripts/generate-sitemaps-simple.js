const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://software.clickmasters.pk';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** Runs inline via tsx — same logic as former export-sitemap-urls.ts (no extra files). */
const SITEMAP_EXPORT_TS = `
import { getAllCountrySlugs } from '../src/lib/country';
import { goalPages } from '../src/lib/goal-based';
import {
  getGoalCanonicalUrl,
  normalizeGoalPage,
  parseGoalSlug,
} from '../src/lib/goal-based-utils';
import { getAllHireUsSlugs } from '../src/lib/hire-us-pages';
import { getAllPersonaSitemapPaths } from '../src/lib/persona-utils';
import { getAllServicePages, getServicePage } from '../src/lib/service-pages';
import { getAllServiceSlugs } from '../src/lib/services';

const servicePages = getAllServicePages();
const categoryHubs = getAllServiceSlugs().map((slug) => '/' + slug);
const subServices = servicePages.map((page) => '/' + page.categorySlug + '/' + page.slug);
const uniqueCategories = [...new Set(servicePages.map((page) => page.categorySlug))];
const staticPages = [
  '/',
  '/about-us',
  '/contact-us',
  '/blog',
  '/case-studies',
  '/faqs',
  '/software-solutions',
  '/testimonials',
  '/careers',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/locations',
];
const locations = getAllCountrySlugs().map((slug) => '/locations/' + slug);
const hire = getAllHireUsSlugs().map((slug) => '/hire/' + slug);
const goals = goalPages
  .map((raw) => {
    const { serviceSlug } = parseGoalSlug(raw.slug);
    const normalized = normalizeGoalPage(raw, getServicePage(serviceSlug));
    const path = getGoalCanonicalUrl(normalized);
    if (!path.startsWith('/') || path.startsWith('/services/')) return null;
    return path;
  })
  .filter((path) => path !== null);
const personas = getAllPersonaSitemapPaths();
console.log(JSON.stringify({
  staticPages,
  categoryHubs,
  subServices,
  uniqueCategories,
  locations,
  hire,
  goals,
  personas,
}));
`.trim();

function loadExportedSitemapPaths() {
  const tmpFile = path.join(process.cwd(), 'scripts', `.sitemap-export-${process.pid}.ts`);
  fs.writeFileSync(tmpFile, SITEMAP_EXPORT_TS, 'utf8');
  let stdout;
  try {
    stdout = execSync(`npx tsx "${tmpFile}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'inherit'],
    });
  } finally {
    try {
      fs.unlinkSync(tmpFile);
    } catch {
      // ignore cleanup errors
    }
  }
  const data = JSON.parse(stdout.trim());
  console.log(`  subServices: ${data.subServices.length}`);
  console.log(`  goals: ${data.goals.length}`);
  console.log(`  personas: ${data.personas.length}`);
  console.log(`  hire: ${data.hire.length}`);
  return data;
}

function toAbsoluteUrl(pathname) {
  if (pathname === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${pathname}`;
}

// Helper function to fetch data from API
async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${SITE_URL}/api${endpoint}`);
    if (!response.ok) {
      console.log(`Warning: Failed to fetch from ${endpoint}: ${response.status}`);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.log(`Warning: Error fetching from ${endpoint}:`, error.message);
    return [];
  }
}

// Helper function to extract all country service URLs from the country-services data file
function extractCountryServiceUrls() {
  const countryServicesPath = path.join(process.cwd(), 'src/lib/country-services.ts');
  const urlsByCountry = {};

  if (!fs.existsSync(countryServicesPath)) {
    return urlsByCountry;
  }

  const content = fs.readFileSync(countryServicesPath, 'utf8');
  const urlRegex = /slug:\s*'([^']+)'[\s\S]*?country:\s*'([^']+)'/g;
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    const slug = match[1];
    const countryName = match[2];
    const countryKey = countryName.toLowerCase() === 'usa' ? 'usa' : countryName.toLowerCase();
    const url = `${SITE_URL}/locations/${countryKey}/${slug}`;
    urlsByCountry[countryKey] = urlsByCountry[countryKey] || [];
    urlsByCountry[countryKey].push(url);
  }

  Object.keys(urlsByCountry).forEach(country => {
    urlsByCountry[country] = [...new Set(urlsByCountry[country])];
  });

  return urlsByCountry;
}

// Helper function to extract checklist service slugs from service_checklist.ts
function extractChecklistSlugs() {
  const checklistPath = path.join(process.cwd(), 'src/lib/service_checklist.ts');
  if (!fs.existsSync(checklistPath)) {
    return new Set();
  }

  const content = fs.readFileSync(checklistPath, 'utf8');
  const startMatch = content.match(/export const checklists:[\s\S]*?=\s*\{/);
  if (!startMatch) {
    return new Set();
  }

  const objectStart = content.indexOf('{', startMatch.index);
  if (objectStart === -1) {
    return new Set();
  }

  let depth = 0;
  let endIndex = -1;
  for (let i = objectStart; i < content.length; i++) {
    const char = content[i];
    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) {
    return new Set();
  }

  const objContent = content.slice(objectStart + 1, endIndex);
  const slugRegex = /^\s*['"]([a-z0-9-]+)['"]\s*:/gm;
  const slugs = new Set();
  let slugMatch;

  while ((slugMatch = slugRegex.exec(objContent)) !== null) {
    slugs.add(slugMatch[1]);
  }

  return slugs;
}

function extractHowToGuideSlugs() {
  const howToPath = path.join(process.cwd(), 'src/lib/how-to.ts');
  if (!fs.existsSync(howToPath)) {
    return new Set();
  }

  const content = fs.readFileSync(howToPath, 'utf8');
  const match = content.match(/export const howToGuides\s*:\s*Record<[^>]+>\s*=\s*\{/);
  if (!match) {
    return new Set();
  }

  const objectStart = content.indexOf('{', match.index);
  if (objectStart === -1) {
    return new Set();
  }

  let depth = 0;
  let endIndex = -1;
  for (let i = objectStart; i < content.length; i++) {
    const char = content[i];
    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) {
    return new Set();
  }

  const slugs = new Set();
  let i = objectStart + 1;
  let currentDepth = 1;

  while (i < endIndex) {
    const char = content[i];
    if (char === '{') {
      currentDepth++;
      i++;
      continue;
    }
    if (char === '}') {
      currentDepth--;
      i++;
      continue;
    }

    if (currentDepth === 1) {
      if (char === '"' || char === "'") {
        const quote = char;
        let key = '';
        i++;
        while (i < endIndex && content[i] !== quote) {
          key += content[i];
          i++;
        }
        i++;
        while (i < endIndex && /[\s]/.test(content[i])) {
          i++;
        }
        if (content[i] === ':') {
          slugs.add(key);
        }
        continue;
      }
    }

    i++;
  }

  return slugs;
}

const GOAL_URL_SUFFIXES = ['to-increase-revenue', 'to-launch-faster', 'to-reduce-costs'];

function isGoalBasedUrl(urlPath) {
  const segments = urlPath.split('/').filter(Boolean);
  if (segments.length !== 3) return false;
  return GOAL_URL_SUFFIXES.includes(segments[2]);
}

// Helper function to identify main services
function isMainService(urlPath) {
  const mainServices = [
    '/software-development',
    '/web-development', 
    '/mobile-development',
    '/design-UI-UX',
    '/artificial-intelligence-ai',
    '/machine-learning-ml',
    '/nlp-computer-vision',
    '/data-services',
    '/data-intelligence',
    '/automation-chatbot',
    '/automation-integration',
    '/cloud-and-devops',
    '/database-services',
    '/cybersecurity',
    '/qa-software-testing',
    '/support-outsourcing',
    '/blockchain-web3',
    '/iot-embedded',
    '/immersive-tech'
  ];
  
  // Check for exact matches first (no trailing slash or with trailing slash)
  const cleanPath = urlPath.replace(/\/$/, ''); // Remove trailing slash
  return mainServices.some(service => cleanPath === service || cleanPath === service + '/');
}

// Helper function to get priority and changefreq for different URL types
function getUrlPriorityAndFreq(urlPath) {
  const url = urlPath.replace(/\/$/, ''); // Remove trailing slash
  
  // Homepage - highest priority
  if (url === '' || url === '/') {
    return { priority: '1.0', changefreq: 'daily' };
  }
  
  // Contact and About pages - lower priority, monthly updates
  if (url.includes('/contact') || url.includes('/about')) {
    return { priority: '0.6', changefreq: 'monthly' };
  }
  
  // Blog pages
  if (url.includes('/blog/')) {
    return { priority: '0.7', changefreq: 'daily' };
  }
  
  // Case studies
  if (url.includes('/case-studies/')) {
    return { priority: '0.7', changefreq: 'daily' };
  }
  
  // Hire pages - high priority
  if (url.includes('/hire-') || url.includes('/hire/')) {
    return { priority: '0.6', changefreq: 'monthly' };
  }
  
  // Location pages - separate country/location sitemap
  if (url.includes('/locations')) {
    return { priority: '0.7', changefreq: 'weekly' };
  }
  
  // How-to pages - slightly lower than service pages
  if (url.includes('/how-to')) {
    return { priority: '0.75', changefreq: 'weekly' };
  }

  // Goal-based landing pages (/{category}/{service}/{goal})
  if (isGoalBasedUrl(urlPath)) {
    return { priority: '0.75', changefreq: 'weekly' };
  }

  // Service pages - medium priority, weekly updates
  if (isMainService(urlPath) || isSubService(urlPath)) {
    return { priority: '0.8', changefreq: 'weekly' };
  }
  
  // FAQ pages
  if (url.includes('/faqs/')) {
    return { priority: '0.7', changefreq: 'daily' };
  }
  
  return { priority: '0.7', changefreq: 'weekly' };
}

// Helper function to identify sub-services
function isSubService(urlPath) {
  // Exclude hire pages first
  if (urlPath.includes('/hire-') || urlPath.includes('/hire/')) {
    return false;
  }
  
  // Exclude main services
  if (isMainService(urlPath)) {
    return false;
  }
  
  // Only include URLs that follow the /main-service/subservice structure
  const mainServices = [
    '/artificial-intelligence-ai',
    '/automation-chatbot', 
    '/automation-integration',
    '/blockchain-web3',
    '/cloud-and-devops',
    '/cybersecurity',
    '/cybersecurity-compliance',
    '/data-intelligence',
    '/data-science-analytics',
    '/data-services',
    '/database-services',
    '/design',
    '/immersive-tech',
    '/iot-embedded',
    '/machine-learning-ml',
    '/managed-services',
    '/mobile-development',
    '/nlp-computer-vision',
    '/qa-software-testing',
    '/software-development',
    '/web-development'
  ];
  
  return mainServices.some(service => {
    const serviceWithSlash = service + '/';
    if (!urlPath.startsWith(serviceWithSlash)) {
      return false;
    }
    
    // Extract the part after the main service
    const remainingPath = urlPath.substring(serviceWithSlash.length);
    
    // Must not be empty and must not contain additional slashes (to avoid deeper nesting)
    return remainingPath.length > 0 && !remainingPath.includes('/');
  });
}

async function generateSeparateSitemaps() {
  console.log('🚀 Starting separate sitemap generation...');
  
  let categorizedUrls = {
    pages: [],
    mainServices: [],
    subServices: [],
    caseStudies: [],
    blogs: [],
    faqs: [],
    hire: [],
    locations: [],
    personaBased: [],
    goalBased: [],
    checklists: [],
    howTo: [],
  };
  const extraCountryServiceUrls = extractCountryServiceUrls();
  const validCountryServiceUrlsMap = Object.fromEntries(
    Object.entries(extraCountryServiceUrls).map(([country, urls]) => [country, new Set(urls)])
  );

  const locationServicePages = Object.fromEntries(
    Object.entries(extraCountryServiceUrls).map(([country, urls]) => [country, [...new Set(urls)]])
  );

  const howToGuideSlugs = extractHowToGuideSlugs();
  const checklistSlugs = extractChecklistSlugs();
  const exported = loadExportedSitemapPaths();

  categorizedUrls.mainServices.push(...exported.categoryHubs.map(toAbsoluteUrl));
  categorizedUrls.subServices.push(...exported.subServices.map(toAbsoluteUrl));
  categorizedUrls.pages.push(...exported.staticPages.map(toAbsoluteUrl));
  categorizedUrls.locations.push(...exported.locations.map(toAbsoluteUrl));
  categorizedUrls.hire.push(...exported.hire.map(toAbsoluteUrl));
  categorizedUrls.goalBased.push(...exported.goals.map(toAbsoluteUrl));
  categorizedUrls.personaBased.push(...exported.personas.map(toAbsoluteUrl));

  console.log(`🎯 Found ${exported.goals.length} goal-based URLs`);
  console.log(`🧭 Found ${exported.personas.length} persona-based URLs`);
  console.log(`📦 Found ${exported.subServices.length} service URLs from service-pages`);

  exported.subServices.forEach((servicePath) => {
    const slug = servicePath.split('/').filter(Boolean).pop();
    categorizedUrls.faqs.push(`${SITE_URL}/faqs/${slug}`);
    if (howToGuideSlugs.has(slug)) {
      categorizedUrls.howTo.push(toAbsoluteUrl(`${servicePath}/how-to`));
    }
    if (checklistSlugs.has(slug)) {
      categorizedUrls.checklists.push(toAbsoluteUrl(`${servicePath}/checklist`));
    }
  });

  // Fetch dynamic blog URLs from API
  console.log('📝 Fetching blog URLs...');
  try {
    const blogs = await fetchFromApi('/blog');
    blogs.forEach(blog => {
      if (blog.slug && blog.published) {
        categorizedUrls.blogs.push(`${SITE_URL}/blog/${blog.slug}`);
      }
    });
    console.log(`📝 Found ${blogs.filter(b => b.published).length} published blogs`);
  } catch (error) {
    console.log('Warning: Could not fetch blog URLs:', error.message);
  }

  // Fetch dynamic case study URLs from API
  console.log('📋 Fetching case study URLs...');
  try {
    const caseStudies = await fetchFromApi('/case-studies');
    caseStudies.forEach(caseStudy => {
      if (caseStudy.slug && caseStudy.published) {
        categorizedUrls.caseStudies.push(`${SITE_URL}/case-studies/${caseStudy.slug}`);
      }
    });
    console.log(`📋 Found ${caseStudies.filter(c => c.published).length} published case studies`);
  } catch (error) {
    console.log('Warning: Could not fetch case study URLs:', error.message);
  }

  // Remove duplicates from each category
  Object.keys(categorizedUrls).forEach(category => {
    categorizedUrls[category] = [...new Set(categorizedUrls[category])];
  });
  Object.keys(locationServicePages).forEach(country => {
    locationServicePages[country] = [...new Set(locationServicePages[country])];
  });
  
  // Print categorization summary
  console.log('\n📋 URL Categorization Summary:');
  Object.entries(categorizedUrls).forEach(([category, urls]) => {
    console.log(`  ${category}: ${urls.length} URLs`);
  });
    
  // Clean legacy location sitemap files from older versions.
  cleanOldLocationServiceSitemapFiles();

  // Generate individual sitemaps
  await createSitemapFile('page-sitemap.xml', categorizedUrls.pages);
  await createSitemapFile('main-services-sitemap.xml', categorizedUrls.mainServices);
  await createSitemapFile('sub-services-sitemap.xml', categorizedUrls.subServices);
  await createSitemapFile('case-study-sitemap.xml', categorizedUrls.caseStudies);
  await createSitemapFile('blog-sitemap.xml', categorizedUrls.blogs);
  await createSitemapFile('faq-sitemap.xml', categorizedUrls.faqs);
  await createSitemapFile('hire-sitemap.xml', categorizedUrls.hire);
  await createSitemapFile('locations-sitemap.xml', categorizedUrls.locations);
  await createSitemapFile('persona-sitemap.xml', categorizedUrls.personaBased);
  await createSitemapFile('goal-sitemap.xml', categorizedUrls.goalBased);
  await createSitemapFile('how-to-sitemap.xml', categorizedUrls.howTo);
  await createSitemapFile('checklist-sitemap.xml', categorizedUrls.checklists);
  await createLocationServiceSitemapFiles(locationServicePages);
  
  // Create main sitemap index
  await createSitemapIndex();
  
  console.log('\n✅ Separate sitemaps generated successfully!');
  console.log('\n📁 Generated files:');
  console.log('  - blog-sitemap.xml');
  console.log('  - case-study-sitemap.xml');
  console.log('  - faq-sitemap.xml');
  console.log('  - how-to-sitemap.xml');
  console.log('  - main-services-sitemap.xml');
  console.log('  - sub-services-sitemap.xml');
  console.log('  - hire-sitemap.xml');
  console.log('  - locations-sitemap.xml');
  console.log('  - persona-sitemap.xml');
  console.log('  - goal-sitemap.xml');
  Object.keys(locationServicePages).forEach(country => {
    console.log(`  - ${country}-services-sitemap.xml`);
  });
  console.log('  - page-sitemap.xml');
  console.log('  - sitemap.xml (main index)');
}

async function createSitemapFile(filename, urls, defaultPriority = '0.7') {
  if (urls.length === 0) {
    console.log(`⚠️  Skipping ${filename} (no URLs)`);
    return;
  }
  
  const filePath = path.join(PUBLIC_DIR, filename);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    const urlPath = new URL(url).pathname;
    const { priority, changefreq } = getUrlPriorityAndFreq(urlPath);
    
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  fs.writeFileSync(filePath, xml);
  console.log(`📄 Created ${filename} with ${urls.length} URLs`);
}

async function createLocationServiceSitemapFiles(locationServicePages) {
  if (!locationServicePages || Object.keys(locationServicePages).length === 0) {
    return;
  }

  Object.entries(locationServicePages).forEach(([country, urls]) => {
    const filename = `${country}-services-sitemap.xml`;
    createSitemapFile(filename, urls);
  });
}

function getLocationServiceSitemapFiles() {
  const locationServiceSitemapFiles = [];
  try {
    const files = fs.readdirSync(PUBLIC_DIR);
    files.forEach(file => {
      if (file.endsWith('-services-sitemap.xml')) {
        locationServiceSitemapFiles.push(file);
      }
    });
  } catch (error) {
    // Ignore missing folder errors
  }
  return locationServiceSitemapFiles;
}

function cleanOldLocationServiceSitemapFiles() {
  try {
    const files = fs.readdirSync(PUBLIC_DIR);
    files.forEach(file => {
      if (file.startsWith('locations-') && file.endsWith('-sitemap.xml') && file !== 'locations-sitemap.xml') {
        fs.unlinkSync(path.join(PUBLIC_DIR, file));
      }
    });
  } catch (error) {
    // Ignore cleanup failures
  }
}

async function createSitemapIndex() {
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  const sitemapFiles = [
    'page-sitemap.xml',
    'main-services-sitemap.xml',
    'sub-services-sitemap.xml',
    'case-study-sitemap.xml',
    'blog-sitemap.xml',
    'faq-sitemap.xml',
    'hire-sitemap.xml',
    'locations-sitemap.xml',
    'persona-sitemap.xml',
    'goal-sitemap.xml',
    'how-to-sitemap.xml',
    'checklist-sitemap.xml',
  ];
  
  const locationCountryFiles = getLocationServiceSitemapFiles().sort();
  sitemapFiles.push(...locationCountryFiles);
  
  // Remove duplicates and preserve order
  const uniqueSitemapFiles = [...new Set(sitemapFiles)];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  uniqueSitemapFiles.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  fs.writeFileSync(indexPath, xml);
  console.log(`📋 Created main sitemap index with ${uniqueSitemapFiles.length} sitemaps`);
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Run the script
if (require.main === module) {
  generateSeparateSitemaps().catch(console.error);
}

module.exports = { generateSeparateSitemaps };
