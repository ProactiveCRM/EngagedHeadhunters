"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

type AspectRatio = 'square' | '16/9' | '4/3' | '3/2' | 'portrait' | 'auto';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: AspectRatio;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  onLoad?: () => void;
  onError?: () => void;
  /** Low-quality image placeholder (base64 or URL) */
  lqip?: string;
  /** WebP version of the image for better compression */
  webpSrc?: string;
  /** Fallback source if main image fails */
  fallbackSrc?: string;
  /** Make image clickable (for lightbox integration) */
  clickable?: boolean;
  /** Click handler for lightbox */
  onClick?: () => void;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  'square': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  'portrait': 'aspect-[3/4]',
  'auto': '',
};

const roundedClasses: Record<string, string> = {
  'none': 'rounded-none',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  '2xl': 'rounded-2xl',
  'full': 'rounded-full',
};

const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  containerClassName,
  priority = false,
  aspectRatio = 'auto',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  objectFit = 'cover',
  rounded = 'none',
  onLoad,
  onError,
  lqip,
  webpSrc,
  fallbackSrc,
  clickable = false,
  onClick,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setHasError(true);
    } else {
      setHasError(true);
      setIsLoaded(true);
      onError?.();
    }
  };

  const objectFitClass = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none',
  }[objectFit];

  const imageClasses = cn(
    "w-full h-full transition-all duration-500",
    objectFitClass,
    roundedClasses[rounded],
    isLoaded 
      ? "opacity-100 blur-0 scale-100" 
      : "opacity-0 blur-sm scale-105",
    className
  );

  const renderImage = () => {
    const imgSrc = hasError && fallbackSrc ? fallbackSrc : src;
    
    // Use picture element for WebP support
    if (webpSrc && !hasError) {
      return (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <source srcSet={imgSrc} type="image/jpeg" />
          <img
            src={imgSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onLoad={handleLoad}
            onError={handleError}
            sizes={sizes}
            className={imageClasses}
          />
        </picture>
      );
    }

    return (
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
        className={imageClasses}
      />
    );
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        roundedClasses[rounded],
        clickable && "cursor-pointer group",
        containerClassName
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      {/* LQIP placeholder - blurred and scaled */}
      {lqip && !isLoaded && !hasError && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          className={cn(
            "absolute inset-0 w-full h-full blur-xl scale-110 transition-opacity duration-300",
            objectFitClass,
            isLoaded ? "opacity-0" : "opacity-100"
          )}
        />
      )}

      {/* Skeleton placeholder (when no LQIP) */}
      {!lqip && !isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Error state */}
      {hasError && !fallbackSrc ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <ImageOff className="w-8 h-8 text-muted-foreground" />
        </div>
      ) : (
        renderImage()
      )}

      {/* Hover overlay for clickable images */}
      {clickable && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      )}
    </div>
  );
};

// Export as both names for backward compatibility
export { OptimizedImage, OptimizedImage as ResponsiveHeroImage };
