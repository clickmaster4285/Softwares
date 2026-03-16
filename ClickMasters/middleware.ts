import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add middleware logic here as needed
  // Example: Check authentication, redirects, etc.
  
  return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
