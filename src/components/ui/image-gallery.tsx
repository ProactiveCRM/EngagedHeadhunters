import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from './optimized-image';
import { Dialog, DialogContent } from './dialog';
import { Button } from './button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  webpSrc?: string;
  lqip?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'portrait';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  showCaptions?: boolean;
  className?: string;
}

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export const ImageGallery = ({
  images,
  columns = 3,
  gap = 'md',
  aspectRatio = 'square',
  rounded = 'lg',
  showCaptions = false,
  className,
}: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
    }
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
    }
  }, [selectedIndex, images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext, handleClose]);

  if (!images.length) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
      >
        {images.map((image, index) => (
          <div key={image.id} className="flex flex-col">
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              webpSrc={image.webpSrc}
              lqip={image.lqip}
              aspectRatio={aspectRatio}
              rounded={rounded}
              clickable
              onClick={() => setSelectedIndex(index)}
              className="transition-transform duration-200 group-hover:scale-105"
            />
            {showCaptions && image.caption && (
              <p className="mt-2 text-sm text-muted-foreground text-center line-clamp-2">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={handleClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          {/* Navigation - Previous */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {/* Navigation - Next */}
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Next image</span>
            </Button>
          )}

          {/* Main image */}
          {selectedImage && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[75vh] object-contain"
              />
              
              {/* Caption and counter */}
              <div className="mt-4 text-center">
                {selectedImage.caption && (
                  <p className="text-white text-lg mb-2">{selectedImage.caption}</p>
                )}
                <p className="text-white/60 text-sm">
                  {selectedIndex !== null ? selectedIndex + 1 : 0} of {images.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
