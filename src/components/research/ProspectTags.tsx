import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Tag } from 'lucide-react';

interface ProspectTagsProps {
  tags: string[];
  allTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const ProspectTags = ({ tags, allTags, onAddTag, onRemoveTag }: ProspectTagsProps) => {
  const [newTag, setNewTag] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddTag = () => {
    const trimmed = newTag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onAddTag(trimmed);
      setNewTag('');
      setShowInput(false);
    }
  };

  const suggestedTags = allTags.filter(t => !tags.includes(t)).slice(0, 5);

  return (
    <div className="space-y-3">
      {/* Current Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <span className="text-sm text-muted-foreground">No tags</span>
        ) : (
          tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
              <button 
                onClick={() => onRemoveTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        )}
      </div>

      {/* Add Tag Input */}
      {showInput ? (
        <div className="flex gap-2">
          <Input 
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter tag name..."
            className="h-8"
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          />
          <Button size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
            Add
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
          <Plus className="h-3 w-3 mr-1" />
          Add Tag
        </Button>
      )}

      {/* Suggested Tags */}
      {suggestedTags.length > 0 && !showInput && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-1">
            {suggestedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => onAddTag(tag)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProspectTags;
