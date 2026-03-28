import { metadataConfig } from '@/app/metadata-config';
import SolutionsClient from './SolutionsClient';

export const metadata = metadataConfig.solutions();

export default function SolutionsPage() {
  return <SolutionsClient />;
}