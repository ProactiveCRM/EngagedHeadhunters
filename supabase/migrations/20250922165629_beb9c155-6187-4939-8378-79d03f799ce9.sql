-- Extend profiles table for agent-specific fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user',
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS niche text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS specialties text[],
ADD COLUMN IF NOT EXISTS rating decimal(2,1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS placements_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS availability_status text DEFAULT 'available',
ADD COLUMN IF NOT EXISTS calendly_url text,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS bio text;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  featured boolean DEFAULT false,
  published boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  slug text UNIQUE
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Authors can view their own posts" 
ON public.blog_posts 
FOR SELECT 
USING (author_id = auth.uid());

CREATE POLICY "Authors can create posts" 
ON public.blog_posts 
FOR INSERT 
WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update their own posts" 
ON public.blog_posts 
FOR UPDATE 
USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their own posts" 
ON public.blog_posts 
FOR DELETE 
USING (author_id = auth.uid());

CREATE POLICY "Everyone can view published posts" 
ON public.blog_posts 
FOR SELECT 
USING (published = true);

-- Create policies for profiles to allow agents to update their own profiles
CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (id = auth.uid());

-- Add trigger for blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate blog post slugs
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(trim(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g')));
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-generate slugs
CREATE OR REPLACE FUNCTION public.handle_blog_post_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = public.generate_slug(NEW.title) || '-' || substr(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_post_slug_trigger
BEFORE INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.handle_blog_post_slug();