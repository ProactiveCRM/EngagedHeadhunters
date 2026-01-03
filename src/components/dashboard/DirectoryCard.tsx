import {   } from 'next/navigation';
import Link from 'next/link';
import { Star, Eye, EyeOff, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DirectoryCardProps {
  listing: {
    id: string;
    listing_title: string | null;
    listing_description: string | null;
    is_featured: boolean;
    is_visible: boolean;
    target_market: string;
    niche: string;
    profile: {
      id: string;
      full_name: string | null;
      username: string;
      avatar_url: string | null;
      title: string | null;
      location: string | null;
    };
  };
  onToggleVisibility: (id: string, visible: boolean) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onDelete: (id: string) => void;
}

export function DirectoryCard({ 
  listing, 
  onToggleVisibility, 
  onToggleFeatured,
  onDelete 
}: DirectoryCardProps) {
  const { profile } = listing;

  return (
    <div className={cn(
      "bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow",
      listing.is_featured && "ring-2 ring-primary/20 border-primary/30"
    )}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || profile.username} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {(profile.full_name || profile.username).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {profile.full_name || profile.username}
            </h3>
            {listing.is_featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {listing.listing_title || profile.title || 'No title'}
          </p>
          {profile.location && (
            <p className="text-xs text-muted-foreground mt-1">{profile.location}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {listing.target_market}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {listing.niche}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Visibility Toggle */}
          <div className="flex items-center gap-1">
            {listing.is_visible ? (
              <Eye className="h-4 w-4 text-green-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
            <Switch
              checked={listing.is_visible}
              onCheckedChange={(checked) => onToggleVisibility(listing.id, checked)}
              className="data-[state=checked]:bg-green-600"
            />
          </div>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/directory/${listing.id}`} className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Listing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleFeatured(listing.id, !listing.is_featured)}
                className="gap-2"
              >
                <Star className={cn("h-4 w-4", listing.is_featured && "fill-yellow-500 text-yellow-500")} />
                {listing.is_featured ? 'Unfeature' : 'Feature'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(listing.id)}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default DirectoryCard;
