import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, ImageOff, CheckSquare, Square } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface MediaLibraryProps {
  userId: string;
  onSelect: (url: string) => void;
}

interface StorageFile {
  name: string;
  id: string | null;
  created_at: string | null;
  metadata: Record<string, any> | null;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ userId, onSelect }) => {
  const [images, setImages] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const { toast } = useToast();

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list(userId, {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      // Filter only image files
      const imageFiles = (data || []).filter(file => 
        file.metadata?.mimetype?.startsWith('image/') || 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
      );
      
      setImages(imageFiles);
    } catch (error: any) {
      toast({
        title: "Failed to load images",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(`${userId}/${fileName}`);
    return data.publicUrl;
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setDeleting(true);
    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([`${userId}/${deleteTarget}`]);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.name !== deleteTarget));
      toast({
        title: "Image deleted",
        description: "The image has been removed from your library",
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.size === 0) return;
    
    setBulkDeleting(true);
    try {
      const filesToDelete = Array.from(selectedImages).map(name => `${userId}/${name}`);
      
      const { error } = await supabase.storage
        .from('blog-images')
        .remove(filesToDelete);

      if (error) throw error;

      setImages(prev => prev.filter(img => !selectedImages.has(img.name)));
      toast({
        title: "Images deleted",
        description: `${selectedImages.size} image(s) removed from your library`,
      });
      setSelectedImages(new Set());
      setSelectionMode(false);
    } catch (error: any) {
      toast({
        title: "Bulk delete failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setBulkDeleting(false);
      setBulkDeleteOpen(false);
    }
  };

  const toggleImageSelection = (imageName: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageName)) {
        newSet.delete(imageName);
      } else {
        newSet.add(imageName);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedImages(new Set(images.map(img => img.name)));
  };

  const deselectAll = () => {
    setSelectedImages(new Set());
  };

  const toggleSelectionMode = () => {
    if (selectionMode) {
      setSelectedImages(new Set());
    }
    setSelectionMode(!selectionMode);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ImageOff className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm font-medium text-muted-foreground">No images yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Upload images to see them here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Selection Controls Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
        <Button
          variant={selectionMode ? "secondary" : "outline"}
          size="sm"
          onClick={toggleSelectionMode}
          className="h-8"
        >
          {selectionMode ? <CheckSquare className="h-4 w-4 mr-1" /> : <Square className="h-4 w-4 mr-1" />}
          {selectionMode ? "Cancel" : "Select"}
        </Button>
        
        {selectionMode && (
          <div className="flex items-center gap-2">
            {selectedImages.size > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedImages.size} selected
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={selectedImages.size === images.length ? deselectAll : selectAll}
              className="h-8"
            >
              {selectedImages.size === images.length ? "Deselect All" : "Select All"}
            </Button>
            {selectedImages.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setBulkDeleteOpen(true)}
                className="h-8"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete ({selectedImages.size})
              </Button>
            )}
          </div>
        )}
      </div>

      <ScrollArea className="h-[260px]">
        <div className="grid grid-cols-3 gap-3 pr-4">
          {images.map((image) => {
            const isSelected = selectedImages.has(image.name);
            return (
              <div
                key={image.id || image.name}
                className={`group relative aspect-square rounded-lg overflow-hidden border bg-muted cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-border hover:ring-2 hover:ring-primary'
                }`}
                onClick={() => {
                  if (selectionMode) {
                    toggleImageSelection(image.name);
                  } else {
                    onSelect(getPublicUrl(image.name));
                  }
                }}
              >
                <img
                  src={getPublicUrl(image.name)}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 transition-colors ${
                  isSelected ? 'bg-primary/20' : 'bg-black/0 group-hover:bg-black/40'
                }`} />
                
                {/* Selection checkbox */}
                {selectionMode && (
                  <div className="absolute top-1 left-1">
                    <Checkbox
                      checked={isSelected}
                      className="h-5 w-5 bg-background border-2"
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleImageSelection(image.name)}
                    />
                  </div>
                )}
                
                {/* Individual delete button - only show when not in selection mode */}
                {!selectionMode && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(image.name);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white truncate">{image.name}</p>
                  <p className="text-[9px] text-white/70">{formatDate(image.created_at)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Single delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the image from your library. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirmation */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedImages.size} Images?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedImages.size} image(s) from your library. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {bulkDeleting ? "Deleting..." : `Delete ${selectedImages.size} Images`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaLibrary;