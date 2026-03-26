import { cn } from '@/lib/utils';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className={cn(
        "w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"
      )} />
    </div>
  );
}
