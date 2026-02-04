import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Package, 
  Calculator, 
  UserCircle, 
  FolderKanban, 
  Mail,
  ShoppingCart,
  FileText,
  Calendar,
  Megaphone,
  Wrench,
  BarChart3
} from "lucide-react"

const apps = [
  {
    icon: Users,
    title: "CRM",
    description: "Track leads, manage pipelines, and close deals faster with intelligent sales automation.",
    badge: "Popular",
  },
  {
    icon: Package,
    title: "Inventory",
    description: "Real-time stock tracking, warehouse management, and automated reordering.",
    badge: null,
  },
  {
    icon: Calculator,
    title: "Accounting",
    description: "Complete financial management with invoicing, payments, and reporting.",
    badge: null,
  },
  {
    icon: UserCircle,
    title: "HR",
    description: "Recruitment, onboarding, payroll, and employee management in one place.",
    badge: null,
  },
  {
    icon: FolderKanban,
    title: "Project",
    description: "Plan, track, and deliver projects on time with Kanban boards and Gantt charts.",
    badge: null,
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Design campaigns, automate sequences, and track engagement metrics.",
    badge: "New",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce",
    description: "Build online stores with integrated payments and inventory sync.",
    badge: null,
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Create, sign, and manage contracts and documents digitally.",
    badge: null,
  },
  {
    icon: Calendar,
    title: "Appointments",
    description: "Online booking, calendar sync, and automated reminders.",
    badge: null,
  },
  {
    icon: Megaphone,
    title: "Social Marketing",
    description: "Schedule posts, monitor mentions, and analyze social performance.",
    badge: null,
  },
  {
    icon: Wrench,
    title: "Field Service",
    description: "Dispatch technicians, track work orders, and manage equipment.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Custom dashboards, real-time insights, and predictive analytics.",
    badge: "AI-Powered",
  },
]

export function AppsSection() {
  return (
    <section id="apps" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            One platform, <span className="text-primary">endless possibilities</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Choose from 30+ fully integrated apps to build your perfect business toolkit. 
            All apps share data seamlessly, eliminating silos and duplicate work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <Card 
                key={app.title} 
                className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {app.badge && (
                      <Badge variant={app.badge === "New" ? "default" : "secondary"} className={app.badge === "New" ? "bg-accent text-accent-foreground" : ""}>
                        {app.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-foreground mt-3">{app.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{app.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
