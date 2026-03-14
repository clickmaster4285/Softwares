"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for dropdown data
interface DropdownSection {
  category: string;
  color: string;
  items: string[];
}

interface IndustryItem {
  id: string;
  title: string;
  url?: string;
}

interface IndustryCategory {
  category: string;
  items: IndustryItem[];
}

// Apps dropdown data
const appsData: DropdownSection[] = [
  {
    category: "FINANCE",
    color: "text-teal-600",
    items: [
      "Accounting",
      "Invoicing",
      "Expenses",
      "Spreadsheet (BI)",
      "Documents",
      "Sign",
    ],
  },
  {
    category: "SALES",
    color: "text-red-400",
    items: [
      "CRM",
      "Sales",
      "POS Shop",
      "POS Restaurant",
      "Subscriptions",
      "Rental",
    ],
  },
  {
    category: "WEBSITES",
    color: "text-purple-600",
    items: [
      "Website Builder",
      "eCommerce",
      "Blog",
      "Forum",
      "Live Chat",
      "eLearning",
    ],
  },
  {
    category: "SUPPLY CHAIN",
    color: "text-purple-600",
    items: [
      "Inventory",
      "Manufacturing",
      "PLM",
      "Purchase",
      "Maintenance",
      "Quality",
    ],
  },
  {
    category: "HUMAN RESOURCES",
    color: "text-gray-600",
    items: [
      "Employees",
      "Recruitment",
      "Time Off",
      "Appraisals",
      "Referrals",
      "Fleet",
    ],
  },
  {
    category: "MARKETING",
    color: "text-orange-500",
    items: [
      "Social Marketing",
      "Email Marketing",
      "SMS Marketing",
      "Events",
      "Marketing Automation",
      "Surveys",
    ],
  },
  {
    category: "SERVICES",
    color: "text-orange-600",
    items: [
      "Project",
      "Timesheets",
      "Field Service",
      "Helpdesk",
      "Planning",
      "Appointments",
    ],
  },
  {
    category: "PRODUCTIVITY",
    color: "text-purple-600",
    items: ["Discuss", "Approvals", "IoT", "VoIP", "Knowledge", "WhatsApp"],
  },
];

// Community dropdown data
const communityData: DropdownSection[] = [
  {
    category: "LEARN",
    color: "text-orange-500",
    items: [
      "Tutorials",
      "Documentation",
      "Certifications",
      "Training",
      "Blog",
      "Podcast",
    ],
  },
  {
    category: "GET THE SOFTWARE",
    color: "text-teal-600",
    items: ["Download", "Compare Editions", "Releases"],
  },
  {
    category: "COLLABORATE",
    color: "text-gray-600",
    items: [
      "Github",
      "Forum",
      "Events",
      "Translations",
      "Become a Partner",
      "Services for Partners",
      "Register your Accounting Firm",
    ],
  },
  {
    category: "GET SERVICES",
    color: "text-purple-600",
    items: [
      "Find a Partner",
      "Find an Accountant",
      "Meet an advisor",
      "Implementation Services",
      "Customer References",
      "Support",
      "Upgrades",
    ],
  },
  {
    category: "EMPOWER EDUCATION",
    color: "text-orange-500",
    items: [
      "Education Program",
      "Scale Up! Business Game",
      "LabOdoo",
      "Visit Odoo",
    ],
  },
];

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
        "sticky top-0 z-50 w-full bg-white transition-all duration-300",
        isScrolled
          ? "border-b border-black/10 shadow-sm"
          : "border-b border-black/5"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={closeDropdowns}
        >
          <img src="/logo.png" className="w-48 md:w-64 h-auto" alt="ClickMasters" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Home Link */}
          <Link
            href="/"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-light tracking-wide transition-colors",
              isActivePath("/")
                ? "text-primary"
                : "text-black/70 hover:text-black"
            )}
          >
            Home
          </Link>

          {/* Apps Dropdown */}
          {/* <div className="relative">
            <button
              onClick={() => handleDropdownToggle("apps")}
              className={cn(
                "text-sm font-light tracking-wide transition-colors flex items-center gap-1",
                activeDropdown === "apps" ? "text-black" : "text-black/70 hover:text-black"
              )}
            >
              Apps
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                activeDropdown === "apps" && "rotate-180"
              )} />
            </button>
          </div> */}

          {/* Industries Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("industries")}
              className={cn(
                "text-sm font-light tracking-wide transition-colors flex items-center gap-1",
                activeDropdown === "industries" ? "text-black" : "text-black/70 hover:text-black"
              )}
            >
              Solutions
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                activeDropdown === "industries" && "rotate-180"
              )} />
            </button>
          </div>

          {/* Community Dropdown */}
          {/* <div className="relative">
            <button
              onClick={() => handleDropdownToggle("community")}
              className={cn(
                "text-sm font-light tracking-wide transition-colors flex items-center gap-1",
                activeDropdown === "community" ? "text-black" : "text-black/70 hover:text-black"
              )}
            >
              Community
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                activeDropdown === "community" && "rotate-180"
              )} />
            </button>
          </div> */}

          <Link
            href="/about-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-light tracking-wide transition-colors",
              isActivePath("/about-us")
                ? "text-primary"
                : "text-black/70 hover:text-black"
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-light tracking-wide transition-colors",
              isActivePath("/contact-us")
                ? "text-primary"
                : "text-black/70 hover:text-black"
            )}
          >
            Contact Us
          </Link>

          <Link
            href="/testimonials"
            onClick={closeDropdowns}
            className={cn(
              "text-sm font-light tracking-wide transition-colors",
              isActivePath("/testimonials")
                ? "text-primary"
                : "text-black/70 hover:text-black"
            )}
          >
            Testimonials
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admin/login" onClick={closeDropdowns}>
            <button className="px-5 py-2 text-sm font-light tracking-wide text-white bg-black hover:bg-primary transition-colors duration-300">
              Sign In
            </button>
          </Link>
          <Link href="/get-started" onClick={closeDropdowns}>
            <button className="px-5 py-2 text-sm font-light tracking-wide text-black bg-transparent border border-black/20 hover:border-primary/50 transition-colors duration-300">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-2 text-black/70 hover:text-black transition-colors">
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
                      "py-3 text-base font-light tracking-wide transition-colors border-b border-black/5",
                      isActivePath("/")
                        ? "text-primary"
                        : "text-black/70 hover:text-black"
                    )}
                  >
                    Home
                  </Link>
                  
                  {/* Apps Mobile Dropdown */}
                  {/* <MobileDropdown
                    title="Apps"
                    items={appsData}
                    onLinkClick={() => setIsOpen(false)}
                  /> */}

                  {/* Industries Mobile Dropdown */}
                  <MobileDropdown
                    title="Solutions"
                    items={industriesData}
                    isLoading={isLoadingIndustries}
                    onLinkClick={() => setIsOpen(false)}
                  />

                  {/* Community Mobile Dropdown */}
                  {/* <MobileDropdown
                    title="Community"
                    items={communityData}
                    onLinkClick={() => setIsOpen(false)}
                  /> */}

                  <Link
                    href="/about-us"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-3 text-base font-light tracking-wide transition-colors border-b border-black/5",
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
                      "py-3 text-base font-light tracking-wide transition-colors border-b border-black/5",
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
                      "py-3 text-base font-light tracking-wide transition-colors border-b border-black/5",
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
              <div className="p-6 border-t border-black/5 space-y-3">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm font-light tracking-wide text-white bg-black hover:bg-primary transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
                <Link href="/get-started" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm font-light tracking-wide text-black bg-transparent border border-black/20 hover:border-primary/50 transition-colors duration-300">
                    Get Started
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
            {activeDropdown === "apps" && (
              <div className="grid grid-cols-4 gap-8">
                {appsData.map((section, idx) => (
                  <div key={idx}>
                    <h3 className={cn(
                      "text-xs font-bold mb-4 uppercase tracking-wider",
                      section.color
                    )}>
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href="#"
                            className="text-sm text-black/60 hover:text-black transition-colors font-light"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeDropdown === "industries" && (
              <>
                {isLoadingIndustries ? (
                  <div className="text-center py-12">
                    <p className="text-black/40 font-light">Loading solutions...</p>
                  </div>
                ) : industriesData.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-black/40 font-light">No solutions available</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-8 mb-8">
                      {industriesData.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="text-xs font-bold mb-4 uppercase tracking-wider text-primary/90">
                            {section.category}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <a
                                  href={item.url || "#"}
                                  className="text-sm text-black/60 hover:text-black transition-colors font-light"
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
                        className="text-sm font-light text-black/60 hover:text-black transition-colors"
                      >
                        Browse all Solutions →
                      </a>
                    </div>
                  </>
                )}
              </>
            )}

            {activeDropdown === "community" && (
              <div className="grid grid-cols-4 gap-8">
                {communityData.map((section, idx) => (
                  <div key={idx}>
                    <h3 className={cn(
                      "text-xs font-bold mb-4 uppercase tracking-wider",
                      section.color
                    )}>
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <a
                            href="#"
                            className="text-sm text-black/60 hover:text-black transition-colors font-light"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
  items: DropdownSection[] | IndustryCategory[];
  isLoading?: boolean;
  onLinkClick: () => void;
}

function MobileDropdown({ title, items, isLoading, onLinkClick }: MobileDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderItems = () => {
    if (isLoading) {
      return <p className="text-sm text-black/40 font-light pl-4">Loading...</p>;
    }

    if (items.length === 0) {
      return <p className="text-sm text-black/40 font-light pl-4">No items available</p>;
    }

    return (
      <div className="pl-4 space-y-4 mt-3">
        {items.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">
              {"category" in section ? section.category : ""}
            </h4>
            <ul className="space-y-2">
              {"items" in section &&
                section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="text-sm text-black/60 hover:text-black transition-colors font-light"
                      onClick={onLinkClick}
                    >
                      {typeof item === "string" ? item : item.title}
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
        className="flex items-center justify-between w-full py-3 text-base font-light tracking-wide text-black/70 hover:text-black transition-colors"
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