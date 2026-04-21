import React from 'react';
import { cn } from '@/lib/utils';

type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  repeat?: number;
  vertical?: boolean;
};

export function Marquee({
  className,
  reverse = false,
  repeat = 2,
  vertical = false,
  children,
  ...props
}: MarqueeProps) {
  const items = Array.from({ length: repeat });

  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:1rem]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {items.map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex shrink-0 justify-around gap-[var(--gap)] [will-change:transform]',
            vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
            reverse && '[animation-direction:reverse]'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
