'use client';

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string | ((props: { isActive: boolean }) => string);
  activeClassName?: string;
  children: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    const classNameValue =
      typeof className === "function"
        ? className({ isActive })
        : cn(className, isActive && activeClassName);

    return (
      <Link
        ref={ref}
        href={href}
        className={classNameValue}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
