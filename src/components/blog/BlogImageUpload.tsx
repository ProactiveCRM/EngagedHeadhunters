import React, { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, FolderOpen, Link as LinkIcon } from 'lucide-react';
import MediaLibrary from './MediaLibrary';
import { optimizeImage, formatFileSize } from '@/lib/imageOptimization';

interface BlogImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  userId: string;
  label?: string;
  aspectRatio?: string;
}

type UploadMode = 'upload' | 'library' | 'url';

const BlogImageUpload: React.FC<BlogImageUploadProps> = ({
  value,
  onChange,
  userId,
  label = "Featured Image",
  aspectRatio = "16/9"
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState<UploadMode>('upload');
  const { toast } = useToast();

  const handleUpload = useCallback(async (file: File) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, WebP, or GIF image",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image under 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadStatus('Optimizing...');
    
    try {
      // Optimize image before upload
      const { blob, wasOptimized, savings, originalSize, newSize } = await optimizeImage(file);
      
      setUploadStatus('Uploading...');
      
      const timestamp = Date.now();
      // Use appropriate extension based on optimized format
      const fileExt = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/jpeg' ? 'jpg' : file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      
      const description = wasOptimized && savings > 0
        ? `Optimized: ${formatFileSize(originalSize)} → ${formatFileSize(newSize)} (${savings}% saved)`
        : "Your image has been uploaded successfully";
      
      toast({
        title: "Image uploaded",
        description,
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadStatus('');
    }
  }, [userId, onChange, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, [handleUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  }, [handleUpload]);

  const handleRemove = useCallback(() => {
    onChange('');
  }, [onChange]);

  if (value) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img
            src={value}
            alt="Featured"
            className="w-full object-cover"
            style={{ aspectRatio }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      
      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'upload' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('library')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'library' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FolderOpen className="h-3.5 w-3.5" />
          Library
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'url' 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <LinkIcon className="h-3.5 w-3.5" />
          URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                <p className="text-sm text-muted-foreground">{uploadStatus || 'Processing...'}</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">Click or drag to upload</p>
                <p className="text-xs text-muted-foreground">
                  Recommended: 1200 x 630px (JPG, PNG, WebP, GIF)
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Library Mode */}
      {mode === 'library' && (
        <div className="border border-border rounded-lg p-3">
          <MediaLibrary userId={userId} onSelect={onChange} />
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <Input
          placeholder="https://example.com/image.jpg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default BlogImageUpload;