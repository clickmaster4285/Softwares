import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isOpen?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isPageLoading: boolean;
  isLightHero: boolean;
}

export function NavItem({
  label,
  href,
  isActive,
  hasDropdown,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isPageLoading,
  isLightHero,
}: NavItemProps) {
  const baseStyle = 'text-sm font-medium transition-colors flex items-center gap-1';

  const getStyle = () => {
    if (isOpen || isActive) return 'text-accent';
    if (isPageLoading) return 'text-black/70 hover:text-accent';
    if (isLightHero) return 'text-white/90 hover:text-accent';
    return 'text-black/70 hover:text-accent';
  };

  const content = (
    <>
      {label}
      {hasDropdown && (
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200 ease-out',
            isOpen && 'rotate-180'
          )}
        />
      )}
    </>
  );

  if (hasDropdown) {
    return (
      <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button onClick={onClick} className={cn(baseStyle, getStyle())}>
          {content}
        </button>
      </div>
    );
  }

  return (
    <Link href={href || '#'} onClick={onClick} className={cn(baseStyle, getStyle(), isActive && 'font-bold')}>
      {content}
    </Link>
  );
}
