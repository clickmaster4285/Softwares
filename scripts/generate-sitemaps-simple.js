const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://software.clickmasters.pk';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const IMAGE_SITEMAP_SKIP = new Set([
  '/svg/favicon.svg',
  '/images/placeholder.svg',
  '/favicon.svg',
]);

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

// Import service structure to generate URLs
let serviceMenuSections = [];
try {
  const servicePagesPath = path.join(process.cwd(), 'src/lib/service-pages.ts');
  if (fs.existsSync(servicePagesPath)) {
    const servicePagesContent = fs.readFileSync(servicePagesPath, 'utf8');
    // Extract serviceMenuSections from the file
    const match = servicePagesContent.match(/export const serviceMenuSections.*?=\s*(\[[\s\S]*?\]);/s);
    if (match) {
      // Simple evaluation - this is not ideal but works for our use case
      const sectionsCode = match[1];
      eval(`serviceMenuSections = ${sectionsCode}`);
    }
  }
} catch (error) {
  console.log('Could not load service structure:', error.message);
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

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Match slugify from src/lib/service-pages.ts
function servicePagesSlugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractAllServicePageUrls() {
  const servicePagesPath = path.join(process.cwd(), 'src/lib/service-pages.ts');
  const pagesBySlug = new Map();

  if (serviceMenuSections.length > 0) {
    serviceMenuSections.forEach((section) => {
      const categorySlug = servicePagesSlugify(section.label);
      section.items.forEach((item) => {
        const slug = servicePagesSlugify(item.title);
        pagesBySlug.set(slug, {
          categorySlug,
          slug,
          url: `${SITE_URL}/${categorySlug}/${slug}`,
        });
      });
    });
  }

  if (fs.existsSync(servicePagesPath)) {
    const content = fs.readFileSync(servicePagesPath, 'utf8');
    const overrideRegex =
      /const\s+\w+Override:\s*ServicePageContent\s*=\s*\{[\s\S]*?slug:\s*'([^']+)'[\s\S]*?categorySlug:\s*'([^']+)'/g;
    let match;

    while ((match = overrideRegex.exec(content)) !== null) {
      const [, slug, categorySlug] = match;
      pagesBySlug.set(slug, {
        categorySlug,
        slug,
        url: `${SITE_URL}/${categorySlug}/${slug}`,
      });
    }
  }

  return [...pagesBySlug.values()];
}

const SERVICE_HERO_IMAGE = '/images/hero-img.png';
const CHECKLIST_IMAGE = '/images/checklist-img.webp';
const HOMEPAGE_IMAGES = [
  '/images/hero.webp',
  '/images/hero-bg.jpg',
  '/images/logo1.webp',
  '/images/logo-white1.webp',
  '/images/ctaImage.png',
  '/og/logo-white.webp',
];

function getPartnerImages() {
  const partnersDir = path.join(PUBLIC_DIR, 'partners');
  if (!fs.existsSync(partnersDir)) {
    return [];
  }

  return fs
    .readdirSync(partnersDir)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file) => `/partners/${file}`);
}

function extractPersonaSlugs() {
  const personaPath = path.join(process.cwd(), 'src/lib/persona-based.ts');
  if (!fs.existsSync(personaPath)) {
    return [];
  }

  const content = fs.readFileSync(personaPath, 'utf8');
  const match = content.match(/export const servicePages\s*:\s*ServicePageData\[\]\s*=\s*(\[.*\])/s);
  if (!match) {
    return [];
  }

  const arrayText = match[1];
  const slugMatches = [...arrayText.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)];
  return slugMatches.map((m) => m[1]).filter((slug) => slug.includes('-for-'));
}

const PERSONA_SUFFIXES = [
  '-for-enterprise-it-directors',
  '-for-non-technical-ceos',
  '-for-product-managers',
  '-for-startup-founders',
  '-for-ctos',
];

function baseServiceSlugFromPersona(personaSlug) {
  for (const suffix of PERSONA_SUFFIXES) {
    if (personaSlug.endsWith(suffix)) {
      return personaSlug.slice(0, -suffix.length);
    }
  }
  return personaSlug;
}

function getPersonaCategorySlug(serviceSlug) {
  for (const section of serviceMenuSections) {
    const categorySlug = slugify(section.label);
    for (const item of section.items) {
      if (slugify(item.title) === serviceSlug) {
        return categorySlug;
      }
    }
  }
  return 'services';
}

function isPersonaBasedUrl(urlPath) {
  const segments = urlPath.split('/').filter(Boolean);
  return segments.length === 4 && segments[3].includes('-for-');
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
    '/cloud-devops',
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
    '/cloud-devops',
    '/cybersecurity',
    '/cybersecurity-compliance',
    '/data-intelligence',
    '/data-science-analytics',
    '/data-services',
    '/database-data-management',
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

  // Generate URLs based on service structure
  if (serviceMenuSections.length > 0) {
    serviceMenuSections.forEach(section => {
      const mainServiceSlug = section.label.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      // Add main service URL
      const mainServiceUrl = `${SITE_URL}/${mainServiceSlug}`;
      categorizedUrls.mainServices.push(mainServiceUrl);
      
      // Add sub-service URLs with proper nesting
      section.items.forEach(item => {
        const subServiceSlug = item.title.toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
        const subServiceUrl = `${SITE_URL}/${mainServiceSlug}/${subServiceSlug}`;
        categorizedUrls.subServices.push(subServiceUrl);
        
        // Add FAQ URL for each sub-service
        const faqUrl = `${SITE_URL}/faqs/${subServiceSlug}`;
        categorizedUrls.faqs.push(faqUrl);

        // Add how-to URL when a guide exists for the service
        if (howToGuideSlugs.has(subServiceSlug)) {
          categorizedUrls.howTo.push(`${subServiceUrl}/how-to`);
        }
      });
    });
  }

  const personaSlugs = extractPersonaSlugs();
  console.log(`🧭 Found ${personaSlugs.length} persona-based slugs`);
  personaSlugs.forEach((personaSlug) => {
    const baseServiceSlug = baseServiceSlugFromPersona(personaSlug);
    const categorySlug = getPersonaCategorySlug(baseServiceSlug);
    categorizedUrls.personaBased.push(`${SITE_URL}/${categorySlug}/${baseServiceSlug}/${personaSlug}`);
  });

  // Add hire URLs from navbar structure
  const hireUrls = [
    '/hire/hire-ai-developers',
    '/hire/ai-agent-development-services',
    '/hire/rag-development-services',
    '/hire/custom-software-development',
    '/hire/saas-development-services',
    '/hire/ai-development-healthcare',
    '/hire/ai-development-finance',
    '/hire/ai-development-logistics',
    '/hire/ai-agents-for-customer-support',
    '/hire/ai-agents-for-sales',
    '/hire/ai-agents-for-lead-qualification',
    '/hire/ai-development-company-usa',
    '/hire/ai-development-company-uk',
    '/hire/ai-development-cost',
    '/hire/rag-development-cost'
  ];
  
  hireUrls.forEach(hireUrl => {
    categorizedUrls.hire.push(`${SITE_URL}${hireUrl}`);
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

  // Read the generated sitemap to get any additional URLs
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap-0.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.log('❌ No sitemap-0.xml found. Please run next-sitemap first.');
    return;
  }
  
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Extract all URLs from the sitemap
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const matches = sitemapContent.match(urlRegex) || [];
  let allUrls = matches.map(match => match.replace(/<\/?loc>/g, ''));
  
  // Remove /services/ from URLs to match the updated routing
  allUrls = allUrls.map(url => {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace(/\/services\//, '/');
    return urlObj.toString();
  });

  const checklistSlugs = extractChecklistSlugs();
  
  console.log(`📊 Found ${allUrls.length} total URLs to categorize`);
  
  // Categorize URLs
  allUrls.forEach(url => {
    const urlPath = new URL(url).pathname;
    const segments = urlPath.split('/').filter(Boolean);

    // Skip admin URLs
    if (urlPath.includes('/admin')) {
      return; // Skip admin URLs
    }

    if (segments.length === 3 && segments[2] === 'checklist' && segments[0] !== 'faqs') {
      categorizedUrls.checklists.push(url);
    } else if (urlPath.includes('/how-to')) {
      categorizedUrls.howTo.push(url);
    } else if (urlPath.includes('/faqs/') && urlPath !== '/faqs') {
      categorizedUrls.faqs.push(url);
    } else if (urlPath.includes('/blog/')) {
      // Skip individual blog URLs as they're handled dynamically
      return;
    } else if (urlPath.includes('/case-studies/')) {
      // Skip individual case study URLs as they're handled dynamically
      return;
    } else if (urlPath.startsWith('/locations/')) {
      const segments = urlPath.split('/').filter(Boolean);
      if (segments.length === 2) {
        categorizedUrls.locations.push(url);
      } else if (segments.length >= 3) {
        const country = segments[1];
        if (validCountryServiceUrlsMap[country] && validCountryServiceUrlsMap[country].has(url)) {
          locationServicePages[country] = locationServicePages[country] || [];
          locationServicePages[country].push(url);
        }
      }
    } else if (urlPath.includes('/hire-') || urlPath.includes('/hire/')) {
      categorizedUrls.hire.push(url);
    } else if (isPersonaBasedUrl(urlPath)) {
      categorizedUrls.personaBased.push(url);
    } else if (isMainService(urlPath)) {
      categorizedUrls.mainServices.push(url);
    } else if (isSubService(urlPath)) {
      categorizedUrls.subServices.push(url);
    } else {
      categorizedUrls.pages.push(url);
    }
  });
  
  // Add checklist URLs from service pages if a checklist exists for the service slug
  allUrls.forEach(url => {
    const urlPath = new URL(url).pathname;
    const segments = urlPath.split('/').filter(Boolean);

    if (
      segments.length === 2 &&
      segments[0] !== 'faqs' &&
      segments[0] !== 'blog' &&
      segments[0] !== 'case-studies' &&
      segments[0] !== 'locations' &&
      segments[0] !== 'hire' &&
      checklistSlugs.has(segments[1])
    ) {
      categorizedUrls.checklists.push(`${SITE_URL}${urlPath}/checklist`);
    }
  });

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
  await createSitemapFile('how-to-sitemap.xml', categorizedUrls.howTo);
  await createSitemapFile('checklist-sitemap.xml', categorizedUrls.checklists);
  await createLocationServiceSitemapFiles(locationServicePages);

  const pageImagesMap = await collectImageSitemapEntries(categorizedUrls, locationServicePages);
  const pageVideosMap = collectVideoSitemapEntries(categorizedUrls, locationServicePages);
  await createImageSitemapFile('image-sitemap.xml', pageImagesMap);
  await createVideoSitemapFile('video-sitemap.xml', pageVideosMap);
  
  // Create main sitemap index
  await createSitemapIndex();
  
  console.log('\n✅ Separate sitemaps generated successfully!');
  console.log('\n📁 Generated files:');
  console.log('  - image-sitemap.xml');
  console.log('  - video-sitemap.xml');
  console.log('  - blog-sitemap.xml');
  console.log('  - case-study-sitemap.xml');
  console.log('  - faq-sitemap.xml');
  console.log('  - how-to-sitemap.xml');
  console.log('  - main-services-sitemap.xml');
  console.log('  - sub-services-sitemap.xml');
  console.log('  - hire-sitemap.xml');
  console.log('  - locations-sitemap.xml');
  console.log('  - persona-sitemap.xml');
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
    'how-to-sitemap.xml',
    'checklist-sitemap.xml',
    'image-sitemap.xml',
    'video-sitemap.xml',
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

function resolveMediaUrl(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return `${SITE_URL}${trimmed}`;
  }

  return `${SITE_URL}/${trimmed}`;
}

function walkPublicMediaFiles(relativeDir = '', extensionSet) {
  const absoluteDir = path.join(PUBLIC_DIR, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const results = [];
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });

  entries.forEach((entry) => {
    const nextRelative = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (entry.name === 'uploads') {
        return;
      }
      results.push(...walkPublicMediaFiles(nextRelative, extensionSet));
      return;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!extensionSet.has(ext)) {
      return;
    }

    results.push(`/${nextRelative.replace(/\\/g, '/')}`);
  });

  return results;
}

function addImageEntry(pageImagesMap, pageUrl, imageUrl, title = '') {
  const resolvedPage = resolveMediaUrl(pageUrl);
  const resolvedImage = resolveMediaUrl(imageUrl);

  if (!resolvedPage || !resolvedImage) {
    return;
  }

  if (!pageImagesMap.has(resolvedPage)) {
    pageImagesMap.set(resolvedPage, []);
  }

  const entries = pageImagesMap.get(resolvedPage);
  if (entries.some((entry) => entry.loc === resolvedImage)) {
    return;
  }

  entries.push({
    loc: resolvedImage,
    title: title || path.basename(resolvedImage),
  });
}

function addVideoEntry(pageVideosMap, pageUrl, video) {
  const resolvedPage = resolveMediaUrl(pageUrl);
  const contentLoc = resolveMediaUrl(video.content_loc);
  const thumbnailLoc = resolveMediaUrl(video.thumbnail_loc);

  if (!resolvedPage || !contentLoc || !thumbnailLoc) {
    return;
  }

  if (!pageVideosMap.has(resolvedPage)) {
    pageVideosMap.set(resolvedPage, []);
  }

  const entries = pageVideosMap.get(resolvedPage);
  const duplicate = entries.some((entry) => entry.content_loc === contentLoc);
  if (duplicate) {
    return;
  }

  entries.push({
    content_loc: contentLoc,
    thumbnail_loc: thumbnailLoc,
    title: video.title || 'ClickMasters',
    description: video.description || 'ClickMasters software development services video.',
  });
}

async function collectImageSitemapEntries(_categorizedUrls, locationServicePages) {
  const pageImagesMap = new Map();
  const servicePages = extractAllServicePageUrls();
  const checklistSlugs = extractChecklistSlugs();

  [...HOMEPAGE_IMAGES, ...getPartnerImages()].forEach((imagePath) => {
    addImageEntry(pageImagesMap, `${SITE_URL}/`, imagePath, path.basename(imagePath));
  });

  if (fs.existsSync(path.join(PUBLIC_DIR, 'images', 'ceo.jpeg'))) {
    addImageEntry(pageImagesMap, `${SITE_URL}/about-us`, '/images/ceo.jpeg', 'CEO');
  }

  servicePages.forEach(({ url, slug }) => {
    addImageEntry(pageImagesMap, url, SERVICE_HERO_IMAGE, 'Service hero');

    if (checklistSlugs.has(slug)) {
      addImageEntry(pageImagesMap, `${url}/checklist`, CHECKLIST_IMAGE, 'Service checklist');
    }
  });

  Object.values(locationServicePages).flat().forEach((pageUrl) => {
    addImageEntry(pageImagesMap, pageUrl, SERVICE_HERO_IMAGE, 'Service hero');
  });

  try {
    const blogs = await fetchFromApi('/blog');
    blogs.forEach((blog) => {
      if (!blog.published || !blog.slug) {
        return;
      }

      const pageUrl = `${SITE_URL}/blog/${blog.slug}`;
      if (blog.thumbnail) {
        addImageEntry(pageImagesMap, pageUrl, blog.thumbnail, blog.title || 'Blog post');
      }
      if (blog.authorImage) {
        addImageEntry(pageImagesMap, pageUrl, blog.authorImage, blog.author || 'Author');
      }
    });
  } catch (error) {
    console.log('Warning: Could not fetch blog images:', error.message);
  }

  try {
    const caseStudies = await fetchFromApi('/case-studies');
    caseStudies.forEach((caseStudy) => {
      if (!caseStudy.published || !caseStudy.slug) {
        return;
      }

      const pageUrl = `${SITE_URL}/case-studies/${caseStudy.slug}`;
      const image =
        caseStudy.thumbnail ||
        caseStudy.project?.thumbnail ||
        '';

      if (image) {
        addImageEntry(pageImagesMap, pageUrl, image, caseStudy.title || 'Case study');
      }
    });
  } catch (error) {
    console.log('Warning: Could not fetch case study images:', error.message);
  }

  try {
    const projects = await fetchFromApi('/projects');
    projects.forEach((project) => {
      if (!project._id || !project.thumbnail) {
        return;
      }

      addImageEntry(
        pageImagesMap,
        `${SITE_URL}/software-solutions/${project._id}`,
        project.thumbnail,
        project.title || 'Software solution',
      );
    });
  } catch (error) {
    console.log('Warning: Could not fetch project images:', error.message);
  }

  return pageImagesMap;
}

function collectVideoSitemapEntries(_categorizedUrls, locationServicePages) {
  const pageVideosMap = new Map();
  const servicePages = extractAllServicePageUrls();
  const video = {
    content_loc: '/video/services-video.mp4',
    thumbnail_loc: '/images/services_hero.png',
    title: 'ClickMasters Software Development Services',
    description:
      'Overview video showcasing ClickMasters software development services, web apps, mobile apps, and SaaS solutions.',
  };

  const videoPages = new Set([
    ...servicePages.map((page) => page.url),
    ...Object.values(locationServicePages).flat(),
  ]);

  videoPages.forEach((pageUrl) => {
    addVideoEntry(pageVideosMap, pageUrl, video);
  });

  return pageVideosMap;
}

async function createImageSitemapFile(filename, pageImagesMap) {
  if (!pageImagesMap.size) {
    console.log(`⚠️  Skipping ${filename} (no images)`);
    return;
  }

  const filePath = path.join(PUBLIC_DIR, filename);
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  let imageCount = 0;

  pageImagesMap.forEach((images, pageUrl) => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;

    images.forEach((image) => {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(image.loc)}</image:loc>\n`;
      if (image.title) {
        xml += `      <image:title>${escapeXml(image.title)}</image:title>\n`;
      }
      xml += '    </image:image>\n';
      imageCount++;
    });

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(filePath, xml);
  console.log(`📄 Created ${filename} with ${imageCount} images across ${pageImagesMap.size} pages`);
}

async function createVideoSitemapFile(filename, pageVideosMap) {
  if (!pageVideosMap.size) {
    console.log(`⚠️  Skipping ${filename} (no videos)`);
    return;
  }

  const filePath = path.join(PUBLIC_DIR, filename);
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  let videoCount = 0;

  pageVideosMap.forEach((videos, pageUrl) => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(pageUrl)}</loc>\n`;

    videos.forEach((video) => {
      xml += '    <video:video>\n';
      xml += `      <video:thumbnail_loc>${escapeXml(video.thumbnail_loc)}</video:thumbnail_loc>\n`;
      xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
      xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
      xml += `      <video:content_loc>${escapeXml(video.content_loc)}</video:content_loc>\n`;
      xml += '    </video:video>\n';
      videoCount++;
    });

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(filePath, xml);
  console.log(`📄 Created ${filename} with ${videoCount} videos across ${pageVideosMap.size} pages`);
}

// Run the script
if (require.main === module) {
  generateSeparateSitemaps().catch(console.error);
}

module.exports = { generateSeparateSitemaps };
