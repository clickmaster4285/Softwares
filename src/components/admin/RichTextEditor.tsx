'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const FONT_SIZE_OPTIONS = [
  { value: '1', label: '12px' },
  { value: '2', label: '14px' },
  { value: '3', label: '16px (Normal)' },
  { value: '4', label: '18px' },
  { value: '5', label: '20px' },
  { value: '6', label: '24px' },
  { value: '7', label: '30px' },
] as const;

function exec(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<'p' | 'h1' | 'h2' | 'h3' | 'blockquote'>('p');
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
  const [fontSize, setFontSize] = useState('3');

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const updateToolbarState = () => {
    const block = document.queryCommandValue('formatBlock')?.toString().toLowerCase() || '';
    if (block.includes('h1')) setCurrentBlock('h1');
    else if (block.includes('h2')) setCurrentBlock('h2');
    else if (block.includes('h3')) setCurrentBlock('h3');
    else if (block.includes('blockquote')) setCurrentBlock('blockquote');
    else setCurrentBlock('p');
  };

  useEffect(() => {
    const onSelectionChange = () => updateToolbarState();
    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, []);

  const handleLink = () => {
    const url = window.prompt('Enter URL');
    if (!url) return;
    exec('createLink', url);
    handleInput();
  };

  const handleImage = () => {
    const url = window.prompt('Enter image URL');
    if (!url) return;
    exec('insertImage', url);
    handleInput();
  };

  const handleImageFromDevice = async (file?: File) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await apiFetch('/api/projects/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) {
        alert('Image upload failed');
        return;
      }
      const data = (await res.json()) as { imageUrl?: string };
      if (!data.imageUrl) return;
      exec('insertImage', data.imageUrl);
      handleInput();
    } catch {
      alert('Image upload failed');
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-md border border-border/60 bg-muted/30 p-2">
        <Select
          value={currentBlock}
          onValueChange={(val: 'p' | 'h1' | 'h2' | 'h3' | 'blockquote') => {
            setCurrentBlock(val);
            if (val === 'p') exec('formatBlock', '<p>');
            else if (val === 'blockquote') exec('formatBlock', '<blockquote>');
            else exec('formatBlock', `<${val}>`);
            handleInput();
          }}
        >
          <SelectTrigger className="h-8 w-[150px] bg-background">
            <SelectValue placeholder="Text style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">Paragraph (Simple Text)</SelectItem>
            <SelectItem value="h1">Heading 1 (H1)</SelectItem>
            <SelectItem value="h2">Heading 2 (H2)</SelectItem>
            <SelectItem value="h3">Heading 3 (H3)</SelectItem>
            <SelectItem value="blockquote">Quote</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={fontFamily}
          onValueChange={(val) => {
            setFontFamily(val);
            exec('fontName', val);
            handleInput();
          }}
        >
          <SelectTrigger className="h-8 w-[150px] bg-background">
            <SelectValue placeholder="Font family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter, sans-serif">Inter</SelectItem>
            <SelectItem value="Arial, sans-serif">Arial</SelectItem>
            <SelectItem value="Georgia, serif">Georgia</SelectItem>
            <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
            <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={fontSize}
          onValueChange={(val) => {
            setFontSize(val);
            exec('fontSize', val);
            handleInput();
          }}
        >
          <SelectTrigger className="h-8 w-[120px] bg-background">
            <SelectValue placeholder="Text size" />
          </SelectTrigger>
          <SelectContent>
            {FONT_SIZE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('undo')}>
          <Undo2 className="mr-1 h-3.5 w-3.5" /> Undo
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('redo')}>
          <Redo2 className="mr-1 h-3.5 w-3.5" /> Redo
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('formatBlock', '<h1>')}>
          <Heading1 className="mr-1 h-3.5 w-3.5" /> H1
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('formatBlock', '<h2>')}>
          <Heading2 className="mr-1 h-3.5 w-3.5" /> H2
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('formatBlock', '<h3>')}>
          <Heading3 className="mr-1 h-3.5 w-3.5" /> H3
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('bold')}>
          <Bold className="mr-1 h-3.5 w-3.5" /> Bold
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('italic')}>
          <Italic className="mr-1 h-3.5 w-3.5" /> Italic
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('underline')}>
          <Underline className="mr-1 h-3.5 w-3.5" /> Underline
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('strikeThrough')}>
          <Strikethrough className="mr-1 h-3.5 w-3.5" /> Strike
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('justifyLeft')}>
          <AlignLeft className="mr-1 h-3.5 w-3.5" /> Left
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('justifyCenter')}>
          <AlignCenter className="mr-1 h-3.5 w-3.5" /> Center
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('justifyRight')}>
          <AlignRight className="mr-1 h-3.5 w-3.5" /> Right
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('justifyFull')}>
          <AlignJustify className="mr-1 h-3.5 w-3.5" /> Justify
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('insertUnorderedList')}>
          <List className="mr-1 h-3.5 w-3.5" /> Bullet
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('insertOrderedList')}>
          <ListOrdered className="mr-1 h-3.5 w-3.5" /> Numbered
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('formatBlock', '<blockquote>')}>
          <Quote className="mr-1 h-3.5 w-3.5" /> Quote
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleLink}>
          <LinkIcon className="mr-1 h-3.5 w-3.5" /> Link
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={handleImage}>
          <ImageIcon className="mr-1 h-3.5 w-3.5" /> Image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => imageInputRef.current?.click()}
          disabled={uploadingImage}
        >
          <ImageIcon className="mr-1 h-3.5 w-3.5" />
          {uploadingImage ? 'Uploading...' : 'Image (Device)'}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => exec('removeFormat')}>
          <Eraser className="mr-1 h-3.5 w-3.5" /> Clear
        </Button>
        <label className="flex items-center gap-1 rounded-md border border-input bg-background px-2 text-xs text-muted-foreground">
          Text
          <input
            type="color"
            defaultValue="#111827"
            className="h-6 w-8 cursor-pointer border-0 bg-transparent p-0"
            onChange={(e) => {
              exec('foreColor', e.target.value);
              handleInput();
            }}
            title="Text color"
          />
        </label>
        <label className="flex items-center gap-1 rounded-md border border-input bg-background px-2 text-xs text-muted-foreground">
          Bg
          <input
            type="color"
            defaultValue="#ffffff"
            className="h-6 w-8 cursor-pointer border-0 bg-transparent p-0"
            onChange={(e) => {
              exec('hiliteColor', e.target.value);
              handleInput();
            }}
            title="Background highlight"
          />
        </label>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => void handleImageFromDevice(e.target.files?.[0])}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[260px] max-h-[520px] overflow-y-auto rounded-md border border-input bg-background px-3 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        data-placeholder={placeholder || 'Write your blog content...'}
      />
      <p className="text-xs text-muted-foreground">
        Tip: use <strong>Paragraph</strong> for simple text and <strong>H1/H2/H3</strong> for headings.
      </p>
      <style jsx>{`
        div[contenteditable='true']:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
