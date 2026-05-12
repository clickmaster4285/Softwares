// src/components/landingPage/location/ServicesSection.tsx
'use client';

interface ServicesSectionProps {
  countryName: string;
  location: string;
  services: string[];
  getServiceSlugForCountry: (service: string, location: string) => string;
}

export function ServicesSection({ 
  countryName, 
  location, 
  services, 
  getServiceSlugForCountry 
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Services We Provide in {countryName}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive software development solutions tailored to your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
  );
}