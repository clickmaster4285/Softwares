import { metadataConfig, serviceSchema, siteConfig } from '@/app/metadata-config';
import Script from 'next/script';
import ServicesClient from './ServicesClient';

export const metadata = metadataConfig.services();

const servicesForJsonLd = [
  {
    name: 'Custom Software Development',
    description:
      'Professional custom software development solutions tailored to your business. We build enterprise software, automation tools, and legacy system modernization solutions to increase efficiency and productivity.',
    hash: 'custom-software-development',
  },
  {
    name: 'Web Application Development',
    description:
      'Innovative web application development for scalable and responsive websites. We specialize in single-page applications (SPA), e-commerce platforms, progressive web apps (PWA), and real-time dashboards.',
    hash: 'web-application-development',
  },
  {
    name: 'Mobile App Development',
    description:
      'High-performance mobile app development for iOS and Android platforms. We create native and cross-platform apps to deliver seamless user experiences and drive customer engagement.',
    hash: 'mobile-app-development',
  },
  {
    name: 'Database Design & Management',
    description:
      'Expert database design and management services for secure, scalable, and high-performance data systems. We handle SQL & NoSQL solutions, data migration, and performance optimization.',
    hash: 'database-design-management',
  },
  {
    name: 'Cloud Solutions & DevOps',
    description:
      'Reliable cloud solutions and DevOps services to optimize infrastructure, automate deployment, and ensure high availability. We specialize in AWS, Azure, GCP, and container orchestration.',
    hash: 'cloud-solutions-devops',
  },
  {
    name: 'Cybersecurity & Compliance',
    description:
      'Comprehensive cybersecurity solutions to protect your digital assets and ensure regulatory compliance. We perform security audits, penetration testing, and provide enterprise-grade security solutions.',
    hash: 'cybersecurity-compliance',
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      {servicesForJsonLd.map((s, i) => (
        <Script
          key={s.hash}
          id={`service-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema(s.name, s.description, `${siteConfig.url}/services#${s.hash}`),
            ),
          }}
        />
      ))}
      <ServicesClient />
    </>
  );
}