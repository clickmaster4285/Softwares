const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://software.clickmasters.pk';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

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
  };

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
      });
    });
  }

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
  
  console.log(`📊 Found ${allUrls.length} total URLs to categorize`);
  
  // Categorize URLs
  allUrls.forEach(url => {
    const urlPath = new URL(url).pathname;
    
    // Skip admin URLs
    if (urlPath.includes('/admin')) {
      return; // Skip admin URLs
    }
    
    if (urlPath.includes('/faqs/') && urlPath !== '/faqs') {
      categorizedUrls.faqs.push(url);
    } else if (urlPath.includes('/blog/')) {
      // Skip individual blog URLs as they're handled dynamically
      return;
    } else if (urlPath.includes('/case-studies/')) {
      // Skip individual case study URLs as they're handled dynamically
      return;
    } else if (urlPath.includes('/hire-') || urlPath.includes('/hire/')) {
      categorizedUrls.hire.push(url);
    } else if (isMainService(urlPath)) {
      categorizedUrls.mainServices.push(url);
    } else if (isSubService(urlPath)) {
      categorizedUrls.subServices.push(url);
    }  else {
      categorizedUrls.pages.push(url);
    }
  });
  
  // Remove duplicates from each category
  Object.keys(categorizedUrls).forEach(category => {
    categorizedUrls[category] = [...new Set(categorizedUrls[category])];
  });
  
  // Print categorization summary
  console.log('\n📋 URL Categorization Summary:');
  Object.entries(categorizedUrls).forEach(([category, urls]) => {
    console.log(`  ${category}: ${urls.length} URLs`);
  });
    
  // Generate individual sitemaps
  await createSitemapFile('page-sitemap.xml', categorizedUrls.pages);
  await createSitemapFile('main-services-sitemap.xml', categorizedUrls.mainServices);
  await createSitemapFile('sub-services-sitemap.xml', categorizedUrls.subServices);
  await createSitemapFile('case-study-sitemap.xml', categorizedUrls.caseStudies);
  await createSitemapFile('blog-sitemap.xml', categorizedUrls.blogs);
  await createSitemapFile('faq-sitemap.xml', categorizedUrls.faqs);
  await createSitemapFile('hire-sitemap.xml', categorizedUrls.hire);
  
  // Create main sitemap index
  await createSitemapIndex();
  
  console.log('\n✅ Separate sitemaps generated successfully!');
  console.log('\n📁 Generated files:');
  console.log('  - blog-sitemap.xml');
  console.log('  - case-study-sitemap.xml');
  console.log('  - faq-sitemap.xml');
  console.log('  - main-services-sitemap.xml');
  console.log('  - sub-services-sitemap.xml');
  console.log('  - hire-sitemap.xml');
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
  ];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemapFiles.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  fs.writeFileSync(indexPath, xml);
  console.log(`📋 Created main sitemap index with ${sitemapFiles.length} sitemaps`);
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
