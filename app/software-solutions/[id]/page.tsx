import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Project from '../../../lib/models/Project';
import dbConnect from '../../../lib/mongoose';
import { resolveImageUrl } from '@/lib/utils';
import { siteConfig } from '@/app/metadata-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id).select('title description').lean();

  if (!project) {
    return { title: 'Solution Not Found' };
  }

  const doc = project as { title: string; description?: string };

  return {
    title: `${doc.title} | ClickMasters`,
    description: doc.description?.slice(0, 160),
    alternates: {
      canonical: `${siteConfig.url}/software-solutions/${id}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();
  const project = await Project.findById(id)
    .populate("category", "name description")
    .lean();

  if (!project) {
    notFound();
  }

  const doc = project as {
    title: string;
    description: string;
    thumbnail?: string;
    url?: string;
  };

  const imageSrc = doc.thumbnail
    ? resolveImageUrl(doc.thumbnail)
    : "/placeholder.svg";

  return (
    <main className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-4xl font-bold">{doc.title}</h1>
        <img
          src={imageSrc}
          alt={doc.title}
          className="mb-8 h-96 w-full rounded-xl object-cover"
        />
        <p className="text-lg leading-relaxed">{doc.description}</p>
        {doc.url ? (
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-primary underline"
          >
            Visit project
          </a>
        ) : null}
      </div>
    </main>
  );
}
