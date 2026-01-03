export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg';
}

export interface OptimizationResult {
  blob: Blob;
  wasOptimized: boolean;
  savings: number;
  originalSize: number;
  newSize: number;
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export async function optimizeImage(
  file: File,
  options: OptimizationOptions = {}
): Promise<OptimizationResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.85,
    format = 'webp'
  } = options;

  const originalSize = file.size;

  // Skip GIFs (potentially animated) and already-small files
  if (file.type === 'image/gif' || file.size < 100 * 1024) {
    return {
      blob: file,
      wasOptimized: false,
      savings: 0,
      originalSize,
      newSize: originalSize
    };
  }

  try {
    const img = await loadImage(file);
    
    let { naturalWidth: width, naturalHeight: height } = img;
    
    // Calculate new dimensions if needed
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    // Create canvas and draw image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    ctx.drawImage(img, 0, 0, width, height);

    // Try WebP first, fall back to JPEG if not supported
    const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
    
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to create blob'));
        },
        mimeType,
        quality
      );
    });

    // If WebP resulted in larger file, try JPEG
    if (format === 'webp' && blob.size > originalSize * 0.95) {
      const jpegBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to create JPEG blob'));
          },
          'image/jpeg',
          quality
        );
      });
      
      if (jpegBlob.size < blob.size) {
        const savings = Math.round((1 - jpegBlob.size / originalSize) * 100);
        return {
          blob: jpegBlob,
          wasOptimized: true,
          savings: Math.max(0, savings),
          originalSize,
          newSize: jpegBlob.size
        };
      }
    }

    const savings = Math.round((1 - blob.size / originalSize) * 100);
    
    return {
      blob,
      wasOptimized: true,
      savings: Math.max(0, savings),
      originalSize,
      newSize: blob.size
    };
  } catch (error) {
    console.error('Image optimization failed:', error);
    // Return original file if optimization fails
    return {
      blob: file,
      wasOptimized: false,
      savings: 0,
      originalSize,
      newSize: originalSize
    };
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Generate a Low-Quality Image Placeholder (LQIP) as a base64 data URL
 * Creates a tiny, blurry version of the image for progressive loading
 */
export async function generateLQIP(
  file: File,
  size: number = 20
): Promise<string> {
  try {
    const img = await loadImage(file);
    
    // Calculate aspect-ratio preserving dimensions
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const width = aspectRatio >= 1 ? size : Math.round(size * aspectRatio);
    const height = aspectRatio >= 1 ? Math.round(size / aspectRatio) : size;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Draw image at tiny size
    ctx.drawImage(img, 0, 0, width, height);

    // Return as base64 data URL
    return canvas.toDataURL('image/jpeg', 0.5);
  } catch (error) {
    console.error('LQIP generation failed:', error);
    return '';
  }
}

/**
 * Generate a placeholder data URL for a solid color
 * Useful as fallback when LQIP generation fails
 */
export function generateColorPlaceholder(
  color: string = '#e5e7eb',
  width: number = 1,
  height: number = 1
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/png');
}
