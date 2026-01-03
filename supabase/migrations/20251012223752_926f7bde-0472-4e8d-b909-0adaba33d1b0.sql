-- Phase 1: Security Hardening
-- Create role enum and user_roles table (SEPARATE from profiles)

-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'agent', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Contact submissions table with security and GDPR compliance
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  honeypot TEXT,
  submission_time_seconds INTEGER,
  tcpa_consent BOOLEAN NOT NULL DEFAULT false,
  tcpa_timestamp TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '2 years')
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert with validation
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (
    (honeypot IS NULL OR honeypot = '') AND
    tcpa_consent = true AND
    submission_time_seconds > 3
  );

-- Only admins can view submissions
CREATE POLICY "Admins can view submissions"
  ON public.contact_submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update submissions
CREATE POLICY "Admins can update submissions"
  ON public.contact_submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-delete old submissions (GDPR compliance)
CREATE OR REPLACE FUNCTION public.delete_old_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.contact_submissions
  WHERE expires_at < now();
END;
$$;

-- Schedule deletion check (run via cron job or manually)
COMMENT ON FUNCTION public.delete_old_submissions() IS 'Run periodically to delete expired contact submissions for GDPR compliance';