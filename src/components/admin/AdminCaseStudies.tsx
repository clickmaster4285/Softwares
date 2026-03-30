'use client';

import { useState } from 'react';
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
import CaseStudyForm, { CaseStudyFormPayload } from '@/components/admin/CaseStudyForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CaseStudy, Project } from '../../../lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { resolveImageUrl, getCategoryName } from '../../../lib/utils';
import Link from 'next/link';

function rowId(p: { _id?: string; id?: string }) {
  return String(p._id ?? p.id ?? '');
}

function caseStudyId(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const anyVal = value as any;
    if (typeof anyVal.toString === 'function') {
      const s = anyVal.toString();
      if (s && s !== '[object Object]') return s;
    }
    if (typeof anyVal.$oid === 'string') return anyVal.$oid;
  }
  return '';
}

function projectTitle(project: string | Project | undefined): string {
  if (!project) return '—';
  if (typeof project === 'string') return 'Solution';
  return project.title || '—';
}

function invalidateCaseStudyQueries(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ['case-studies'] });
  queryClient.invalidateQueries({ queryKey: ['case-studies', 'admin'] });
}

const AdminCaseStudies = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: caseStudies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ['case-studies', 'admin'],
    queryFn: async () => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/case-studies?drafts=1', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to load case studies');
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: CaseStudyFormPayload) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch('/api/case-studies', {
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
      invalidateCaseStudyQueries(queryClient);
      setIsFormOpen(false);
      toast({ title: 'Case study created' });
    },
    onError: (e: Error) =>
      toast({ title: e.message || 'Failed to create', variant: 'destructive' }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: CaseStudyFormPayload }) => {
      const { project: _drop, ...rest } = payload;
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(rest),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to update');
      }
      return res.json();
    },
    onSuccess: () => {
      invalidateCaseStudyQueries(queryClient);
      setEditing(null);
      toast({ title: 'Case study saved' });
    },
    onError: (e: Error) =>
      toast({ title: e.message || 'Failed to update', variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { apiFetch } = await import('../../lib/api');
      const res = await apiFetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      invalidateCaseStudyQueries(queryClient);
      toast({ title: 'Case study removed' });
    },
    onError: () => toast({ title: 'Failed to delete', variant: 'destructive' }),
  });

  const handleFormSubmit = (payload: CaseStudyFormPayload) => {
    if (editing) {
      updateMutation.mutate({ id: String(editing._id), payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = () => {
    if (!deletingId) return;
    deleteMutation.mutate(deletingId);
    setDeletingId(null);
  };

  const publishedCount = caseStudies.filter((c) => c.published).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Case studies
            </h2>
            <p className="text-muted-foreground mt-1">
              Link a solution, write the full narrative, then publish to show it on the case studies
              page ({publishedCount} published).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/solutions">Solutions</Link>
            </Button>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New case study
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <Card className="glass-card border-border/50 pt-6">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading…</p>
              </CardContent>
            </Card>
          ) : caseStudies.length === 0 ? (
            <Card className="glass-card border-border/50 pt-6">
              <CardContent className="p-8 text-center space-y-2">
                <p className="text-muted-foreground">No case studies yet.</p>
                <Button onClick={() => setIsFormOpen(true)}>Create the first one</Button>
              </CardContent>
            </Card>
          ) : (
            caseStudies.map((cs, index) => {
              const csId = caseStudyId((cs as any)._id);
              const hrefSlug =
                typeof (cs as any).slug === 'string' && (cs as any).slug.trim()
                  ? String((cs as any).slug).trim()
                  : '';
              const proj = cs.project as Project | undefined;
              const pid = proj && typeof proj === 'object' ? rowId(proj) : '';
              const thumb =
                cs.thumbnail?.trim() ||
                (proj && typeof proj === 'object' ? proj.thumbnail : '') ||
                '';
              return (
                <motion.div
                  key={String(cs._id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card className="glass-card border-border/50 pt-6">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-24 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img
                            src={resolveImageUrl(thumb || '/placeholder.svg')}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{cs.title}</h3>
                            <Badge
                              variant={cs.published ? 'default' : 'secondary'}
                              className={cs.published ? 'bg-emerald-600' : ''}
                            >
                              {cs.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Solution: {projectTitle(cs.project as Project)}{' '}
                            {proj && typeof proj === 'object' ? (
                              <>
                                ·{' '}
                                <span className="text-foreground/80">
                                  {getCategoryName(proj.category)}
                                </span>
                              </>
                            ) : null}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{cs.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {cs.published ? (
                            <Button variant="ghost" size="icon" asChild title="View on site">
                              <a
                                href={`/case-studies/${encodeURIComponent(hrefSlug || csId || String((cs as any)._id))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : null}
                          {pid && proj && typeof proj === 'object' && proj.url ? (
                            <Button variant="ghost" size="icon" asChild title="Solution URL">
                              <a href={proj.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 opacity-60" />
                              </a>
                            </Button>
                          ) : null}
                          <Button variant="ghost" size="icon" onClick={() => setEditing(cs)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-destructive"
                            onClick={() => setDeletingId(String(cs._id))}
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
            <DialogTitle>New case study</DialogTitle>
            <DialogDescription>
              Select a solution, then write listing copy and the full story. Turn on Published when
              it should appear on the site.
            </DialogDescription>
          </DialogHeader>
          <CaseStudyForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit case study</DialogTitle>
            <DialogDescription>Update copy, narrative, image, or publication status.</DialogDescription>
          </DialogHeader>
          {editing && (
            <CaseStudyForm
              caseStudy={editing}
              onSubmit={handleFormSubmit}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this case study?</AlertDialogTitle>
            <AlertDialogDescription>
              The solution remains in Solutions; only this case study page and listing entry are
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminCaseStudies;
