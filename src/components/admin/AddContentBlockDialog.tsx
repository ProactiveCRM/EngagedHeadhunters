import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { ContentBlock } from '@/hooks/usePageContent';

interface AddContentBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageSlug: string;
  sectionId: string;
  onAdd: (block: Omit<ContentBlock, 'id' | 'updated_at'>) => Promise<void>;
  existingKeys: string[];
}

export function AddContentBlockDialog({
  open,
  onOpenChange,
  pageSlug,
  sectionId,
  onAdd,
  existingKeys,
}: AddContentBlockDialogProps) {
  const [contentKey, setContentKey] = useState('');
  const [contentType, setContentType] = useState('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const key = contentKey.toLowerCase().replace(/\s+/g, '_');

    if (!key) {
      setError('Please enter a content key');
      return;
    }

    if (existingKeys.includes(key)) {
      setError('This key already exists in this section');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        page_slug: pageSlug,
        section_id: sectionId,
        content_key: key,
        content_type: contentType,
        content_value: '',
        content_metadata: {},
        display_order: existingKeys.length,
        is_active: true,
      });
      setContentKey('');
      setContentType('text');
      onOpenChange(false);
    } catch (err) {
      setError('Failed to create content block');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Content Block</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-key">Content Key</Label>
            <Input
              id="content-key"
              value={contentKey}
              onChange={(e) => setContentKey(e.target.value)}
              placeholder="e.g., headline, description, button_text"
            />
            <p className="text-xs text-muted-foreground">
              Use underscores for spaces. This will be the identifier for this content.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text (single line)</SelectItem>
                <SelectItem value="richtext">Rich Text (multi-line)</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="cta">CTA Button</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Block
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddContentBlockDialog;
