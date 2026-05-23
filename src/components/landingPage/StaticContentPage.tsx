import Link from 'next/link';
import type { ReactNode } from 'react';

type StaticContentPageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function StaticContentPage({ title, description, children }: StaticContentPageProps) {
  return (
    <main className="mx-auto mt-24 max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-medium text-primary hover:underline">
        ← Home
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      {description ? <p className="mt-4 text-base text-slate-600">{description}</p> : null}
      <div className="prose prose-slate mt-8 max-w-none">{children}</div>
    </main>
  );
}
