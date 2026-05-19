import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page Not Found | ClickMasters',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="i-ri:404-fill text-8xl text-muted-foreground mb-4" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
