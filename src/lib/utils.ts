// utils.ts - Frontend utilities
export const getCategoryName = (category: string | { name: string }): string => {
  return typeof category === 'string' ? category : category.name || 'Uncategorized';
};

export function resolveImageUrl(thumbnail?: string): string {
  if (!thumbnail) return '/placeholder.svg';

  // If it's already a full URL (http/https)
  if (thumbnail.startsWith('http')) return thumbnail;

  // If it starts with /uploads/, keep as is
  if (thumbnail.startsWith('/uploads/')) return thumbnail;

  // Otherwise add /uploads/
  return `/uploads/${thumbnail.replace(/^\/uploads\//, '').replace(/^uploads\//, '')}`;
}

export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Add more frontend utils here
