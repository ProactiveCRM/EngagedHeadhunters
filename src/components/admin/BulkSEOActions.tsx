import { Download, RefreshCw, Sparkles, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface BulkSEOActionsProps {
  onSeedMissing: () => Promise<void>;
  onBulkUpdate: () => Promise<void>;
  onExport: () => void;
  onRefresh: () => void;
  isUpdating: boolean;
  missingCount: number;
  configuredCount: number;
}

export function BulkSEOActions({
  onSeedMissing,
  onBulkUpdate,
  onExport,
  onRefresh,
  isUpdating,
  missingCount,
  configuredCount,
}: BulkSEOActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            disabled={missingCount === 0 || isUpdating}
            className="gap-2"
          >
            <Database className="h-4 w-4" />
            Seed Missing Pages ({missingCount})
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Seed Missing Pages?</AlertDialogTitle>
            <AlertDialogDescription>
              This will create SEO entries for {missingCount} pages that don't have any SEO data yet. 
              Default titles will be generated based on page names. You can edit them afterwards.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSeedMissing}>
              Seed Pages
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            disabled={configuredCount === 0 || isUpdating}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Auto-Generate from Config
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Auto-Generate SEO Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update SEO entries using predefined data from your seoConfig.ts file. 
              Existing custom data may be overwritten for pages that have config definitions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onBulkUpdate}>
              Generate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Button 
        variant="outline" 
        onClick={onExport}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export Report
      </Button>
      
      <Button 
        variant="ghost" 
        onClick={onRefresh}
        disabled={isUpdating}
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
}
