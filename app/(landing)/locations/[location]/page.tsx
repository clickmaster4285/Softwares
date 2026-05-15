// app/locations/[location]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountryData, getAllCountrySlugs } from '@/lib/country';
import { servicesByCountry } from '@/lib/country-services';

import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';
import { TestimonialsSection } from '@/src/components/landingPage/home/TestimonialsSection';
import TechStackSection from '@/src/components/landingPage/home/TechStackSection';

import ProjectCTAHero from '@/src/components/landingPage/location/ProjectCTAHero';
import WhyChooseUs from '@/src/components/landingPage/home/whyUs';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import PainPointsSolutions from '@/src/components/landingPage/home/PainPointsSolutions';
import SolutionsPage from '@/src/components/landingPage/home/Solutions';
import CountryServicesSection from '@/src/components/landingPage/location/CountryServicesSection';
import { HeroSection, StatsSection } from '@/src/components/landingPage/location/LocationHero';
import CTASectionImage from '@/src/components/landingPage/home/CTASectionImage';
import FaqSection from '@/src/components/landingPage/location/FaqSection';
import { ChecklistCTAHero } from '@/src/components/landingPage/checklist/ChecklistCTAHero';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';

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


  // ✅ EXTRACT PRICING FROM SERVICES ONLY
 const countryPricingTiers =
  servicesByCountry[country.name]?.[0]?.countryPricingTiers || [];

const serviceData = servicesByCountry[country.name] || [];
  const faqs = serviceData.flatMap(service => service.faqs);
 const countryFaqs =
  servicesByCountry[country.name]?.[0]?.faqs || [];

  
  // Pre-compute service slugs
  const serviceSlugMap = Object.fromEntries(
    country.servicesByCategory.flatMap((category: any) =>
      category.services.map((service: string) => [
        service,
        `${createSlug(service)}-${location.toLowerCase()}`
      ])
    )
  );

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <HeroSection country={country} location={location} />
      <StatsSection country={country} location={location} />

      <PainPointsSolutions countryName={country.name} />

      {/* SERVICES */}
      <CountryServicesSection
        countryName={country.name}
        location={location}
        servicesByCategory={country.servicesByCategory}
        serviceSlugMap={serviceSlugMap}
      />

      {/* 🔥 PRICING (ONLY FROM country-services.ts) */}
      {countryPricingTiers.length > 0 && (
        <ProjectCTAHero
          variant="combined"
          badge="Pricing Plans"
          title="Flexible Pricing for Every Stage"
          description="Choose a plan that fits your business needs"
          location={location}
          sliderCards={countryPricingTiers.map((tier) => ({
            title: tier.investment,
            subtitle: tier.type,
          }))}
          buttons={[
            { text: "Book Free Consultation", href: `/contact-us?location=${location}`, variant: "primary" },
            { text: "Call Us Now", href: "tel:+1234567890", variant: "outline" },
          ]}
        />
      )}

      {/* OTHER SECTIONS */}
      <TrustedClientsSection />
      <CTASectionImage />
      <SolutionsPage />

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

      <ProjectCTAHero
        variant="combined"
        badge="Build Your Project"
        title="Ready to Transform Your Business? Let's Build Something Amazing Together"
        description="Get started with a free consultation..."
        location={location}
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
      />

      <div className="px-20  ">
        <PricingSection
  serviceName={`Software Development in ${country.name}`}
  pricingTiers={countryPricingTiers}
/></div>

      <TechStackSection />
      <FeaturedInsights />
      <TestimonialsSection />

    
       <FaqSection
  faqs={countryFaqs}
  location={location}
  title="Frequently Asked Questions"
  subtitle="Answers before you start"
/>
     

     <div className="lg:-mb-12"> <ChecklistCTAHero
        title={`Looking for a reliable software development company in ${country.name}?`}
        description="Let's build something amazing together"
        buttons={[
          { text: "Start Your Project", href: `/contact-us?location=${location}`, variant: "primary" },
          { text: "Book Free Consultation", href: "#services", variant: "outline" },
        ]}
      /></div>

    </div>
  );
}