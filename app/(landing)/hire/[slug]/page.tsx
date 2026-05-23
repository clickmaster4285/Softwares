import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/app/metadata-config';
import { getAllHireUsSlugs, getHireUsPage } from '@/lib/hire-us-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return getAllHireUsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getHireUsPage(slug);
  if (!page) return { title: 'Hire | ClickMasters' };

  return {
    title: `${page.title} | ClickMasters`,
    description: page.metaDescription,
    alternates: { canonical: `${siteConfig.url}/hire/${slug}` },
  };
}

export default async function HireUsPage({ params }: Props) {
  const { slug } = await params;
  const page = getHireUsPage(slug);
  if (!page) notFound();

  return (
    <main className="mx-auto mt-24 max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
      <Link href="/contact-us" className="text-sm font-medium text-primary hover:underline">
        ← Contact us
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{page.title}</h1>
      <p className="mt-4 text-base text-slate-600">{page.lead}</p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-slate-700">
        {page.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {page.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
          <p className="mt-3 text-slate-700">{section.body}</p>
        </section>
      ))}
      <div className="mt-10">
        <Link
          href="/contact-us"
          className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Get a free consultation
        </Link>
      </div>
    </main>
  );
}
