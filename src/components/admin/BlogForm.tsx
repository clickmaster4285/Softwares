'use client';

import { useEffect, useState } from 'react';
import { X, Plus, Loader2, Lock, LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { resolveImageUrl } from '../../../lib/utils';
import { compressAndConvertImage } from '../../../src/utils/imageUtils';
import RichTextEditor from '@/components/admin/RichTextEditor';

export type BlogFormPayload = {
  published: boolean;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string[];
};

type BlogPost = {
  _id: string;
  slug?: string;
  published: boolean;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  thumbnail?: string;
  tags?: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (data: BlogFormPayload) => void;
  onCancel: () => void;
}

export default function BlogForm({ post, onSubmit, onCancel }: BlogFormProps) {
  const isEdit = Boolean(post);
  const [slug, setSlug] = useState(post?.slug || '');
  const [slugLocked, setSlugLocked] = useState(true);
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [published, setPublished] = useState(post?.published ?? false);
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [previewUrl, setPreviewUrl] = useState(post?.thumbnail ? resolveImageUrl(post.thumbnail) : '');

  useEffect(() => {
    if (!slugLocked) return;
    setSlug(slugify(title));
  }, [title, slugLocked]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCompressing(true);
      const compressedFile = await compressAndConvertImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8,
        format: 'webp',
      });
      setPreviewUrl(URL.createObjectURL(compressedFile));
      setImageFile(compressedFile);
      setThumbnail('');
    } catch {
      setPreviewUrl(URL.createObjectURL(file));
      setImageFile(file);
    } finally {
      setCompressing(false);
    }
  };

  const handleAddTag = () => {
    const t = newTag.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setNewTag('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const textOnlyContent = content.replace(/<[^>]*>/g, '').trim();
    if (!textOnlyContent) {
      alert('Content is required');
      return;
    }

    let imageUrl = thumbnail.trim();

    if (imageFile) {
      setUploading(true);
      try {
        const { apiFetch } = await import('../../../lib/api');
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await apiFetch('/api/projects/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        if (!res.ok) {
          alert('Upload failed');
          setUploading(false);
          return;
        }
        const data = await res.json();
        imageUrl = data.imageUrl;
      } catch {
        setUploading(false);
        alert('Upload failed');
        return;
      }
      setUploading(false);
    }

    onSubmit({
      published,
      slug: slugify(slug),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      thumbnail: imageUrl,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
      <div className="flex flex-col gap-3 rounded-lg border border-border/60 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 pr-2">
          <Label htmlFor="blog-published">Published</Label>
          <p className="text-xs text-muted-foreground">Only published posts appear on the site.</p>
        </div>
        <Switch id="blog-published" checked={published} onCheckedChange={setPublished} className="shrink-0" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-title">Title *</Label>
        <Input
          id="blog-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="blog-slug">Slug</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setSlugLocked((prev) => {
                const nextLocked = !prev;
                if (nextLocked) setSlug(slugify(title));
                return nextLocked;
              });
            }}
          >
            {slugLocked ? (
              <>
                <LockOpen className="mr-1.5 h-3.5 w-3.5" />
                Unlock
              </>
            ) : (
              <>
                <Lock className="mr-1.5 h-3.5 w-3.5" />
                Lock
              </>
            )}
          </Button>
        </div>
        <Input
          id="blog-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. scaling-nextjs-apps"
          disabled={slugLocked}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-author">Author</Label>
        <Input
          id="blog-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Optional author name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-excerpt">Excerpt *</Label>
        <Textarea
          id="blog-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          required
          placeholder="Short summary for listing cards"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="blog-content">Content *</Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write content and use the toolbar for headings, links, lists, and images."
        />
        <p className="text-xs text-muted-foreground">
          What you write here is saved as rich text and displayed the same way on the blog page.
        </p>
      </div>

      <div className="min-w-0 space-y-2">
        <Label>Tags</Label>
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-stretch">
          <Input
            className="min-w-0 flex-1"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="e.g. Next.js"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-full shrink-0 sm:h-10 sm:w-10"
            onClick={handleAddTag}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  className="ml-1 hover:text-destructive"
                  onClick={() => setTags(tags.filter((x) => x !== tag))}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label>Featured image (optional)</Label>
        <div className="grid min-w-0 items-start gap-4 md:grid-cols-[1fr_minmax(0,160px)]">
          <div className="min-w-0 space-y-2">
            <Input type="file" accept="image/*" onChange={handleImageSelect} disabled={compressing} />
            <Input
              value={thumbnail}
              onChange={(e) => {
                setThumbnail(e.target.value);
                if (!imageFile) setPreviewUrl(e.target.value ? resolveImageUrl(e.target.value) : '');
              }}
              placeholder="Or paste image URL"
              disabled={!!imageFile}
            />
          </div>
          <div className="min-h-[7rem] overflow-hidden rounded-lg border border-border/60 bg-secondary/40 md:min-h-0">
            <img
              src={previewUrl || '/placeholder.svg'}
              alt=""
              className="h-28 w-full max-w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" disabled={uploading || compressing} className="w-full sm:w-auto">
          {(uploading || compressing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Save changes' : 'Create post'}
        </Button>
      </div>
    </form>
  );
}
