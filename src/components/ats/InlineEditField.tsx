import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Pencil, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineEditFieldProps {
  value: string;
  label: string;
  type?: 'text' | 'email' | 'phone' | 'url' | 'textarea' | 'select' | 'number';
  options?: { value: string; label: string }[];
  onSave: (newValue: string) => Promise<void>;
  icon?: React.ReactNode;
  placeholder?: string;
  validation?: (value: string) => string | null;
  className?: string;
}

export function InlineEditField({
  value,
  label,
  type = 'text',
  options,
  onSave,
  icon,
  placeholder,
  validation,
  className,
}: InlineEditFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = useCallback(async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    if (validation) {
      const validationError = validation(editValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    setIsLoading(true);

    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsLoading(false);
    }
  }, [editValue, value, validation, onSave]);

  const handleCancel = () => {
    setEditValue(value);
    setError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Display mode
  if (!isEditing) {
    return (
      <div
        className={cn(
          "group flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer",
          className
        )}
        onClick={() => setIsEditing(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(true)}
      >
        {icon && (
          <span className="text-muted-foreground flex-shrink-0">
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className={cn(
            "text-sm truncate",
            value ? "text-muted-foreground" : "text-muted-foreground/50 italic"
          )}>
            {value || placeholder || 'Not set'}
          </p>
        </div>
        <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>
    );
  }

  // Edit mode
  return (
    <div className={cn("p-3 rounded-lg border bg-muted/30", className)}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-sm font-medium">{label}</span>
      </div>

      {type === 'textarea' ? (
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[100px] resize-none"
          disabled={isLoading}
        />
      ) : type === 'select' && options ? (
        <Select
          value={editValue}
          onValueChange={(val) => {
            setEditValue(val);
          }}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type === 'number' ? 'number' : type === 'email' ? 'email' : type === 'url' ? 'url' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
        />
      )}

      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}

      <div className="flex items-center gap-2 mt-2">
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          <span className="ml-1">Save</span>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
          <span className="ml-1">Cancel</span>
        </Button>
      </div>
    </div>
  );
}
