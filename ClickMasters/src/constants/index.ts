/**
 * Application constants
 */

export const API_ENDPOINTS = {
  USERS: '/api/users',
  PROJECTS: '/api/projects',
  CATEGORIES: '/api/categories',
  TESTIMONIALS: '/api/testimonials',
} as const;

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_TESTIMONIALS: '/admin/testimonials',
  PROJECTS_DETAIL: '/projects',
  CONTACT: '/contact-us',
  ABOUT: '/about-us',
  TESTIMONIALS: '/testimonials',
} as const;

export const QUERY_KEYS = {
  PROJECTS: 'projects',
  PROJECT_DETAIL: 'project-detail',
  CATEGORIES: 'categories',
  TESTIMONIALS: 'testimonials',
  USER: 'user',
} as const;

export const STATUS_LABELS = {
  live: 'Live',
  'in-progress': 'In Progress',
  completed: 'Completed',
} as const;
