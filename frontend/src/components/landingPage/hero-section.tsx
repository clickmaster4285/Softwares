import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 mb-8">
            <span className="text-sm font-medium text-accent">New</span>
            <span className="text-sm text-muted-foreground">AI-Powered Analytics Now Available</span>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance mb-6">
            All your business apps
            <span className="text-primary"> in one place</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            FlowSuite brings together CRM, Inventory, HR, Accounting, and 30+ apps into one integrated platform. 
            Scale your operations without the complexity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">12M+</p>
              <p className="text-sm text-muted-foreground mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">150+</p>
              <p className="text-sm text-muted-foreground mt-1">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">99.9%</p>
              <p className="text-sm text-muted-foreground mt-1">Uptime SLA</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">30+</p>
              <p className="text-sm text-muted-foreground mt-1">Integrated Apps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
