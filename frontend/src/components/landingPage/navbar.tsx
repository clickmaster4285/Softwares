"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for dropdown data
interface IndustryItem {
  id: string;
  title: string;
  url?: string;
}

interface IndustryCategory {
  category: string;
  items: IndustryItem[];
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industriesData, setIndustriesData] = useState<IndustryCategory[]>([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch industries data from API
  useEffect(() => {
    const fetchIndustries = async () => {
      setIsLoadingIndustries(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(
          `${baseUrl}/api/categories/project-data/of-category-wise`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch industries");
        }

        const data: IndustryCategory[] = await response.json();
        setIndustriesData(data);
      } catch (error) {
        console.error("Error fetching industries:", error);
        setIndustriesData([]);
      } finally {
        setIsLoadingIndustries(false);
      }
    };

    fetchIndustries();
  }, []);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white border-b border-black/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={closeDropdowns}
        >
          <img 
             src={isScrolled ? "/logo-white.png" : "/logo.png"}
            className="w-48 md:w-64 h-auto" 
            alt="ClickMasters" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            Home
          </Link>

          {/* Projects Link */}
          <Link
            href="/projects"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/projects")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            Projects
          </Link>

          {/* Services Link */}
          <Link
            href="/services"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/services")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            Services
          </Link>

          {/* Industries Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("industries")}
              className={cn(
                "text-sm transition-colors flex items-center gap-1",
                activeDropdown === "industries" 
                  ? isScrolled ? "text-black" : "text-white"
                  : isScrolled 
                    ? "text-black/70 hover:text-black" 
                    : "text-white/90 hover:text-white"
              )}
            >
              Solutions
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                activeDropdown === "industries" && "rotate-180"
              )} />
            </button>
          </div>

          <Link
            href="/about-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/about-us")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/contact-us")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            Contact Us
          </Link>

          <Link
            href="/testimonials"
            onClick={closeDropdowns}
            className={cn(
              "text-sm transition-colors",
              isActivePath("/testimonials")
                ? "text-primary"
                : isScrolled 
                  ? "text-black/70 hover:text-black" 
                  : "text-white/90 hover:text-white"
            )}
          >
            Testimonials
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admin/login" onClick={closeDropdowns}>
            <button className={cn(
              "px-5 py-2 text-sm transition-colors duration-300",
              isScrolled
                ? "text-white rounded-md bg-primary  hover:border-primary/50"
                : "text-white bg-black rounded-md hover:border-white/60"
            )}>
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className={cn(
              "p-2 transition-colors",
              isScrolled ? "text-black/70 hover:text-black" : "text-white/90 hover:text-white"
            )}>
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md p-0 bg-white border-l border-black/10"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <img src="/logo.png" className="w-36 h-auto" alt="ClickMasters" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-black/50 hover:text-black transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-2">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/")
                        ? "text-primary"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Home
                  </Link>

                  {/* Projects */}
                  <Link
                    href="/projects"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/projects")
                        ? "text-primary"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Projects
                  </Link>

                  {/* Services */}
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/services")
                        ? "text-primary"
                        : "text-black/70 hover:text-primary"
                    )}
                  >
                    Services
                  </Link>

                  {/* Industries Mobile Dropdown */}
                  <MobileDropdown
                    title="Solutions"
                    items={industriesData}
                    isLoading={isLoadingIndustries}
                    onLinkClick={() => setIsOpen(false)}
                  />

                  <Link
                    href="/about-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/about-us")
                        ? "text-primary"
                        : "text-black/70 hover:text-black"
                    )}
                  >
                    About Us
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/contact-us")
                        ? "text-primary"
                        : "text-black/70 hover:text-black"
                    )}
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/testimonials"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 transition-colors border-b border-black/5",
                      isActivePath("/testimonials")
                        ? "text-primary"
                        : "text-black/70 hover:text-black"
                    )}
                  >
                    Testimonials
                  </Link>
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-black/5">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm text-white bg-black hover:bg-primary transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Full-width Dropdown Menus */}
      {activeDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute left-0 right-0 bg-white border-t border-black/5 shadow-lg animate-slideDown"
        >
          <div className="container mx-auto px-4 lg:px-8 py-12">
            {activeDropdown === "industries" && (
              <>
                {isLoadingIndustries ? (
                  <div className="text-center py-12">
                    <p className="text-black/40">Loading solutions...</p>
                  </div>
                ) : industriesData.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-black/40">No solutions available</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-8 mb-8">
                      {industriesData.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="text-sm font-semibold mb-4 text-primary/90">
                            {section.category}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <a
                                  href={item.url || "#"}
                                  className="text-black/60 hover:text-black transition-colors"
                                >
                                  {item.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="text-center pt-6 border-t border-black/5">
                      <a
                        href="#"
                        className="text-black/60 hover:text-black transition-colors"
                      >
                        Browse all Solutions →
                      </a>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

// Mobile Dropdown Component
interface MobileDropdownProps {
  title: string;
  items: IndustryCategory[];
  isLoading?: boolean;
  onLinkClick: () => void;
}

function MobileDropdown({ title, items, isLoading, onLinkClick }: MobileDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderItems = () => {
    if (isLoading) {
      return <p className="pl-4 text-black/40">Loading...</p>;
    }

    if (items.length === 0) {
      return <p className="pl-4 text-black/40">No items available</p>;
    }

    return (
      <div className="pl-4 space-y-4 mt-3">
        {items.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-sm font-semibold text-black/60 mb-2">
              {section.category}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <a
                    href="#"
                    className="text-black/60 hover:text-black transition-colors"
                    onClick={onLinkClick}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-b border-black/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-3 text-black/70 hover:text-black transition-colors"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && renderItems()}
    </div>
  );
}