import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-24 lg:py-36" aria-labelledby="hero-heading">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-primary/8 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-accent/6 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--primary)/0.06),transparent)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-8 shadow-sm">
            <span className="text-sm font-semibold text-primary">Software Development Company</span>
            <span className="text-sm text-muted-foreground">Custom Software, Web & Mobile Apps</span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>

          {/* Heading - single H1 for SEO: Software Development Company */}
          <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mb-6 leading-[1.1]">
            Your Trusted
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Software Development Company</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty leading-relaxed">
            ClickMasters builds custom software, web applications, mobile apps, and ERP solutions. We are a software development company that turns your ideas into reliable, scalable software.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
              <Link to="/contact-us">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-background/80 border-2 hover:bg-muted/50" asChild>
              <Link to="/about-us">
                <Play className="mr-2 h-5 w-5" />
                Our Services
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border/80" role="list" aria-label="Company achievements">
            <div className="text-center group" role="listitem">
              <p className="text-3xl sm:text-4xl font-bold text-foreground font-display group-hover:text-primary transition-colors">1,860+</p>
              <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
            </div>
            <div className="text-center group" role="listitem">
              <p className="text-3xl sm:text-4xl font-bold text-foreground font-display group-hover:text-primary transition-colors">3,500+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
            </div>
            <div className="text-center group" role="listitem">
              <p className="text-3xl sm:text-4xl font-bold text-foreground font-display group-hover:text-primary transition-colors">75+</p>
              <p className="text-sm text-muted-foreground mt-1">Awards Won</p>
            </div>
            <div className="text-center group" role="listitem">
              <p className="text-3xl sm:text-4xl font-bold text-foreground font-display group-hover:text-primary transition-colors">5+</p>
              <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
