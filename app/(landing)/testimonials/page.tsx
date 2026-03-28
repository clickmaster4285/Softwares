import Testimonials from "@/src/components/landingPage/Testimonials/page";
import { metadataConfig } from '@/app/metadata-config';

export const metadata = metadataConfig.testimonials();
export default function TestimonialsPage() {
  return <Testimonials />;
}
