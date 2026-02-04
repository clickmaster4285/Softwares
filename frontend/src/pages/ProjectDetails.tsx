import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink } from 'lucide-react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { resolveImageUrl, getCategoryName } from '@/lib/utils';

interface Category {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string | Category;
  tags: string[];
  status: 'live' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading, isError } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: async () => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error('Failed to fetch project');
      return res.json();
    },
    enabled: Boolean(id),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to projects
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-border/70 bg-card p-10 text-center">
              <p className="text-muted-foreground">Loading project...</p>
            </div>
          ) : isError || !project ? (
            <div className="rounded-2xl border border-border/70 bg-card p-10 text-center">
              <p className="text-destructive">Unable to load this project.</p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <div className="rounded-3xl overflow-hidden border border-border/70 bg-secondary/30">
                  <img
                    src={resolveImageUrl(project.thumbnail)}
                    alt={project.title}
                    className="w-full h-72 md:h-96 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">
                      {statusLabels[project.status]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {project.title}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-2xl border border-border/70 bg-card p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Project details</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Category</p>
                      <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                        {getCategoryName(project.category)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50 text-muted-foreground border-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Website</p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/90"
                      >
                        Visit live project <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-secondary/30 p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Interested in a similar build? Let’s plan your next launch.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/contact">Start a project</Link>
                  </Button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ProjectDetails;
