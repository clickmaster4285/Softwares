import { breadcrumbSchema, metadataConfig } from '@/app/metadata-config';
import SolutionsClient from './SolutionsClient';
import dbConnect from '../../../lib/mongoose';
import Project from '../../../lib/models/Project';

export const metadata = metadataConfig.solutions();

export default async function SolutionsPage() {
  let initialProjects: Awaited<ReturnType<typeof Project.find>> = [];

  try {
    await dbConnect();
    initialProjects = await Project.find()
      .populate('category', 'name description showOnHome')
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.error('SolutionsPage SSR project fetch failed:', error);
  }

  return (
    <>
      <script
        id="solutions-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Software Solutions', url: '/software-solutions' },
            ]),
          ),
        }}
      />
      <SolutionsClient initialProjects={JSON.parse(JSON.stringify(initialProjects))} />
    </>
  );
}
