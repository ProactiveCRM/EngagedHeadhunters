import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  highlightTags?: string[];
  label?: string;
  disabled?: boolean;
  maxTags?: number;
  className?: string;
}

export function TagInput({
  value = [],
  onChange,
  suggestions = [],
  placeholder = 'Add...',
  highlightTags = [],
  label,
  disabled = false,
  maxTags,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.some(v => v.toLowerCase() === suggestion.toLowerCase())
  ).slice(0, 8);

  // Check if a tag is highlighted (matched)
  const isHighlighted = useCallback((tag: string) => {
    return highlightTags.some(h => 
      h.toLowerCase() === tag.toLowerCase() ||
      h.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(h.toLowerCase())
    );
  }, [highlightTags]);

  // Add a tag
  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (maxTags && value.length >= maxTags) return;
    if (value.some(v => v.toLowerCase() === trimmed.toLowerCase())) return;
    
    onChange([...value, trimmed]);
    setInputValue('');
    setSelectedIndex(0);
  }, [value, onChange, maxTags]);

  // Remove a tag
  const removeTag = useCallback((index: number) => {
    if (disabled) return;
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  }, [value, onChange, disabled]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (showSuggestions && filteredSuggestions[selectedIndex]) {
          addTag(filteredSuggestions[selectedIndex]);
        } else if (inputValue.trim()) {
          addTag(inputValue);
        }
        break;
      case ',':
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (showSuggestions) {
          setSelectedIndex(i => Math.min(i + 1, filteredSuggestions.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (showSuggestions) {
          setSelectedIndex(i => Math.max(i - 1, 0));
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      case 'Backspace':
        if (!inputValue && value.length > 0) {
          removeTag(value.length - 1);
        }
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [inputValue]);

  return (
    <div ref={containerRef} className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      
      <div className="relative">
        {/* Tags container */}
        <div
          className={cn(
            "flex flex-wrap gap-1.5 p-2 min-h-[42px] rounded-md border border-input bg-background",
            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {value.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant={isHighlighted(tag) ? "default" : "secondary"}
              className={cn(
                "gap-1 pr-1 text-xs",
                isHighlighted(tag) && "bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20"
              )}
            >
              {isHighlighted(tag) && <Check className="h-3 w-3" />}
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
          
          {(!maxTags || value.length < maxTags) && !disabled && (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder={value.length === 0 ? placeholder : ''}
              className="flex-1 min-w-[100px] h-6 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
              disabled={disabled}
            />
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md max-h-48 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors",
                  index === selectedIndex && "bg-accent"
                )}
                onClick={() => {
                  addTag(suggestion);
                  inputRef.current?.focus();
                }}
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-3 w-3 text-muted-foreground" />
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Create new tag option */}
        {showSuggestions && inputValue.trim() && !filteredSuggestions.includes(inputValue) && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-md">
            {filteredSuggestions.length > 0 && (
              <div className="border-t border-border" />
            )}
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
              onClick={() => {
                addTag(inputValue);
                inputRef.current?.focus();
              }}
            >
              <span className="flex items-center gap-2 text-primary">
                <Plus className="h-3 w-3" />
                Create "{inputValue.trim()}"
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
