'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import BlogForm, { BlogFormPayload } from '@/components/admin/BlogForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { resolveImageUrl } from '../../../lib/utils';

type BlogPost = {
  _id: string;
  slug?: string;
  published: boolean;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  authorLinkedin?: string;
  authorImage?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

function postId(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const anyVal = value as { toString?: () => string; $oid?: string };
    if (typeof anyVal.toString === 'function') {
      const s = anyVal.toString();
      if (s && s !== '[object Object]') return s;
    }
    if (typeof anyVal.$oid === 'string') return anyVal.$oid;
  }
  return '';
}

function invalidateBlogQueries(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
  queryClient.invalidateQueries({ queryKey: ['blog-posts', 'admin'] });
}

export default function AdminBlog() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', 'admin'],
    queryFn: async () => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/blog?drafts=1', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load blog posts');
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: BlogFormPayload) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to create');
      }
      return res.json();
    },
    onSuccess: () => {
      invalidateBlogQueries(queryClient);
      setIsFormOpen(false);
      toast({ title: 'Blog post created' });
    },
    onError: (e: Error) => toast({ title: e.message || 'Failed to create', variant: 'destructive' }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: BlogFormPayload }) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to update');
      }
      return res.json();
    },
    onSuccess: () => {
      invalidateBlogQueries(queryClient);
      setEditing(null);
      toast({ title: 'Blog post saved' });
    },
    onError: (e: Error) => toast({ title: e.message || 'Failed to update', variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/blog/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      invalidateBlogQueries(queryClient);
      toast({ title: 'Blog post removed' });
    },
    onError: () => toast({ title: 'Failed to delete', variant: 'destructive' }),
  });

  const handleFormSubmit = (payload: BlogFormPayload) => {
    if (editing) updateMutation.mutate({ id: String(editing._id), payload });
    else createMutation.mutate(payload);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    deleteMutation.mutate(deletingId);
    setDeletingId(null);
  };

  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground md:text-3xl">Blog posts</h2>
            <p className="mt-1 text-muted-foreground">
              Create long-form content and control publication status ({publishedCount} published).
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New post
          </Button>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <Card className="glass-card border-border/50 pt-6">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </CardContent>
            </Card>
          ) : posts.length === 0 ? (
            <Card className="glass-card border-border/50 pt-6">
              <CardContent className="space-y-2 p-8 text-center">
                <p className="text-muted-foreground">No blog posts yet.</p>
                <Button onClick={() => setIsFormOpen(true)}>Create the first one</Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post, index) => {
              const id = postId(post._id);
              const hrefSlug =
                typeof post.slug === 'string' && post.slug.trim() ? post.slug.trim() : id;
              return (
                <motion.div
                  key={String(post._id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card className="glass-card border-border/50 pt-6">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="h-16 w-full shrink-0 overflow-hidden rounded-lg bg-secondary md:w-24">
                          <img
                            src={resolveImageUrl(post.thumbnail?.trim() || '/placeholder.svg')}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h3 className="truncate font-semibold text-foreground">{post.title}</h3>
                            <Badge
                              variant={post.published ? 'default' : 'secondary'}
                              className={post.published ? 'bg-emerald-600' : ''}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                          {post.category ? (
                            <p className="mt-1 text-xs font-medium text-primary">Category: {post.category}</p>
                          ) : null}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {post.published ? (
                            <Button variant="ghost" size="icon" asChild title="View on site">
                              <a
                                href={`/blog/${encodeURIComponent(hrefSlug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : null}
                          <Button variant="ghost" size="icon" onClick={() => setEditing(post)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-destructive"
                            onClick={() => setDeletingId(String(post._id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>New blog post</DialogTitle>
            <DialogDescription>Write an article and publish when ready.</DialogDescription>
          </DialogHeader>
          <BlogForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit blog post</DialogTitle>
            <DialogDescription>Update content, image, tags, or publication status.</DialogDescription>
          </DialogHeader>
          {editing && <BlogForm post={editing} onSubmit={handleFormSubmit} onCancel={() => setEditing(null)} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the post from admin and public listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
