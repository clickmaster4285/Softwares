import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine classnames with tailwind merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve image URL for display
 */
export function resolveImageUrl(url?: string): string {
  if (!url) return "/placeholder.svg";
  
  const clean = url.replace(/\\/g, "/");
  
  // Handle full URLs
  if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
  
  // Handle data URLs and blob URLs
  if (clean.startsWith("data:") || clean.startsWith("blob:")) return clean;
  
  // Handle uploads - always reliable
  if (clean.startsWith("/uploads")) {
    return clean; // Static files served from public/uploads/ work in both dev/prod
  }
  
  // Handle other relative paths - prefix if needed
  if (clean.startsWith("/")) return clean;
  
  return `/uploads/${clean}`;
}

/**
 * Get category name from category object or string
 */
export function getCategoryName(category: string | { _id: string; name: string } | undefined): string {
  if (!category) return 'Uncategorized';
  if (typeof category === 'string') return category;
  if (typeof category === 'object' && category.name) return category.name;
  return 'Uncategorized';
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
