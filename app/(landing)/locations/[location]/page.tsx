// app/locations/[location]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountryData, getAllCountrySlugs } from '@/lib/country';
import { getAllCountryServicePages } from '@/lib/country-services';
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
import CountryServicesSection from '@/src/components/landingPage/location/CountryServicesSection';
import { HeroSection } from '@/src/components/landingPage/location/LocationHero';

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
  const allPages = getAllCountryServicePages();
  const matchingPage = allPages.find((page: any) => 
    page.categorySlug === country && 
    page.serviceName === service
  );
  
  return matchingPage?.slug || `${createSlug(service)}-${country.toLowerCase()}`;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllCountrySlugs();
  return slugs.map((location) => ({ location }));
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
  const country = getCountryData(location);

  if (!country) {
    notFound();
  }

  // Pre-compute all service slugs (Important: No functions passed to client)
  const serviceSlugMap = Object.fromEntries(
    country.servicesByCategory.flatMap((category: any) =>
      category.services.map((service: string) => [
        service,
        getServiceSlugForCountry(service, location),
      ])
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}


      <HeroSection/>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      {/* Business Landscape */}
      <section className="py-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Understanding {country.name}'s Business Landscape
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Business Environment</h3>
              <p className="text-lg text-slate-600 mb-6">{country.businessLandscape}</p>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Digital Transformation</h3>
              <p className="text-lg text-slate-600 mb-6">{country.digitalTransformationDemand}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Market Challenges</h3>
              <ul className="space-y-3">
                {country.marketChallenges?.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      <ProjectCTAHero
        variant="combined"
        badge="Global Clients"
        title="Trusted by Global Clients"
        description=" Building confidence through proven expertise and exceptional results"
        buttons={[
          { text: "Book Free Consultation", href: `/contact-us?location=${location}`, variant: "primary" },
          { text: "Call Us Now", href: "tel:+1234567890", variant: "outline" },
        ]}
        sliderCards={[
          { title: "100+", subtitle: "Projects Delivered" },
          { title: "50+", subtitle: "International Clients" },
          { title: "10+", subtitle: "Years" },
          { title: "98%", subtitle: "Client Satisfaction" },
         
        ]}
        location={location}
      />



      {/* Services Section - FIXED */}
      <CountryServicesSection
        countryName={country.name}
        location={location}
        servicesByCategory={country.servicesByCategory}
        serviceSlugMap={serviceSlugMap}
      />

      {/* Other Sections */}
      <TrustedClientsSection />
      <SolutionsPage />
      <PainPointsSolutions countryName={country.name} />

      <WhyChooseUs
        countryName={country.name}
        items={[
          { title: 'Agile Development', desc: 'Flexible and iterative approach for faster delivery' },
          { title: 'Dedicated Teams', desc: 'Focused experts committed to your project success' },
          { title: 'Transparent Communication', desc: 'Regular updates and complete project visibility' },
          { title: 'Timezone Flexibility', desc: 'Working hours aligned with your business needs' },
          { title: 'Scalable Architecture', desc: 'Future-proof solutions that grow with your business' },
          { title: 'Ongoing Support', desc: 'Comprehensive maintenance and continuous improvement' },
        ]}
      />

      {country.processPhases && (
        <ProcessSection serviceName={country.name} processPhases={country.processPhases} />
      )}

      {country.pricingTiers && (
        <PricingSection serviceName={country.name} pricingTiers={country.pricingTiers} />
      )}

      <ProjectCTAHero
        variant="combined"
        badge="Build Your Project"
        title="Ready to Transform Your Business? Let's Build Something Amazing Together"
        description="Get started with a free consultation..."
        buttons={[
          { text: "Book Free Consultation", href: `/contact-us?location=${location}`, variant: "primary" },
          { text: "Call Us Now", href: "tel:+1234567890", variant: "outline" },
        ]}
        sliderCards={[
          { title: "100+", subtitle: "Projects Delivered" },
          { title: "Agile", subtitle: "Development" },
          { title: "On-time", subtitle: "Delivery" },
          { title: "24/7", subtitle: "Support" },
          { title: "50+", subtitle: "Happy Clients" },
        ]}
        location={location}
      />

      <TechStackSection />
      <FeaturedInsights />
      <TestimonialsSection />

      {country.faqs && country.faqs.length > 0 && (
        <FaqSection faqs={country.faqs} location={location} title="Frequently Asked Questions" subtitle="Answers before you start" />
      )}

      <ProjectCTAHero
        variant="final"
        title={`Looking for a reliable software development company in ${country.name}?`}
        description="Let's build something amazing together"
        buttons={[
          { text: "Start Your Project", href: `/contact-us?location=${location}`, variant: "primary" },
          { text: "Book Free Consultation", href: "#services", variant: "outline" },
        ]}
        location={location}
        countryName={country.name}
      />
    </div>
  );
}