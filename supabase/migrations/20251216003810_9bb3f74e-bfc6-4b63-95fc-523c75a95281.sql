-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- RLS Policy: Allow authenticated users to upload to their folder
CREATE POLICY "Users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS Policy: Allow authenticated users to update their images
CREATE POLICY "Users can update their blog images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'blog-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS Policy: Allow authenticated users to delete their images
CREATE POLICY "Users can delete their blog images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS Policy: Public read access
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Fix delete_old_submissions function search path (security fix)
CREATE OR REPLACE FUNCTION public.delete_old_submissions()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  DELETE FROM public.contact_submissions
  WHERE expires_at < now();
END;
$function$;