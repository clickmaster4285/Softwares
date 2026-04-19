'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from 'next-themes';

const RadixToaster = dynamic(
  () => import('@/components/ui/toaster').then((m) => m.Toaster),
  { ssr: false },
);
const SonnerToaster = dynamic(
  () => import('@/components/ui/sonner').then((m) => m.Toaster),
  { ssr: false },
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      refetchOnWindowFocus: false,
      // Default true: after mutations invalidate caches, remounted routes must refetch stale data.
      // refetchOnMount: false caused updated/deleted items to look unchanged until a full page reload.
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <TooltipProvider>
            <RadixToaster />
            <SonnerToaster />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
