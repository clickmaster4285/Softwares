import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy?: {
    email: string;
  };
}

const AdminCategories = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  // Fetch categories from backend
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch('/api/categories', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isFormOpen && !editingCategory) {
      setName('');
      setDescription('');
    } else if (editingCategory) {
      setName(editingCategory.name);
      setDescription(editingCategory.description);
    }
  }, [isFormOpen, editingCategory]);

  // Create category
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create category');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsFormOpen(false);
      setName('');
      setDescription('');
      toast({ title: 'Category created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: error.message || 'Failed to create category', variant: 'destructive' });
    },
  });

  // Update category
  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; name: string; description: string }) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch(`/api/categories/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: data.name, description: data.description }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update category');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] }); // Refresh projects too
      setEditingCategory(null);
      setName('');
      setDescription('');
      toast({ title: 'Category updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: error.message || 'Failed to update category', variant: 'destructive' });
    },
  });

  // Delete category
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { apiFetch } = await import('../lib/api');
      const res = await apiFetch(`/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete category');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] }); // Refresh projects too
      toast({ title: 'Category deleted successfully' });
    },
    onError: () => toast({ title: 'Failed to delete category', variant: 'destructive' }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: 'Category name is required', variant: 'destructive' });
      return;
    }

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory._id, name: name.trim(), description: description.trim() });
    } else {
      createMutation.mutate({ name: name.trim(), description: description.trim() });
    }
  };

  const handleDelete = () => {
    if (!deletingCategoryId) return;
    deleteMutation.mutate(deletingCategoryId);
    setDeletingCategoryId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Categories</h2>
            <p className="text-muted-foreground mt-1">Manage project categories</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <Card className="glass-card border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading categories...</p>
              </CardContent>
            </Card>
          ) : categories.length === 0 ? (
            <Card className="glass-card border-border/50">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No categories yet. Create your first category!</p>
              </CardContent>
            </Card>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card border-border/50">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag className="h-4 w-4 text-primary shrink-0" />
                          <h3 className="font-semibold text-foreground">{category.name}</h3>
                        </div>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingCategory(category);
                            setIsFormOpen(true);
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingCategoryId(category._id)}
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

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        setIsFormOpen(open);
        if (!open) {
          setEditingCategory(null);
          setName('');
          setDescription('');
        }
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Create New Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category details' : 'Add a new category for your projects'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Web Design, Mobile App, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description for this category"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingCategory(null);
                  setName('');
                  setDescription('');
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : editingCategory
                  ? 'Update Category'
                  : 'Create Category'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingCategoryId} onOpenChange={() => setDeletingCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? Projects using this category will need to be updated.
              This action cannot be undone.
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

export default AdminCategories;
