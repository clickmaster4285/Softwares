// app/locations/[location]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig, buildPageMetadata, stripBrandSuffix } from '@/app/metadata-config';
import { getCountryData, getAllCountrySlugs } from '@/lib/country';
import { servicesByCountry, buildCountryServiceSlugMap } from '@/lib/country-services';

import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
import FeaturedInsights from '@/src/components/landingPage/home/FeaturedInsights';

import TechStackSection from '@/src/components/landingPage/home/TechStackSection';

import ProjectCTAHero from '@/src/components/landingPage/location/ProjectCTAHero';
import WhyChooseUs from '@/src/components/landingPage/home/whyUs';
import TrustedClientsSection from '@/src/components/landingPage/home/TrustedClientsSection';
import PainPointsSolutions from '@/src/components/landingPage/home/PainPointsSolutions';
import SolutionsPage from '@/src/components/landingPage/home/Solutions';
import CountryServicesSection from '@/src/components/landingPage/location/CountryServicesSection';
import { HeroSection } from '@/src/components/landingPage/location/LocationHero';
import CTASectionImage from '@/src/components/landingPage/home/CTASectionImage';
import FaqSection from '@/src/components/landingPage/location/FaqSection';
import { ChecklistCTAHero } from '@/src/components/landingPage/checklist/ChecklistCTAHero';
import { PricingSection } from '@/src/components/landingPage/servicesPage/PricingSection';
import { TestimonialsSection } from '@/src/components/landingPage/home/TestimonialsSection';
import TrustedBySection from '@/src/components/landingPage/home/TrustedBySection';
import { StatsCard } from '@/src/components/landingPage/location/StatsCard';
//import WorldMapHero from '@/src/components/landingPage/location/AnimatedPins';


type Props = { params: Promise<{ location: string }> };

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

  return buildPageMetadata({
    title: stripBrandSuffix(country.title),
    description: country.description,
    canonical: `${siteConfig.url}/locations/${location}`,
    robots: { index: true, follow: true },
  });
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

  
  // Map service display names to actual slugs from country-services data
  const serviceSlugMap = buildCountryServiceSlugMap(country.name, location);

  return (
    <div className="min-h-screen ">
      {/* HERO */}
      <HeroSection country={country} location={location} />
      <StatsCard country={country}  />
<TrustedBySection/>
      

      {/* <StatsCard country={country}/> */}
      {/* <WorldMapHero/> */}
      <PainPointsSolutions countryName={country.name} />

      {/* SERVICES */}
      <CountryServicesSection
        countryName={country.name}
        location={location}
        servicesByCategory={country.servicesByCategory}
        serviceSlugMap={serviceSlugMap}
      />


      {/* OTHER SECTIONS */}
      <TrustedClientsSection />
 
      <SolutionsPage />

      <WhyChooseUs />

      {/* <ProjectCTAHero
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
      /> */}

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
     

     {/* <div className="lg:-mb-12"> <ChecklistCTAHero
        title={`Looking for a reliable software development company in ${country.name}?`}
        description="Let's build something amazing together"
        buttons={[
          { text: "Start Your Project", href: `/contact-us?location=${location}`, variant: "primary" },
          { text: "Book Free Consultation", href: "#services", variant: "outline" },
        ]}
      /></div> */}


     <CTASectionImage />
      
    </div>
  );
}