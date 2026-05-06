// import Link from 'next/link';
// import type { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import Script from 'next/script';
// import { ArrowRight, CheckCircle2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { breadcrumbSchema, metadataConfig, serviceSchema, siteConfig } from '@/app/metadata-config';
// import { getAllHireUsSlugs, getHireUsPage } from '@/lib/hire-us-pages';

// type Props = { params: Promise<{ slug: string }> };

// export function generateStaticParams(): { slug: string }[] {
//   return getAllHireUsSlugs().map((slug) => ({ slug }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;
//   const page = getHireUsPage(slug);
//   if (!page) return { title: 'Page Not Found' };
//   return metadataConfig.serviceDetail(page.title, page.metaDescription, slug);
// }

// export default async function HireUsDetailPage({ params }: Props) {
//   const { slug } = await params;
//   const page = getHireUsPage(slug);
//   if (!page) notFound();

//   const url = `${siteConfig.url}/${slug}`;
//   const jsonLd = serviceSchema(page.title, page.metaDescription, url);

//   return (
//     <>
//       <Script
//         id={`hire-us-page-schema-${slug}`}
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Script
//         id={`hire-us-breadcrumb-${slug}`}
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(
//             breadcrumbSchema([
//               { name: 'Home', url: '/' },
//               { name: 'Hire Us', url: '/contact-us' },
//               { name: page.title, url: `/${slug}` },
//             ])
//           ),
//         }}
//       />

//       <div className="min-h-screen bg-[#fafafa] text-slate-900">
//         <section className="border-b border-slate-200/80 bg-white">
//           <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
//             <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Hire Us</p>
//             <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
//               {page.title}
//             </h1>
//             <p className="mt-6 text-lg leading-relaxed text-slate-600">{page.lead}</p>
//             <div className="mt-8 flex flex-wrap gap-4">
//               <Button
//                 asChild
//                 className="rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-sm hover:bg-primary/90"
//               >
//                 <Link href="/contact-us">
//                   Contact Sales
//                   <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
//                 </Link>
//               </Button>
//               <Button variant="outline" asChild className="rounded-lg border-slate-300 bg-white">
//                 <Link href="#">View all services</Link>
//               </Button>
//             </div>
//           </div>
//         </section>

//         <section className="border-b border-slate-200/80 bg-white py-12 sm:py-16">
//           <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
//             <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Highlights</h2>
//             <ul className="mt-6 space-y-3">
//               {page.highlights.map((item) => (
//                 <li key={item} className="flex gap-3 text-slate-700">
//                   <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         <section className="py-12 sm:py-16">
//           <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
//             {page.sections.map((block) => (
//               <div key={block.heading}>
//                 <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
//                   {block.heading}
//                 </h2>
//                 <p className="mt-4 leading-7 text-slate-600">{block.body}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
