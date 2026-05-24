import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { withSeoMetadata } from '@/app/metadata-config';

export const metadata: Metadata = withSeoMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist on ClickMasters.',
  robots: {
    index: false,
    follow: true,
  },
});

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
