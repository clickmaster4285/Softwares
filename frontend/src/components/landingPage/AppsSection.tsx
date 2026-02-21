import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { getCategoryName, resolveImageUrl } from "@/lib/utils";
import { ExternalLink, FolderKanban } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  url?: string;
  category: string | Category;
  status: "live" | "in-progress" | "completed";
}

function groupProjectsByCategory(projects: Project[]): { categoryName: string; projects: Project[] }[] {
  const map = new Map<string, Project[]>();
  for (const p of projects) {
    const name = getCategoryName(p.category);
    if (!map.has(name)) map.set(name, []);
    map.get(name)!.push(p);
  }
  return Array.from(map.entries())
    .map(([categoryName, projects]) => ({ categoryName, projects }))
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName));
}

export function AppsSection() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-public"],
    queryFn: async () => {
      const res = await apiFetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const byCategory = groupProjectsByCategory(projects);

  return (
    <section id="apps" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Our <span className="text-primary">Software Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Explore custom software, web apps, and solutions we have built for clients. Browse by category and industry.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="rounded-xl border-border/60 overflow-hidden">
                <div className="h-40 bg-muted animate-pulse" />
                <CardHeader>
                  <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : byCategory.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-border/60 bg-card/50">
            <FolderKanban className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No projects yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Projects will appear here once they are added and grouped by category.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {byCategory.map(({ categoryName, projects: categoryProjects }) => (
              <div key={categoryName}>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 uppercase tracking-tight border-b border-border/60 pb-3">
                  {categoryName}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProjects.map((project) => {
                    const isExternal = project.url?.startsWith("http");
                    const card = (
                      <Card className="h-full overflow-hidden rounded-xl border-border/60 bg-card transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/40">
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img
                            src={resolveImageUrl(project.thumbnail)}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {project.title}
                            </CardTitle>
                            {project.status === "live" && (
                              <Badge className="shrink-0 bg-emerald-500/15 text-emerald-600 border-emerald-500/30 text-xs">
                                Live
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                          {project.url && (
                            <span className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary">
                              {isExternal ? (
                                <>
                                  Visit <ExternalLink className="h-3.5 w-3.5" />
                                </>
                              ) : (
                                "View project"
                              )}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    );
                    return (
                      <div key={project._id} className="block group">
                        {isExternal && project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            {card}
                          </a>
                        ) : (
                          <Link to={`/projects/${project._id}`}>{card}</Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

