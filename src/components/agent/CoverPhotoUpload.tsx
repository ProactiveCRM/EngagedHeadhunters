import { useState, useRef } from 'react';
import { Upload, ImageIcon, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CoverPhotoUploadProps {
  currentUrl?: string | null;
  userId: string;
  onUpload: (url: string) => void;
}

const CoverPhotoUpload = ({ currentUrl, userId, onUpload }: CoverPhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPG, PNG, or WebP)',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image under 10MB',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/cover.${fileExt}`;

      // Delete existing cover if present
      await supabase.storage.from('profile-images').remove([filePath]);

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Add timestamp to bust cache
      onUpload(`${publicUrl}?t=${Date.now()}`);

      toast({
        title: 'Cover photo uploaded!',
        description: 'Your cover photo has been updated'
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your photo. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => fileInputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const files = await supabase.storage.from('profile-images').list(userId);
      const coverFile = files.data?.find(f => f.name.startsWith('cover'));
      if (coverFile) {
        await supabase.storage.from('profile-images').remove([`${userId}/${coverFile.name}`]);
      }
      onUpload('');
      toast({ title: 'Cover photo removed' });
    } catch (error) {
      console.error('Remove error:', error);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative w-full h-48 rounded-xl overflow-hidden cursor-pointer group transition-all ${
        isDragging ? 'ring-4 ring-primary ring-offset-2' : ''
      }`}
    >
      {currentUrl ? (
        <>
          <img
            src={currentUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-destructive-foreground" />
          </button>
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Add a cover photo</p>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center transition-opacity ${
        isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {isUploading ? (
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        ) : (
          <>
            <Upload className="w-10 h-10 text-white mb-2" />
            <p className="text-sm text-white">Click or drag to upload</p>
            <p className="text-xs text-white/70">Recommended: 1584 x 396px</p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default CoverPhotoUpload;
