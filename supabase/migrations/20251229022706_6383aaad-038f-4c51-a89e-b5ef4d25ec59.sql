-- Drop the security definer view - it's a security risk
DROP VIEW IF EXISTS public.public_profiles;

-- Instead, we'll handle the sensitive field filtering in the application layer
-- The RLS policy "Anyone can view public profile fields" already allows SELECT
-- The app code will decide what to show based on auth status