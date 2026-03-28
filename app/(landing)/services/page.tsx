import { metadataConfig } from '@/app/metadata-config';
import ServicesClient from './ServicesClient';

export const metadata = metadataConfig.services();

export default function ServicesPage() {
  return <ServicesClient />;
}