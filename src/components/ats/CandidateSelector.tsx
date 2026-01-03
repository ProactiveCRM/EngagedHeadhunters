import { useState, useMemo } from 'react';
import { Search, Users, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Candidate, CandidateStatus } from '@/lib/ats/types';

interface CandidateSelectorProps {
  candidates: Candidate[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  maxSelection?: number;
  className?: string;
}

const STATUS_COLORS: Record<CandidateStatus, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  screening: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  interviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  offered: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  hired: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function CandidateSelector({
  candidates,
  selectedIds,
  onSelectionChange,
  maxSelection = 4,
  className,
}: CandidateSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredCandidates = useMemo(() => {
    if (!search.trim()) return candidates;
    const query = search.toLowerCase();
    return candidates.filter(c =>
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(query) ||
      c.current_title?.toLowerCase().includes(query) ||
      c.current_company?.toLowerCase().includes(query) ||
      c.skills?.some(s => s.toLowerCase().includes(query))
    );
  }, [candidates, search]);

  const toggleCandidate = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < maxSelection) {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  const isMaxReached = selectedIds.length >= maxSelection;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with selection count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {selectedIds.length} of {maxSelection} selected
          </span>
        </div>
        {selectedIds.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidates..."
          className="pl-9"
        />
      </div>

      {/* Selected candidates pills */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIds.map(id => {
            const candidate = candidates.find(c => c.id === id);
            if (!candidate) return null;
            return (
              <Badge key={id} variant="secondary" className="gap-1 pr-1">
                {candidate.first_name} {candidate.last_name}
                <button
                  onClick={() => toggleCandidate(id)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Candidate list */}
      <ScrollArea className="h-[300px] border rounded-md">
        <div className="p-2 space-y-1">
          {filteredCandidates.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No candidates found
            </p>
          ) : (
            filteredCandidates.map(candidate => {
              const isSelected = selectedIds.includes(candidate.id);
              const isDisabled = !isSelected && isMaxReached;
              const initials = `${candidate.first_name?.[0] || ''}${candidate.last_name?.[0] || ''}`.toUpperCase();

              return (
                <button
                  key={candidate.id}
                  onClick={() => !isDisabled && toggleCandidate(candidate.id)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors",
                    isSelected && "bg-primary/10 border border-primary/20",
                    !isSelected && !isDisabled && "hover:bg-accent",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    className="pointer-events-none"
                  />
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {candidate.first_name} {candidate.last_name}
                    </p>
                    {candidate.current_title && (
                      <p className="text-xs text-muted-foreground truncate">
                        {candidate.current_title}
                        {candidate.current_company && ` at ${candidate.current_company}`}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] capitalize flex-shrink-0", STATUS_COLORS[candidate.status])}
                  >
                    {candidate.status}
                  </Badge>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>

      {isMaxReached && (
        <p className="text-xs text-muted-foreground text-center">
          Maximum {maxSelection} candidates can be compared at once
        </p>
      )}
    </div>
  );
}
