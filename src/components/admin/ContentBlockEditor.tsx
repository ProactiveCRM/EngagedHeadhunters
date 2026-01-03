import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image, Type, Link2, FileText, Loader2, Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContentBlock } from '@/hooks/usePageContent';
import type { Json } from '@/integrations/supabase/types';

interface ContentBlockEditorProps {
  block: ContentBlock;
  onUpdate: (updates: { content_value?: string; content_metadata?: Json }) => Promise<void>;
  onDelete?: () => Promise<void>;
  className?: string;
}

export function ContentBlockEditor({ block, onUpdate, onDelete, className }: ContentBlockEditorProps) {
  const [value, setValue] = useState(block.content_value || '');
  const initialMetadata = (typeof block.content_metadata === 'object' && block.content_metadata !== null && !Array.isArray(block.content_metadata))
    ? block.content_metadata as Record<string, string>
    : {};
  const [metadata, setMetadata] = useState<Record<string, string>>(initialMetadata);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(block.content_value || '');
    const newMetadata = (typeof block.content_metadata === 'object' && block.content_metadata !== null && !Array.isArray(block.content_metadata))
      ? block.content_metadata as Record<string, string>
      : {};
    setMetadata(newMetadata);
  }, [block]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate({
        content_value: value,
        content_metadata: metadata as Json,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMetadataChange = (key: string, val: string) => {
    setMetadata((prev) => ({ ...prev, [key]: val }));
  };

  const getTypeIcon = () => {
    switch (block.content_type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'cta':
        return <Link2 className="h-4 w-4" />;
      case 'richtext':
        return <FileText className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const renderEditor = () => {
    switch (block.content_type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor={`content-${block.id}`}>Content</Label>
            <Input
              id={`content-${block.id}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter text..."
            />
            <p className="text-xs text-muted-foreground">{value.length} characters</p>
          </div>
        );

      case 'richtext':
        return (
          <div className="space-y-2">
            <Label htmlFor={`content-${block.id}`}>Content</Label>
            <Textarea
              id={`content-${block.id}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter rich text content..."
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">Supports HTML formatting</p>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`image-url-${block.id}`}>Image URL</Label>
              <Input
                id={`image-url-${block.id}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`image-alt-${block.id}`}>Alt Text</Label>
              <Input
                id={`image-alt-${block.id}`}
                value={(metadata.alt as string) || ''}
                onChange={(e) => handleMetadataChange('alt', e.target.value)}
                placeholder="Describe the image for accessibility..."
              />
            </div>
            {value && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                <img
                  src={value}
                  alt={(metadata.alt as string) || 'Preview'}
                  className="max-w-[200px] max-h-[150px] object-cover rounded border"
                />
              </div>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`cta-text-${block.id}`}>Button Text</Label>
              <Input
                id={`cta-text-${block.id}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Click Here"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cta-url-${block.id}`}>Button URL</Label>
              <Input
                id={`cta-url-${block.id}`}
                value={(metadata.url as string) || ''}
                onChange={(e) => handleMetadataChange('url', e.target.value)}
                placeholder="/contact or https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cta-variant-${block.id}`}>Style Variant</Label>
              <select
                id={`cta-variant-${block.id}`}
                value={(metadata.variant as string) || 'default'}
                onChange={(e) => handleMetadataChange('variant', e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="default">Default (Primary)</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={`content-${block.id}`}>Content</Label>
            <Textarea
              id={`content-${block.id}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter content..."
              rows={4}
            />
          </div>
        );
    }
  };

  return (
    <Card className={cn('relative', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <CardTitle className="text-base">{block.content_key.replace(/_/g, ' ')}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {block.content_type}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Section: {block.section_id}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderEditor()}
        
        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="sm"
            className="min-w-[80px]"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Saved
              </>
            ) : (
              'Save'
            )}
          </Button>
          
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ContentBlockEditor;
