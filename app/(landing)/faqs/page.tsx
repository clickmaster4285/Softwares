import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllServicePages } from '@/lib/service-pages';
import { siteConfig } from '@/app/metadata-config';

export const metadata: Metadata = {
  title: 'FAQs by Service | ClickMasters',
  description:
    'Browse frequently asked questions by service. Select any service card to view detailed FAQs.',
  alternates: {
    canonical: `${siteConfig.url}/faqs`,
  },
};

const services = getAllServicePages();

export default function FaqsPage() {
  return (
    <main className="mx-auto mt-24 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          FAQs by Service
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Choose any service card to open its FAQ page.
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const faqCount = service.faqs?.length ?? 0;

          return (
            <Link
              key={service.slug}
              href={`/faqs/${service.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-accent/40 hover:shadow-md"
              aria-label={`Open FAQs for ${service.title}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent/80">
                {service.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-accent">
                {service.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{service.metaDescription}</p>
              <p className="mt-4 text-sm font-medium text-accent">
                {faqCount} FAQ{faqCount === 1 ? '' : 's'} available
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}