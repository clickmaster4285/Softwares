"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Globe,
  Link,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Send,
  X,
} from "lucide-react";

const iconMap = {
  Menu,
  ChevronDown,
  Mail,
  Send,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  X,
  Linkedin: Link,
  Twitter: Globe,
  Github: Globe,
  Youtube: Play,
} as const;

interface IconProps {
  name: keyof typeof iconMap;
  className?: string;
  size?: string | number;
}

export function Icon({ name, className = "h-5 w-5", size }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <div className={className} />;
  }

  return <IconComponent className={className} size={size} />;
}