import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(url?: string): string {
  if (!url) return "/placeholder.svg";
  const clean = url.replace(/\\/g, "/");
  if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
  if (clean.startsWith("data:") || clean.startsWith("blob:")) return clean;
  if (clean.startsWith("/uploads")) {
    const base = import.meta.env.VITE_API_URL ?? "";
    return base ? `${base}${clean}` : clean;
  }
  return clean;
}

// Helper function to get category name from category (string ID or Category object)
export function getCategoryName(category: string | { _id: string; name: string } | undefined): string {
  if (!category) return 'Uncategorized';
  if (typeof category === 'string') return category;
  if (typeof category === 'object' && category.name) return category.name;
  return 'Uncategorized';
}
