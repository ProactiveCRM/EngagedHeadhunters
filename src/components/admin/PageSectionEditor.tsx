import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ContentBlockEditor } from './ContentBlockEditor';
import { AddContentBlockDialog } from './AddContentBlockDialog';
import type { ContentBlock } from '@/hooks/usePageContent';
import { cn } from '@/lib/utils';

interface PageSectionEditorProps {
  sectionId: string;
  blocks: ContentBlock[];
  pageSlug: string;
  onUpdateBlock: (id: string, updates: Partial<ContentBlock>) => Promise<void>;
  onDeleteBlock: (id: string) => Promise<void>;
  onCreateBlock: (block: Omit<ContentBlock, 'id' | 'updated_at'>) => Promise<void>;
  defaultOpen?: boolean;
  className?: string;
}

export function PageSectionEditor({
  sectionId,
  blocks,
  pageSlug,
  onUpdateBlock,
  onDeleteBlock,
  onCreateBlock,
  defaultOpen = true,
  className,
}: PageSectionEditorProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const formatSectionName = (id: string) => {
    return id
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-3 bg-muted/50">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{formatSectionName(sectionId)}</CardTitle>
              <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                {blocks.length} item{blocks.length !== 1 ? 's' : ''}
              </span>
            </div>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-muted-foreground transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-4 space-y-4">
            {blocks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No content blocks in this section yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {blocks.map((block) => (
                  <ContentBlockEditor
                    key={block.id}
                    block={block}
                    onUpdate={(updates) => onUpdateBlock(block.id, updates)}
                    onDelete={() => onDeleteBlock(block.id)}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddDialog(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Content Block
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

      <AddContentBlockDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        pageSlug={pageSlug}
        sectionId={sectionId}
        onAdd={onCreateBlock}
        existingKeys={blocks.map((b) => b.content_key)}
      />
    </Card>
  );
}

export default PageSectionEditor;
