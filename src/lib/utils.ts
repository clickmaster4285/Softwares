// utils.ts - Frontend utilities
export const getCategoryName = (
  category: string | { _id?: string; name?: string } | undefined
): string => {
  if (!category) return 'Uncategorized';
  if (typeof category === 'string') return category;
  if (typeof category === 'object' && category.name) return category.name;
  return 'Uncategorized';
};

// lib/utils.ts
// lib/utils.ts
export const resolveImageUrl = (url: string | undefined | null): string => {
  if (!url) return '/placeholder.svg';
  
  // If it's already a full URL or API route, return as is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/api/')) {
    return url;
  }
  
  // Handle old /uploads/ URLs by redirecting to API route
  if (url.startsWith('/uploads/')) {
    return url.replace('/uploads/', '/api/uploads/');
  }
  
  return url;
};

export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Add more frontend utils here
