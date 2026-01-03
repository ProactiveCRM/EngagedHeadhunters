import { useState } from 'react';
import { ChevronDown, ChevronRight, AlertCircle, AlertTriangle, Info, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PageAuditResult } from '@/hooks/useSEOAudit';

interface IssueCategory {
  title: string;
  type: 'critical' | 'warning' | 'info';
  pages: PageAuditResult[];
  onFix?: (pages: PageAuditResult[]) => void;
  fixLabel?: string;
}

interface SEOIssuesListProps {
  categories: IssueCategory[];
  onEditPage: (slug: string) => void;
}

export function SEOIssuesList({ categories, onEditPage }: SEOIssuesListProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  
  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };
  
  const getIcon = (type: 'critical' | 'warning' | 'info') => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  const getBadgeVariant = (type: 'critical' | 'warning' | 'info') => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'outline';
    }
  };
  
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Collapsible
          key={category.title}
          open={openCategories.includes(category.title)}
          onOpenChange={() => toggleCategory(category.title)}
        >
          <div className={cn(
            "rounded-lg border p-3 transition-colors",
            category.pages.length === 0 && "opacity-50"
          )}>
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-3 flex-1 text-left">
                {openCategories.includes(category.title) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {getIcon(category.type)}
                <span className="font-medium">{category.title}</span>
                <Badge variant={getBadgeVariant(category.type) as any}>
                  {category.pages.length} {category.pages.length === 1 ? 'page' : 'pages'}
                </Badge>
              </CollapsibleTrigger>
              
              {category.onFix && category.pages.length > 0 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    category.onFix?.(category.pages);
                  }}
                  className="gap-1"
                >
                  <Wrench className="h-3 w-3" />
                  {category.fixLabel || 'Fix All'}
                </Button>
              )}
            </div>
            
            <CollapsibleContent>
              <div className="mt-3 space-y-2 pl-7">
                {category.pages.map((page) => (
                  <div 
                    key={page.page.slug}
                    className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-muted/50"
                  >
                    <span className="text-muted-foreground">{page.page.label}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditPage(page.page.slug)}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
