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
