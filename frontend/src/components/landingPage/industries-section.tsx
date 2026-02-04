import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Store, Briefcase, Heart, GraduationCap, Building2 } from "lucide-react"

const industries = [
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Production planning, quality control, MRP, and shop floor management for modern manufacturers.",
    features: ["Bill of Materials", "Work Orders", "Quality Control", "MRP Planning"],
  },
  {
    icon: Store,
    title: "Retail & eCommerce",
    description: "Unified commerce with POS, online stores, and omnichannel inventory management.",
    features: ["Point of Sale", "Multi-channel Sync", "Loyalty Programs", "Returns Management"],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Time tracking, project billing, resource planning, and client management for service firms.",
    features: ["Time Tracking", "Project Billing", "Resource Planning", "Client Portal"],
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Patient management, appointments, compliance tracking, and secure communications.",
    features: ["Patient Records", "Scheduling", "HIPAA Compliance", "Telehealth"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Student management, course scheduling, online learning, and administration tools.",
    features: ["Student Portal", "Course Management", "Online Learning", "Attendance"],
  },
  {
    icon: Building2,
    title: "Real Estate",
    description: "Property management, lease tracking, maintenance requests, and tenant communications.",
    features: ["Property Listings", "Lease Management", "Maintenance", "Tenant Portal"],
  },
]

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Tailored solutions for <span className="text-primary">every industry</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Pre-configured workflows and best practices for your specific industry. 
            Get started faster with templates designed by experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <Card key={industry.title} className="group overflow-hidden bg-card hover:shadow-xl transition-all">
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
