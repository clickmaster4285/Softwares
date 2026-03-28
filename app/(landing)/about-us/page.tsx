import About from "@/src/components/landingPage/AboutPage/About";
import { metadataConfig } from '@/app/metadata-config';


export const metadata = metadataConfig.about();

export default function AboutPage() {
  return <About />;
}
