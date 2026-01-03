-- Create salary_lookups table for analytics
CREATE TABLE public.salary_lookups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_title text NOT NULL,
  location text NOT NULL,
  experience_level text,
  industry text,
  result_data jsonb,
  user_email text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.salary_lookups ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (from edge function)
CREATE POLICY "Allow public inserts for salary lookups" ON public.salary_lookups
  FOR INSERT WITH CHECK (true);

-- Allow admins to view all lookups
CREATE POLICY "Admins can view salary lookups" ON public.salary_lookups
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));