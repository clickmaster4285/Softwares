import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, MessageCircle, Video, FileQuestion, Headphones, Search } from "lucide-react"

const helpResources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API references for all ClickMasters apps.",
    link: "Browse Docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides to help you get the most out of FlowSuite.",
    link: "Watch Videos",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time. Available 24/7 for Pro users.",
    link: "Start Chat",
  },
  {
    icon: FileQuestion,
    title: "FAQ",
    description: "Quick answers to the most commonly asked questions.",
    link: "View FAQ",
  },
  {
    icon: Headphones,
    title: "Contact Support",
    description: "Submit a ticket and get a response within 24 hours.",
    link: "Get Help",
  },
]

export function HelpSection() {
  return (
    <section id="help" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            How can we <span className="text-primary">help you?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Find answers quickly with our knowledge base, or reach out to our support team 
            for personalized assistance.
          </p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-12 pr-4 py-6 text-base bg-background"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90">
              Search
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {helpResources.map((resource) => {
            const Icon = resource.icon
            return (
              <Card key={resource.title} className="group bg-card hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    {resource.link} →
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-background rounded-2xl border border-border p-8 lg:p-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Our customer success team is ready to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Contact Support
            </Button>
            <Button variant="outline">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
