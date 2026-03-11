'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Code, BookOpen, MessageCircle, Globe, Award } from "lucide-react"

const communityFeatures = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored software built for your business. Web apps, desktop applications, and backend systems that scale.",
    stat: "1,860+",
    statLabel: "Projects",
  },
  {
    icon: Users,
    title: "Web Application Development",
    description: "Modern web apps with React, Node, and cloud hosting. Responsive, fast, and secure applications.",
    stat: "3,500+",
    statLabel: "Clients",
  },
  {
    icon: BookOpen,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android. From MVP to enterprise solutions.",
    stat: "75+",
    statLabel: "Awards",
  },
  {
    icon: MessageCircle,
    title: "ERP & Business Software",
    description: "ERP, CRM, inventory, and workflow automation. Integrate with your existing systems and processes.",
    stat: "5+",
    statLabel: "Years",
  },
  {
    icon: Globe,
    title: "API & Integrations",
    description: "REST APIs, third-party integrations, and legacy system modernization. Connect your software ecosystem.",
    stat: "24/7",
    statLabel: "Support",
  },
  {
    icon: Award,
    title: "Maintenance & Support",
    description: "Ongoing updates, security patches, and technical support. Keep your software running smoothly.",
    stat: "100%",
    statLabel: "Dedicated",
  },
]

export function CommunitySection() {
  return (
    <section id="community" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Why Choose Our <span className="text-primary">Software Development Services</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              We are a software development company that delivers custom software, web apps, and mobile apps. Experienced developers, agile process, and on-time delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/contact-us">Get in Touch</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/testimonials">Client Stories</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "1,860+", label: "Projects" },
              { value: "3,500+", label: "Clients" },
              { value: "75+", label: "Awards" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-background rounded-xl border border-border">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="bg-card hover:shadow-lg hover:border-primary/20 transition-all rounded-xl border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{feature.stat}</p>
                      <p className="text-xs text-muted-foreground">{feature.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
