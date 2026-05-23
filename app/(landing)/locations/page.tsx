import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCountrySlugs, getCountryData } from '@/lib/country';
import { siteConfig } from '@/app/metadata-config';

export const metadata: Metadata = {
  title: 'Locations | ClickMasters',
  description: 'ClickMasters software development services by country and region.',
  alternates: { canonical: `${siteConfig.url}/locations` },
};

export default function LocationsIndexPage() {
  const countries = getAllCountrySlugs()
    .map((slug) => ({ slug, data: getCountryData(slug) }))
    .filter((entry): entry is { slug: string; data: NonNullable<ReturnType<typeof getCountryData>> } =>
      Boolean(entry.data)
    );

  return (
    <main className="mx-auto mt-24 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Locations</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Explore ClickMasters delivery capabilities tailored for your region.
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map(({ slug, data }) => (
          <Link
            key={slug}
            href={`/locations/${slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900 group-hover:text-primary">{data.name}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{data.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
