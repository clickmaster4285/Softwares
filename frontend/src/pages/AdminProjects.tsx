import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectForm from '@/components/admin/ProjectForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { resolveImageUrl } from '@/lib/utils';

const AdminProjects = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const { toast } = useToast();


  // Fetch projects from backend
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch('/api/projects', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });


  // Create project
  const createMutation = useMutation({
    mutationFn: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsFormOpen(false);
      toast({ title: 'Project created successfully' });
    },
    onError: () => toast({ title: 'Failed to create project', variant: 'destructive' }),
  });

  const handleCreate = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    createMutation.mutate(data);
  };


  // Update project
  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch(`/api/projects/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data.updates),
      });
      if (!res.ok) throw new Error('Failed to update project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project updated successfully' });
    },
    onError: () => toast({ title: 'Failed to update project', variant: 'destructive' }),
  });

  const handleUpdate = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingProject) return;
    const projectId = editingProject._id || editingProject.id;
    if (!projectId) {
      toast({ title: 'Missing project id', variant: 'destructive' });
      return;
    }
    updateMutation.mutate({ id: projectId, updates: data });
    setEditingProject(null);
  };


  // Delete project
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project deleted successfully' });
    },
    onError: () => toast({ title: 'Failed to delete project', variant: 'destructive' }),
  });

  const handleDelete = () => {
    if (!deletingProjectId) return;
    deleteMutation.mutate(deletingProjectId);
    setDeletingProjectId(null);
  };

  const statusColors = {
    live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    completed: 'bg-primary/20 text-primary border-primary/30',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Projects</h2>
            <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <Card className="glass-card border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading projects...</p>
              </CardContent>
            </Card>
          ) : projects.length === 0 ? (
            <Card className="glass-card border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No projects yet. Create your first project!</p>
              </CardContent>
            </Card>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card border-border/50">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-full md:w-24 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                        <img
                          src={resolveImageUrl(project.thumbnail)}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                            {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingProject(project)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingProjectId(project._id || project.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your portfolio
            </DialogDescription>
          </DialogHeader>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update your project details
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <ProjectForm
              project={editingProject}
              onSubmit={handleUpdate}
              onCancel={() => setEditingProject(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingProjectId} onOpenChange={() => setDeletingProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminProjects;
