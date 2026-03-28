import Contact from "@/src/components/landingPage/contactPage/Contact";
import { metadataConfig } from '@/app/metadata-config';

export const metadata = metadataConfig.contact();
export default function ContactPage() {
  return <Contact />;
}
