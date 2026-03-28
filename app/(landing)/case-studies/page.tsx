import { metadataConfig } from '@/app/metadata-config';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata = metadataConfig.caseStudies();

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
