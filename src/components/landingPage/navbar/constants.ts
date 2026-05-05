import {
  Brain,
  Bot,
  Database,
  Code2,
  Cloud,
  HeartPulse,
  Landmark,
  Truck,
  Headset,
  ShoppingCart,
  UserCheck,
  Building2,
  Building,
  DollarSign,
  Calculator,
} from 'lucide-react';
import { type HireUsItem } from './types';
import { getServicePath, serviceMenuSections } from '@/lib/service-pages';

export const LOGO_COLOR_SRC = '/images/logo.webp';
export const LOGO_WHITE_SRC = '/images/logo-white.webp';

export const hireUsItems: HireUsItem[] = [
  { title: 'Hire AI Developers', href: '/hire-ai-developers/', icon: Brain },
  { title: 'AI Agent Development Services', href: '/ai-agent-development-services/', icon: Bot },
  { title: 'RAG Development Services', href: '/rag-development-services/', icon: Database },
  { title: 'Custom Software Development', href: '/custom-software-development/', icon: Code2 },
  { title: 'SaaS Development Services', href: '/saas-development-services/', icon: Cloud },
  { title: 'AI Development Healthcare', href: '/ai-development-healthcare/', icon: HeartPulse },
  { title: 'AI Development Finance', href: '/ai-development-finance/', icon: Landmark },
  { title: 'AI Development Logistics', href: '/ai-development-logistics/', icon: Truck },
  {
    title: 'AI Agents for Customer Support',
    href: '/ai-agents-for-customer-support/',
    icon: Headset,
  },
  { title: 'AI Agents for Sales', href: '/ai-agents-for-sales/', icon: ShoppingCart },
  {
    title: 'AI Agents for Lead Qualification',
    href: '/ai-agents-for-lead-qualification/',
    icon: UserCheck,
  },
  { title: 'AI Development Company USA', href: '/ai-development-company-usa/', icon: Building2 },
  { title: 'AI Development Company UK', href: '/ai-development-company-uk/', icon: Building },
  { title: 'AI Development Cost', href: '/ai-development-cost/', icon: DollarSign },
  { title: 'RAG Development Cost', href: '/rag-development-cost/', icon: Calculator },
];

export const mobileServicePageLinks: { title: string; href: string }[] = serviceMenuSections.flatMap((section) =>
  section.items.map((item) => ({
    title: item.title,
    href: getServicePath(section.label, item.title),
  }))
);

export const HOVER_MENU_CLOSE_MS = 80;
