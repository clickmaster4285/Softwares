import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';

function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) return '';
  const content = fs.readFileSync(filePath, 'utf8');
  const line = content
    .split(/\r?\n/)
    .find((row) => row.trim().startsWith(`${key}=`) && !row.trim().startsWith('#'));
  if (!line) return '';
  return line.slice(line.indexOf('=') + 1).trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

const envPath = path.resolve(process.cwd(), '.env.local');
const mongoUri = process.env.MONGODB_URI || readEnvValue(envPath, 'MONGODB_URI');

if (!mongoUri) {
  console.error('MONGODB_URI is missing in environment or .env.local');
  process.exit(1);
}

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, sparse: true, index: true, default: '' },
    published: { type: Boolean, default: false },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    category: { type: String, default: '', index: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

const slug = 'custom-software-development';
const title = 'Custom Software Development Company in Pakistan | ClickMasters';
const excerpt =
  'ClickMasters is a leading custom software development company in Pakistan. We design, build, and deploy bespoke web apps, enterprise systems, and SaaS platforms for clients in the USA, Europe, and the Middle East.';

const content = `
<h1>Custom Software Development That Grows Your Business - Not Just Your Codebase</h1>
<p>Most software projects fail for one of two reasons: a development team that builds what was asked for rather than what was needed, or off-the-shelf software that forces a business to adapt its operations to someone else&apos;s product roadmap. Neither outcome is acceptable when your business depends on the result.</p>
<p>ClickMasters is a custom software development company in Pakistan with over eight years of experience building digital products that solve real business problems. We work with companies in the USA, Europe, and the Middle East to design, engineer, and deploy bespoke software, including web applications, enterprise systems, SaaS platforms, APIs, and more, that perform under real-world conditions and scale as your business grows.</p>
<p>Every engagement begins with one question: what does success look like for your business?</p>

<h2>What Is Custom Software Development?</h2>
<p>Custom software development is the end-to-end process of designing, building, testing, and deploying software engineered specifically for your organization&apos;s requirements. Unlike commercial off-the-shelf products, custom software is shaped around your workflows, business logic, users, and data.</p>
<p>When software is built around your operations, adoption is higher, errors are fewer, and the gains are measurable. Most importantly, the code and intellectual property belong to you.</p>

<h2>Our Custom Software Development Services</h2>
<h3>Enterprise Web Application Development</h3>
<p>We build secure, high-performance enterprise web applications using React, Next.js, Node.js, and Python for multi-role portals, dashboards, and operations platforms.</p>
<h3>SaaS Product Development</h3>
<p>From multi-tenant architecture to billing and onboarding, we deliver production-ready SaaS platforms that scale from first customers to high-growth usage.</p>
<h3>ERP &amp; Business Operations Software</h3>
<p>We build ERP systems that match how your teams actually work, including inventory, HR, project billing, and finance workflows.</p>
<h3>MVP Development</h3>
<p>We deliver investor-ready MVPs in 6-12 weeks with architecture that can evolve into full products without complete rewrites.</p>
<h3>API Development &amp; System Integration</h3>
<p>We design REST and GraphQL APIs and connect modern applications with CRMs, payment systems, logistics platforms, and legacy databases.</p>
<h3>Desktop Application Development</h3>
<p>For environments requiring offline support or device-level integration, we build robust desktop software for Windows, macOS, and Linux.</p>
<h3>Software Modernization &amp; Legacy Migration</h3>
<p>We modernize legacy systems through phased migration, wrappers, and strategic rebuilds with minimal disruption to business operations.</p>

<h2>Why Choose ClickMasters?</h2>
<ul>
  <li>Business-outcome-first discovery and planning</li>
  <li>Transparent two-week sprint delivery with demos</li>
  <li>Senior technical leadership on every engagement</li>
  <li>End-to-end ownership from UX to deployment</li>
  <li>Post-launch support and long-term partnership</li>
</ul>

<h2>Our Process</h2>
<ol>
  <li>Discovery and requirements analysis</li>
  <li>Solution architecture and technical planning</li>
  <li>UI/UX design and prototyping</li>
  <li>Agile development in two-week sprints</li>
  <li>Quality assurance and testing</li>
  <li>Deployment, go-live, and handover</li>
</ol>

<h2>Technology Stack</h2>
<p>Frontend: React.js, Next.js, TypeScript, Tailwind CSS.</p>
<p>Backend: Node.js, NestJS, Python, Django, FastAPI, Laravel, Java Spring.</p>
<p>Databases: PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch.</p>
<p>Cloud &amp; DevOps: AWS, Azure, GCP, Docker, Kubernetes, Terraform, GitHub Actions.</p>

<h2>Industries We Serve</h2>
<p>Manufacturing, healthcare, retail, e-commerce, real estate, education, professional services, logistics, fintech, media, and government.</p>

<h2>Proof of Delivery</h2>
<p><strong>Custom ERP for a German Manufacturing Firm:</strong> We replaced four disconnected systems with a unified ERP and real-time dashboards, reducing planning cycle time by 43%, improving inventory accuracy to 98.5%, and delivering three weeks ahead of deadline.</p>

<h2>Frequently Asked Questions</h2>
<h3>How much does custom software development cost?</h3>
<p>Simple apps typically start from $5,000-$15,000. Mid-complexity platforms often range from $20,000-$60,000. Enterprise systems and multi-tenant SaaS can range from $60,000 to $200,000+ depending on scope.</p>
<h3>How long does custom software development take?</h3>
<p>MVPs usually take 6-12 weeks, while larger platforms may take 4-8 months. Complex enterprise programs can span 12-18 months with phased delivery.</p>
<h3>Will I own the code and intellectual property?</h3>
<p>Yes. IP transfer is standard in every ClickMasters engagement.</p>
<h3>Can you take over incomplete projects?</h3>
<p>Yes. We audit the codebase, assess technical debt, and provide a structured recovery plan before continuing development.</p>
<h3>Do you work with international clients?</h3>
<p>Yes. We work with clients globally and run delivery through clear async updates, scheduled calls, and shared project tools.</p>
<h3>What happens after go-live?</h3>
<p>We provide post-launch support with monitoring, optimization, security patching, and iterative feature development.</p>

<h2>Ready to Build Your Custom Software?</h2>
<p>Tell us about your project and get a free, no-pressure 30-minute consultation at <a href="https://software.clickmasters.pk/contact-us">software.clickmasters.pk/contact-us</a>.</p>
`;

const postData = {
  slug,
  published: true,
  title,
  excerpt,
  content,
  author: 'ClickMasters',
  thumbnail: '',
  category: 'Custom Software Development',
  tags: [
    'custom software development company Pakistan',
    'bespoke software development',
    'custom web application development',
    'tailor-made software solutions',
    'custom software developer',
    'build custom software',
  ],
};

async function run() {
  await mongoose.connect(mongoUri);
  const result = await BlogPost.findOneAndUpdate(
    { slug },
    { $set: postData },
    { upsert: true, returnDocument: 'after' }
  );
  console.log(`Upserted blog post: ${result.title} (${result.slug})`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
