import { metadataConfig } from '@/app/metadata-config';
import CaseStudy from '../../../lib/models/CaseStudy';
import dbConnect from '../../../lib/mongoose';
import CaseStudiesClient, { type CaseStudyCard } from './CaseStudiesClient';

export const metadata = metadataConfig.caseStudies();

export default async function CaseStudiesPage() {
  let initialCaseStudies: CaseStudyCard[] = [];

  try {
    await dbConnect();
    const raw = await CaseStudy.find({ published: true })
      .populate({
        path: 'project',
        select: 'title description thumbnail url category status',
        populate: { path: 'category', select: 'name description' },
      })
      .sort({ createdAt: -1 })
      .lean();

    initialCaseStudies = JSON.parse(JSON.stringify(raw)) as CaseStudyCard[];
  } catch {
    // DB unavailable during build or at runtime — client will refetch from /api/case-studies
  }

  return <CaseStudiesClient initialCaseStudies={initialCaseStudies} />;
}
