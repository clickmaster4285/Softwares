const fs = require('fs');
const path = require('path');

// Try to import mongoose for dynamic content
let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  console.log('⚠️  Mongoose not available, using static sitemap only');
}

const SITE_URL = 'https://software.clickmasters.pk';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Content type patterns for categorization
const CONTENT_PATTERNS = {
  faqs: /\/faqs\//,
  blogs: /\/blog\//,
  caseStudies: /\/case-studies\//,
  services: /\/(services|software-development|ai-|custom-|enterprise-|nft-|token-|rag-)/,
  categories: /\/(categories?|category)\//,
  pages: /^(?!.*\/(faqs|blog|case-studies|services|categories?)).*$/
};

async function generateSeparateSitemaps() {
  console.log('🚀 Starting separate sitemap generation...');
  
  let categorizedUrls = {
    categories: [],
    subcategories: [],
    faqs: [],
    blogs: [],
    caseStudies: [],
    services: [],
    pages: []
  };

  // Try to get dynamic content from database
  if (mongoose) {
    console.log('📊 Fetching dynamic content from database...');
    await addDynamicContent(categorizedUrls);
  } else {
    console.log('📊 Using static sitemap content...');
    // Fallback to reading generated sitemap
    await addStaticContent(categorizedUrls);
  }
  
  // Print categorization summary
  console.log('\n📋 URL Categorization Summary:');
  Object.entries(categorizedUrls).forEach(([category, urls]) => {
    console.log(`  ${category}: ${urls.length} URLs`);
  });
  
  // Create separate sitemaps
  await createSitemapFile('category-sitemap.xml', categorizedUrls.categories, '1.0');
  await createSitemapFile('subcategory-sitemap.xml', categorizedUrls.subcategories, '0.8');
  await createSitemapFile('faq-sitemap.xml', categorizedUrls.faqs, '0.9');
  await createSitemapFile('blog-sitemap.xml', categorizedUrls.blogs, '0.8');
  await createSitemapFile('case-study-sitemap.xml', categorizedUrls.caseStudies, '0.8');
  await createSitemapFile('service-sitemap.xml', categorizedUrls.services, '0.9');
  await createSitemapFile('page-sitemap.xml', categorizedUrls.pages, '0.7');
  
  // Create main sitemap index
  await createSitemapIndex();
  
  console.log('\n✅ Separate sitemaps generated successfully!');
  console.log('\n📁 Generated files:');
  console.log('  - category-sitemap.xml');
  console.log('  - subcategory-sitemap.xml');
  console.log('  - faq-sitemap.xml');
  console.log('  - blog-sitemap.xml');
  console.log('  - case-study-sitemap.xml');
  console.log('  - service-sitemap.xml');
  console.log('  - page-sitemap.xml');
  console.log('  - sitemap.xml (main index)');
}

async function addDynamicContent(categorizedUrls) {
  try {
    // Connect to database
    const dbConnect = require('../lib/mongoose');
    await dbConnect();
    
    // Add dynamic blog URLs
    const BlogPost = require('../lib/models/BlogPost');
    const blogPosts = await BlogPost.find({ published: true })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 })
      .lean();
    
    blogPosts.forEach(post => {
      if (post.slug) {
        categorizedUrls.blogs.push(`${SITE_URL}/blog/${post.slug}`);
      }
    });
    
    // Add dynamic case study URLs
    const CaseStudy = require('../lib/models/CaseStudy');
    const caseStudies = await CaseStudy.find({ published: true })
      .select('slug updatedAt createdAt')
      .sort({ createdAt: -1 })
      .lean();
    
    caseStudies.forEach(cs => {
      if (cs.slug) {
        categorizedUrls.caseStudies.push(`${SITE_URL}/case-studies/${cs.slug}`);
      }
    });
    
    // Add dynamic FAQ URLs
    const faqSlugs = await getFaqSlugs();
    faqSlugs.forEach(slug => {
      categorizedUrls.faqs.push(`${SITE_URL}/faqs/${slug}`);
    });
    
    console.log(`✅ Dynamic content added: ${blogPosts.length} blogs, ${caseStudies.length} case studies, ${faqSlugs.length} FAQs`);
    
  } catch (error) {
    console.log('❌ Error fetching dynamic content:', error.message);
  }
}

async function addStaticContent(categorizedUrls) {
  // Read the generated sitemap to get all URLs
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap-0.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.log('❌ No sitemap-0.xml found. Please run next-sitemap first.');
    return;
  }
  
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Extract all URLs from the sitemap
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const matches = sitemapContent.match(urlRegex) || [];
  const allUrls = matches.map(match => match.replace(/<\/?loc>/g, ''));
  
  console.log(`📊 Found ${allUrls.length} total URLs to categorize`);
  
  // Categorize URLs
  allUrls.forEach(url => {
    const urlPath = new URL(url).pathname;
    
    if (CONTENT_PATTERNS.faqs.test(urlPath)) {
      categorizedUrls.faqs.push(url);
    } else if (CONTENT_PATTERNS.blogs.test(urlPath)) {
      categorizedUrls.blogs.push(url);
    } else if (CONTENT_PATTERNS.caseStudies.test(urlPath)) {
      categorizedUrls.caseStudies.push(url);
    } else if (CONTENT_PATTERNS.services.test(urlPath)) {
      categorizedUrls.services.push(url);
    } else if (CONTENT_PATTERNS.categories.test(urlPath)) {
      categorizedUrls.categories.push(url);
    } else {
      categorizedUrls.pages.push(url);
    }
  });
}

async function getFaqSlugs() {
  try {
    // Get FAQ slugs from service pages
    const { getServicePages } = require('../src/lib/service-pages');
    const servicePages = getServicePages();
    const faqSlugs = [];
    
    servicePages.forEach(page => {
      if (page.faqs && page.faqs.length > 0) {
        faqSlugs.push(page.slug);
      }
    });
    
    return faqSlugs;
  } catch (error) {
    console.log('⚠️  Could not fetch FAQ slugs:', error.message);
    return [];
  }
}

async function createSitemapFile(filename, urls, priority = '0.7') {
  if (urls.length === 0) {
    console.log(`⚠️  Skipping ${filename} (no URLs)`);
    return;
  }
  
  const filePath = path.join(PUBLIC_DIR, filename);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url)}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  fs.writeFileSync(filePath, xml);
  console.log(`📄 Created ${filename} with ${urls.length} URLs`);
}

async function createSitemapIndex() {
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  
  const sitemaps = [
    'category-sitemap.xml',
    'subcategory-sitemap.xml', 
    'faq-sitemap.xml',
    'blog-sitemap.xml',
    'case-study-sitemap.xml',
    'service-sitemap.xml',
    'page-sitemap.xml'
  ];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  fs.writeFileSync(indexPath, xml);
  console.log(`📋 Created main sitemap index with ${sitemaps.length} sitemaps`);
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
