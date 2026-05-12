// app/locations/[location]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { countryData, getAllCountrySlugs, getCountryData } from '@/lib/country';
import { getCountryServicePage, getAllCountryServicePages } from '@/lib/country-services';
import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';
import { TestimonialsSection } from '@/src/components/landingPage/home/TestimonialsSection';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';
import FaqSection from '@/src/components/landingPage/location/FaqSection';
import ProjectCTAHero from '@/src/components/landingPage/location/ProjectCTAHero';
import WhyChooseUs from '@/src/components/landingPage/home/whyUs';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import PainPointsSolutions from '@/src/components/landingPage/home/PainPointsSolutions';
import SolutionsPage from '@/src/components/landingPage/home/Solutions';

type Props = { params: Promise<{ location: string }> };

// Helper function to create URL-friendly slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to get the correct service slug for a country
function getServiceSlugForCountry(service: string, country: string): string {
  // Get all country service pages and find the matching one
  const allPages = getAllCountryServicePages();
  const matchingPage = allPages.find((page: any) => 
    page.categorySlug === country && 
    page.serviceName === service
  );
  
  return matchingPage?.slug || `${createSlug(service)}-${country.toLowerCase()}`;
}

// Generate static paths for all countries at build time
export async function generateStaticParams() {
  const slugs = getAllCountrySlugs();
  return slugs.map((location) => ({
    location,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const country = getCountryData(location);
  
  if (!country) {
    return { title: 'Location Not Found' };
  }

  return {
    title: country.title,
    description: country.description,
    openGraph: {
      title: country.title,
      description: country.description,
      type: 'website',
      url: `/locations/${location}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: country.title,
      description: country.description,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { location } = await params;
  
  // Get country data
  const country = getCountryData(location);
  
  // If no country data found, show 404
  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              {country.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              {country.heroSubheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/contact-us?location=${location}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Free Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Country Intro / Local Business Understanding */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Understanding {country.name}'s Business Landscape
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Business Environment</h3>
              <p className="text-lg text-slate-600 mb-6">
                {country.businessLandscape}
              </p>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Digital Transformation</h3>
              <p className="text-lg text-slate-600 mb-6">
                {country.digitalTransformationDemand}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Market Challenges</h3>
              <ul className="space-y-3">
                {country.marketChallenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <span className="text-slate-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust & Global Credibility Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Global Clients
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Building confidence through proven expertise and exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-slate-600">Projects Delivered</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-slate-600">International Clients</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <p className="text-slate-600">Years Experience</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-slate-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services We Provide in [Country] */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Services We Provide in {country.name}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive software development solutions tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  <a 
                    href={`/locations/${location}/${getServiceSlugForCountry(service, location)}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {service}
                  </a>
                </h3>
                <p className="text-slate-600 mb-4">
                  Professional {service.toLowerCase()} solutions designed to meet your specific business requirements and drive growth.
                </p>
                <a
                  href={`/locations/${location}/${getServiceSlugForCountry(service, location)}`}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve in [Country] */}
      <section className="">
    <TrustedClientsSection/>
      </section>

      {/* 6. Solutions for Businesses in [Country] */}
      <section className="">
    <SolutionsPage/>
      </section>

      {/* 7. Problems Businesses Face in [Country] */}
      <section className="">
        <PainPointsSolutions  countryName={country.name} />
      </section>

      {/* 8. Why Choose Us in [Country] */}
      <section className="">
      <WhyChooseUs 
  countryName={country.name}
  items={[
    { title: 'Agile Development', desc: 'Flexible and iterative approach for faster delivery' },
    { title: 'Dedicated Teams', desc: 'Focused experts committed to your project success' },
    { title: 'Transparent Communication', desc: 'Regular updates and complete project visibility' },
    { title: 'Timezone Flexibility', desc: 'Working hours aligned with your business needs' },
    { title: 'Scalable Architecture', desc: 'Future-proof solutions that grow with your business' },
    { title: 'Ongoing Support', desc: 'Comprehensive maintenance and continuous improvement' }
  ]}
/>
      </section>

      {/* 9. Development Process */}
      {country.processPhases && (
        <ProcessSection 
          serviceName={country.name} 
          processPhases={country.processPhases} 
        />
      )}

      {/* Pricing Section */}
      {country.pricingTiers && (
        <PricingSection 
          serviceName={country.name} 
          pricingTiers={country.pricingTiers} 
        />
      )}

            {/* 14. Lead Generation Section */}
<ProjectCTAHero 
  variant="combined"
  badge="Build Your Project"
  title="Ready to Transform Your Business? Let's Build Something Amazing Together"
  description="Get started with a free consultation and discover how we can help you achieve your goals. Whether you need a custom web app, mobile solution, or enterprise software, our team is ready to bring your vision to life."
  buttons={[
    { text: "Book Free Consultation", href: `/contact-us?location=${location}`, variant: "primary", icon: "calendar" },
    { text: "Call Us Now", href: "tel:+1234567890", variant: "outline", icon: "phone" }
  ]}
  sliderCards={[
    { title: "100+", subtitle: "Projects Delivered" },
    { title: "Agile", subtitle: "Development" },
    { title: "On-time", subtitle: "Delivery" },
    { title: "24/7", subtitle: "Support" },
    { title: "50+", subtitle: "Happy Clients" },
    { title: "10x", subtitle: "Faster Shipping" },
    { title: "ISO", subtitle: "Certified Team" },
  ]}
  location={location}
      />
      


      {/* 10. Technologies We Use */}
      <TechStackSection/>
      {/* 11. Case Studies / Portfolio */}
      <FeaturedInsights/>

      {/* 12. Testimonials From Clients */}
      <TestimonialsSection/>

      {/* 13. FAQ Section */}
      <section className="">
       {country.faqs && country.faqs.length > 0 && (
  <FaqSection 
    faqs={country.faqs} 
    location={location}
    title="Frequently Asked Questions"
    subtitle="Answers before you start"
  />
)}
      </section>



      {/* 15. Final CTA Section */}
      <div>
        <ProjectCTAHero 
  variant="final"
  title={`Looking for a reliable software development company in ${country.name}?`}
  description="Let's build something amazing together"
  buttons={[
    { text: "Start Your Project", href: `/contact-us?location=${location}`, variant: "primary", icon: "arrow" },
    { text: "Book Free Consultation", href: "#services", variant: "outline", icon: "calendar" }
  ]}
  location={location}
  countryName={country.name}
      /></div>
      



    </div>
  );
}
