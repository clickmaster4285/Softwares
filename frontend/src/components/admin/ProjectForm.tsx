import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/storage';
import { resolveImageUrl } from '@/lib/utils';

type EditableProject = Omit<Project, 'id'> & { id?: string; _id?: string };

interface ProjectFormProps {
  project?: EditableProject;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [thumbnail, setThumbnail] = useState(project?.thumbnail || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(project?.url || '');
  const [status, setStatus] = useState<Project['status']>(project?.status || 'in-progress');
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [previewUrl, setPreviewUrl] = useState(project?.thumbnail || '');

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(resolveImageUrl(thumbnail));
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, thumbnail]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = thumbnail;

    // If a file is selected, upload it first
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        const { apiFetch } = await import('../../lib/api');
        const res = await apiFetch('/api/projects/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        imageUrl = data.imageUrl;
      } catch {
        setUploading(false);
        alert('Image upload failed. Please try again.');
        return;
      }
      setUploading(false);
    }

    // Submit the project with the correct thumbnail
    onSubmit({
      title,
      description,
      thumbnail: imageUrl || '/placeholder.svg',
      url,
      status,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the project"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="url">Project URL *</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as Project['status'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="thumbnail">Project Image</Label>
        <div className="grid gap-4 md:grid-cols-[1fr_200px] items-start">
          <div className="space-y-2">
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={e => setImageFile(e.target.files?.[0] || null)}
            />
            {imageFile && <p className="text-xs text-muted-foreground">Selected: {imageFile.name}</p>}
            <Input
              className="mt-2"
              value={thumbnail}
              onChange={e => setThumbnail(e.target.value)}
              placeholder="Or paste image URL"
            />
            <p className="text-xs text-muted-foreground">Upload an image or paste a URL. Leave empty for default placeholder.</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-secondary/40 overflow-hidden">
            <img
              src={previewUrl || '/placeholder.svg'}
              alt="Thumbnail preview"
              className="h-32 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" variant="outline" size="icon" onClick={handleAddTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
