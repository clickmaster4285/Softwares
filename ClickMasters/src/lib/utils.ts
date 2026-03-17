// utils.ts - Frontend utilities
export const getCategoryName = (category: string | { name: string }): string => {
  return typeof category === 'string' ? category : category.name || 'Uncategorized';
};

export const resolveImageUrl = (url: string | undefined): string => {
  if (!url) return '/placeholder.svg';
  return url.startsWith('http') ? url : `/uploads/${url}`;
};

export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Add more frontend utils here
