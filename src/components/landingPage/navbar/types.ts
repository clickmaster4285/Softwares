import { type LucideIcon } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  url?: string;
  externalUrl?: string;
}

export interface ProjectCategory {
  category: string;
  items: ProjectItem[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  category: string | { _id: string; name: string };
  status: 'live' | 'in-progress' | 'completed';
  technologies?: string[];
  client?: string;
  completionDate?: string;
}

export type ServiceMenuItem = {
  title: string;
  description: string;
  href: string;
};

export type ServiceMenuSection = {
  label: string;
  items: ServiceMenuItem[];
};

export interface HireUsItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export type ResourceType = 'Case Studies' | 'Blog' | 'FAQs' | 'Testimonials';

export interface ResourceItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href: string;
  date?: string;
  author?: string;
  rating?: number;
  tags?: string[];
}
