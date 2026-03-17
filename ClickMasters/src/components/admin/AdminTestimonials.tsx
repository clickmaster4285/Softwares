'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

export interface Testimonial {
  _id: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  content: string;
  avatarUrl?: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorCompany, setAuthorCompany] = useState('');
  const [content, setContent] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const { toast } = useToast();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['testimonials-admin'],
    queryFn: async () => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/testimonials/admin', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      return res.json();
    },
  });

  useEffect(() => {
    if (isFormOpen && !editingTestimonial) {
      setAuthorName('');
      setAuthorRole('');
      setAuthorCompany('');
      setContent('');
      setAvatarUrl('');
      setRating(5);
      setIsActive(true);
    } else if (editingTestimonial) {
      setAuthorName(editingTestimonial.authorName);
      setAuthorRole(editingTestimonial.authorRole ?? '');
      setAuthorCompany(editingTestimonial.authorCompany ?? '');
      setContent(editingTestimonial.content);
      setAvatarUrl(editingTestimonial.avatarUrl ?? '');
      setRating(editingTestimonial.rating ?? 5);
      setIsActive(editingTestimonial.isActive !== false);
    }
  }, [isFormOpen, editingTestimonial]);

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Testimonial>) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to create testimonial');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setIsFormOpen(false);
      toast({ title: 'Testimonial created successfully' });
    },
    onError: (e: Error) => toast({ title: e.message || 'Failed to create', variant: 'destructive' }),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string } & Partial<Testimonial>) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/testimonials/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          authorName: data.authorName,
          authorRole: data.authorRole,
          authorCompany: data.authorCompany,
          content: data.content,
          avatarUrl: data.avatarUrl,
          rating: data.rating,
          isActive: data.isActive,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to update');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setEditingTestimonial(null);
      setIsFormOpen(false);
      toast({ title: 'Testimonial updated successfully' });
    },
    onError: (e: Error) => toast({ title: e.message || 'Failed to update', variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setDeletingId(null);
      toast({ title: 'Testimonial deleted' });
    },
    onError: () => toast({ title: 'Failed to delete', variant: 'destructive' }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      toast({ title: 'Author name and content are required', variant: 'destructive' });
      return;
    }
    const payload = {
      authorName: authorName.trim(),
      authorRole: authorRole.trim(),
      authorCompany: authorCompany.trim(),
      content: content.trim(),
      avatarUrl: avatarUrl.trim(),
      rating: Math.min(5, Math.max(1, rating)),
      isActive,
    };
    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial._id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Testimonials</h2>
            <p className="text-muted-foreground mt-1">Manage testimonials shown on the landing page</p>
          </div>
          <Button onClick={() => { setEditingTestimonial(null); setIsFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {isLoading ? (
          <Card className="glass-card border-border/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Loading testimonials...</p>
            </CardContent>
          </Card>
        ) : testimonials.length === 0 ? (
          <Card className="glass-card border-border/50">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No testimonials yet. Add one to show on the landing page.</p>
              <Button className="mt-4" onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-card border-border/50 ${!t.isActive ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src={t.avatarUrl} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {t.authorName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{t.authorName}</span>
                          {(t.authorRole || t.authorCompany) && (
                            <span className="text-sm text-muted-foreground">
                              {[t.authorRole, t.authorCompany].filter(Boolean).join(' · ')}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i <= (t.rating ?? 5) ? 'fill-primary text-primary' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{t.content}</p>
                        {!t.isActive && (
                          <span className="inline-block mt-2 text-xs text-amber-600 font-medium">Hidden on landing page</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => { setEditingTestimonial(t); setIsFormOpen(true); }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingId(t._id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingTestimonial(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            <DialogDescription>
              {editingTestimonial ? 'Update testimonial' : 'New testimonial will appear on the landing page (if active).'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1–5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value) || 5)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorRole">Role / Title</Label>
              <Input
                id="authorRole"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="CEO, Marketing Manager"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorCompany">Company</Label>
              <Input
                id="authorCompany"
                value={authorCompany}
                onChange={(e) => setAuthorCompany(e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Testimonial *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What they said about your product..."
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="isActive">Show on landing page</Label>
                <p className="text-sm text-muted-foreground">Inactive testimonials are hidden from the public.</p>
              </div>
              <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              This testimonial will be removed from the landing page. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminTestimonials;
