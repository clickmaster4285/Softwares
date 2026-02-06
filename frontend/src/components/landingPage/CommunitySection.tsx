import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Code, BookOpen, MessageCircle, Globe, Award } from "lucide-react"

const communityFeatures = [
  {
    icon: Users,
    title: "User Community",
    description: "Connect with 500,000+ users worldwide. Share tips, ask questions, and learn from peers.",
    stat: "500K+",
    statLabel: "Members",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Contribute to our open-source modules. Build custom apps and share with the community.",
    stat: "2,500+",
    statLabel: "Contributors",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Free courses, tutorials, and certifications to master ClickMasters and grow your skills.",
    stat: "100+",
    statLabel: "Courses",
  },
  {
    icon: MessageCircle,
    title: "Forums",
    description: "Get answers fast. Our active community forums are monitored by experts daily.",
    stat: "1M+",
    statLabel: "Discussions",
  },
  {
    icon: Globe,
    title: "Partner Network",
    description: "Find certified partners for implementation, customization, and support services.",
    stat: "3,000+",
    statLabel: "Partners",
  },
  {
    icon: Award,
    title: "Events & Meetups",
    description: "Join conferences, webinars, and local meetups to network and learn.",
    stat: "200+",
    statLabel: "Events/Year",
  },
]

export function CommunitySection() {
  return (
    <section id="community" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Join a thriving <span className="text-primary">global community</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              ClickMasters is more than software—it's a movement. Join millions of businesses, 
              developers, and partners building the future of business management together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Join Community
              </Button>
              <Button variant="outline">
                Become a Partner
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "12M+", label: "Users" },
              { value: "500K+", label: "Community" },
              { value: "150+", label: "Countries" },
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
              <Card key={feature.title} className="bg-card hover:shadow-lg transition-shadow">
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
