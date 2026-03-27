'use client';

import { useEffect, useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Project, Category } from '../../../lib/storage';
import { resolveImageUrl } from '../../../lib/utils';
import { useQuery } from '@tanstack/react-query';
import { compressAndConvertImage, getImageDimensions } from '../../../src/utils/imageUtils';

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
  const [compressing, setCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<string>('');
  const [url, setUrl] = useState(project?.url || '');
  const [categoryId, setCategoryId] = useState<string>('');
  const [status, setStatus] = useState<Project['status']>(project?.status || 'in-progress');
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [previewUrl, setPreviewUrl] = useState(project?.thumbnail || '');
  const [isInitialized, setIsInitialized] = useState(false);
  const [originalFileInfo, setOriginalFileInfo] = useState<{
    name: string;
    size: string;
    dimensions?: { width: number; height: number };
  } | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { apiFetch } = await import('../../../lib/api');
      const res = await apiFetch('/api/categories', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  // Initialize category ID from project AFTER categories are loaded
  useEffect(() => {
    if (!isInitialized && !categoriesLoading && categories.length > 0) {
      if (project?.category) {
        if (typeof project.category === 'string') {
          setCategoryId(project.category);
        } else if (typeof project.category === 'object' && project.category._id) {
          setCategoryId(project.category._id);
        }
      }
      setIsInitialized(true);
    }
  }, [project, categoriesLoading, categories, isInitialized]);

  // Handle image file selection with compression
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      setCompressionProgress('Reading image...');
      
      // Get original image info
      const dimensions = await getImageDimensions(file);
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      
      setOriginalFileInfo({
        name: file.name,
        size: `${fileSizeInMB} MB`,
        dimensions
      });
      
      setCompressionProgress(`Compressing image (${dimensions.width}x${dimensions.height})...`);
      
      // Compress and convert to WebP
      // Adjust quality based on original size
      let quality = 0.8;
      if (file.size > 5 * 1024 * 1024) { // > 5MB
        quality = 0.7;
      } else if (file.size > 2 * 1024 * 1024) { // > 2MB
        quality = 0.75;
      }
      
      const compressedFile = await compressAndConvertImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality,
        format: 'webp'
      });
      
      const compressedSizeInMB = (compressedFile.size / (1024 * 1024)).toFixed(2);
      setCompressionProgress(`Compressed: ${fileSizeInMB} MB → ${compressedSizeInMB} MB`);
      
      // Create preview URL
      const previewObjectUrl = URL.createObjectURL(compressedFile);
      setPreviewUrl(previewObjectUrl);
      setImageFile(compressedFile);
      
      // Clear thumbnail URL if it was set
      setThumbnail('');
      
      // Auto-clear compression message after 3 seconds
      setTimeout(() => {
        setCompressionProgress('');
      }, 3000);
      
    } catch (error) {
      console.error('Image compression error:', error);
      alert(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Fallback to original file
      const previewObjectUrl = URL.createObjectURL(file);
      setPreviewUrl(previewObjectUrl);
      setImageFile(file);
    } finally {
      setCompressing(false);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== project?.thumbnail && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, project?.thumbnail]);

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setThumbnail(url);
    if (url && !imageFile) {
      setPreviewUrl(resolveImageUrl(url));
    } else if (!url && !imageFile && project?.thumbnail) {
      setPreviewUrl(resolveImageUrl(project.thumbnail));
    }
  };

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

    // If a file is selected, upload it
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', imageFile);
      
      try {
        const { apiFetch } = await import('../../../lib/api');
        const res = await apiFetch('/api/projects/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const errorMessage = errorData.message || `Upload failed with status ${res.status}`;
          setUploading(false);
          alert(`Image upload failed: ${errorMessage}`);
          return;
        }
        
        const data = await res.json();
        imageUrl = data.imageUrl;
      } catch (error) {
        setUploading(false);
        console.error('Upload error:', error);
        alert(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return;
      }
      setUploading(false);
    }

    // Submit the project with the category ID
    if (!categoryId) {
      alert('Please select a category');
      return;
    }

    onSubmit({
      title,
      description,
      thumbnail: imageUrl || '/placeholder.svg',
      url,
      category: categoryId,
      status,
      tags,
    });
  };

  // Show loading state while categories are loading
  if (categoriesLoading || !isInitialized) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading categories...</p>
        </div>
      </div>
    );
  }

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
          <Label htmlFor="category">Category *</Label>
          <Select value={categoryId} onValueChange={setCategoryId} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length === 0 ? (
                <SelectItem value="none" disabled>No categories available. Create one first.</SelectItem>
              ) : (
                categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {categories.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No categories found. Please create a category first in the Categories page.
            </p>
          )}
        </div>
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

      <div className="space-y-3">
        <Label htmlFor="thumbnail">Project Image</Label>
        <div className="grid gap-4 md:grid-cols-[1fr_200px] items-start">
          <div className="space-y-2">
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              disabled={compressing}
            />
            
            {/* Compression status indicator */}
            {compressing && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{compressionProgress}</span>
              </div>
            )}
            
            {/* Original file info */}
            {originalFileInfo && !compressing && (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Original: {originalFileInfo.name}</p>
                <p>Size: {originalFileInfo.size}</p>
                {originalFileInfo.dimensions && (
                  <p>Dimensions: {originalFileInfo.dimensions.width} x {originalFileInfo.dimensions.height}</p>
                )}
              </div>
            )}
            
            {/* Processed file info */}
            {imageFile && !compressing && originalFileInfo && (
              <div className="text-xs text-green-600">
                <p>Processed: {imageFile.name}</p>
                <p>Size: {(imageFile.size / (1024 * 1024)).toFixed(2)} MB (WebP format)</p>
              </div>
            )}
            
            <div className="relative">
              <Input
                className="mt-2"
                value={thumbnail}
                onChange={handleUrlChange}
                placeholder="Or paste image URL"
                disabled={!!imageFile}
              />
              {imageFile && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => {
                    setImageFile(null);
                    setOriginalFileInfo(null);
                    setPreviewUrl(project?.thumbnail || '');
                    setThumbnail(project?.thumbnail || '');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {imageFile 
                ? '✓ Image will be uploaded as WebP after compression'
                : 'Upload an image to automatically compress and convert to WebP, or paste a URL'}
            </p>
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
        <Button 
          type="submit" 
          disabled={uploading || compressing}
        >
          {(uploading || compressing) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {uploading ? 'Uploading...' : compressing ? 'Processing...' : project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;