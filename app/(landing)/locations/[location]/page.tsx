// app/locations/[location]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { countryData, getAllCountrySlugs, getCountryData } from '@/lib/country';
import { getCountryServicePage, getAllCountryServicePages } from '@/lib/country-services';
import { ProcessSection } from '@/src/components/landingPage/servicesPage/ProcessSection';
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industries We Serve in {country.name}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Industry-specific solutions for your unique business challenges
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{industry.name}</h3>
                <p className="text-slate-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Solutions for Businesses in [Country] */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Solutions for Businesses in {country.name}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Focus on outcomes with our comprehensive business solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.solutions.map((solution, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/5 to-white rounded-xl p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{solution.name}</h3>
                <p className="text-slate-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Problems Businesses Face in [Country] */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Problems Businesses Face in {country.name}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Common challenges that hinder business growth and efficiency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {country.problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-slate-900">Challenge</h3>
                </div>
                <p className="text-slate-600">{problem}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="bg-primary text-white rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">We solve these challenges with scalable custom software solutions.</h3>
              <a
                href={`/contact-us?location=${location}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-slate-100 transition-colors mt-4"
              >
                Get Your Solution
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us in [Country] */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose ClickMasters in {country.name}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Competitive differentiation that sets us apart
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Agile Development', desc: 'Flexible and iterative approach for faster delivery' },
              { title: 'Dedicated Teams', desc: 'Focused experts committed to your project success' },
              { title: 'Transparent Communication', desc: 'Regular updates and complete project visibility' },
              { title: 'Timezone Flexibility', desc: 'Working hours aligned with your business needs' },
              { title: 'Scalable Architecture', desc: 'Future-proof solutions that grow with your business' },
              { title: 'Ongoing Support', desc: 'Comprehensive maintenance and continuous improvement' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
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

      {/* 10. Technologies We Use */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Modern tech stack for reliable and scalable solutions
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {country.technologies.map((tech, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-primary rounded"></div>
                </div>
                <p className="text-sm font-medium text-slate-900">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Case Studies / Portfolio */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Case Studies & Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proof of expertise through real-world success stories
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {country.caseStudies.map((caseStudy, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {caseStudy.industry}
                  </span>
                  <span className="text-sm text-slate-500">{country.name}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{caseStudy.title}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Challenge</h4>
                    <p className="text-slate-600">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Solution</h4>
                    <p className="text-slate-600">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Results</h4>
                    <p className="text-slate-600">{caseStudy.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Testimonials From Clients */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Social proof from satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {country.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Answer objections and improve SEO
            </p>
          </div>
          <div className="space-y-4">
            {country.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Lead Generation Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get started with a free consultation and discover how we can help you achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/contact-us?location=${location}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Book Free Consultation
              </a>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Final CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Looking for a reliable software development company in {country.name}?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Let's build something amazing together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/contact-us?location=${location}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
