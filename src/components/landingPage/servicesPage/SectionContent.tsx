// components/service-page/SectionContent.tsx
import { Check, Star } from 'lucide-react';
import { ServicePageContent } from '@/lib/service-pages';
import SplitText from '../../ui/SplitText';


interface SectionContentProps {
  sections: ServicePageContent['sections'];
  serviceName: string;
}

const makeBoldServiceName = (text: string, serviceName: string): string => {
  if (!text || !serviceName) return text || "";
  const regex = new RegExp(`(${serviceName})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
};

const getSectionId = (heading: string, index: number) => {
  const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  const h = heading.toLowerCase();
  if (h.includes('what is')) return 'what-is';
  if (h.includes('services we deliver') || h.includes('includes')) return 'our-services';
  if (h.includes('why b2b companies') || h.includes('why choose')) return 'why-choose-us';
  if (h.includes('process')) return 'our-process';
  if (h.includes('technology stack') || h.includes('tech stack')) return 'tech-stack';
  if (h.includes('industry use cases') || h.includes('industries')) return 'industries';
  if (h.includes('pricing')) return 'pricing';
  if (h.includes('testimonials')) return 'testimonials';
  if (h.includes('case study')) return 'case-study';
  return `section-${index}-${slugify(heading)}`;
};

export function SectionContent({ sections, serviceName }: SectionContentProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const isWhatIsSection = section.heading.toLowerCase().includes('what is');
        
        if (isWhatIsSection && section.items) {
          // "What Is" section with split text header, left-aligned content, and badges grid on right
          return (
            <section
              key={section.heading}
              id={getSectionId(section.heading, index)}
              className="scroll-mt-24"
            >

 <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14 md:mb-16">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-[2px] w-8 rounded-full bg-primary" />
                  <div className="inline-flex items-center gap-1.5">
                    <SplitText
                          text={section.heading}
                      className="text-2xl md:text-3xl font-bold uppercase tracking-[0.25em] text-primary"
                      delay={60}
                      duration={0.8}
                      ease="power3.out"
                      splitType="words"
                      from={{ opacity: 0, x: 60 }}
                      to={{ opacity: 1, x: 0 }}
                      threshold={0.2}
                    />
                  </div>
                  <span className="h-[2px] w-8 rounded-full bg-primary" />
                </div>
      
                
      </div>
                  
              {/* <div className="mb-8">
                <SplitText
                  text={section.heading}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight"
                  delay={60}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, x: 60 }}
                  to={{ opacity: 1, x: 0 }}
                  threshold={0.2}
                />
              </div> */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column - content */}
                <div className="space-y-6">
                  <p 
                    className="text-lg leading-relaxed text-slate-800"
                    dangerouslySetInnerHTML={{ __html: makeBoldServiceName(section.body, serviceName) }}
                  />
                </div>

                {/* Right column - badges grid */}
                <div>
                 
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                     <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
  <Check className="h-3 w-3 stroke-[3]" />
</div>
                        <span 
                          className="text-sm font-medium text-slate-900"
                          dangerouslySetInnerHTML={{ __html: makeBoldServiceName(item, serviceName) }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-12 flex items-center">
                <div className="h-px w-full " />
              </div>
            </section>
          );
        }
        
        // Regular section rendering for other sections
        return (
          <section
            key={section.heading}
            id={getSectionId(section.heading, index)}
            className="scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1 rounded-full bg-primary" />
              <h2 
                className="text-2xl font-semibold text-slate-900 sm:text-3xl"
                dangerouslySetInnerHTML={{ __html: makeBoldServiceName(section.heading, serviceName) }}
              />
            </div>

            <div className="mt-6 space-y-4 text-slate-800 leading-relaxed">
              <p 
                className="text-lg whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: makeBoldServiceName(section.body, serviceName) }}
              />
              
              {section.items && (
                <ul className="mt-6 space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span 
                        className="italic"
                        dangerouslySetInnerHTML={{ __html: makeBoldServiceName(item, serviceName) }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="my-6 flex items-center">
              <div className="h-px w-full " />
            </div>
          </section>
        );
      })}
    </>
  );
}