"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const apps = [
  {
    title: "CRM",
    description: "Manage customer relationships and sales pipeline",
    href: "#apps",
  },
  {
    title: "Inventory",
    description: "Track stock levels and warehouse operations",
    href: "#apps",
  },
  {
    title: "Accounting",
    description: "Financial management and reporting",
    href: "#apps",
  },
  {
    title: "HR",
    description: "Human resources and employee management",
    href: "#apps",
  },
  {
    title: "Project",
    description: "Plan and track project progress",
    href: "#apps",
  },
  {
    title: "Marketing",
    description: "Email campaigns and automation",
    href: "#apps",
  },
];

const industries = [
  {
    title: "Manufacturing",
    description: "Production planning and quality control",
    href: "#industries",
  },
  {
    title: "Retail",
    description: "Point of sale and e-commerce",
    href: "#industries",
  },
  {
    title: "Services",
    description: "Field service and scheduling",
    href: "#industries",
  },
  {
    title: "Healthcare",
    description: "Patient management and compliance",
    href: "#industries",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">F</span>
          </div>
          <span className="text-xl font-bold text-foreground">FlowSuite</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Apps
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  {apps.map((app) => (
                    <li key={app.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={app.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium leading-none text-foreground">
                            {app.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {app.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Industries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                  {industries.map((industry) => (
                    <li key={industry.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={industry.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium leading-none text-foreground">
                            {industry.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {industry.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
                )}
              >
                <Link to="#community">Community</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <Link to="#pricing">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <Link to="#help">Help</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" className="text-foreground">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm bg-background">
            <nav className="flex flex-col gap-4 mt-8">
              <MobileNavItem title="Apps" items={apps} />
              <MobileNavItem title="Industries" items={industries} />
              <Link
                to="#community"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              <Link
                to="#pricing"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#help"
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                Help
              </Link>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
                <Button className="w-full bg-primary text-primary-foreground">
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileNavItem({
  title,
  items,
}: {
  title: string;
  items: { title: string; description: string; href: string }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-lg font-medium text-foreground py-2"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      {isExpanded && (
        <div className="pl-4 flex flex-col gap-2 mt-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
