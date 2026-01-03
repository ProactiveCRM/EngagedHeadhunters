import { useState, useRef } from 'react';
import { Upload, User, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AvatarUploadProps {
  currentUrl?: string | null;
  userId: string;
  onUpload: (url: string) => void;
}

const AvatarUpload = ({ currentUrl, userId, onUpload }: AvatarUploadProps) => {
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

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image under 5MB',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/avatar.${fileExt}`;

      // Delete existing avatar if present
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
        title: 'Photo uploaded!',
        description: 'Your profile photo has been updated'
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
      const avatarFile = files.data?.find(f => f.name.startsWith('avatar'));
      if (avatarFile) {
        await supabase.storage.from('profile-images').remove([`${userId}/${avatarFile.name}`]);
      }
      onUpload('');
      toast({ title: 'Photo removed' });
    } catch (error) {
      console.error('Remove error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group transition-all ${
          isDragging ? 'ring-4 ring-primary ring-offset-2' : 'ring-2 ring-border'
        }`}
      >
        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-destructive-foreground" />
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${
          isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-white" />
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground text-center">
        Click or drag to upload<br />
        JPG, PNG or WebP (max 5MB)
      </p>
    </div>
  );
};

export default AvatarUpload;
