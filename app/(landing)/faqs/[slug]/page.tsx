import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllServiceSlugs, getServicePage } from '@/lib/service-pages';
import { siteConfig } from '@/app/metadata-config';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: 'FAQ | ClickMasters',
    };
  }

  return {
    title: `${service.title} FAQs | ClickMasters`,
    description: `Frequently asked questions about ${service.title}.`,
    alternates: {
      canonical: `${siteConfig.url}/faqs/${service.slug}`,
    },
  };
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) notFound();

  const faqs = service.faqs ?? [];

  return (
    <main className="mx-auto mt-24 max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
      <Link href="/faqs" className="text-sm font-medium text-accent hover:underline">
        ← Back to all FAQ cards
      </Link>

      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent/80">
          {service.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {service.title} FAQs
        </h1>
      </header>

      {faqs.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
          FAQs for this service are coming soon.
        </section>
      ) : (
        <section className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <article
              key={`${faq.question}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-slate-900">{faq.question}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
                {faq.answer}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
