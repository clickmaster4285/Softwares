
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';

export interface Project {
  _id: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string;
  tags: string[];
  status: 'live' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const { apiFetch } = await import('../lib/api');
  const res = await apiFetch('/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

const ProjectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data: projects, isLoading, isError } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  // Get unique categories and filter projects
  const categories = projects ? Array.from(new Set(projects.map(p => p.category))) : [];
  const filteredProjects = !projects || selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Featured projects
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            A selection of recent work delivered with modern UI, clean architecture, and production-ready polish.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All ({projects?.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({projects?.filter(p => p.category === category).length})
              </Button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : isError || !projects ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load projects.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
