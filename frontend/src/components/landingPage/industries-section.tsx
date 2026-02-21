import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Store, Briefcase, Heart, GraduationCap, Building2 } from "lucide-react"

const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Custom ERP, MES, production planning, and inventory software. We build manufacturing software that integrates with your shop floor and supply chain.",
    features: ["ERP & MRP", "Production Planning", "Quality Control", "Inventory Systems"],
  },
  {
    icon: Store,
    title: "Retail & eCommerce",
    description: "E-commerce platforms, POS systems, and omnichannel retail software. Custom web and mobile apps for online stores and in-store operations.",
    features: ["E-commerce Apps", "POS Software", "Inventory Sync", "Customer Portals"],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Project management, time tracking, billing, and client portal software. Custom software for consultancies, agencies, and service firms.",
    features: ["Project Management", "Time & Billing", "Client Portals", "Reporting"],
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Patient management, scheduling, EHR integrations, and compliant healthcare software. Secure, HIPAA-aware applications for clinics and hospitals.",
    features: ["Patient Management", "Scheduling", "EHR Integration", "Telehealth"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Learning management systems, student portals, and education software. Custom web and mobile apps for schools, universities, and ed-tech.",
    features: ["LMS", "Student Portals", "Course Management", "Attendance"],
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property management, listing platforms, and real estate software. Custom solutions for agents, developers, and property managers.",
    features: ["Property Management", "Listing Platforms", "Lease Management", "Tenant Portals"],
  },
]

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Software Solutions for <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            As a software development company we build custom applications for manufacturing, retail, healthcare, education, and more. Industry-specific solutions that scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <Card key={industry.title} className="group overflow-hidden bg-card hover:shadow-xl hover:border-primary/20 transition-all rounded-xl border-border/60">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{industry.title}</h3>
                  <p className="text-muted-foreground mb-4">{industry.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.features.map((feature) => (
                      <span 
                        key={feature} 
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button variant="link" className="p-0 h-auto text-primary group-hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
