import { useState, useMemo } from 'react';
import { ArrowUpDown, Check, X, AlertTriangle, ExternalLink, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PageAuditResult } from '@/hooks/useSEOAudit';

type SortField = 'label' | 'score' | 'titleLength' | 'descriptionLength';
type SortDirection = 'asc' | 'desc';
type FilterStatus = 'all' | 'critical' | 'warning' | 'good';

interface SEOPageTableProps {
  pages: PageAuditResult[];
  onEditPage: (slug: string) => void;
}

export function SEOPageTable({ pages, onEditPage }: SEOPageTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const categories = useMemo(() => {
    const cats = new Set(pages.map(p => p.page.category));
    return ['all', ...Array.from(cats)];
  }, [pages]);
  
  const filteredAndSortedPages = useMemo(() => {
    let result = [...pages];
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        p.page.label.toLowerCase().includes(searchLower) ||
        p.page.slug.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(p => {
        if (filterStatus === 'critical') return p.score < 50;
        if (filterStatus === 'warning') return p.score >= 50 && p.score < 80;
        if (filterStatus === 'good') return p.score >= 80;
        return true;
      });
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(p => p.page.category === filterCategory);
    }
    
    // Sort
    result.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      
      switch (sortField) {
        case 'label':
          aVal = a.page.label;
          bVal = b.page.label;
          break;
        case 'score':
          aVal = a.score;
          bVal = b.score;
          break;
        case 'titleLength':
          aVal = a.titleLength;
          bVal = b.titleLength;
          break;
        case 'descriptionLength':
          aVal = a.descriptionLength;
          bVal = b.descriptionLength;
          break;
        default:
          aVal = a.score;
          bVal = b.score;
      }
      
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
    });
    
    return result;
  }, [pages, search, filterStatus, filterCategory, sortField, sortDirection]);
  
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">{score}</Badge>;
    }
    if (score >= 50) {
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">{score}</Badge>;
    }
    return <Badge variant="destructive">{score}</Badge>;
  };
  
  const StatusIcon = ({ has, warning }: { has: boolean; warning?: boolean }) => {
    if (has && !warning) return <Check className="h-4 w-4 text-green-500" />;
    if (warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <X className="h-4 w-4 text-destructive" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
          <SelectTrigger className="sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="critical">Critical (&lt;50)</SelectItem>
            <SelectItem value="warning">Warning (50-79)</SelectItem>
            <SelectItem value="good">Good (80+)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="sm:w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => toggleSort('label')}
              >
                <div className="flex items-center gap-1">
                  Page
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 text-center"
                onClick={() => toggleSort('score')}
              >
                <div className="flex items-center justify-center gap-1">
                  Score
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Desc</TableHead>
              <TableHead className="text-center">OG Image</TableHead>
              <TableHead className="text-center">Keywords</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPages.map((page) => (
              <TableRow key={page.page.slug} className={cn(
                page.score < 50 && "bg-destructive/5"
              )}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{page.page.label}</span>
                    <span className="text-xs text-muted-foreground">{page.page.path}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getScoreBadge(page.score)}</TableCell>
                <TableCell className="text-center">
                  <StatusIcon 
                    has={page.hasTitle} 
                    warning={page.titleLength > 60 || (page.hasTitle && page.titleLength < 30)} 
                  />
                </TableCell>
                <TableCell className="text-center">
                  <StatusIcon 
                    has={page.hasDescription} 
                    warning={page.descriptionLength > 160 || (page.hasDescription && page.descriptionLength < 120)} 
                  />
                </TableCell>
                <TableCell className="text-center">
                  <StatusIcon has={page.hasOGImage} />
                </TableCell>
                <TableCell className="text-center">
                  {page.hasKeywords ? (
                    <Badge variant="secondary">{page.seoData?.keywords?.length || 0}</Badge>
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditPage(page.page.slug)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                    >
                      <a href={page.page.path} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredAndSortedPages.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No pages found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedPages.length} of {pages.length} pages
      </div>
    </div>
  );
}
