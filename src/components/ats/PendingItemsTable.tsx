import { useState } from 'react';
import {   } from 'next/navigation';
import Link from 'next/link';
import { SyncStatusBadge } from '@/components/dashboard/SyncStatusBadge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BulkSyncButton } from './BulkSyncButton';
import { ExternalLink } from 'lucide-react';
import type { Candidate, JobOrder, Placement } from '@/lib/ats/types';

type EntityType = 'candidates' | 'job_orders' | 'placements';

interface PendingItemsTableProps {
  entityType: EntityType;
  items: (Candidate | JobOrder | Placement)[];
  limit?: number;
  showViewAll?: boolean;
  onSyncComplete?: () => void;
}

export function PendingItemsTable({
  entityType,
  items,
  limit = 5,
  showViewAll = true,
  onSyncComplete,
}: PendingItemsTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const displayItems = limit ? items.slice(0, limit) : items;
  const hasMore = items.length > (limit || 0);

  const viewAllLinks = {
    candidates: '/agent/candidates',
    job_orders: '/agent/job-orders',
    placements: '/agent/placements',
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === displayItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayItems.map(item => item.id));
    }
  };

  const selectedItems = displayItems.filter(item => selectedIds.includes(item.id));

  const renderRow = (item: Candidate | JobOrder | Placement) => {
    switch (entityType) {
      case 'candidates': {
        const candidate = item as Candidate;
        return (
          <>
            <TableCell>
              <div className="font-medium">
                {candidate.first_name} {candidate.last_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {candidate.current_title || 'No title'}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {candidate.current_company || '-'}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{candidate.status}</Badge>
            </TableCell>
          </>
        );
      }
      case 'job_orders': {
        const job = item as JobOrder;
        return (
          <>
            <TableCell>
              <div className="font-medium">{job.job_title}</div>
              <div className="text-sm text-muted-foreground">
                {job.client_company}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {job.location || '-'}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{job.status}</Badge>
            </TableCell>
          </>
        );
      }
      case 'placements': {
        const placement = item as Placement;
        return (
          <>
            <TableCell>
              <div className="font-medium">{placement.candidate_name}</div>
              <div className="text-sm text-muted-foreground">
                {placement.job_title}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {placement.client_company}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{placement.fee_status}</Badge>
            </TableCell>
          </>
        );
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No pending items to sync
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedIds.length} selected
          </span>
          <BulkSyncButton
            entityType={entityType}
            pendingItems={selectedItems}
            onComplete={() => {
              setSelectedIds([]);
              onSyncComplete?.();
            }}
            size="sm"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds([])}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedIds.length === displayItems.length && displayItems.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">
              {entityType === 'candidates' ? 'Company' : entityType === 'job_orders' ? 'Location' : 'Client'}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Sync</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => toggleSelect(item.id)}
                />
              </TableCell>
              {renderRow(item)}
              <TableCell>
                <SyncStatusBadge
                  status="pending"
                  compact
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View All Link */}
      {showViewAll && hasMore && (
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={viewAllLinks[entityType]} className="flex items-center gap-1">
              View all {items.length} pending items
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
