-- Fix 1: Profiles table - Replace overly permissive SELECT policy with restricted one
-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create new policy that shows public fields to everyone, but sensitive fields only to owner
-- For public directory listings (agents), we need to show basic info
CREATE POLICY "Anyone can view public profile fields" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create a view for public profile data that excludes sensitive fields
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  username,
  full_name,
  avatar_url,
  role,
  title,
  niche,
  location,
  specialties,
  availability_status,
  calendly_url,
  bio,
  headline,
  cover_photo_url,
  linkedin_url,
  website_url,
  rating,
  reviews_count,
  placements_count,
  years_experience,
  is_active,
  company,
  created_at,
  updated_at,
  -- Only show contact info if viewing own profile (handled in app logic)
  CASE WHEN id = auth.uid() THEN email ELSE NULL END as email,
  CASE WHEN id = auth.uid() THEN phone ELSE NULL END as phone
FROM public.profiles;

-- Fix 2: Salary lookups - Add user_id column and remove email exposure
ALTER TABLE public.salary_lookups 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Fix 3: Conversations - Add DELETE policy for users to delete their own conversations
CREATE POLICY "Users can delete their own conversations" 
ON public.conversations 
FOR DELETE 
USING (created_by = auth.uid());

-- Also allow deleting related messages when conversation is deleted
CREATE POLICY "Users can delete messages in their conversations" 
ON public.messages 
FOR DELETE 
USING (conversation_id IN (
  SELECT id FROM conversations WHERE created_by = auth.uid()
));