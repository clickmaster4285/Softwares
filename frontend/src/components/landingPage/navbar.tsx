"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Apps dropdown data
const appsData = [
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
const communityData = [
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

// Types for API data
interface IndustryItem {
  id: string;
  title: string;
}

interface IndustryCategory {
  category: string;
  items: IndustryItem[];
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [industriesData, setIndustriesData] = useState<IndustryCategory[]>([]);
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch industries data from API
  useEffect(() => {
    const fetchIndustries = async () => {
      setIsLoadingIndustries(true);
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${baseUrl}/api/categories/project-data/of-category-wise`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch industries");
        }

        const data: IndustryCategory[] = await response.json();
        setIndustriesData(data);
      } catch (error) {
        console.error("Error fetching industries:", error);
        // Keep empty array on error
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

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-white"
      ref={dropdownRef}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-gray-600">odoo</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("apps")}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Apps
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("industries")}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Industries
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("community")}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Community
            </button>
          </div>

          <Link
            to="#pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </Link>

          <Link
            to="#help"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Help
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" className="text-gray-700">
            Sign in
          </Button>
          <Button className="bg-purple-800 text-white hover:bg-purple-900">
            Try it free
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
          <SheetContent side="right" className="w-full max-w-sm bg-white">
            <nav className="flex flex-col gap-4 mt-8">
              <MobileNavItem title="Apps" items={appsData} />
              <MobileNavItem title="Industries" items={industriesData} />
              <MobileNavItem title="Community" items={communityData} />
              <Link
                to="#pricing"
                className="text-lg font-medium text-gray-700 py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#help"
                className="text-lg font-medium text-gray-700 py-2"
                onClick={() => setIsOpen(false)}
              >
                Help
              </Link>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
                <Button className="w-full bg-purple-800 text-white">
                  Try it free
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Full-width Dropdown Menus */}
      {activeDropdown && (
        <div className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            {activeDropdown === "apps" && (
              <div className="grid grid-cols-4 gap-8">
                {appsData.map((section, idx) => (
                  <div key={idx}>
                    <h3
                      className={cn(
                        "text-xs font-bold mb-3 uppercase tracking-wide",
                        section.color,
                      )}
                    >
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            to="#"
                            className="text-sm text-gray-700 hover:text-gray-900"
                          >
                            {item}
                          </Link>
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
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading industries...</p>
                  </div>
                ) : industriesData.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No industries available</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-8 mb-8">
                      {industriesData.map((section, idx) => (
                        <div key={idx}>
                          <h3
                            className={cn(
                              "text-xs font-bold mb-3 uppercase tracking-wide",
                            )}
                          >
                            {section.category}
                          </h3>
                          <ul className="">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={item.url}
                                  target="_blank"
                                  className="text-sm text-gray-700 hover:text-gray-900"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="text-center pt-4 border-t border-gray-200">
                      <Link
                        to="#"
                        className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                      >
                        Browse all Industries
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}

            {activeDropdown === "community" && (
              <div className="grid grid-cols-4 gap-8">
                {communityData.map((section, idx) => (
                  <div key={idx}>
                    <h3
                      className={cn(
                        "text-xs font-bold mb-3 uppercase tracking-wide",
                        section.color,
                      )}
                    >
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            to="#"
                            className="text-sm text-gray-700 hover:text-gray-900"
                          >
                            {item}
                          </Link>
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

function MobileNavItem({
  title,
  items,
}: {
  title: string;
  items: { category: string; items: string[] }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-lg font-medium text-gray-700 py-2"
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
        <div className="pl-4 flex flex-col gap-4 mt-2">
          {items.map((section, idx) => (
            <div key={idx}>
              <h4 className={cn("text-xs font-bold mb-2 uppercase")}>
                {section.category}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link to="#" className="text-sm text-gray-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
